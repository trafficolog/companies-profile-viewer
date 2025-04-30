// types/email-template.ts
import { NormalizedCompany } from './company';

// Категории шаблонов писем
export type EmailTemplateCategory = 
  | 'welcome' 
  | 'notification' 
  | 'marketing'
  | 'reminder'
  | 'confirmation'
  | 'support'
  | 'other';

// Структура шаблона письма из Strapi
export interface EmailTemplate {
  id: number;
  attributes: {
    name: string;
    subject: string;
    textContent: string;
    htmlContent?: string;
    description?: string;
    variables?: string[];
    active: boolean;
    category: EmailTemplateCategory;
    tags?: string[];
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    company_profile?: {
      data: {
        id: number;
        attributes: {
          name: string;
          // Другие атрибуты компании
        }
      }
    }
  }
}

// Нормализованная структура шаблона письма для использования в компонентах
export interface NormalizedEmailTemplate {
  id: number;
  name: string;
  subject: string;
  textContent: string;
  htmlContent?: string;
  description?: string;
  variables?: string[];
  active: boolean;
  category: EmailTemplateCategory;
  tags?: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  companyId?: number;
  companyName?: string;
}

// types/email-stats.ts
export interface EmailStats {
  id: number;
  attributes: {
    sent_count: number;
    opened_count: number;
    createdAt: string;
    updatedAt: string;
    company_profile?: {
      data: {
        id: number;
        attributes: {
          name: string;
          // Другие атрибуты компании
        }
      }
    }
  }
}

// Нормализованная структура статистики писем
export interface NormalizedEmailStats {
  id: number;
  sentCount: number;
  openedCount: number;
  createdAt: string;
  updatedAt: string;
  companyId?: number;
  companyName?: string;
  // Вычисляемые поля
  openRate?: string; // Процент открытий
}

// Статус прогрева email
export type WarmingStatus = 'active' | 'waiting' | 'stopped';

// Данные по прогреву для компании
export interface EmailWarmingData {
  status: WarmingStatus;
  lastActivity?: string;
  templatesCount: number;
  sentCount: number;
  openedCount: number;
  openRate: string;
  nextScheduledSend?: string;
}

// Параметры для создания шаблона письма
export interface CreateEmailTemplateParams {
  name: string;
  subject: string;
  textContent: string;
  htmlContent?: string;
  description?: string;
  category?: EmailTemplateCategory;
  companyProfileId: number | string;
  active?: boolean;
  tags?: string[];
}