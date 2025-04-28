// lib/normalizers.ts
import { CompanyProfile, NormalizedCompany } from '@/types/company';

/**
 * Normalize a company from Strapi API format to the application format
 * Based on the actual API response structure from Postman
 * 
 * @param company The company data from the API
 * @returns A normalized company object ready for use in components
 */
export function normalizeCompany(company: CompanyProfile): NormalizedCompany {
  // Handle potentially missing data safely
  if (!company) {
    console.warn('Invalid company data received:', company);
    return {
      id: 0,
      name: 'Unknown Company',
      legalStatus: 'unknown',
      priceTier: 'unknown',
      branchesCount: 0
    };
  }

  // Create normalized company with mapped fields
  const normalized: NormalizedCompany = {
    id: company.id,
    name: company.name,
    legalStatus: company.legalStatus,
    priceTier: company.priceTier,
    branchesCount: company.branchesCount,
    documentId: company.documentId,
    slug: company.slug,
    createdAt: company.createdAt,
    updatedAt: company.updatedAt,
    publishedAt: company.publishedAt,
    locale: company.locale
  };

  // Add optional fields if they exist
  if (company.description) normalized.description = company.description;
  if (company.taxId) normalized.taxId = company.taxId;
  if (company.website) normalized.website = company.website;
  if (company.email) normalized.email = company.email;
  if (company.phone) normalized.phone = company.phone;
  if (company.address) normalized.address = company.address;
  if (company.foundedYear) normalized.foundedYear = company.foundedYear;
  if (company.employeesCount) normalized.employeesCount = company.employeesCount;
  if (company.lastUpdated) normalized.lastUpdated = company.lastUpdated;
  if (company.dataSources) normalized.dataSources = company.dataSources;
  
  // Handle industry relationship if it exists
  if (company.industry) {
    normalized.industry = {
      id: company.industry.id,
      displayName: company.industry.name
    };
  }

  // Handle other components
  if (company.location) {
    normalized.location = company.location;
  }

  if (company.contacts) {
    normalized.contacts = company.contacts;
  }

  if (company.social) {
    normalized.social = company.social;
  }

  if (company.contactPerson) {
    normalized.contactPerson = company.contactPerson;
  }

  if (company.yandexDirectories) {
    normalized.yandexDirectories = company.yandexDirectories;
  }

  if (company.searchBase) {
    normalized.searchBase = company.searchBase;
  }

  return normalized;
}

/**
 * Normalize an array of companies from Strapi API format to the application format
 * @param companies Array of companies from the API
 * @returns Array of normalized company objects
 */
export function normalizeCompanies(companies: CompanyProfile[]): NormalizedCompany[] {
  if (!Array.isArray(companies)) {
    console.warn('Expected array of companies but received:', companies);
    return [];
  }
  
  return companies.map(normalizeCompany);
}

/**
 * Create an empty normalized company with default values
 * Useful for creating new companies or for placeholders
 */
export function createEmptyCompany(): NormalizedCompany {
  return {
    id: 0,
    name: '',
    legalStatus: 'unknown',
    priceTier: 'unknown',
    branchesCount: 0,
    lastUpdated: new Date().toISOString(),
    locale: 'ru'
  };
}