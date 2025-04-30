// components/data-sources-content.tsx
"use client";

import { useState, useCallback } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter, 
  Divider, 
  Chip, 
  Button, 
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Tabs,
  Tab
} from "@heroui/react";
import { Link } from "@heroui/link";
import { SearchIcon, ArrowLeftIcon } from "@/components/icons";

// Data sources
const dataSources = [
  { 
    id: 'yandex_search', 
    name: 'Яндекс.Поиск', 
    count: 875, 
    percentage: 70.3,
    description: 'Данные о компаниях, полученные при парсинге результатов поиска Яндекс',
    uniqueColumns: ['description', 'cms', 'parsingDate'] 
  },
  { 
    id: 'yandex_directory', 
    name: 'Яндекс.Справочник', 
    count: 692, 
    percentage: 55.6,
    description: 'Информация о компаниях из каталога организаций Яндекс.Справочник',
    uniqueColumns: ['categories', 'branches', 'types'] 
  },
  { 
    id: 'yandex_maps', 
    name: 'Яндекс.Карты', 
    count: 356, 
    percentage: 28.6,
    description: 'Геоданные и контактная информация из сервиса Яндекс.Карты',
    uniqueColumns: ['address', 'latitude', 'longitude'] 
  },
  { 
    id: '2gis', 
    name: '2GIS', 
    count: 428, 
    percentage: 34.4,
    description: 'Данные о компаниях из электронного справочника 2GIS',
    uniqueColumns: ['address', 'rating', 'reviews'] 
  },
  { 
    id: 'rusbase', 
    name: 'RusBase', 
    count: 124, 
    percentage: 10.0,
    description: 'Информация о стартапах и технологических компаниях из базы RusBase',
    uniqueColumns: ['foundedYear', 'investments', 'founders'] 
  },
  { 
    id: 'dikidi', 
    name: 'DIKIDI', 
    count: 67, 
    percentage: 5.4,
    description: 'Данные о салонах красоты и сфере услуг из сервиса онлайн-записи DIKIDI',
    uniqueColumns: ['services', 'specialists', 'rating'] 
  },
  { 
    id: 'yclients', 
    name: 'YClients', 
    count: 42, 
    percentage: 3.4,
    description: 'Информация о сервисных компаниях из системы автоматизации YClients',
    uniqueColumns: ['services', 'schedule', 'bookingUrl'] 
  }
];

// Common columns for all company tables
const commonColumns = [
  { key: 'name', label: 'Название компании' },
  { key: 'legalStatus', label: 'ОПФ' },
  { key: 'website', label: 'Веб-сайт' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Телефон' }
];

// Additional columns based on data source
const sourceColumns = {
  yandex_search: [
    { key: 'description', label: 'Описание' },
    { key: 'cms', label: 'CMS' },
    { key: 'parsingDate', label: 'Дата парсинга' }
  ],
  yandex_directory: [
    { key: 'categories', label: 'Категории' },
    { key: 'branches', label: 'Филиалы' },
    { key: 'types', label: 'Типы' }
  ],
  yandex_maps: [
    { key: 'address', label: 'Адрес' },
    { key: 'latitude', label: 'Широта' },
    { key: 'longitude', label: 'Долгота' }
  ],
  '2gis': [
    { key: 'address', label: 'Адрес' },
    { key: 'rating', label: 'Рейтинг' },
    { key: 'reviews', label: 'Отзывы' }
  ],
  rusbase: [
    { key: 'foundedYear', label: 'Год основания' },
    { key: 'investments', label: 'Инвестиции' },
    { key: 'founders', label: 'Основатели' }
  ],
  dikidi: [
    { key: 'services', label: 'Услуги' },
    { key: 'specialists', label: 'Специалисты' },
    { key: 'rating', label: 'Рейтинг' }
  ],
  yclients: [
    { key: 'services', label: 'Услуги' },
    { key: 'schedule', label: 'График работы' },
    { key: 'bookingUrl', label: 'URL для бронирования' }
  ]
};

// Mock companies data
const mockCompanies = [
  {
    id: 1,
    name: 'ООО "Технологии Будущего"',
    legalStatus: 'Компания',
    website: 'future-tech.ru',
    email: 'info@future-tech.ru',
    phone: '+7 (999) 123-45-67',
    description: 'Разработка программного обеспечения для бизнеса',
    cms: 'Bitrix',
    parsingDate: '2023-04-15',
    categories: 'IT, разработка ПО',
    branches: 3,
    types: 'организация',
    address: 'г. Москва, ул. Тверская, 10',
    latitude: 55.7558,
    longitude: 37.6176,
    rating: 4.8,
    reviews: 56,
    foundedYear: 2015,
    investments: '$2M',
    founders: 'Иванов И.И., Петров П.П.',
    services: 'Разработка ПО, консалтинг',
    specialists: 'Программисты, дизайнеры',
    schedule: '09:00-18:00',
    bookingUrl: 'booking.future-tech.ru',
    dataSources: ['yandex_search', 'yandex_directory', '2gis', 'rusbase']
  },
  {
    id: 2,
    name: 'ИП Смирнов А.В.',
    legalStatus: 'ИП',
    website: 'smirnov-design.ru',
    email: 'design@smirnov.ru',
    phone: '+7 (999) 987-65-43',
    description: 'Дизайн интерьеров и архитектурное проектирование',
    cms: 'WordPress',
    parsingDate: '2023-04-12',
    categories: 'Дизайн, архитектура',
    branches: 1,
    types: 'ИП',
    address: 'г. Санкт-Петербург, Невский пр-т, 78',
    latitude: 59.9311,
    longitude: 30.3609,
    rating: 4.9,
    reviews: 87,
    foundedYear: 2018,
    investments: null,
    founders: 'Смирнов А.В.',
    services: 'Дизайн интерьера, проектирование',
    specialists: 'Дизайнеры, архитекторы',
    schedule: '10:00-19:00',
    bookingUrl: 'design.smirnov.ru/booking',
    dataSources: ['yandex_search', 'yandex_maps', 'dikidi', 'yclients']
  },
  {
    id: 3,
    name: 'ООО "МедСервис"',
    legalStatus: 'Компания',
    website: 'medservice.ru',
    email: 'info@medservice.ru',
    phone: '+7 (999) 456-78-90',
    description: 'Медицинские услуги и консультации',
    cms: 'Joomla',
    parsingDate: '2023-04-10',
    categories: 'Медицина, здравоохранение',
    branches: 5,
    types: 'организация, клиника',
    address: 'г. Москва, ул. Арбат, 25',
    latitude: 55.7494,
    longitude: 37.5913,
    rating: 4.6,
    reviews: 124,
    foundedYear: 2010,
    investments: '$5M',
    founders: 'Компания "МедХолдинг"',
    services: 'Медицинские услуги, анализы',
    specialists: 'Врачи, медсестры',
    schedule: '08:00-20:00',
    bookingUrl: 'medservice.ru/appointment',
    dataSources: ['yandex_search', 'yandex_directory', 'yandex_maps', '2gis', 'yclients']
  },
  {
    id: 4,
    name: 'ООО "СтройГрупп"',
    legalStatus: 'Компания',
    website: 'stroygroup.ru',
    email: 'office@stroygroup.ru',
    phone: '+7 (999) 111-22-33',
    description: 'Строительство жилых и коммерческих объектов',
    cms: 'ModX',
    parsingDate: '2023-04-05',
    categories: 'Строительство, недвижимость',
    branches: 2,
    types: 'организация',
    address: 'г. Екатеринбург, ул. Ленина, 50',
    latitude: 56.8389,
    longitude: 60.6057,
    rating: 4.3,
    reviews: 45,
    foundedYear: 2012,
    investments: null,
    founders: 'Сидоров С.С.',
    services: 'Строительство, ремонт',
    specialists: 'Строители, прорабы',
    schedule: '09:00-18:00',
    bookingUrl: null,
    dataSources: ['yandex_search', 'yandex_directory', '2gis']
  },
  {
    id: 5,
    name: 'ООО "ФудМаркет"',
    legalStatus: 'Компания',
    website: 'foodmarket.ru',
    email: 'sales@foodmarket.ru',
    phone: '+7 (999) 444-55-66',
    description: 'Сеть продуктовых магазинов',
    cms: 'OpenCart',
    parsingDate: '2023-04-01',
    categories: 'Розничная торговля, продукты питания',
    branches: 12,
    types: 'организация, сеть магазинов',
    address: 'г. Москва, ул. Пушкина, 15',
    latitude: 55.7612,
    longitude: 37.6176,
    rating: 4.1,
    reviews: 230,
    foundedYear: 2008,
    investments: '$10M',
    founders: 'Компания "РетейлПлюс"',
    services: 'Продажа продуктов питания',
    specialists: 'Продавцы, менеджеры',
    schedule: '08:00-22:00',
    bookingUrl: null,
    dataSources: ['yandex_search', 'yandex_directory', 'yandex_maps', '2gis']
  }
];

export function DataSourcesContent() {
  // State for view control
  const [activeView, setActiveView] = useState<'sources' | 'companies'>('sources');
  
  // State for selected source
  const [selectedSource, setSelectedSource] = useState<any>(null);
  
  // Table states
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  
  // Get filtered companies based on current selection
  const getFilteredCompanies = useCallback(() => {
    let filtered = [...mockCompanies];
    
    // Apply data source filter
    if (selectedSource) {
      filtered = filtered.filter(company => 
        company.dataSources.includes(selectedSource.id)
      );
    }
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedSource, search]);
  
  // Get columns for the current view
  const getColumns = useCallback(() => {
    const columns = [...commonColumns];
    
    // Add source-specific columns
    const id = selectedSource?.id as keyof typeof sourceColumns;
    if (id && id in sourceColumns) {
      columns.push(...sourceColumns[id]);
    }
    
    return columns;
  }, [selectedSource]);
  
  // Handle source selection
  const handleSourceClick = (source: any) => {
    setSelectedSource(source);
    setActiveView('companies');
    setPage(1);
    setSearch("");
  };
  
  // Return to sources view
  const handleBackToSources = () => {
    setActiveView('sources');
    setSelectedSource(null);
  };
  
  // Cell renderer
  const renderCell = (item: any, columnKey: string) => {
    const value = item[columnKey];
    
    if (columnKey === 'website' && value) {
      return (
        <Link href={`https://${value}`} isExternal showAnchorIcon size="sm">
          {value}
        </Link>
      );
    }
    
    if (columnKey === 'email' && value) {
      return (
        <Link href={`mailto:${value}`} size="sm">
          {value}
        </Link>
      );
    }
    
    if (columnKey === 'bookingUrl' && value) {
      return (
        <Link href={`https://${value}`} isExternal showAnchorIcon size="sm">
          {value}
        </Link>
      );
    }
    
    // Return formatted value or dash if empty
    return value || '—';
  };
  
  // Render data sources view
  const renderSourcesView = () => {
    return (
      <Card className="shadow-none border">
        <CardHeader>
          <h2 className="text-xl font-medium">Источники данных о компаниях</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-6 mt-2">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {dataSources.map((source, index) => (
                <Card key={index} shadow="sm" isPressable onPress={() => handleSourceClick(source)}>
                  <CardBody className="p-5">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium">{source.name}</h3>
                        <Chip color="primary" variant="flat">{source.count} компаний</Chip>
                      </div>
                      <p className="text-default-500 text-sm">{source.description}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Покрытие</span>
                          <span>{source.percentage.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          aria-label={`${source.percentage}% компаний`}
                          value={source.percentage} 
                          color="primary"
                          className="mb-3"
                        />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {source.uniqueColumns.map((column, idx) => (
                          <Chip key={idx} size="sm" variant="flat">
                            {column === 'parsingDate' ? 'Дата парсинга' :
                             column === 'cms' ? 'CMS' :
                             column === 'categories' ? 'Категории' :
                             column === 'branches' ? 'Филиалы' :
                             column === 'types' ? 'Типы' :
                             column === 'rating' ? 'Рейтинг' :
                             column === 'reviews' ? 'Отзывы' :
                             column === 'foundedYear' ? 'Год основания' :
                             column === 'investments' ? 'Инвестиции' :
                             column === 'founders' ? 'Основатели' :
                             column === 'services' ? 'Услуги' :
                             column === 'specialists' ? 'Специалисты' :
                             column === 'schedule' ? 'График работы' :
                             column === 'bookingUrl' ? 'URL для бронирования' :
                             column.charAt(0).toUpperCase() + column.slice(1)}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-end">
                    <Button 
                      color="primary" 
                      size="sm"
                      onClick={() => handleSourceClick(source)}
                    >
                      Просмотр компаний
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };
  
  // Render companies list view for a source
  const renderCompaniesView = () => {
    const filteredCompanies = getFilteredCompanies();
    const displayedCompanies = filteredCompanies.slice((page - 1) * 5, page * 5);
    
    return (
      <Card className="shadow-none border">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              isIconOnly 
              aria-label="Вернуться к списку источников" 
              size="sm" 
              variant="light"
              onClick={handleBackToSources}
            >
              <ArrowLeftIcon />
            </Button>
            <div>
              <h2 className="text-xl font-medium">
                {selectedSource?.name}
              </h2>
              <p className="text-small text-default-500">
                Источник данных
              </p>
            </div>
          </div>
          <Chip color="primary" variant="flat">
            {filteredCompanies.length} компаний
          </Chip>
        </CardHeader>
        <Divider />
        
        {/* Source details */}
        <div className="px-6 py-3">
          <p className="text-small">{selectedSource?.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-small font-medium">Уникальные поля:</span>
            {selectedSource?.uniqueColumns.map((column: string, idx: number) => (
              <Chip key={idx} size="sm" variant="flat">
                {column === 'parsingDate' ? 'Дата парсинга' :
                 column === 'cms' ? 'CMS' :
                 column === 'categories' ? 'Категории' :
                 column === 'branches' ? 'Филиалы' :
                 column === 'types' ? 'Типы' :
                 column === 'rating' ? 'Рейтинг' :
                 column === 'reviews' ? 'Отзывы' :
                 column === 'foundedYear' ? 'Год основания' :
                 column === 'investments' ? 'Инвестиции' :
                 column === 'founders' ? 'Основатели' :
                 column === 'services' ? 'Услуги' :
                 column === 'specialists' ? 'Специалисты' :
                 column === 'schedule' ? 'График работы' :
                 column === 'bookingUrl' ? 'URL для бронирования' :
                 column.charAt(0).toUpperCase() + column.slice(1)}
              </Chip>
            ))}
          </div>
        </div>
        
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <div className="max-w-md">
              <Input
                isClearable
                placeholder="Поиск компаний..."
                startContent={<SearchIcon className="text-default-400" />}
                value={search}
                onValueChange={setSearch}
                size="sm"
              />
            </div>
            <div className="flex gap-2">
              <Chip color="default" variant="flat">
                Показаны {displayedCompanies.length} из {filteredCompanies.length} компаний
              </Chip>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table 
              aria-label="Таблица компаний"
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
                {getColumns().map(column => (
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
        </CardBody>
        <CardFooter className="flex justify-between">
          <div className="text-small text-default-500">
            * Показаны демо-данные
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            onClick={handleBackToSources}
          >
            Вернуться к списку источников
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  // Main render
  return (
    <>
      {activeView === 'sources' ? (
        renderSourcesView()
      ) : (
        renderCompaniesView()
      )}
    </>
  );
}