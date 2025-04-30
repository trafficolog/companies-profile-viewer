"use client";

import { useState, useEffect, useRef } from "react";
import { title, subtitle } from "@/components/primitives";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import CompanyTable, { DEFAULT_VISIBLE_COLUMNS } from "@/components/company-table";
import CompanyFilters, { CompanyFilters as CompanyFiltersType } from "@/components/company-filters";
import { SortControl, ColumnsControl } from "@/components/table-controls";
import CSVExporter from "@/components/csv-exporter";
import { companyProfileApi } from "@/lib/api";
import { normalizeCompanies } from "@/lib/normalizers";
import { NormalizedCompany } from "@/types/company";
import { UserPreferencesService } from "@/lib/services/user-preferences-service";
import { SearchIcon } from "@/components/icons";
import type { SortDescriptor } from "@heroui/react";

export default function CompaniesPage() {
  // Состояние для данных компаний
  const [companies, setCompanies] = useState<NormalizedCompany[]>([]);
  
  // Состояние для пагинации
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Состояние для UI и управления
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  
  // Состояние для фильтрации и сортировки
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<CompanyFiltersType>({
    priceTier: 'all',
    hasEmail: false
  });
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending"
  });
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);
  
  // Отслеживание изменений для отладки
  const searchRef = useRef(search);
  const filtersRef = useRef(filters);

  // Загрузка сохраненных настроек при первом рендере
  useEffect(() => {
    try {
      const savedPreferences = UserPreferencesService.loadTablePreferences();
      
      if (savedPreferences) {
        if (savedPreferences.visibleColumns) {
          setVisibleColumns(savedPreferences.visibleColumns);
        }
        
        if (savedPreferences.sorting) {
          setSortDescriptor(savedPreferences.sorting);
        }
        
        if (savedPreferences.filters) {
          setFilters(savedPreferences.filters);
        }
      }
    } catch (error) {
      console.error('Error loading saved preferences:', error);
    } finally {
      setPreferencesLoaded(true);
    }
  }, []);

  // Сохранение настроек при их изменении
  useEffect(() => {
    // Пропускаем первый рендер, когда настройки еще не загружены
    if (!preferencesLoaded) return;
    
    try {
      UserPreferencesService.saveTablePreferences({
        visibleColumns,
        sorting: sortDescriptor,
        filters
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }, [visibleColumns, sortDescriptor, filters, preferencesLoaded]);

  // Основной эффект для загрузки данных
  useEffect(() => {
    // Не загружаем данные, если настройки еще не инициализированы
    if (!preferencesLoaded) return;
    
    // Устанавливаем значения для отладки
    if (search !== searchRef.current) {
      console.log(`Search changed from "${searchRef.current}" to "${search}"`);
      searchRef.current = search;
    }
    
    if (filters !== filtersRef.current) {
      console.log('Filters changed:', filters);
      filtersRef.current = filters;
    }
    
    // Функция загрузки данных
    const loadCompanies = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Преобразуем формат сортировки для API
        const sortBy = sortDescriptor.column 
          ? `${sortDescriptor.column}:${sortDescriptor.direction === 'ascending' ? 'asc' : 'desc'}` 
          : 'name:asc';
        
        // Установка фильтров для API
        const apiFilters: Record<string, any> = {};
        
        // Фильтр по имени (поиск) - с обработкой кириллицы
        if (search && search.trim()) {
          // Формируем фильтр по имени с учетом возможной кириллицы
          apiFilters.name = { $containsi: search.trim() };
          
          // Отладочная информация
          console.log(`Searching for: "${search.trim()}"`);
          setDebugInfo(`Поиск: "${search.trim()}"`);
        }
        
        // Фильтр по ценовому уровню
        if (filters.priceTier !== 'all') {
          apiFilters.priceTier = filters.priceTier;
        }
        
        // Консоль для отладки
        console.log('API Request:', {
          page,
          pageSize,
          sort: sortBy,
          filters: apiFilters
        });
        
        // Запрос данных с обработкой ошибок
        const result = await companyProfileApi.find({
          page,
          pageSize,
          sort: sortBy,
          filters: apiFilters,
          populate: ['industry', 'location', 'social'],
        });
        
        console.log('API Response:', result);
        
        // Нормализация данных
        let normalizedCompanies = normalizeCompanies(result.data);
        
        // Клиентская фильтрация для сложных фильтров
        if (filters.hasEmail) {
          normalizedCompanies = normalizedCompanies.filter(company => 
            !!company.email && company.email.trim() !== ''
          );
        }
        
        setCompanies(normalizedCompanies);
        setTotalPages(result.meta.pagination.pageCount || 1);
        setTotalItems(result.meta.pagination.total || 0);
      } catch (err) {
        console.error("Error loading companies:", err);
        setError(`Не удалось загрузить список компаний: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`);
        setCompanies([]);
        setTotalPages(0);
        setTotalItems(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Выполняем загрузку данных
    loadCompanies();
  }, [page, pageSize, search, filters, sortDescriptor, preferencesLoaded]);

  // Функция для загрузки всех данных для экспорта в CSV
  const fetchAllDataForExport = async () => {
    try {
      // Преобразуем формат сортировки для API
      const sortBy = sortDescriptor.column 
        ? `${sortDescriptor.column}:${sortDescriptor.direction === 'ascending' ? 'asc' : 'desc'}` 
        : 'name:asc';
      
      // Установка фильтров для API
      const apiFilters: Record<string, any> = {};
      
      // Фильтр по имени (поиск)
      if (search.trim()) {
        apiFilters.name = { $containsi: search.trim() };
      }
      
      // Фильтр по ценовому уровню
      if (filters.priceTier !== 'all') {
        apiFilters.priceTier = filters.priceTier;
      }
      
      // Запрос данных без пагинации (с большим лимитом)
      const result = await companyProfileApi.find({
        page: 1,
        pageSize: 25, // Большое значение для получения всех данных
        sort: sortBy,
        filters: apiFilters,
        populate: ['industry', 'location', 'social'],
      });
      
      // Нормализация данных
      let normalizedCompanies = normalizeCompanies(result.data);
      
      // Клиентская фильтрация для сложных фильтров
      if (filters.hasEmail) {
        normalizedCompanies = normalizedCompanies.filter(company => 
          !!company.email && company.email.trim() !== ''
        );
      }
      
      return normalizedCompanies;
    } catch (err) {
      console.error("Error fetching all data for export:", err);
      throw err;
    }
  };

  // Обработчики событий
  const handleSortChange = (updatedSort: SortDescriptor) => {
    setSortDescriptor(updatedSort);
  };

  const handleSearchChange = (value: string) => {
    console.log(`Search input changed to: "${value}"`);
    setSearch(value);
    setPage(1);
  };

  const handleFiltersChange = (newFilters: CompanyFiltersType) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleVisibleColumnsChange = (columns: string[]) => {
    setVisibleColumns(columns);
  };

  // Сброс всех настроек к значениям по умолчанию
  const handleResetPreferences = () => {
    UserPreferencesService.resetTablePreferences();
    setVisibleColumns(DEFAULT_VISIBLE_COLUMNS);
    setSortDescriptor({ column: "name", direction: "ascending" });
    setFilters({ priceTier: 'all', hasEmail: false });
    setSearch("");
    setPage(1);
    setDebugInfo('Настройки сброшены');
  };

  // Принудительная перезагрузка данных
  const handleForceRefresh = () => {
    console.log('Force refreshing data...');
    setDebugInfo('Принудительная перезагрузка данных...');
    
    // Небольшой хак для принудительной перезагрузки
    const currentPage = page;
    setPage(0);
    setTimeout(() => {
      setPage(currentPage);
    }, 100);
  };

  return (
      <div className="space-y-6 w-full">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h1 className={title({ size: "md" })}>Компании</h1>
            <p className={subtitle()}>
              База данных компаний из различных публичных источников
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm" 
              variant="flat" 
              color="default"
              onClick={handleResetPreferences}
            >
              Сбросить настройки
            </Button>
            <Button
              size="sm" 
              variant="flat" 
              color="secondary"
              onClick={handleForceRefresh}
            >
              Обновить данные
            </Button>
            <CSVExporter 
              fetchAllData={fetchAllDataForExport}
              visibleColumns={visibleColumns}
            />
          </div>
        </div>
        
        <Card className="shadow-none border">
          <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full">
              <Input
                classNames={{
                  base: "w-full sm:max-w-[300px]",
                  inputWrapper: "h-10",
                }}
                placeholder="Поиск по названию компании..."
                size="sm"
                startContent={<SearchIcon className="text-default-300" />}
                type="search"
                value={search}
                onValueChange={handleSearchChange}
              />
              <div className="flex flex-wrap gap-2">
                <CompanyFilters 
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
                <SortControl 
                  sorting={sortDescriptor}
                  onSortChange={handleSortChange}
                />
                <ColumnsControl
                  visibleColumns={visibleColumns}
                  onVisibleColumnsChange={handleVisibleColumnsChange}
                />
              </div>
            </div>
            <div className="ml-auto flex gap-2 items-center">
              {debugInfo && (
                <Chip color="warning" variant="flat">
                  {debugInfo}
                </Chip>
              )}
              <Chip color="secondary" variant="flat">
                Найдено: {isLoading ? "..." : totalItems}
              </Chip>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
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
                Нет данных, соответствующих заданным параметрам
              </div>  
            ) : (
              <div className="overflow-x-auto">
                <CompanyTable 
                  data={companies} 
                  sorting={sortDescriptor} 
                  onSortingChange={handleSortChange}
                  visibleColumns={visibleColumns}
                />
              </div>
            )}
          </CardBody>
          {totalPages > 1 && (
            <>
              <Divider />
              <CardFooter className="flex justify-center">
              <Pagination
                total={totalPages}
                initialPage={page}
                page={page}
                onChange={(newPage) => setPage(newPage)}
                showControls
              />
              </CardFooter>
            </>
          )}
        </Card>
      </div>
  );
}