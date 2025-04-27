// src/types/company.ts

export interface Industry {
  id: number;
  displayName: string;
}

export type PriceTier = 'premium' | 'mid-range' | 'budget' | 'unknown';
export type LegalStatus = 'company' | 'individual_entrepreneur' | 'self_employed' | 'individual' | 'unknown';

export interface CompanyProfile {
  id: number;
  attributes: {
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
    industry?: {
      data: {
        id: number;
        attributes: {
          displayName: string;
        }
      }
    };
  }
}

// Нормализованный тип, более удобный для работы
export interface NormalizedCompany {
  id: number;
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
  industry?: {
    id: number;
    displayName: string;
  };
}
