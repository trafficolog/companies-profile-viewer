// components/company/company-header.tsx
import React from 'react';
import { 
  Chip, 
  Button 
} from "@heroui/react";
import { 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
  DocumentIcon
} from "@/components/icons";
import { Link } from "@heroui/link";
import { NormalizedCompany } from '@/types/company';
import WarmingStatusIcon from "@/components/warming-status-icon";
import { WarmingStatus } from '@/types/email-template';

interface CompanyHeaderProps {
  company: NormalizedCompany;
  analyzed: boolean;
  warmingStatus?: WarmingStatus;
  templatesCount: number;
  onBackClick: () => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
  company,
  analyzed,
  warmingStatus,
  templatesCount,
  onBackClick
}) => {
  return (
    <div className="flex justify-between items-start flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Button 
          isIconOnly
          variant="light" 
          onPress={onBackClick}
          aria-label="Вернуться к списку компаний"
        >
          <ArrowLeftIcon />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <div className="flex items-center gap-2 text-default-500">
            <span>{company.industry?.displayName || 'Отрасль не указана'}</span>
            {company.website && (
              <>
                <span>•</span>
                <Link 
                  href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                  isExternal
                  showAnchorIcon
                  color="primary"
                >
                  {company.website}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {/* Статус анализа */}
        <Chip
          color={analyzed ? "success" : "danger"}
          variant="flat"
          startContent={analyzed ? <CheckCircleIcon size={16} /> : <ExclamationCircleIcon size={16} />}
        >
          {analyzed ? "Анализ проведен" : "Нет анализа"}
        </Chip>
        
        {/* Статус прогрева */}
        {warmingStatus && (
          <Chip
            color={
              warmingStatus === 'active' ? "success" :
              warmingStatus === 'waiting' ? "warning" : "danger"
            }
            variant="flat"
            startContent={<WarmingStatusIcon status={warmingStatus} />}
          >
            {warmingStatus === 'active' ? "Активен" :
             warmingStatus === 'waiting' ? "Ожидание" : "Остановлен"}
          </Chip>
        )}
        
        {/* Шаблоны */}
        <Chip
          color="primary"
          variant="flat"
          startContent={<DocumentIcon size={16} />}
        >
          Шаблонов: {templatesCount}
        </Chip>
      </div>
    </div>
  );
};

export default CompanyHeader;