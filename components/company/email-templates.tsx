// components/company/company-email-templates.tsx
import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Button,
  Chip 
} from "@heroui/react";
import { DocumentIcon } from "@/components/icons";
import { NormalizedEmailTemplate } from '@/types/email-template';

interface CompanyEmailTemplatesProps {
  templates: NormalizedEmailTemplate[];
  analyzed: boolean;
  onGenerateTemplates: () => void;
  isProcessingTemplates: boolean;
}

const CompanyEmailTemplates: React.FC<CompanyEmailTemplatesProps> = ({
  templates,
  analyzed,
  onGenerateTemplates,
  isProcessingTemplates
}) => {
  return (
    <div className="p-4">
      {templates.length > 0 ? (
        <div className="space-y-6">
          {templates.map((template, index) => (
            <Card shadow="none" className="border" key={index}>
              <CardHeader className="bg-default-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Шаблон #{index + 1}</h3>
                  <Chip 
                    color={template.active ? "success" : "default"}
                    variant="flat"
                    size="sm"
                  >
                    {template.active ? "Активный" : "Неактивный"}
                  </Chip>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Название шаблона</div>
                    <div>{template.name}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">Тема письма</div>
                    <div>{template.subject}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium">Текст письма</div>
                    <div className="bg-default-50 p-3 rounded-lg text-sm">
                      {template.textContent.split('\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-default-500">Нет шаблонов писем для этой компании</p>
          <Button 
            color="primary"
            variant="flat"
            startContent={<DocumentIcon />}
            className="mt-4"
            isDisabled={!analyzed}
            isLoading={isProcessingTemplates}
            onPress={onGenerateTemplates}
          >
            Сгенерировать шаблоны
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompanyEmailTemplates;