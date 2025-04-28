// lib/services/company-service.ts
import { companyProfileApi } from '@/lib/api';
import { normalizeCompanies, normalizeCompany } from '@/lib/normalizers';
import { NormalizedCompany } from '@/types/company';

/**
 * Service class for working with company data
 * Provides a clean interface for components to interact with the API
 */
export class CompanyService {
  /**
   * Get a list of companies with filtering, sorting, and pagination
   */
  static async getCompanies({
    page = 1,
    pageSize = 10,
    sort = 'name:asc',
    search = '',
    filters = {},
    industryId = null,
  }: {
    page?: number;
    pageSize?: number;
    sort?: string;
    search?: string;
    filters?: Record<string, any>;
    industryId?: number | null;
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
      // Build filters object
      const queryFilters: Record<string, any> = { ...filters };
      
      // Add search filter if provided
      if (search && search.trim()) {
        queryFilters.name = { $containsi: search.trim() };
      }
      
      // If industry ID is provided, filter by industry
      if (industryId) {
        queryFilters.industry = { id: industryId };
      }
      
      // Fetch data from API
      const result = await companyProfileApi.find({
        page,
        pageSize,
        sort,
        filters: queryFilters,
        populate: ['industry', 'location'],
      });
      
      // Normalize the company data
      const normalizedCompanies = normalizeCompanies(result.data);
      
      return {
        companies: normalizedCompanies,
        pagination: result.meta.pagination,
      };
    } catch (error) {
      console.error('Error fetching companies:', error);
      return {
        companies: [],
        pagination: { page, pageSize, pageCount: 0, total: 0 },
      };
    }
  }

  /**
   * Get a single company by ID
   */
  static async getCompanyById(id: number | string): Promise<NormalizedCompany | null> {
    try {
      const result = await companyProfileApi.findOne(id, ['industry', 'location', 'contacts', 'social']);
      return normalizeCompany(result);
    } catch (error) {
      console.error(`Error fetching company with ID ${id}:`, error);
      return null;
    }
  }

  /**
   * Get a company by slug
   */
  static async getCompanyBySlug(slug: string): Promise<NormalizedCompany | null> {
    try {
      const result = await companyProfileApi.findBySlug(slug);
      return normalizeCompany(result);
    } catch (error) {
      console.error(`Error fetching company with slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get companies by industry
   */
  static async getCompaniesByIndustry(industryId: number | string): Promise<NormalizedCompany[]> {
    try {
      const results = await companyProfileApi.findByIndustry(industryId);
      return normalizeCompanies(results);
    } catch (error) {
      console.error(`Error fetching companies for industry ${industryId}:`, error);
      return [];
    }
  }

  /**
   * Get total count of companies (optionally filtered)
   */
  static async getCompaniesCount(filters: Record<string, any> = {}): Promise<number> {
    try {
      const result = await companyProfileApi.count(filters);
      return result.count || 0;
    } catch (error) {
      console.error('Error getting companies count:', error);
      return 0;
    }
  }

  /**
   * Format a company's legal status for display
   */
  static formatLegalStatus(status: string): string {
    const statusMap: Record<string, string> = {
      company: 'Компания',
      individual_entrepreneur: 'ИП',
      self_employed: 'Самозанятый',
      individual: 'Физлицо',
      unknown: 'Не указано',
    };
    return statusMap[status] || status;
  }

  /**
   * Format a company's price tier for display
   */
  static formatPriceTier(tier: string): string {
    const tierMap: Record<string, string> = {
      premium: 'Премиум',
      'mid-range': 'Средний',
      budget: 'Бюджетный',
      unknown: 'Не определен',
    };
    return tierMap[tier] || tier;
  }
  
  /**
   * Format website URL for display and linking
   */
  static formatWebsiteUrl(website: string | undefined): string {
    if (!website) return '';
    
    return website.startsWith('http') ? website : `https://${website}`;
  }
  
  /**
   * Format date for display
   */
  static formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  }
}