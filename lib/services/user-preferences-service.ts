// lib/services/user-preferences-service.ts
import type { SortDescriptor } from "@heroui/react";
import { CompanyFilters } from "@/components/company-filters";

const STORAGE_KEY = 'company_table_preferences';

interface TablePreferences {
  visibleColumns: string[];
  sorting: SortDescriptor;
  filters: CompanyFilters;
}

export class UserPreferencesService {
  /**
   * Сохраняет настройки таблицы в localStorage
   */
  static saveTablePreferences(preferences: TablePreferences): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      }
    } catch (error) {
      console.error('Error saving table preferences:', error);
    }
  }

  /**
   * Загружает настройки таблицы из localStorage
   */
  static loadTablePreferences(): TablePreferences | null {
    try {
      if (typeof window !== 'undefined') {
        const preferencesString = localStorage.getItem(STORAGE_KEY);
        
        if (preferencesString) {
          return JSON.parse(preferencesString) as TablePreferences;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error loading table preferences:', error);
      return null;
    }
  }

  /**
   * Обновляет только часть настроек
   */
  static updateTablePreferences(partialPreferences: Partial<TablePreferences>): void {
    try {
      if (typeof window !== 'undefined') {
        const currentPreferences = this.loadTablePreferences() || {
          visibleColumns: [],
          sorting: { column: "name", direction: "ascending" },
          filters: { priceTier: 'all', hasEmail: false }
        };
        
        const updatedPreferences = {
          ...currentPreferences,
          ...partialPreferences
        };
        
        this.saveTablePreferences(updatedPreferences);
      }
    } catch (error) {
      console.error('Error updating table preferences:', error);
    }
  }

  /**
   * Сбрасывает настройки таблицы
   */
  static resetTablePreferences(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error resetting table preferences:', error);
    }
  }
}