'use client';

import React, { useMemo, useCallback } from 'react';
import type { SortDescriptor } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Link } from '@heroui/link';
import { SortAscIcon, SortDescIcon } from '@/components/icons';
import { CompanyService } from '@/lib/services/company-service';
import { NormalizedCompany } from '@/types/company';

// Определение колонок и их видимости по умолчанию
export const COMPANY_COLUMNS = [
  { 
    uid: "name", 
    name: "Название",
    sortable: true,
    defaultVisible: true
  },
  { 
    uid: "legalStatus", 
    name: "ОПФ",
    sortable: true,
    defaultVisible: true
  },
  { 
    uid: "priceTier", 
    name: "Ценовой уровень",
    sortable: true,
    defaultVisible: true
  },
  { 
    uid: "branchesCount", 
    name: "Филиалы",
    sortable: true,
    defaultVisible: true
  },
  { 
    uid: "industry", 
    name: "Отрасль",
    sortable: true,
    defaultVisible: true
  },
  { 
    uid: "website", 
    name: "Сайт",
    sortable: false,
    defaultVisible: true
  },
  { 
    uid: "email", 
    name: "Email",
    sortable: false,
    defaultVisible: true 
  },
  { 
    uid: "phone", 
    name: "Телефон",
    sortable: false,
    defaultVisible: true
  },
  {
    uid: "address",
    name: "Адрес",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "foundedYear",
    name: "Год основания",
    sortable: true,
    defaultVisible: false
  },
  {
    uid: "employeesCount",
    name: "Кол-во сотрудников",
    sortable: true,
    defaultVisible: false
  },
  // Социальные сети
  {
    uid: "social.telegram",
    name: "Telegram",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.whatsapp",
    name: "WhatsApp",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.viber",
    name: "Viber",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.vkontakte",
    name: "VK",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.odnoklassniki",
    name: "OK",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.instagram",
    name: "Instagram",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.facebook",
    name: "Facebook",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.rutube",
    name: "Rutube",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.yandexZen",
    name: "Яндекс Дзен",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.youtube",
    name: "YouTube",
    sortable: false,
    defaultVisible: false
  },
  {
    uid: "social.twitter",
    name: "Twitter",
    sortable: false,
    defaultVisible: false
  }
];

// Получение массива идентификаторов колонок, видимых по умолчанию
export const DEFAULT_VISIBLE_COLUMNS = COMPANY_COLUMNS
  .filter(column => column.defaultVisible)
  .map(column => column.uid);

interface CompanyTableProps {
  data: NormalizedCompany[];
  sorting: SortDescriptor;
  onSortingChange: (descriptor: SortDescriptor) => void;
  visibleColumns: string[];
}

export default function CompanyTable({ 
  data, 
  sorting, 
  onSortingChange,
  visibleColumns 
}: CompanyTableProps) {
  // Отфильтрованные колонки на основе выбранных видимых колонок
  const filteredColumns = useMemo(() => {
    return COMPANY_COLUMNS.filter(column => visibleColumns.includes(column.uid));
  }, [visibleColumns]);

  // Функция для получения значения из вложенного объекта по строке с точечной нотацией
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : undefined;
    }, obj);
  };

  // Сортировка элементов
  const sortedItems = useMemo(() => {
    return [...data].sort((a: NormalizedCompany, b: NormalizedCompany) => {
      const column = sorting.column as string;
      
      if (!column) return 0;

      // Получаем значения для сравнения, учитывая вложенные свойства
      let first = getNestedValue(a, column);
      let second = getNestedValue(b, column);

      // Обработка специальных случаев
      if (column === 'industry') {
        first = a.industry?.displayName || '';
        second = b.industry?.displayName || '';
      }

      // Сравнение значений
      if (typeof first === 'string' && typeof second === 'string') {
        const cmp = first.localeCompare(second);
        return sorting.direction === "descending" ? -cmp : cmp;
      } else if (typeof first === 'number' && typeof second === 'number') {
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sorting.direction === "descending" ? -cmp : cmp;
      }

      return 0;
    });
  }, [data, sorting]);

  // Функция для рендеринга ячеек
  const renderCell = (item: NormalizedCompany, columnKey: React.Key) => {
    // Обработка вложенных ключей (например, social.telegram)
    if (typeof columnKey === 'string' && columnKey.includes('.')) {
      const value = getNestedValue(item, columnKey);
      
      // Обработка социальных сетей
      if (columnKey.startsWith('social.')) {
        const socialName = columnKey.split('.')[1];
        
        // Формирование ссылок для различных социальных сетей
        if (value) {
          let href = value;
          let showIcon = true;
          
          // Форматирование ссылок для социальных сетей
          switch (socialName) {
            case 'telegram':
              href = value.startsWith('https://t.me/') ? value : `https://t.me/${value.replace('@', '')}`;
              break;
            case 'whatsapp':
              href = value.startsWith('https://wa.me/') ? value : `https://wa.me/${value.replace(/[^0-9]/g, '')}`;
              break;
            case 'viber':
              href = value.startsWith('viber://') ? value : `viber://chat?number=${value.replace(/[^0-9]/g, '')}`;
              break;
            case 'vkontakte':
              href = value.startsWith('https://vk.com/') ? value : `https://vk.com/${value}`;
              break;
            case 'odnoklassniki':
              href = value.startsWith('https://ok.ru/') ? value : `https://ok.ru/${value}`;
              break;
            case 'instagram':
              href = value.startsWith('https://instagram.com/') ? value : `https://instagram.com/${value.replace('@', '')}`;
              break;
            case 'facebook':
              href = value.startsWith('https://facebook.com/') ? value : `https://facebook.com/${value}`;
              break;
            case 'rutube':
              href = value.startsWith('https://rutube.ru/') ? value : `https://rutube.ru/channel/${value}`;
              break;
            case 'yandexZen':
              href = value.startsWith('https://zen.yandex.ru/') ? value : `https://zen.yandex.ru/${value}`;
              break;
            case 'youtube':
              href = value.startsWith('https://youtube.com/') ? value : `https://youtube.com/${value}`;
              break;
            case 'twitter':
              href = value.startsWith('https://twitter.com/') ? value : `https://twitter.com/${value.replace('@', '')}`;
              break;
            default:
              showIcon = false;
          }
          
          return (
            <Link
              isExternal
              href={href}
              showAnchorIcon={showIcon}
              color="primary"
              className="text-xs"
            >
              {value}
            </Link>
          );
        }
        return '—';
      }
      
      return value || '—';
    }
    
    // Обработка обычных ключей
    const key = columnKey as keyof NormalizedCompany;
    
    switch(key) {
      case 'name':
        return item.name || '—';
      
      case 'legalStatus':
        return CompanyService.formatLegalStatus(item.legalStatus);
      
      case 'priceTier':
        return CompanyService.formatPriceTier(item.priceTier);
      
      case 'branchesCount':
        return item.branchesCount ?? '—';
      
      case 'industry':
        return item.industry?.displayName || 'Не указана';
      
      case 'website':
        return item.website ? (
          <Link
            isExternal
            href={CompanyService.formatWebsiteUrl(item.website)}
            showAnchorIcon
            color="primary"
            className="text-xs"
          >
            {item.website}
          </Link>
        ) : '—';
      
      case 'email':
        return item.email ? (
          <Link href={`mailto:${item.email}`} color="primary" className="text-xs">
            {item.email}
          </Link>
        ) : '—';
      
      case 'phone':
        return item.phone || '—';
      
      case 'address':
        return item.address || '—';
      
      case 'foundedYear':
        return item.foundedYear ? String(item.foundedYear) : '—';
      
      case 'employeesCount':
        return item.employeesCount ? String(item.employeesCount) : '—';
      
      default:
        return null;
    }
  };

  // Обработчик сортировки
  const handleSortChange = useCallback((descriptor: SortDescriptor) => {
    onSortingChange(descriptor);
  }, [onSortingChange]);

  return (
    <div className="overflow-x-auto max-w-full">
      <Table 
        aria-label="Таблица компаний"
        sortDescriptor={sorting}
        onSortChange={handleSortChange}
        classNames={{
          th: "text-xs py-2",        // Уменьшенный шрифт для заголовков
          td: "text-xs py-2",        // Уменьшенный шрифт для ячеек
          table: "min-w-full",       // Таблица занимает всю доступную ширину
          wrapper: "max-w-full",     // Обертка занимает всю доступную ширину
        }}
      >
        <TableHeader columns={filteredColumns}>
          {(column) => (
            <TableColumn 
              key={column.uid} 
              allowsSorting={column.sortable}
              className="px-2"  // Уменьшаем горизонтальные отступы
            >
              <div className="flex items-center gap-1 text-xs">
                {column.name}
                {column.uid === sorting.column && (
                  sorting.direction === "ascending" ? 
                  <SortAscIcon className="text-primary w-3 h-3" /> : 
                  <SortDescIcon className="text-primary w-3 h-3" />
                )}
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          emptyContent="Нет данных для отображения" 
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id} className="hover:bg-default-50">
              {(columnKey) => (
                <TableCell className="px-2 whitespace-nowrap"> {/* Уменьшаем отступы и запрещаем перенос */}
                  <div className="text-xs">
                    {renderCell(item, columnKey)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}