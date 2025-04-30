// src/lib/api.ts
import { CompanyProfile } from '@/types/company';

// Конфигурация
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_TIMEOUT = 10000;

type StrapiPopulateValue = boolean | Record<string, any>;
type StrapiPopulate = string | string[] | Record<string, StrapiPopulateValue>;

// Типы для ответов API
interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Базовый клиент
async function strapiFetch(endpoint: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${STRAPI_API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    logError('strapiFetch', error, { endpoint });
    throw error;
  }
}

// API методы
export const companyProfileApi = {
  // Основные CRUD операции
  async find(params?: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
    populate?: string | string[];
  }) {
    // Создаем объект параметров запроса в формате, ожидаемом сервером
    const queryParams: Record<string, any> = {};
    
    // Добавляем параметры пагинации в нужном формате
    if (params?.page || params?.pageSize) {
      queryParams.pagination = {};
      if (params?.page) queryParams.pagination.page = params.page;
      if (params?.pageSize) queryParams.pagination.pageSize = params.pageSize;
    }
    
    // Добавляем параметр сортировки
    if (params?.sort) {
      queryParams.sort = params.sort;
    }
    
    // Добавляем фильтры
    if (params?.filters && Object.keys(params.filters).length > 0) {
      queryParams.filters = params.filters;
    }
    
    // Добавляем populate
    if (params?.populate) {
      queryParams.populate = params.populate;
    }
    
    // Формируем строку запроса
    const queryString = new URLSearchParams();
    queryString.append('query', JSON.stringify(queryParams));
    
    const response = await strapiFetch(`/company-profiles?${queryString.toString()}`);
    const data = await response.json();
    
    return {
      data: data.data as CompanyProfile[],
      meta: data.meta as PaginationMeta
    };
  },

  async findWithEmail(params?: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
    populate?: string | string[];
  }) {
    const filters = {
      ...(params?.filters || {}),
      email: { $notNull: true, $ne: "" }
    };
    return this.find({
      ...params,
      filters,
    });
  },

  async count(filters?: Record<string, any>) {
    let query = '';
    if (filters && Object.keys(filters).length > 0) {
      const queryParams = new URLSearchParams();
      queryParams.append('filters', JSON.stringify(filters));
      query = `?${queryParams.toString()}`;
    }
    
    const response = await strapiFetch(`/company-profiles/count${query}`);
    const data = await response.json();
    return data;
  },

  async findOne(id: number | string, populate?: StrapiPopulate) {
    let query = '';
    
    if (populate) {
      const queryParams = new URLSearchParams();
      
      // Обработка различных форматов параметра populate
      if (typeof populate === 'string') {
        // Один параметр в виде строки
        queryParams.append('populate', populate);
      } else if (Array.isArray(populate)) {
        // Массив строк
        const populateObj = populate.reduce((acc, field) => {
          acc[field] = true;
          return acc;
        }, {} as Record<string, boolean>);
        
        queryParams.append('populate', JSON.stringify(populateObj));
      } else {
        // Объект с расширенной конфигурацией
        queryParams.append('populate', JSON.stringify(populate));
      }
      
      query = `?${queryParams.toString()}`;
    }
    
    const response = await strapiFetch(`/company-profiles/${id}${query}`);
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async create(payload: Partial<CompanyProfile>) {
    const response = await strapiFetch('/company-profiles', {
      method: 'POST',
      body: JSON.stringify({ data: payload })
    });
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async update(id: number | string, payload: Partial<CompanyProfile>) {
    const response = await strapiFetch(`/company-profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: payload })
    });
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async delete(id: number | string) {
    const response = await strapiFetch(`/company-profiles/${id}`, { method: 'DELETE' });
    await response.json(); // Consume the response to maintain consistency
    return true;
  },

  // Кастомные роуты
  async findBySlug(slug: string) {
    const response = await strapiFetch(`/company-profiles/slug/${slug}`);
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async findByTaxId(taxId: string) {
    const response = await strapiFetch(`/company-profiles/tax-id/${taxId}`);
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async findByIndustry(industryId: string | number) {
    const response = await strapiFetch(`/company-profiles/industry/${industryId}`);
    const data = await response.json();
    return data.data as CompanyProfile[];
  },

  async findByLocation(params: { lat: number; lng: number; radius?: number }) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.append(key, String(value));
      }
    });
    const response = await strapiFetch(`/company-profiles/nearby?${query.toString()}`);
    const data = await response.json();
    return data.data as CompanyProfile[];
  },

  async upsertFromSource(source: string, payload: any) {
    const response = await strapiFetch(`/company-profiles/source/${source}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async merge(sourceId: string | number, targetId: string | number) {
    const response = await strapiFetch(`/company-profiles/merge/${sourceId}/${targetId}`, {
      method: 'POST'
    });
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async upsertByPhone(source: string, phone: string) {
    const response = await strapiFetch(`/company-profiles/phone-match/${source}`, {
      method: 'POST',
      body: JSON.stringify({ phone })
    });
    const data = await response.json();
    return data.data as CompanyProfile;
  },

  async findWithSocial() {
    const response = await strapiFetch('/company-profiles/with-social');
    const data = await response.json();
    return data.data as CompanyProfile[];
  },

  async findDuplicates() {
    const response = await strapiFetch('/company-profiles/duplicates');
    const data = await response.json();
    return data.data as CompanyProfile[];
  }
};

export async function checkStrapiStatus(): Promise<'ok' | 'error'> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  
  try {
    const response = await fetch(`${STRAPI_API_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    if (!response.ok) return 'error';
    
    const data = await response.json();
    return data.status === 'ok' ? 'ok' : 'error';
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Health check failed:', error);
    return 'error';
  }
}

// Утилиты
function logError(method: string, error: unknown, context: Record<string, any> = {}) {
  console.error({
    timestamp: new Date().toISOString(),
    service: 'strapi-api',
    method,
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    context
  });
}