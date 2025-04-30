// components/warming-content.tsx
"use client";

import { useState, useCallback } from "react";
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
  Textarea
} from "@heroui/react";
import { Link } from "@heroui/link";
import { SearchIcon, SendIcon, PauseIcon, PlayIcon, StopIcon, FilterIcon } from "@/components/icons";
import WarmingStatusIcon, { WarmingStatus } from "@/components/warming-status-icon";

// Mock companies with email data
const mockCompaniesWithEmail = [
  {
    id: 1,
    name: 'ООО "Технологии Будущего"',
    legalStatus: 'Компания',
    website: 'future-tech.ru',
    email: 'info@future-tech.ru',
    phone: '+7 (999) 123-45-67',
    warmingStatus: 'active' as WarmingStatus,
    lastActivity: '2023-04-22',
    emailsSent: 12,
    emailsOpened: 8,
    responseRate: '67%'
  },
  {
    id: 2,
    name: 'ИП Смирнов А.В.',
    legalStatus: 'ИП',
    website: 'smirnov-design.ru',
    email: 'design@smirnov.ru',
    phone: '+7 (999) 987-65-43',
    warmingStatus: 'waiting' as WarmingStatus,
    lastActivity: '2023-04-18',
    emailsSent: 5,
    emailsOpened: 2,
    responseRate: '40%'
  },
  {
    id: 3,
    name: 'ООО "МедСервис"',
    legalStatus: 'Компания',
    website: 'medservice.ru',
    email: 'info@medservice.ru',
    phone: '+7 (999) 456-78-90',
    warmingStatus: 'stopped' as WarmingStatus,
    lastActivity: '2023-04-15',
    emailsSent: 8,
    emailsOpened: 0,
    responseRate: '0%'
  },
  {
    id: 4,
    name: 'ООО "СтройГрупп"',
    legalStatus: 'Компания',
    website: 'stroygroup.ru',
    email: 'office@stroygroup.ru',
    phone: '+7 (999) 111-22-33',
    warmingStatus: 'active' as WarmingStatus,
    lastActivity: '2023-04-20',
    emailsSent: 15,
    emailsOpened: 12,
    responseRate: '80%'
  },
  {
    id: 5,
    name: 'ООО "ФудМаркет"',
    legalStatus: 'Компания',
    website: 'foodmarket.ru',
    email: 'sales@foodmarket.ru',
    phone: '+7 (999) 444-55-66',
    warmingStatus: 'waiting' as WarmingStatus,
    lastActivity: '2023-04-17',
    emailsSent: 3,
    emailsOpened: 1,
    responseRate: '33%'
  },
  {
    id: 6,
    name: 'ИП Козлов Д.Н.',
    legalStatus: 'ИП',
    website: 'kozlov-auto.ru',
    email: 'info@kozlov-auto.ru',
    phone: '+7 (999) 777-88-99',
    warmingStatus: 'active' as WarmingStatus,
    lastActivity: '2023-04-21',
    emailsSent: 10,
    emailsOpened: 7,
    responseRate: '70%'
  },
  {
    id: 7,
    name: 'ООО "АртСтудио"',
    legalStatus: 'Компания',
    website: 'artstudio.ru',
    email: 'contact@artstudio.ru',
    phone: '+7 (999) 222-33-44',
    warmingStatus: 'stopped' as WarmingStatus,
    lastActivity: '2023-04-10',
    emailsSent: 6,
    emailsOpened: 1,
    responseRate: '17%'
  }
];

// Column definitions
const columns = [
  { key: "name", label: "Название компании" },
  { key: "email", label: "Email" },
  { key: "lastActivity", label: "Последняя активность" },
  { key: "emailsSent", label: "Отправлено писем" },
  { key: "emailsOpened", label: "Открыто писем" },
  { key: "responseRate", label: "Процент отклика" },
  { key: "warmingStatus", label: "Состояние прогрева" },
  { key: "actions", label: "Активности" }
];

export function WarmingContent() {
  // Table states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<WarmingStatus | "all">("all");
  
  // Email modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  
  // Get filtered companies based on search and status filter
  const getFilteredCompanies = useCallback(() => {
    let filtered = [...mockCompaniesWithEmail];
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(company => company.warmingStatus === statusFilter);
    }
    
    return filtered;
  }, [search, statusFilter]);
  
  const filteredCompanies = getFilteredCompanies();
  const displayedCompanies = filteredCompanies.slice((page - 1) * 5, page * 5);
  
  // Handle sending email
  const handleEmailSend = (company: any) => {
    setSelectedCompany(company);
    setEmailSubject("");
    setEmailBody("");
    onOpen();
  };
  
  // Handle submit email
  const handleSubmitEmail = () => {
    // Here would be the actual email sending logic
    console.log(`Sending email to ${selectedCompany.email}:`, {
      subject: emailSubject,
      body: emailBody
    });
    
    // For demo: just close the modal
    onClose();
    
    // Show success message (in a real app, you would use a toast notification)
    alert(`Email sent to ${selectedCompany.name}`);
  };
  
  // Handle changing warming status
  const handleStatusChange = (company: any, newStatus: WarmingStatus) => {
    // In a real app, you would update the status via API
    console.log(`Changing status for ${company.name} from ${company.warmingStatus} to ${newStatus}`);
    
    // Show status change message
    alert(`Status for ${company.name} changed to ${newStatus}`);
  };
  
  // Cell renderer
  const renderCell = (item: any, columnKey: string) => {
    const value = item[columnKey];
    
    switch (columnKey) {
      case "email":
        return (
          <Link href={`mailto:${value}`} size="sm">
            {value}
          </Link>
        );
        
      case "warmingStatus":
        return (
          <div className="flex items-center gap-2">
            <WarmingStatusIcon status={value} />
            <span>
              {value === "active" ? "Активен" : 
               value === "waiting" ? "Ожидание" : 
               "Остановлен"}
            </span>
          </div>
        );
        
      case "actions":
        return (
          <div className="flex gap-2">
            <Button 
              isIconOnly
              size="sm" 
              color="primary" 
              variant="flat"
              onClick={() => handleEmailSend(item)}
              aria-label="Отправить email"
            >
              <SendIcon size={16} />
            </Button>
            
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
                    onClick={() => handleStatusChange(item, "active")}
                  >
                    Активировать
                  </DropdownItem>
                ) : null}
                
                {item.warmingStatus !== "waiting" ? (
                  <DropdownItem 
                    key="pause"
                    startContent={<PauseIcon size={16} />}
                    onClick={() => handleStatusChange(item, "waiting")}
                  >
                    Приостановить
                  </DropdownItem>
                ) : null}
                
                {item.warmingStatus !== "stopped" ? (
                  <DropdownItem 
                    key="stop"
                    startContent={<StopIcon size={16} />}
                    color="danger"
                    onClick={() => handleStatusChange(item, "stopped")}
                  >
                    Остановить
                  </DropdownItem>
                ) : null}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
        
      default:
        return value;
    }
  };
  
  return (
    <>
      <Card className="shadow-none border">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Компании с Email-адресами</h2>
          <Chip color="primary" variant="flat">
            Всего: {mockCompaniesWithEmail.length}
          </Chip>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="max-w-md">
                <Input
                  isClearable
                  placeholder="Поиск по названию или email..."
                  startContent={<SearchIcon className="text-default-400" />}
                  value={search}
                  onValueChange={setSearch}
                  size="sm"
                />
              </div>
              <div className="flex gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      startContent={<FilterIcon />}
                      size="sm" 
                      variant="flat"
                    >
                      Фильтр по статусу
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
                
                <Chip color="default" variant="flat">
                  Показаны {displayedCompanies.length} из {filteredCompanies.length} компаний
                </Chip>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table 
                aria-label="Таблица компаний с Email"
                bottomContent={
                  filteredCompanies.length > 5 ? (
                    <div className="flex justify-center">
                      <Pagination
                        total={Math.ceil(filteredCompanies.length / 5)}
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
                  items={displayedCompanies}
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
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Email sending modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Отправить Email
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-small font-medium mb-1">Получатель:</p>
                    <div className="flex gap-2 items-center">
                      <span className="text-bold">{selectedCompany?.name}</span>
                      <Chip size="sm">{selectedCompany?.email}</Chip>
                    </div>
                  </div>
                  
                  <Input
                    label="Тема письма"
                    placeholder="Введите тему письма"
                    value={emailSubject}
                    onValueChange={setEmailSubject}
                  />
                  
                  <Textarea
                    label="Текст письма"
                    placeholder="Введите текст письма"
                    minRows={5}
                    value={emailBody}
                    onValueChange={setEmailBody}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Отмена
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSubmitEmail}
                  isDisabled={!emailSubject || !emailBody}
                >
                  Отправить
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}