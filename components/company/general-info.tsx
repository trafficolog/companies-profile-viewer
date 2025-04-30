// components/company/company-general-info.tsx
import React from 'react';
import { Link } from "@heroui/link";
import { 
  EmailIcon, 
  PhoneIcon,
  LocationIcon,
  UserIcon,
  CalendarIcon,
  UsersIcon,
  LinkIcon
} from "@/components/icons";
import { NormalizedCompany } from '@/types/company';

interface CompanyGeneralInfoProps {
  company: NormalizedCompany;
}

const CompanyGeneralInfo: React.FC<CompanyGeneralInfoProps> = ({ company }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Основная информация */}
        <div>
          <h3 className="text-lg font-medium mb-4">Общие данные</h3>
          
          <div className="space-y-4">
            {company.legalStatus && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <UsersIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Организационно-правовая форма</div>
                  <div>{company.legalStatus === 'company' ? 'Компания' : 
                       company.legalStatus === 'individual_entrepreneur' ? 'ИП' : 
                       company.legalStatus === 'self_employed' ? 'Самозанятый' : 
                       company.legalStatus === 'individual' ? 'Физлицо' : 'Неизвестно'}</div>
                </div>
              </div>
            )}
            
            {company.foundedYear && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <CalendarIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Год основания</div>
                  <div>{company.foundedYear}</div>
                </div>
              </div>
            )}
            
            {company.employeesCount && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <UsersIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Количество сотрудников</div>
                  <div>{company.employeesCount}</div>
                </div>
              </div>
            )}
            
            {company.branchesCount > 0 && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <LocationIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Количество филиалов</div>
                  <div>{company.branchesCount}</div>
                </div>
              </div>
            )}
            
            {company.priceTier && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <UsersIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Ценовая категория</div>
                  <div>{company.priceTier === 'premium' ? 'Премиум' : 
                       company.priceTier === 'mid-range' ? 'Средний' : 
                       company.priceTier === 'budget' ? 'Бюджетный' : 'Неизвестно'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Контактная информация */}
        <div>
          <h3 className="text-lg font-medium mb-4">Контактные данные</h3>
          
          <div className="space-y-4">
            {company.email && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <EmailIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <Link href={`mailto:${company.email}`} color="primary">
                    {company.email}
                  </Link>
                </div>
              </div>
            )}
            
            {company.website && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <LinkIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Веб-сайт</div>
                  <Link 
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                    isExternal
                    showAnchorIcon
                    color="primary"
                  >
                    {company.website}
                  </Link>
                </div>
              </div>
            )}
            
            {company.phone && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <PhoneIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Телефон</div>
                  <Link href={`tel:${company.phone}`} color="primary">
                    {company.phone}
                  </Link>
                </div>
              </div>
            )}
            
            {company.address && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <LocationIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Адрес</div>
                  <div>{company.address}</div>
                </div>
              </div>
            )}
            
            {company.contactPerson && company.contactPerson.length > 0 && (
              <div className="flex items-start gap-2">
                <div className="text-default-500 w-8">
                  <UserIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">Контактное лицо</div>
                  {company.contactPerson.map((person, index) => (
                    <div key={index}>
                      {person.firstName} {person.lastName} {person.middleName ? ` ${person.middleName}` : ''} {person.position ? `(${person.position})` : ''}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Описание компании */}
      {company.description && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Описание компании</h3>
          <div className="bg-default-50 p-4 rounded-lg">
            {company.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-2">{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyGeneralInfo;