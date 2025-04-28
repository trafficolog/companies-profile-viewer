'use client';

import React, { useState } from 'react';
import { Button } from "@heroui/react";
import { NormalizedCompany } from '@/types/company';
import { COMPANY_COLUMNS } from '@/components/company-table';
import { CompanyService } from '@/lib/services/company-service';

interface CSVExporterProps {
  fetchAllData: () => Promise<NormalizedCompany[]>;
  visibleColumns: string[];
}

export default function CSVExporter({ fetchAllData, visibleColumns }: CSVExporterProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Функция для получения значения из вложенного объекта по строке с точечной нотацией
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  };
  
  // Преобразование значения ячейки в строку для CSV
  const formatCellValue = (item: NormalizedCompany, columnKey: string): string => {
    // Обработка вложенных свойств
    if (columnKey.includes('.')) {
      const value = getNestedValue(item, columnKey);
      return value ? String(value) : '';
    }
    
    const key = columnKey as keyof NormalizedCompany;
    
    switch(key) {
      case 'name':
      case 'address':
      case 'phone':
        return item[key] || '';
        
      case 'legalStatus':
        return CompanyService.formatLegalStatus(item.legalStatus);
        
      case 'priceTier':
        return CompanyService.formatPriceTier(item.priceTier);
        
      case 'branchesCount':
      case 'foundedYear':
      case 'employeesCount':
        return item[key] !== undefined ? String(item[key]) : '';
        
      case 'website':
      case 'email':
        return item[key] || '';
        
      case 'industry':
        return item.industry?.displayName || '';
        
      default:
        if (typeof item[key] === 'string') {
          return item[key] as string;
        }
        if (typeof item[key] === 'number') {
          return String(item[key]);
        }
        return '';
    }
  };
  
  // Экранирование значений для CSV
  const escapeCSV = (value: string): string => {
    // Если значение содержит запятую, двойные кавычки или перенос строки, заключаем его в кавычки
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      // Экранируем двойные кавычки
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };
  
  // Обработчик экспорта в CSV
  const handleExport = async () => {
    try {
      setIsLoading(true);
      
      // Получаем все данные (без пагинации)
      const allData = await fetchAllData();
      
      // Получаем только видимые колонки в нужном порядке
      const columns = COMPANY_COLUMNS.filter(col => visibleColumns.includes(col.uid));
      
      // Создаем заголовок CSV
      const headers = columns.map(col => escapeCSV(col.name));
      const headerRow = headers.join(',');
      
      // Создаем строки данных
      const rows = allData.map(item => {
        return columns
          .map(col => escapeCSV(formatCellValue(item, col.uid)))
          .join(',');
      });
      
      // Объединяем все в один CSV-файл
      const csvContent = [headerRow, ...rows].join('\n');
      
      // Создаем Blob и ссылку для скачивания
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      // Создаем ссылку для скачивания
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `companies_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      
      // Имитируем клик по ссылке для начала скачивания
      link.click();
      
      // Очищаем ресурсы
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Произошла ошибка при экспорте данных');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      color="primary"
      size="sm"
      variant="flat"
      isLoading={isLoading}
      onClick={handleExport}
    >
      Экспорт в CSV
    </Button>
  );
}