import type { Company, Industry } from '@/lib/api';

export const mockContactInfo = {
  phone: '+79991234567',
  mobilePhone: '+79997654321',
  email: 'contact@company.com',
  website: 'https://company.com',
  additionalPhones: '+79991112233, +79994445566',
  additionalEmails: 'info@company.com, support@company.com'
};

export const mockIndustry: Industry = {
  id: 1,
  attributes: {
    name: 'IT и разработка ПО',
    slug: 'it-software',
    description: 'Компании, занимающиеся разработкой программного обеспечения',
    level: 1,
    isMainCategory: true,
    parent: {
      data: null
    },
    children: {
      data: [
        {
          id: 2,
          attributes: {
            name: 'Веб-разработка',
            level: 2
          }
        }
      ]
    },
    companies: {
      data: [
        {
          id: 1,
          attributes: {
            name: 'Технологическая компания'
          }
        }
      ]
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    publishedAt: '2023-01-01T00:00:00.000Z'
  }
};

export const mockGeoLocation = {
  address: 'ул. Примерная, 123',
  city: 'Москва',
  region: 'Московская область',
  district: 'Центральный',
  zip_code: '123456',
  latitude: 55.7558,
  longitude: 37.6176,
  country: 'Россия'
};

export const mockSocialMedia = {
  telegram: 'company_telegram',
  whatsapp: '+79991234567',
  viber: '+79991234567',
  vkontakte: 'company_vk',
  odnoklassniki: 'company_ok',
  instagram: 'company_inst',
  facebook: 'company_fb',
  rutube: 'company_rutube',
  yandexZen: 'company_zen',
  youtube: 'company_yt',
  twitter: 'company_tw'
};

export const mockPerson = {
  firstName: 'Иван',
  lastName: 'Иванов',
  middleName: 'Иванович',
  position: 'Директор'
};

export const mockYandexDirectories = {
  types: 'организация',
  categories: 'IT, разработка ПО',
  branches: 5,
  parsingDate: '2023-01-01T00:00:00.000Z',
  contactInfo: mockContactInfo
};

export const mockSearchBaseProfile = {
  description: 'Компания занимается разработкой ПО',
  cms: 'Bitrix',
  parsingDate: '2023-01-01T00:00:00.000Z',
  contactInfo: mockContactInfo,
  location: mockGeoLocation,
  socialMedia: mockSocialMedia
};

export const mockCompany: Company = {
  id: 1,
  attributes: {
    name: 'Тестовая компания',
    slug: 'test-company',
    description: 'Описание тестовой компании',
    legalStatus: 'company',
    priceTier: 'premium',
    branchesCount: 5,
    taxId: '1234567890',
    website: 'https://company.com',
    email: 'info@company.com',
    phone: '+79991234567',
    address: 'ул. Примерная, 123, Москва',
    foundedYear: 2000,
    employeesCount: 100,
    lastUpdated: '2023-01-01T00:00:00.000Z',
    location: mockGeoLocation,
    contacts: mockContactInfo,
    social: mockSocialMedia,
    yandexDirectories: mockYandexDirectories,
    searchBase: mockSearchBaseProfile,
    contactPerson: [mockPerson],
    industry: {
      data: {
        id: mockIndustry.id,
        attributes: {
          ...mockIndustry.attributes
          //displayName: mockIndustry.attributes.name
        }
      }
    },
    dataSources: [
      { source: 'yandex', id: '123' },
      { source: '2gis', id: '456' }
    ]
  }
};

// mockIndustry.attributes.companies.data = [{
//   id: mockCompany.id,
//   attributes: mockCompany.attributes
// }];

export const createMockResponse = <T>(data: T, meta?: any) => ({
  data,
  meta: meta || { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 1 } }
});

export const mockPagination = (page = 1, pageSize = 10, total = 1) => ({
  pagination: {
    page,
    pageSize,
    pageCount: Math.ceil(total / pageSize),
    total
  }
});
