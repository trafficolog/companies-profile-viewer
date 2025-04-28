// src/types/company.ts

export interface Industry {
  id: number;
  displayName: string;
}

export interface GeoLocation {
  address: string;
  city: string;
  region?: string;
  district?: string;
  zip_code?: string;
  latitude: number;
  longitude: number;
  country?: string;
}

export interface ContactInfo {
  phone?: string;
  mobilePhone?: string;
  email?: string;
  website?: string;
  additionalPhones?: string;
  additionalEmails?: string;
}

export interface SocialMedia {
  telegram?: string;
  whatsapp?: string;
  viber?: string;
  vkontakte?: string;
  odnoklassniki?: string;
  instagram?: string;
  facebook?: string;
  rutube?: string;
  yandexZen?: string;
  youtube?: string;
  twitter?: string;
}

export interface ContactPerson {
  firstName: string;
  lastName: string;
  middleName?: string;
  position?: string;
}

export interface DataSource {
  status: string;
  updatedAt: string;
}

export type PriceTier = 'premium' | 'mid-range' | 'budget' | 'unknown';
export type LegalStatus = 'company' | 'individual_entrepreneur' | 'self_employed' | 'individual' | 'unknown';

// The actual API response format based on Postman result
export interface CompanyProfile {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  foundedYear?: number;
  employeesCount?: number;
  lastUpdated?: string;
  dataSources?: {
    yandexDirectories?: DataSource;
    searchBase?: DataSource;
    yandexMaps?: DataSource;
    twoGis?: DataSource;
    rusBase?: DataSource;
    instagram?: DataSource;
    [key: string]: DataSource | undefined;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  legalStatus: LegalStatus;
  priceTier: PriceTier;
  branchesCount: number;
  taxId?: string;
  industry?: {
    id: number;
    name: string;
    slug?: string;
  };
  location?: GeoLocation;
  contacts?: ContactInfo;
  social?: SocialMedia;
  contactPerson?: ContactPerson[];
  yandexDirectories?: {
    types?: string;
    categories?: string;
    branches?: number;
    parsingDate?: string;
    contactInfo?: ContactInfo;
  };
  searchBase?: {
    description?: string;
    cms?: string;
    parsingDate?: string;
    contactInfo?: ContactInfo;
    location?: GeoLocation;
    socialMedia?: SocialMedia;
  };
}

// Normalized type for use in components
export interface NormalizedCompany {
  id: number;
  documentId?: string;
  name: string;
  legalStatus: LegalStatus;
  priceTier: PriceTier;
  branchesCount: number;
  taxId?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  foundedYear?: number;
  employeesCount?: number;
  lastUpdated?: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string;
  industry?: {
    id: number;
    displayName: string;
  };
  location?: GeoLocation;
  contacts?: ContactInfo;
  social?: SocialMedia;
  contactPerson?: ContactPerson[];
  dataSources?: {
    [key: string]: DataSource | undefined;
  };
  yandexDirectories?: {
    types?: string;
    categories?: string;
    branches?: number;
    parsingDate?: string;
    contactInfo?: ContactInfo;
  };
  searchBase?: {
    description?: string;
    cms?: string;
    parsingDate?: string;
    contactInfo?: ContactInfo;
    location?: GeoLocation;
    socialMedia?: SocialMedia;
  };
}