'use client';

import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection
} from "@heroui/react";
import type { SortDescriptor } from "@heroui/react";
import { COMPANY_COLUMNS } from '@/components/company-table';

import { ChangeIcon, SortIcon } from '@/components/icons';

interface SortControlProps {
  sorting: SortDescriptor;
  onSortChange: (sorting: SortDescriptor) => void;
}

export function SortControl({ sorting, onSortChange }: SortControlProps) {
  // Получаем только сортируемые колонки
  const sortableColumns = COMPANY_COLUMNS.filter(column => column.sortable);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="bg-default-100 text-default-800"
          size="sm"
          variant="flat"
          startContent={<SortIcon />}
        >
          Сортировка {sorting.column && `(${COMPANY_COLUMNS.find(col => col.uid === sorting.column)?.name})`}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Сортировка" items={sortableColumns}>
        {(column) => (
          <DropdownItem
            key={column.uid}
            startContent={
              sorting.column === column.uid ? (
                <span className="text-primary">•</span>
              ) : null
            }
            onPress={() => {
              const isCurrentColumn = sorting.column === column.uid;
              onSortChange({
                column: column.uid,
                direction: isCurrentColumn && sorting.direction === "ascending"
                  ? "descending"
                  : "ascending"
              });
            }}
          >
            {column.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

interface ColumnsControlProps {
  visibleColumns: string[];
  onVisibleColumnsChange: (columns: string[]) => void;
}

export function ColumnsControl({ visibleColumns, onVisibleColumnsChange }: ColumnsControlProps) {
  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      onVisibleColumnsChange(COMPANY_COLUMNS.map(col => col.uid));
    } else {
      const selectedKeys = Array.from(keys) as string[];
      if (selectedKeys.length > 0) {
        onVisibleColumnsChange(selectedKeys);
      }
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="bg-default-100 text-default-800"
          size="sm"
          variant="flat"
          startContent={<ChangeIcon />}
        >
          Колонки
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Выбор колонок" 
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={new Set(visibleColumns)}
        onSelectionChange={handleSelectionChange}
        items={COMPANY_COLUMNS}
      >
        {(column) => (
          <DropdownItem key={column.uid}>
            {column.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}