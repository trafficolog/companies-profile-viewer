// app/companies/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Card, 
  CardBody, 
  Tabs, 
  Tab,
  Spinner,
  Button
} from "@heroui/react";
import { 
  CompanyHeader, 
  CompanyWarmingActions, 
  CompanyGeneralInfo, 
  CompanyEmailTemplates, 
  CompanySocialNetworks, 
  CompanyDataSources 
} from "@/components/company";

import { companyProfileApi } from "@/lib/api/companies";
import { AIService } from "@/lib/services/ai-service";
import { EmailService } from "@/lib/services/email-service";
import { RetailCRMService } from "@/lib/services/retailcrm-service";
import { NormalizedCompany } from "@/types/company";
import { NormalizedEmailTemplate, EmailWarmingData, WarmingStatus } from "@/types/email-template";

export default function CompanyDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  
  // Состояние данных о компании
  const [company, setCompany] = useState<NormalizedCompany | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Состояние для прогрева
  const [analyzed, setAnalyzed] = useState(false);
  const [warmingData, setWarmingData] = useState<EmailWarmingData | null>(null);
  const [templates, setTemplates] = useState<NormalizedEmailTemplate[]>([]);
  
  // Состояние для операций
  const [processingAnalysis, setProcessingAnalysis] = useState(false);
  const [processingTemplates, setProcessingTemplates] = useState(false);
  const [processingSending, setProcessingSending] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(false);
  
  // Загрузка данных о компании
  useEffect(() => {
    const loadCompanyData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Получаем данные о компании
        // Исправляем формат для populate - используем объект вместо массива
        const companyData = await companyProfileApi.findOne(id as string, {
          populate: {
            industry: true,
            location: true,
            contacts: true,
            social: true,
            contactPerson: true,
            email_templates: true,
            email_stats: true
          }
        });
        
        const normalizedCompany: NormalizedCompany = {
          ...companyData,
          industry: companyData.industry
            ? { id: companyData.industry.id, displayName: companyData.industry.name }
            : undefined,
        };
        
        setCompany(normalizedCompany);
        
        // Проверяем наличие описания для определения статуса анализа
        setAnalyzed(!!companyData.description && companyData.description.trim().length > 0);
        
        // Получаем данные о прогреве
        const warmingStatus = await EmailService.getWarmingData(companyData.id);
        setWarmingData(warmingStatus);
        
        // Получаем шаблоны писем
        const emailTemplates = await EmailService.getEmailTemplates(companyData.id);
        setTemplates(emailTemplates);
      } catch (err) {
        console.error("Error loading company data:", err);
        setError(`Не удалось загрузить данные компании: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompanyData();
  }, [id]);
  
  // Обработчик анализа компании
  const handleAnalyzeCompany = async () => {
    if (!company) return;
    
    setProcessingAnalysis(true);
    
    try {
      // Вызываем сервис AI для анализа компании
      const analysisResult = await AIService.analyzeCompany(company);
      
      if (analysisResult) {
        // Обновляем компанию в Strapi с результатом анализа
        await companyProfileApi.update(company.id, {
          description: analysisResult
        });
        
        // Обновляем локальное состояние
        setCompany(prevCompany => {
          if (!prevCompany) return null;
          return {
            ...prevCompany,
            description: analysisResult
          };
        });
        
        setAnalyzed(true);
      }
    } catch (error) {
      console.error("Error analyzing company:", error);
      alert(`Ошибка при анализе компании: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setProcessingAnalysis(false);
    }
  };
  
  // Обработчик генерации шаблонов писем
  const handleGenerateTemplates = async () => {
    if (!company) return;
    
    setProcessingTemplates(true);
    
    try {
      // Получаем шаблоны писем через сервис AI
      const templatesData = await AIService.generateEmailTemplates(company);
      
      if (templatesData && templatesData.length > 0) {
        // Сохраняем шаблоны в системе
        const savedTemplates = await EmailService.createEmailTemplates(company.id, templatesData);
        
        // Обновляем локальное состояние
        setTemplates(savedTemplates);
        
        // Обновляем данные о прогреве
        const updatedWarmingData = await EmailService.getWarmingData(company.id);
        setWarmingData(updatedWarmingData);
      }
    } catch (error) {
      console.error("Error generating email templates:", error);
      alert(`Ошибка при генерации шаблонов писем: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setProcessingTemplates(false);
    }
  };
  
  // Обработчик отправки письма
  const handleSendEmail = async () => {
    if (!company || !warmingData || warmingData.templatesCount === 0) return;
    
    setProcessingSending(true);
    
    try {
      // Получаем первый шаблон из списка
      if (templates.length > 0) {
        const firstTemplate = templates[0];
        
        // Отправляем письмо через RetailCRM
        const success = await RetailCRMService.sendEmail(
          company, 
          firstTemplate.subject, 
          firstTemplate.textContent
        );
        
        if (success) {
          // Увеличиваем счетчик отправленных писем
          await EmailService.incrementSentCounter(company.id);
          
          // Обновляем статус прогрева
          await EmailService.updateWarmingStatus(company.id, 'active');
          
          // Обновляем данные о прогреве
          const updatedWarmingData = await EmailService.getWarmingData(company.id);
          setWarmingData(updatedWarmingData);
          
          alert(`Письмо успешно отправлено компании ${company.name}`);
        }
      } else {
        alert("Нет доступных шаблонов писем для отправки. Сначала сгенерируйте шаблоны.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert(`Ошибка при отправке письма: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setProcessingSending(false);
    }
  };
  
  // Обработчик изменения статуса прогрева
  const handleStatusChange = async (newStatus: WarmingStatus) => {
    if (!company) return;
    
    setProcessingStatus(true);
    
    try {
      // Обновляем статус через API
      const success = await EmailService.updateWarmingStatus(company.id, newStatus);
      
      if (success) {
        // Обновляем данные о прогреве
        const updatedWarmingData = await EmailService.getWarmingData(company.id);
        setWarmingData(updatedWarmingData);
        
        alert(`Статус прогрева изменен на ${
          newStatus === 'active' ? 'Активен' : 
          newStatus === 'waiting' ? 'Ожидание' : 'Остановлен'
        }`);
      }
    } catch (error) {
      console.error("Error updating warming status:", error);
      alert(`Ошибка при изменении статуса: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setProcessingStatus(false);
    }
  };
  
  // Обработчик возврата к списку компаний
  const handleBackToList = () => {
    router.push('/warming');
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-default-500">Загрузка данных компании...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-danger">{error}</p>
        <Button 
          color="primary"
          variant="flat"
          className="mt-4"
          onPress={handleBackToList}
        >
          Вернуться к списку компаний
        </Button>
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-default-500">Компания не найдена</p>
        <Button 
          color="primary"
          variant="flat"
          className="mt-4"
          onPress={handleBackToList}
        >
          Вернуться к списку компаний
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Шапка с информацией о компании */}
      <CompanyHeader 
        company={company}
        analyzed={analyzed}
        warmingStatus={warmingData?.status}
        templatesCount={templates.length}
        onBackClick={handleBackToList}
      />
      
      {/* Карточка с действиями по прогреву */}
      <CompanyWarmingActions 
        analyzed={analyzed}
        hasTemplates={templates.length > 0}
        warmingData={warmingData}
        onAnalyze={handleAnalyzeCompany}
        onGenerateTemplates={handleGenerateTemplates}
        onSendEmail={handleSendEmail}
        onStatusChange={handleStatusChange}
        isProcessingAnalysis={processingAnalysis}
        isProcessingTemplates={processingTemplates}
        isProcessingSending={processingSending}
        isProcessingStatus={processingStatus}
      />
      
      {/* Вкладки с информацией о компании */}
      <Card className="shadow-sm">
        <CardBody className="p-0">
          <Tabs aria-label="Информация о компании" fullWidth>
            <Tab key="general" title="Основная информация">
              <CompanyGeneralInfo company={company} />
            </Tab>
            
            <Tab key="emails" title="Шаблоны писем">
              <CompanyEmailTemplates 
                templates={templates}
                analyzed={analyzed}
                onGenerateTemplates={handleGenerateTemplates}
                isProcessingTemplates={processingTemplates}
              />
            </Tab>
            
            <Tab key="social" title="Социальные сети">
              <CompanySocialNetworks social={company.social} />
            </Tab>
            
            <Tab key="data-sources" title="Источники данных">
              <CompanyDataSources dataSources={company.dataSources} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}