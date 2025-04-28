'use client';

import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  RadioGroup,
  Radio,
  Button,
  Checkbox
} from "@heroui/react";
import { FilterIcon } from '@/components/icons';

export interface CompanyFilters {
  priceTier: string;
  hasEmail: boolean;
}

interface CompanyFiltersProps {
  filters: CompanyFilters;
  onFiltersChange: (filters: CompanyFilters) => void;
}

export default function CompanyFilters({ filters, onFiltersChange }: CompanyFiltersProps) {
  const handlePriceTierChange = (value: string) => {
    onFiltersChange({
      ...filters,
      priceTier: value
    });
  };

  const handleHasEmailChange = (isChecked: boolean) => {
    onFiltersChange({
      ...filters,
      hasEmail: isChecked
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      priceTier: 'all',
      hasEmail: false
    });
  };

  const isFiltersApplied = filters.priceTier !== 'all' || filters.hasEmail;

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          color={isFiltersApplied ? "primary" : "default"}
          startContent={<FilterIcon />}
          size="sm"
          variant={isFiltersApplied ? "flat" : "flat"}
        >
          Фильтры {isFiltersApplied && '(активны)'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex w-full flex-col gap-6 px-2 py-4">
          <RadioGroup
            label="Ценовой уровень"
            value={filters.priceTier}
            onValueChange={handlePriceTierChange}
          >
            <Radio value="all">Все</Radio>
            <Radio value="premium">Премиум</Radio>
            <Radio value="mid-range">Средний</Radio>
            <Radio value="budget">Бюджетный</Radio>
            <Radio value="unknown">Не определен</Radio>
          </RadioGroup>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Контактные данные</span>
            <Checkbox 
              isSelected={filters.hasEmail}
              onValueChange={handleHasEmailChange}
            >
              Имеют email
            </Checkbox>
          </div>

          <div className="flex justify-end">
            <Button 
              size="sm" 
              variant="flat" 
              color="danger"
              onClick={resetFilters}
              isDisabled={!isFiltersApplied}
            >
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}