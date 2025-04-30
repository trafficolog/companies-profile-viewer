// components/company/company-warming-actions.tsx
import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Button 
} from "@heroui/react";
import { 
  AnalyticsIcon, 
  DocumentIcon, 
  SendIcon, 
  PlayIcon,
  PauseIcon,
  StopIcon
} from "@/components/icons";
import { WarmingStatus, EmailWarmingData } from '@/types/email-template';

interface CompanyWarmingActionsProps {
  analyzed: boolean;
  hasTemplates: boolean;
  warmingData: EmailWarmingData | null;
  onAnalyze: () => void;
  onGenerateTemplates: () => void;
  onSendEmail: () => void;
  onStatusChange: (status: WarmingStatus) => void;
  isProcessingAnalysis: boolean;
  isProcessingTemplates: boolean;
  isProcessingSending: boolean;
  isProcessingStatus: boolean;
}

const CompanyWarmingActions: React.FC<CompanyWarmingActionsProps> = ({
  analyzed,
  hasTemplates,
  warmingData,
  onAnalyze,
  onGenerateTemplates,
  onSendEmail,
  onStatusChange,
  isProcessingAnalysis,
  isProcessingTemplates,
  isProcessingSending,
  isProcessingStatus
}) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <h2 className="text-xl font-medium">Управление прогревом</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex gap-2 flex-wrap">
            {/* Кнопка анализа компании */}
            <Button
              color="secondary"
              startContent={<AnalyticsIcon />}
              isLoading={isProcessingAnalysis}
              onPress={onAnalyze}
              isDisabled={analyzed}
            >
              {analyzed ? "Анализ выполнен" : "Анализировать"}
            </Button>
            
            {/* Кнопка генерации шаблонов писем */}
            <Button
              color="warning"
              startContent={<DocumentIcon />}
              isLoading={isProcessingTemplates}
              onPress={onGenerateTemplates}
              isDisabled={!analyzed}
            >
              Сгенерировать шаблоны
            </Button>
            
            {/* Кнопка отправки письма */}
            <Button
              color="primary"
              startContent={<SendIcon />}
              isLoading={isProcessingSending}
              onPress={onSendEmail}
              isDisabled={!hasTemplates}
            >
              Отправить письмо
            </Button>
          </div>
          
          <div className="flex gap-2">
            {/* Управление статусом прогрева */}
            <Button
              color="success"
              variant="flat"
              startContent={<PlayIcon />}
              isLoading={isProcessingStatus}
              onPress={() => onStatusChange('active')}
              isDisabled={!warmingData || warmingData.status === 'active' || !hasTemplates}
            >
              Активировать
            </Button>
            
            <Button
              color="warning"
              variant="flat"
              startContent={<PauseIcon />}
              isLoading={isProcessingStatus}
              onPress={() => onStatusChange('waiting')}
              isDisabled={!warmingData || warmingData.status === 'waiting' || !hasTemplates}
            >
              Приостановить
            </Button>
            
            <Button
              color="danger"
              variant="flat"
              startContent={<StopIcon />}
              isLoading={isProcessingStatus}
              onPress={() => onStatusChange('stopped')}
              isDisabled={!warmingData || warmingData.status === 'stopped' || !hasTemplates}
            >
              Остановить
            </Button>
          </div>
        </div>
        
        {/* Статистика прогрева */}
        {warmingData && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card shadow="none" className="border p-4">
              <div className="text-center">
                <h3 className="text-default-500">Отправлено писем</h3>
                <p className="text-3xl font-bold text-primary">{warmingData.sentCount}</p>
              </div>
            </Card>
            
            <Card shadow="none" className="border p-4">
              <div className="text-center">
                <h3 className="text-default-500">Открыто писем</h3>
                <p className="text-3xl font-bold text-primary">{warmingData.openedCount}</p>
              </div>
            </Card>
            
            <Card shadow="none" className="border p-4">
              <div className="text-center">
                <h3 className="text-default-500">Процент открытий</h3>
                <p className="text-3xl font-bold text-primary">{warmingData.openRate}</p>
              </div>
            </Card>
            
            <Card shadow="none" className="border p-4">
              <div className="text-center">
                <h3 className="text-default-500">Шаблонов писем</h3>
                <p className="text-3xl font-bold text-primary">{warmingData.templatesCount}</p>
              </div>
            </Card>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CompanyWarmingActions;