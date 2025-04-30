// lib/api/email-api.ts
import { EmailTemplate, EmailStats } from '@/types/email-template';

// Конфигурация
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const API_TIMEOUT = 10000;

// Базовый клиент (аналогичен базовому клиенту в lib/api.ts)
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
    console.error('strapiFetch', error, { endpoint });
    throw error;
  }
}

// API методы для работы с шаблонами писем
export const emailTemplateApi = {
  // Получение шаблонов для компании
  async findByCompany(companyId: number | string, params?: {
    populate?: string | string[];
  }) {
    const queryParams: Record<string, any> = {
      filters: {
        company_profile: { id: companyId }
      }
    };
    
    // Добавляем populate
    if (params?.populate) {
      queryParams.populate = params.populate;
    }
    
    // Формируем строку запроса
    const queryString = new URLSearchParams();
    queryString.append('query', JSON.stringify(queryParams));
    
    const response = await strapiFetch(`/email-templates?${queryString.toString()}`);
    const data = await response.json();
    
    return data.data as EmailTemplate[];
  },

  // Создание шаблона письма
  async create(template: Partial<EmailTemplate>) {
    const response = await strapiFetch('/email-templates', {
      method: 'POST',
      body: JSON.stringify({ data: template })
    });
    const data = await response.json();
    return data.data as EmailTemplate;
  },

  // Обновление шаблона письма
  async update(id: number | string, template: Partial<EmailTemplate>) {
    const response = await strapiFetch(`/email-templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data: template })
    });
    const data = await response.json();
    return data.data as EmailTemplate;
  },

  // Удаление шаблона письма
  async delete(id: number | string) {
    const response = await strapiFetch(`/email-templates/${id}`, { method: 'DELETE' });
    await response.json();
    return true;
  }
};

// API методы для работы со статистикой писем
export const emailStatsApi = {
  // Получение статистики для компании
  async findByCompany(companyId: number | string) {
    const queryParams: Record<string, any> = {
      filters: {
        company_profile: { id: companyId }
      }
    };
    
    // Формируем строку запроса
    const queryString = new URLSearchParams();
    queryString.append('query', JSON.stringify(queryParams));
    
    const response = await strapiFetch(`/email-stats?${queryString.toString()}`);
    const data = await response.json();
    
    // Возвращаем первую найденную запись статистики или null
    return data.data && data.data.length > 0 ? data.data[0] as EmailStats : null;
  },

  // Создание записи статистики
  async create(companyId: number | string) {
    const response = await strapiFetch('/email-stats', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          company_profile: companyId,
          sent_count: 0,
          opened_count: 0
        }
      })
    });
    const data = await response.json();
    return data.data as EmailStats;
  },

  // Увеличение счетчика отправленных писем
  async incrementSent(companyId: number | string) {
    const response = await strapiFetch('/email-stats/increment-sent', {
      method: 'POST',
      body: JSON.stringify({ companyId })
    });
    const data = await response.json();
    return data.success as boolean;
  },

  // Увеличение счетчика открытых писем
  async incrementOpened(companyId: number | string) {
    const response = await strapiFetch('/email-stats/increment-opened', {
      method: 'POST',
      body: JSON.stringify({ companyId })
    });
    const data = await response.json();
    return data.success as boolean;
  }
};