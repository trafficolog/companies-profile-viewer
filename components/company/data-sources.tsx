// components/company/company-data-sources.tsx
import React from 'react';
import { Card } from "@heroui/react";

interface CompanyDataSourcesProps {
  dataSources?: Record<string, any>;
}

const CompanyDataSources: React.FC<CompanyDataSourcesProps> = ({ dataSources }) => {
  if (!dataSources || Object.keys(dataSources).filter(key => !!dataSources[key]).length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-default-500">Нет данных об источниках для этой компании</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">Источники данных о компании</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(dataSources).map(([key, value]) => {
          if (!value) return null;
          
          // Форматирование названия источника
          const sourceName = 
            key === 'yandexSearch' ? 'Яндекс.Поиск' :
            key === 'yandexDirectory' ? 'Яндекс.Справочник' :
            key === 'yandexMaps' ? 'Яндекс.Карты' :
            key === 'twoGis' ? '2GIS' :
            key === 'rusBase' ? 'RusBase' :
            key === 'dikidi' ? 'DIKIDI' :
            key === 'yclients' ? 'YClients' :
            key.charAt(0).toUpperCase() + key.slice(1);
          
          return (
            <Card shadow="none" className="border p-4" key={key}>
              <div>
                <h4 className="font-medium">{sourceName}</h4>
                <div className="text-sm text-default-500 mt-1">
                  Последнее обновление: {
                    typeof value === 'object' && value !== null && 'lastUpdated' in value
                      ? new Date((value as any).lastUpdated).toLocaleDateString()
                      : 'Неизвестно'
                  }
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyDataSources;