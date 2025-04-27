// src/lib/api.ts
import { z } from 'zod';

// Конфигурация
const STRAPI_API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const API_TIMEOUT = 10000;

// Вспомогательные enum-типы с кастомными сообщениями
const LegalStatusEnum = z.enum(
  ['company', 'individual_entrepreneur', 'self_employed', 'individual', 'unknown'],
  { 
    invalid_type_error: 'Недопустимый тип организационно-правовой формы',
    required_error: 'Укажите организационно-правовую форму'
  }
);

const PriceTierEnum = z.enum(
  ['premium', 'mid-range', 'budget', 'unknown'],
  {
    invalid_type_error: 'Недопустимый ценовой сегмент',
    required_error: 'Укажите ценовой сегмент компании'
  }
);

// Схема для компонентов
const ContactInfoSchema = z.object({
  phone: z.string().optional(),
  mobilePhone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  additionalPhones: z.string().optional(),
  additionalEmails: z.string().optional()
});

const GeoLocationSchema = z.object({
  address: z.string(),
  city: z.string(),
  region: z.string().optional(),
  district: z.string().optional(),
  zip_code: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string().optional()
});

const SocialMediaSchema = z.object({
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
  viber: z.string().optional(),
  vkontakte: z.string().optional(),
  odnoklassniki: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  rutube: z.string().optional(),
  yandexZen: z.string().optional(),
  youtube: z.string().optional(),
  twitter: z.string().optional()
});

const YandexDirectoriesSchema = z.object({
  types: z.string().optional(),
  categories: z.string().optional(),
  branches: z.number().optional(),
  parsingDate: z.string().datetime().optional(),
  contactInfo: ContactInfoSchema.optional()
});

const SearchBaseProfileSchema = z.object({
  description: z.string().optional(),
  cms: z.string().optional(),
  parsingDate: z.string().datetime().optional(),
  contactInfo: ContactInfoSchema.optional(),
  location: GeoLocationSchema.optional(),
  socialMedia: SocialMediaSchema.optional()
});

const ContactPersonSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  position: z.string().optional()
});

// Основная схема компании
export const CompanySchema = z.object({
  id: z.number(),
  attributes: z.object({
    name: z.string().min(1, 'Название компании обязательно'),
    slug: z.string(),
    description: z.string().optional(),
    legalStatus: LegalStatusEnum,
    priceTier: PriceTierEnum,
    branchesCount: z.number().min(0, 'Количество филиалов не может быть отрицательным'),
    taxId: z.string().optional(),
    website: z.string().url('Некорректный URL сайта').optional(),
    email: z.string().email('Некорректный email').optional(),
    phone: z.string().min(6, 'Телефон слишком короткий').optional(),
    address: z.string().optional(),
    foundedYear: z.number().min(1900, 'Год основания недействителен').max(new Date().getFullYear()).optional(),
    employeesCount: z.number().min(0, 'Количество сотрудников не может быть отрицательным').optional(),
    lastUpdated: z.string().datetime().optional(),
    industry: z.object({
      data: z.object({
        id: z.number(),
        attributes: z.object({
          name: z.string(),
          slug: z.string()
        })
      }).nullable()
    }).optional(),
    location: GeoLocationSchema.optional(),
    contacts: ContactInfoSchema.optional(),
    social: SocialMediaSchema.optional(),
    yandexDirectories: YandexDirectoriesSchema.optional(),
    searchBase: SearchBaseProfileSchema.optional(),
    contactPerson: z.array(ContactPersonSchema).optional(),
    dataSources: z.array(z.object({
      source: z.string(),
      id: z.string()
    })).optional()
  })
});

const PaginationMetaSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pageSize: z.number(),
    pageCount: z.number(),
    total: z.number()
  })
});

export const IndustrySchema = z.object({
  id: z.number(),
  attributes: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    level: z.number().min(1).max(3),
    isMainCategory: z.boolean(),
    parent: z.object({
      data: z.object({
        id: z.number(),
        attributes: z.object({
          name: z.string()
        }).optional()
      }).nullable()
    }).optional(),
    children: z.object({
      data: z.array(
        z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string(),
            level: z.number()
          })
        })
      )
    }).optional(),
    companies: z.object({
      data: z.array(
        z.object({
          id: z.number(),
          attributes: z.object({
            name: z.string()
          })
        })
      )
    }).optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    publishedAt: z.string().datetime().optional()
  })
});

// Типы
export type Industry = z.infer<typeof IndustrySchema>;
export type Company = z.infer<typeof CompanySchema>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

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
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (key === 'filters' && typeof value === 'object') {
            query.append(key, JSON.stringify(value));
          } else if (key === 'populate' && Array.isArray(value)) {
            value.forEach(item => query.append(`populate[${item}]`, 'true'));
          } else {
            query.append(key, String(value));
          }
        }
      });
    }

    const response = await strapiFetch(`/company-profiles?${query.toString()}`);
    const data = await response.json();
    
    return {
      data: z.array(CompanySchema).parse(data.data),
      meta: PaginationMetaSchema.parse(data.meta)
    };
  },

  async count(filters?: Record<string, any>) {
    const query = filters ? `?filters=${encodeURIComponent(JSON.stringify(filters))}` : '';
    const response = await strapiFetch(`/company-profiles/count${query}`);
    const data = await response.json();
    return data;
  },

  async findOne(id: number | string, populate?: string | string[]) {
    let query = '';
    if (populate) {
      const params = new URLSearchParams();
      if (Array.isArray(populate)) {
        populate.forEach(item => params.append(`populate[${item}]`, 'true'));
      } else {
        params.append('populate', populate);
      }
      query = `?${params.toString()}`;
    }
    
    const response = await strapiFetch(`/company-profiles/${id}${query}`);
    const data = await response.json();
    return CompanySchema.parse(data.data);
  },

  async create(payload: Partial<Company['attributes']>) {
    const response = await strapiFetch('/company-profiles', {
      method: 'POST',
      body: JSON.stringify({ data: payload })
    });
    const data = await response.json();
    return CompanySchema.parse(data.data);
  },

  async update(id: number | string, payload: Partial<Company['attributes']>) {
    const response = await strapiFetch(`/company-profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: payload })
    });
    const data = await response.json();
    return CompanySchema.parse(data.data);
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
    return CompanySchema.parse(data.data);
  },

  async findByTaxId(taxId: string) {
    const response = await strapiFetch(`/company-profiles/tax-id/${taxId}`);
    const data = await response.json();
    return CompanySchema.parse(data.data);
  },

  async findByIndustry(industryId: string | number) {
    const response = await strapiFetch(`/company-profiles/industry/${industryId}`);
    const data = await response.json();
    return z.array(CompanySchema).parse(data.data);
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
    return z.array(CompanySchema).parse(data.data);
  },

  async upsertFromSource(source: string, payload: any) {
    const response = await strapiFetch(`/company-profiles/source/${source}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return CompanySchema.parse(data.data);
  },

  async merge(sourceId: string | number, targetId: string | number) {
    const response = await strapiFetch(`/company-profiles/merge/${sourceId}/${targetId}`, {
      method: 'POST'
    });
    const data = await response.json();
    return CompanySchema.parse(data.data);
  },

  async upsertByPhone(source: string, phone: string) {
    const response = await strapiFetch(`/company-profiles/phone-match/${source}`, {
      method: 'POST',
      body: JSON.stringify({ phone })
    });
    const data = await response.json();
    return CompanySchema.parse(data.data);
  },

  async findWithSocial() {
    const response = await strapiFetch('/company-profiles/with-social');
    const data = await response.json();
    return z.array(CompanySchema).parse(data.data);
  },

  async findDuplicates() {
    const response = await strapiFetch('/company-profiles/duplicates');
    const data = await response.json();
    return z.array(CompanySchema).parse(data.data);
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