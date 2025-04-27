'use client';

import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnDef
} from '@tanstack/react-table';
import { NormalizedCompany } from '@/types/company';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from '@heroui/table';
import { Link } from '@heroui/link';
import { SortAscIcon, SortDescIcon } from '@/components/icons';

interface CompanyTableProps {
  data: NormalizedCompany[];
  sorting: SortingState;
  onSortingChange: (sorting: SortingState) => void;
}

export default function CompanyTable({ data, sorting, onSortingChange }: CompanyTableProps) {
  // Определение колонок таблицы с правильным типом ColumnDef
  const columns = React.useMemo<ColumnDef<NormalizedCompany>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Название',
        cell: (info) => info.getValue() || '—'
      },
      {
        accessorKey: 'legalStatus',
        header: 'ОПФ',
        cell: (info) => {
          const status = info.getValue() as string;
          const statusMap: Record<string, string> = {
            company: 'Компания',
            individual_entrepreneur: 'ИП',
            self_employed: 'Самозанятый',
            individual: 'Физлицо',
            unknown: 'Не указано'
          };
          return statusMap[status] || status;
        }
      },
      {
        accessorKey: 'priceTier',
        header: 'Ценовой уровень',
        cell: (info) => {
          const tier = info.getValue() as string;
          const tierMap: Record<string, string> = {
            premium: 'Премиум',
            'mid-range': 'Средний',
            budget: 'Бюджетный',
            unknown: 'Не определен'
          };
          return tierMap[tier] || tier;
        }
      },
      {
        accessorKey: 'branchesCount',
        header: 'Филиалы',
        cell: (info) => info.getValue() ?? '—'
      },
      {
        accessorKey: 'industry',
        header: 'Отрасль',
        cell: (info) => {
          const industry = info.getValue() as { displayName: string } | undefined;
          return industry?.displayName || 'Не указана';
        }
      },
      {
        accessorKey: 'website',
        header: 'Сайт',
        cell: (info) => {
          const website = info.getValue() as string | undefined;
          return website ? (
            <Link
              isExternal
              href={website.startsWith('http') ? website : `https://${website}`}
              showAnchorIcon
              color="primary"
            >
              {website}
            </Link>
          ) : '—';
        }
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => {
          const email = info.getValue() as string | undefined;
          return email ? (
            <Link href={`mailto:${email}`} color="primary">
              {email}
            </Link>
          ) : '—';
        }
      },
      {
        accessorKey: 'phone',
        header: 'Телефон',
        cell: (info) => info.getValue() as string || '—'
      }
    ],
    []
  );

  // Инициализация таблицы
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (
    <Table aria-label="Таблица компаний">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableColumn
                key={header.id}
                allowsSorting
                onClick={header.column.getToggleSortingHandler()}
              >
                <div className="flex items-center gap-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: <SortAscIcon className="text-primary" />,
                    desc: <SortDescIcon className="text-primary" />
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </TableColumn>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
