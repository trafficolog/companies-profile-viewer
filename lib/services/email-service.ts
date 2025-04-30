// lib/services/email-service.ts
import { companyProfileApi } from '@/lib/api/companies';
import { emailTemplateApi, emailStatsApi } from '@/lib/api/email';
import { normalizeCompanies, normalizeCompany } from '@/lib/normalizers';
import { NormalizedCompany } from '@/types/company';
import { 
  EmailTemplate, 
  NormalizedEmailTemplate, 
  EmailStats, 
  NormalizedEmailStats,
  WarmingStatus,
  EmailWarmingData,
  CreateEmailTemplateParams
} from '@/types/email-template';

/**
 * Сервис для работы с email-рассылками и прогревом адресов
 */
export class EmailService {
  /**
   * Получение списка компаний с email-адресами и фильтрацией
   */
  static async getCompaniesWithEmail({
    page = 1,
    pageSize = 10,
    sort = 'name:asc',
    search = '',
    statusFilter = 'all',
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    search?: string;
    statusFilter?: WarmingStatus | 'all';
  }): Promise<{
    companies: NormalizedCompany[];
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  }> {
    try {
      // Создаем базовые фильтры для API
      const queryFilters: Record<string, any> = {
        // Главное условие - наличие email
        email: { $notNull: true, $ne: '' },
      };
      
      // Добавляем поисковый фильтр, если задан
      if (search && search.trim()) {
        queryFilters.name = { $containsi: search.trim() };
      }
      
      // Запрос к API
      const result = await companyProfileApi.find({
        page,
        pageSize,
        sort,
        filters: queryFilters,
        populate: ['industry', 'social', 'location', 'email_templates', 'email_stats'],
      });
      
      // Нормализуем данные
      const normalizedCompanies = normalizeCompanies(result.data);
      
      return {
        companies: normalizedCompanies,
        pagination: result.meta.pagination,
      };
    } catch (error) {
      console.error('Error fetching companies with email:', error);
      return {
        companies: [],
        pagination: { page, pageSize, pageCount: 0, total: 0 },
      };
    }
  }

  /**
   * Нормализация объекта шаблона письма из Strapi
   */
  static normalizeEmailTemplate(template: EmailTemplate): NormalizedEmailTemplate {
    return {
      id: template.id,
      name: template.attributes.name,
      subject: template.attributes.subject,
      textContent: template.attributes.textContent,
      htmlContent: template.attributes.htmlContent,
      description: template.attributes.description,
      variables: template.attributes.variables,
      active: template.attributes.active,
      category: template.attributes.category,
      tags: template.attributes.tags,
      slug: template.attributes.slug,
      createdAt: template.attributes.createdAt,
      updatedAt: template.attributes.updatedAt,
      publishedAt: template.attributes.publishedAt,
      companyId: template.attributes.company_profile?.data?.id,
      companyName: template.attributes.company_profile?.data?.attributes?.name
    };
  }

  /**
   * Нормализация объекта статистики из Strapi
   */
  static normalizeEmailStats(stats: EmailStats): NormalizedEmailStats {
    const sentCount = stats.attributes.sent_count;
    const openedCount = stats.attributes.opened_count;
    
    // Расчет процента открытий
    const openRate = sentCount > 0 
      ? `${Math.round((openedCount / sentCount) * 100)}%` 
      : '0%';
    
    return {
      id: stats.id,
      sentCount,
      openedCount,
      openRate,
      createdAt: stats.attributes.createdAt,
      updatedAt: stats.attributes.updatedAt,
      companyId: stats.attributes.company_profile?.data?.id,
      companyName: stats.attributes.company_profile?.data?.attributes?.name
    };
  }

  /**
   * Получение данных по прогреву email для компании
   */
  static async getWarmingData(companyId: number): Promise<EmailWarmingData | null> {
    try {
      // Запрашиваем шаблоны писем и статистику
      const [templates, stats] = await Promise.all([
        emailTemplateApi.findByCompany(companyId),
        emailStatsApi.findByCompany(companyId)
      ]);
      
      // Если статистики еще нет, создаем запись
      const emailStats = stats || await emailStatsApi.create(companyId);
      
      // Если есть шаблоны, но нет статистики, это ненормальная ситуация,
      // возвращаем null (в реальном приложении здесь был бы механизм восстановления)
      if (!emailStats) {
        console.error(`No email stats available for company ${companyId}`);
        return null;
      }
      
      // Нормализуем статистику
      const normalizedStats = this.normalizeEmailStats(emailStats);
      
      // Определяем статус прогрева на основе количества отправленных писем
      // и последней активности
      const status: WarmingStatus = normalizedStats.sentCount > 0 ? 'active' : 'waiting';
      
      // Определяем дату последней активности
      const lastActivity = normalizedStats.updatedAt 
        ? new Date(normalizedStats.updatedAt).toISOString().split('T')[0]
        : undefined;
      
      return {
        status,
        lastActivity,
        templatesCount: templates?.length || 0,
        sentCount: normalizedStats.sentCount,
        openedCount: normalizedStats.openedCount,
        openRate: normalizedStats.openRate || '0%'
      };
    } catch (error) {
      console.error(`Error getting warming data for company ${companyId}:`, error);
      return null;
    }
  }

  /**
   * Получение шаблонов писем для компании
   */
  static async getEmailTemplates(companyId: number): Promise<NormalizedEmailTemplate[]> {
    try {
      const templates = await emailTemplateApi.findByCompany(companyId, {
        populate: ['company_profile']
      });
      
      
      return templates.map((template: EmailTemplate) => this.normalizeEmailTemplate(template));
    } catch (error) {
      console.error(`Error getting email templates for company ${companyId}:`, error);
      return [];
    }
  }

  /**
   * Создание шаблонов писем для компании
   */
  static async createEmailTemplates(
    companyId: number, 
    templates: { subject: string, body: string }[]
  ): Promise<NormalizedEmailTemplate[]> {
    try {
      // Преобразуем шаблоны в формат Strapi
      const templatePromises = templates.map((template, index) => {
        const params = {
          attributes: {
            name: `Шаблон ${index + 1} для компании #${companyId}`,
            subject: template.subject,
            textContent: template.body,
            category: 'marketing',
            active: true,
            company_profile: { data: { id: companyId } }
          }
        } as any;
        return emailTemplateApi.create(params);
      });
      
      const createdTemplates = await Promise.all(templatePromises);
      return createdTemplates.map((template: EmailTemplate) => this.normalizeEmailTemplate(template));
    } catch (error) {
      console.error(`Error creating email templates for company ${companyId}:`, error);
      return [];
    }
  }

  /**
   * Обновление статуса прогрева компании
   * В нашем случае это просто добавление тегов в шаблоны
   */
  static async updateWarmingStatus(
    companyId: number, 
    status: WarmingStatus
  ): Promise<boolean> {
    try {
      // Запрашиваем шаблоны писем
      const templates = await this.getEmailTemplates(companyId);
      
      // Если нет шаблонов, нечего обновлять
      if (templates.length === 0) {
        return false;
      }
      
      // Обновляем активность шаблонов в зависимости от статуса
      const updatePromises = templates.map(template => {
        return emailTemplateApi.update(template.id, {
          attributes: {
            active: status === 'active',
            tags: [...(template.tags || []), status]
          }
        } as any);
      });
      
      await Promise.all(updatePromises);
      
      return true;
    } catch (error) {
      console.error(`Error updating warming status for company ${companyId}:`, error);
      return false;
    }
  }

  /**
   * Инкремент счетчика отправленных писем
   */
  static async incrementSentCounter(companyId: number): Promise<boolean> {
    try {
      const success = await emailStatsApi.incrementSent(companyId);
      return success;
    } catch (error) {
      console.error(`Error incrementing sent counter for company ${companyId}:`, error);
      return false;
    }
  }

  /**
   * Инкремент счетчика открытых писем
   */
  static async incrementOpenedCounter(companyId: number): Promise<boolean> {
    try {
      const success = await emailStatsApi.incrementOpened(companyId);
      return success;
    } catch (error) {
      console.error(`Error incrementing opened counter for company ${companyId}:`, error);
      return false;
    }
  }

  /**
   * Сохранение шаблонов писем для компании
   */
  static async saveEmailTemplates(
    companyId: number,
    templates: { subject: string; body: string }[]
  ): Promise<NormalizedEmailTemplate[]> {
    try {
      // Сначала удаляем существующие шаблоны
      const existingTemplates = await this.getEmailTemplates(companyId);
      const deletePromises = existingTemplates.map(template => 
        emailTemplateApi.delete(template.id)
      );
      await Promise.all(deletePromises);

      // Создаем новые шаблоны
      return await this.createEmailTemplates(companyId, templates);
    } catch (error) {
      console.error(`Error saving email templates for company ${companyId}:`, error);
      return [];
    }
  }
}