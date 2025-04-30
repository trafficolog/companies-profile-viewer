// components/warming-content.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Chip, 
  Button, 
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Spinner,
  Tooltip
} from "@heroui/react";
import { Link } from "@heroui/link";
import { 
  SearchIcon, 
  SendIcon, 
  PauseIcon, 
  PlayIcon, 
  StopIcon, 
  FilterIcon, 
  AnalyticsIcon,
  DocumentIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from "@/components/icons";
import WarmingStatusIcon, { WarmingStatus } from "@/components/warming-status-icon";
import CompanyNameWithLink from "@/components/company/list/name-with-link";
import { companyProfileApi } from "@/lib/api/companies";
import { normalizeCompanies } from "@/lib/normalizers";
import { NormalizedCompany } from "@/types/company";
import { EmailService } from "@/lib/services/email-service";
import { AIService } from "@/lib/services/ai-service";
import { RetailCRMService } from "@/lib/services/retailcrm-service";

// Column definitions
const columns = [
  { key: "name", label: "Название компании" },
  { key: "email", label: "Email" },
  { key: "analyzed", label: "Анализ" },
  { key: "templatesCount", label: "Шаблоны" },
  { key: "lastActivity", label: "Последняя активность" },
  { key: "emailsSent", label: "Отправлено" },
  { key: "emailsOpened", label: "Открыто" },
  { key: "responseRate", label: "Отклик" },
  { key: "warmingStatus", label: "Статус" },
  { key: "actions", label: "Активности" }
];

// Тип для статистики прогрева компании
interface CompanyWarmingStats {
  id: number;
  companyId: number;
  lastActivity: string;
  emailsSent: number;
  emailsOpened: number;
  responseRate: string;
  warmingStatus: WarmingStatus;
  templatesCount: number;
}

// Расширенный тип компании с данными прогрева
interface CompanyWithWarmingStats extends NormalizedCompany {
  lastActivity?: string;
  emailsSent?: number;
  emailsOpened?: number;
  responseRate?: string;
  warmingStatus?: WarmingStatus;
  analyzed?: boolean;
  templatesCount?: number;
}

// Мок-данные для статистики прогрева
const mockWarmingStats: Record<number, CompanyWarmingStats> = {
  1: {
    id: 1,
    companyId: 1,
    lastActivity: '2023-04-22',
    emailsSent: 12,
    emailsOpened: 8,
    responseRate: '67%',
    warmingStatus: 'active',
    templatesCount: 3
  },
  2: {
    id: 2,
    companyId: 2,
    lastActivity: '2023-04-18',
    emailsSent: 5,
    emailsOpened: 2,
    responseRate: '40%',
    warmingStatus: 'waiting',
    templatesCount: 2
  },
  3: {
    id: 3,
    companyId: 3,
    lastActivity: '2023-04-15',
    emailsSent: 8,
    emailsOpened: 0,
    responseRate: '0%',
    warmingStatus: 'stopped',
    templatesCount: 0
  },
  4: {
    id: 4,
    companyId: 4,
    lastActivity: '2023-04-20',
    emailsSent: 15,
    emailsOpened: 12,
    responseRate: '80%',
    warmingStatus: 'active',
    templatesCount: 3
  },
  5: {
    id: 5,
    companyId: 5,
    lastActivity: '2023-04-17',
    emailsSent: 3,
    emailsOpened: 1,
    responseRate: '33%',
    warmingStatus: 'waiting',
    templatesCount: 1
  }
};

export function WarmingContent() {
  // Состояние для данных компаний
  const [companies, setCompanies] = useState<CompanyWithWarmingStats[]>([]);
  
  // Состояние для пагинации
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Состояние для UI и управления
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Состояние для фильтрации
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<WarmingStatus | "all">("all");
  const [analyzeFilter, setAnalyzeFilter] = useState<"all" | "analyzed" | "not-analyzed">("all");
  
  // Состояние для операций AI
  const [processingCompanyId, setProcessingCompanyId] = useState<number | null>(null);
  const [processingTemplatesCompanyId, setProcessingTemplatesCompanyId] = useState<number | null>(null);
  const [processingSendingCompanyId, setProcessingSendingCompanyId] = useState<number | null>(null);

  // Модальные окна
  const { isOpen: isAnalysisModalOpen, onOpen: onAnalysisModalOpen, onClose: onAnalysisModalClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState<CompanyWithWarmingStats | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  
  // Модальное окно для шаблонов
  const { isOpen: isTemplatesModalOpen, onOpen: onTemplatesModalOpen, onClose: onTemplatesModalClose } = useDisclosure();
  const [emailTemplates, setEmailTemplates] = useState<{subject: string, body: string}[]>([]);

  // Функция для получения статистики прогрева
  const getWarmingStats = useCallback((companyId: number): CompanyWarmingStats => {
    return mockWarmingStats[companyId] || {
      id: 0,
      companyId,
      lastActivity: '-',
      emailsSent: 0,
      emailsOpened: 0,
      responseRate: '0%',
      warmingStatus: 'waiting',
      templatesCount: 0
    };
  }, []);

  // Загрузка компаний с email адресами
  useEffect(() => {
    const loadCompaniesWithEmail = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Создаем фильтры для API запроса
        const apiFilters: Record<string, any> = {
          // Обязательное условие - наличие email
          email: { $notNull: true, $ne: "" }
        };
        
        // Добавляем поисковый фильтр, если указан
        if (search && search.trim()) {
          apiFilters.name = { $containsi: search.trim() };
        }
        
        // Запрос данных с API
        const result = await companyProfileApi.find({
          page,
          pageSize,
          sort: 'name:asc',
          filters: apiFilters,
          populate: ['industry', 'location', 'social', 'contactPerson'],
        });
        
        // Нормализация данных
        const normalizedCompanies = normalizeCompanies(result.data);
        
        // Добавляем статистику прогрева к компаниям и проверяем наличие описания
        const companiesWithStats: CompanyWithWarmingStats[] = normalizedCompanies.map(company => {
          // Проверяем, есть ли у компании описание (для определения статуса анализа)
          const isAnalyzed = !!company.description && company.description.trim().length > 0;
          
          // Получаем мок-данные по статистике прогрева
          const warmingStats = getWarmingStats(company.id);
          
          return {
            ...company,
            analyzed: isAnalyzed,
            lastActivity: warmingStats.lastActivity,
            emailsSent: warmingStats.emailsSent,
            emailsOpened: warmingStats.emailsOpened,
            responseRate: warmingStats.responseRate,
            warmingStatus: warmingStats.warmingStatus,
            templatesCount: warmingStats.templatesCount
          };
        });
        
        // Фильтрация по статусу прогрева (на клиенте)
        let filteredCompanies = companiesWithStats;
        
        if (statusFilter !== "all") {
          filteredCompanies = filteredCompanies.filter(
            company => company.warmingStatus === statusFilter
          );
        }
        
        // Фильтрация по наличию анализа
        if (analyzeFilter !== "all") {
          filteredCompanies = filteredCompanies.filter(
            company => analyzeFilter === "analyzed" ? company.analyzed : !company.analyzed
          );
        }
        
        setCompanies(filteredCompanies);
        setTotalPages(result.meta.pagination.pageCount || 1);
        setTotalItems(result.meta.pagination.total || 0);
      } catch (err) {
        console.error("Error loading companies with email:", err);
        setError(`Не удалось загрузить список компаний: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
        setCompanies([]);
        setTotalPages(0);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCompaniesWithEmail();
  }, [page, pageSize, search, statusFilter, analyzeFilter, getWarmingStats]);

  // Получение фильтрованных компаний с учетом поиска и статуса
  const getFilteredCompanies = useCallback(() => {
    return companies;
  }, [companies]);
  
  const filteredCompanies = getFilteredCompanies();
  
  // Обработчик анализа компании через OpenRouter AI
  const handleAnalyzeCompany = async (company: CompanyWithWarmingStats) => {
    try {
      setProcessingCompanyId(company.id);
      
      // Вызываем сервис AI для анализа компании
      const analysisResult = await AIService.analyzeCompany(company);
      
      if (analysisResult) {
        // Обновляем компанию в Strapi с результатом анализа
        await companyProfileApi.update(company.id, {
          description: analysisResult
        });
        
        // Показываем результат в модальном окне
        setSelectedCompany(company);
        setAnalysisResult(analysisResult);
        onAnalysisModalOpen();
        
        // Обновляем локальное состояние для отображения обновленных данных
        setCompanies(prevCompanies => 
          prevCompanies.map(c => {
            if (c.id === company.id) {
              return { 
                ...c, 
                description: analysisResult,
                analyzed: true 
              };
            }
            return c;
          })
        );
      }
    } catch (error) {
      console.error("Error analyzing company:", error);
      alert(`Ошибка при анализе компании: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setProcessingCompanyId(null);
    }
  };
  
  // Обработчик генерации шаблонов писем
  const handleGenerateTemplates = async (company: CompanyWithWarmingStats) => {
    try {
      setProcessingTemplatesCompanyId(company.id);
      
      // Получаем шаблоны писем через сервис AI
      const templates = await AIService.generateEmailTemplates(company);
      
      if (templates && templates.length > 0) {
        // Сохраняем шаблоны в системе
        await EmailService.saveEmailTemplates(company.id, templates);
        
        // Показываем шаблоны в модальном окне
        setSelectedCompany(company);
        setEmailTemplates(templates);
        onTemplatesModalOpen();
        
        // Обновляем локальное состояние
        setCompanies(prevCompanies => 
          prevCompanies.map(c => {
            if (c.id === company.id) {
              return { 
                ...c, 
                templatesCount: templates.length 
              };
            }
            return c;
          })
        );
      }
    } catch (error) {
      console.error("Error generating email templates:", error);
      alert(`Ошибка при генерации шаблонов писем: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setProcessingTemplatesCompanyId(null);
    }
  };
  
  // Обработчик отправки письма
  const handleSendEmail = async (company: CompanyWithWarmingStats) => {
    try {
      setProcessingSendingCompanyId(company.id);
      
      // Проверяем наличие шаблонов
      if (!company.templatesCount || company.templatesCount === 0) {
        alert("Нет доступных шаблонов писем для отправки. Сначала сгенерируйте шаблоны.");
        return;
      }
      
      // Получаем первый шаблон из списка
      const templates = await EmailService.getEmailTemplates(company.id);
      
      if (templates && templates.length > 0) {
        const firstTemplate = templates[0];
        
        // Отправляем письмо через RetailCRM
        const success = await RetailCRMService.sendEmail(
          company, 
          firstTemplate.subject, 
          firstTemplate.body
        );
        
        if (success) {
          // Обновляем статус прогрева
          await EmailService.updateWarmingStatus(company.id, 'active');
          
          // Обновляем локальное состояние
          setCompanies(prevCompanies => 
            prevCompanies.map(c => {
              if (c.id === company.id) {
                return { 
                  ...c, 
                  warmingStatus: 'active',
                  emailsSent: (c.emailsSent || 0) + 1,
                  lastActivity: new Date().toISOString().split('T')[0]
                };
              }
              return c;
            })
          );
          
          alert(`Письмо успешно отправлено компании ${company.name}`);
        }
      } else {
        alert("Не удалось получить шаблоны писем. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert(`Ошибка при отправке письма: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setProcessingSendingCompanyId(null);
    }
  };
  
  // Обработчик изменения статуса прогрева
  const handleStatusChange = async (company: CompanyWithWarmingStats, newStatus: WarmingStatus) => {
    try {
      // Обновляем статус через API
      const success = await EmailService.updateWarmingStatus(company.id, newStatus);
      
      if (success) {
        // Обновляем локальное состояние для быстрого отклика UI
        setCompanies(prevCompanies => 
          prevCompanies.map(c => {
            if (c.id === company.id) {
              return { ...c, warmingStatus: newStatus };
            }
            return c;
          })
        );
        
        // Показываем сообщение об успехе
        alert(`Статус прогрева для ${company.name} изменен на ${
          newStatus === 'active' ? 'Активен' : 
          newStatus === 'waiting' ? 'Ожидание' : 'Остановлен'
        }`);
      }
    } catch (error) {
      console.error("Error updating warming status:", error);
      alert(`Ошибка при изменении статуса: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  };
  
  // Функция рендеринга ячеек таблицы
  const renderCell = (item: CompanyWithWarmingStats, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return <CompanyNameWithLink id={item.id} name={item.name || 'Без названия'} />;
        
      case "email":
        return item.email ? (
          <Link href={`mailto:${item.email}`} size="sm">
            {item.email}
          </Link>
        ) : '—';
        
      case "analyzed":
        return (
          <div className="flex justify-center">
            {item.analyzed ? (
              <Tooltip content="Анализ проведен">
                <span className="text-success">
                  <CheckCircleIcon size={20} />
                </span>
              </Tooltip>
            ) : (
              <Tooltip content="Анализ не проведен">
                <span className="text-danger">
                  <ExclamationCircleIcon size={20} />
                </span>
              </Tooltip>
            )}
          </div>
        );
        
      case "templatesCount":
        return (
          <div className="flex items-center gap-1">
            <span>{item.templatesCount || 0}</span>
          </div>
        );
        
      case "lastActivity":
        return item.lastActivity || '—';
        
      case "emailsSent":
        return item.emailsSent !== undefined ? item.emailsSent : '—';
        
      case "emailsOpened":
        return item.emailsOpened !== undefined ? item.emailsOpened : '—';
        
      case "responseRate":
        return item.responseRate || '—';
        
      case "warmingStatus":
        return item.warmingStatus ? (
          <div className="flex items-center gap-2">
            <WarmingStatusIcon status={item.warmingStatus} />
            <span>
              {item.warmingStatus === "active" ? "Активен" : 
               item.warmingStatus === "waiting" ? "Ожидание" : 
               "Остановлен"}
            </span>
          </div>
        ) : '—';
        
      case "actions":
        return (
          <div className="flex gap-1">
            {/* Кнопка анализа компании */}
            <Tooltip content="Анализировать компанию">
              <Button 
                isIconOnly
                size="sm" 
                color="secondary" 
                variant="flat"
                isLoading={processingCompanyId === item.id}
                onPress={() => handleAnalyzeCompany(item)}
                aria-label="Анализировать компанию"
              >
                <AnalyticsIcon size={16} />
              </Button>
            </Tooltip>
            
            {/* Кнопка генерации шаблонов писем */}
            <Tooltip content="Сгенерировать шаблоны писем">
              <Button 
                isIconOnly
                size="sm" 
                color="warning" 
                variant="flat"
                isLoading={processingTemplatesCompanyId === item.id}
                onPress={() => handleGenerateTemplates(item)}
                isDisabled={!item.analyzed}
                aria-label="Сгенерировать шаблоны писем"
              >
                <DocumentIcon size={16} />
              </Button>
            </Tooltip>
            
            {/* Кнопка отправки письма */}
            <Tooltip content="Отправить письмо">
              <Button 
                isIconOnly
                size="sm" 
                color="primary" 
                variant="flat"
                isLoading={processingSendingCompanyId === item.id}
                onPress={() => handleSendEmail(item)}
                isDisabled={!item.templatesCount || item.templatesCount === 0}
                aria-label="Отправить письмо"
              >
                <SendIcon size={16} />
              </Button>
            </Tooltip>
            
            {/* Управление статусом прогрева */}
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="flat"
                  aria-label="Действия с прогревом"
                >
                  {item.warmingStatus === "active" ? (
                    <PauseIcon size={16} />
                  ) : item.warmingStatus === "waiting" ? (
                    <PlayIcon size={16} />
                  ) : (
                    <PlayIcon size={16} />
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Действия с прогревом">
                {item.warmingStatus !== "active" ? (
                  <DropdownItem 
                    key="activate"
                    startContent={<PlayIcon size={16} />}
                    onPress={() => handleStatusChange(item, "active")}
                  >
                    Активировать
                  </DropdownItem>
                ) : null}
                
                {item.warmingStatus !== "waiting" ? (
                  <DropdownItem 
                    key="pause"
                    startContent={<PauseIcon size={16} />}
                    onPress={() => handleStatusChange(item, "waiting")}
                  >
                    Приостановить
                  </DropdownItem>
                ) : null}
                
                {item.warmingStatus !== "stopped" ? (
                  <DropdownItem 
                    key="stop"
                    startContent={<StopIcon size={16} />}
                    color="danger"
                    onPress={() => handleStatusChange(item, "stopped")}
                  >
                    Остановить
                  </DropdownItem>
                ) : null}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <>
      <Card className="shadow-none border">
        <CardHeader className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-medium">Компании с Email-адресами</h2>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Chip color="primary" variant="flat">
              Всего: {isLoading ? "..." : totalItems}
            </Chip>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-4 px-5">
              <div className="max-w-lg">
                <Input
                  isClearable
                  placeholder="Поиск по названию компании..."
                  endContent={<SearchIcon className="text-default-400" />}
                  value={search}
                  onValueChange={setSearch}
                  size="sm"
                />
              </div>
              <div className="flex gap-2">
                {/* Фильтр по статусу прогрева */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      startContent={<FilterIcon />}
                      size="sm" 
                      variant="flat"
                      className="text-sm"
                    >
                      Статус прогрева
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="Фильтр по статусу"
                    selectionMode="single"
                    selectedKeys={[statusFilter]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as WarmingStatus | "all";
                      setStatusFilter(selected);
                    }}
                  >
                    <DropdownItem key="all">Все статусы</DropdownItem>
                    <DropdownItem key="active">Активен</DropdownItem>
                    <DropdownItem key="waiting">Ожидание</DropdownItem>
                    <DropdownItem key="stopped">Остановлен</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                
                {/* Фильтр по наличию анализа */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      startContent={<AnalyticsIcon />}
                      size="sm" 
                      variant="flat"
                      className="text-sm"
                    >
                      Статус анализа
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="Фильтр по анализу"
                    selectionMode="single"
                    selectedKeys={[analyzeFilter]}
                    onSelectionChange={(keys) => {
                      const selected = Array.from(keys)[0] as "all" | "analyzed" | "not-analyzed";
                      setAnalyzeFilter(selected);
                    }}
                  >
                    <DropdownItem key="all">Все компании</DropdownItem>
                    <DropdownItem key="analyzed">Проанализированные</DropdownItem>
                    <DropdownItem key="not-analyzed">Не проанализированные</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                
                <Chip color="default" variant="flat" className="h-8 rounded-small text-sm">
                  Показаны {companies.length} из {totalItems} компаний
                </Chip>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Spinner size="lg" color="primary" />
                </div>
              ) : error ? (
                <div className="flex justify-center items-center h-64 text-danger">
                  {error}
                </div>
              ) : companies.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-default-500">
                  Нет компаний, соответствующих заданным параметрам
                </div>  
              ) : (
                <Table 
                  aria-label="Таблица компаний с Email"
                  bottomContent={
                    totalPages > 1 ? (
                      <div className="flex justify-center">
                        <Pagination
                          total={totalPages}
                          page={page}
                          onChange={setPage}
                        />
                      </div>
                    ) : null
                  }
                >
                  <TableHeader>
                    {columns.map(column => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody 
                    items={companies}
                    emptyContent="Компании не найдены"
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(item, columnKey.toString())}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Модальное окно для отображения результатов анализа */}
      <Modal isOpen={isAnalysisModalOpen} onClose={onAnalysisModalClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Результаты анализа компании
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-small font-medium mb-1">Компания:</p>
                    <p className="text-bold">{selectedCompany?.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-small font-medium mb-1">Описание:</p>
                    <div className="border p-4 rounded-md bg-default-50">
                      {analysisResult.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-small text-default-500">
                      Описание сохранено в профиле компании и будет использоваться для генерации шаблонов писем.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Модальное окно для отображения шаблонов писем */}
      <Modal isOpen={isTemplatesModalOpen} onClose={onTemplatesModalClose} size="lg" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Шаблоны писем
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-small font-medium mb-1">Компания:</p>
                    <p className="text-bold">{selectedCompany?.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-small font-medium mb-1">Сгенерированные шаблоны:</p>
                    
                    {emailTemplates.map((template, index) => (
                      <div key={index} className="border p-4 rounded-md bg-default-50 mb-4">
                        <p className="font-medium mb-2">Шаблон #{index + 1}</p>
                        <div>
                          <p className="text-small font-medium">Тема:</p>
                          <p className="mb-2">{template.subject}</p>
                        </div>
                        <div>
                          <p className="text-small font-medium">Текст письма:</p>
                          <div>
                            {template.body.split('\n').map((paragraph, pIndex) => (
                              <p key={pIndex} className="mb-2">{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-small text-default-500">
                      Шаблоны сохранены и будут использоваться для отправки писем.
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}