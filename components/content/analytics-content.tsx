// components/analytics-content.tsx
"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/react";

// Demo data
const dataSourcesStats = {
  total: 1245,
  sources: [
    { name: 'Яндекс.Поиск', count: 875, percentage: 70.3 },
    { name: 'Яндекс.Справочник', count: 692, percentage: 55.6 },
    { name: '2GIS', count: 428, percentage: 34.4 },
    { name: 'Яндекс.Карты', count: 356, percentage: 28.6 },
    { name: 'RusBase', count: 124, percentage: 10.0 },
    { name: 'DIKIDI', count: 67, percentage: 5.4 },
    { name: 'YClients', count: 42, percentage: 3.4 }
  ]
};

const contactStats = {
  total: 1245,
  withEmail: 843,
  withWebsite: 976,
  withPhone: 1198,
  emailPercentage: 67.7,
  websitePercentage: 78.4,
  phonePercentage: 96.2
};

const socialStats = {
  total: 1245,
  networks: [
    { name: 'ВКонтакте', count: 756, percentage: 60.7 },
    { name: 'Instagram', count: 683, percentage: 54.9 },
    { name: 'Одноклассники', count: 421, percentage: 33.8 },
    { name: 'Facebook', count: 385, percentage: 30.9 },
    { name: 'YouTube', count: 274, percentage: 22.0 },
    { name: 'Rutube', count: 112, percentage: 9.0 },
    { name: 'Яндекс.Дзен', count: 89, percentage: 7.1 },
    { name: 'Twitter', count: 67, percentage: 5.4 }
  ]
};

const messengerStats = {
  total: 1245,
  messengers: [
    { name: 'WhatsApp', count: 856, percentage: 68.8 },
    { name: 'Telegram', count: 724, percentage: 58.2 },
    { name: 'Viber', count: 417, percentage: 33.5 }
  ]
};

export function AnalyticsContent() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dataSources: false,
    social: false,
    messengers: false,
    industries: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Card className="shadow-none border">
      <CardHeader>
        <h2 className="text-xl font-medium">Аналитические отчеты</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Tabs aria-label="Разделы аналитики" aria-label="Dynamic tabs">
          <Tab key="overview" title="Общая статистика">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="shadow-none border">
                <CardBody className="text-center p-6">
                  <h3 className="text-xl font-medium mb-1">Всего компаний</h3>
                  <p className="text-4xl font-bold text-primary">1,245</p>
                </CardBody>
              </Card>
              
              <Card className="shadow-none border">
                <CardBody className="text-center p-6">
                  <h3 className="text-xl font-medium mb-1">Регионов</h3>
                  <p className="text-4xl font-bold text-primary">53</p>
                </CardBody>
              </Card>
            </div>
            
            <div className="mt-8 text-center text-default-500">
              <p>* Примеры данных для демонстрации</p>
            </div>
          </Tab>
          
          <Tab key="sources" title="По источникам данных">
            <div className="space-y-6 mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Распределение компаний по источникам</h3>
                <Chip color="primary" variant="flat">Всего: {dataSourcesStats.total}</Chip>
              </div>
              
              <div className="space-y-4">
                {dataSourcesStats.sources.slice(0, expandedSections.dataSources ? undefined : 4).map((source, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">{source.name}</p>
                      <div className="flex items-center gap-2">
                        <Chip size="sm" variant="flat">{source.count} компаний</Chip>
                        <Chip size="sm" color="primary" variant="flat">{source.percentage.toFixed(1)}%</Chip>
                      </div>
                    </div>
                    <Progress 
                      aria-label={`${source.percentage}% компаний из источника ${source.name}`}
                      value={source.percentage} 
                      color="primary"
                      classNames={{
                        track: "border-default",
                        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label: "tracking-wider font-medium text-default-600",
                      }}
                    />
                  </div>
                ))}
                
                {dataSourcesStats.sources.length > 4 && (
                  <Button 
                    size="sm" 
                    variant="flat" 
                    color="primary" 
                    onClick={() => toggleSection('dataSources')}
                  >
                    {expandedSections.dataSources ? 'Свернуть' : 'Показать все источники'}
                  </Button>
                )}
              </div>
              
              <Divider className="my-4" />
              
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Компании с контактными данными</h3>
                <Chip color="primary" variant="flat">Всего: {contactStats.total}</Chip>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Email</p>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" variant="flat">{contactStats.withEmail} компаний</Chip>
                      <Chip size="sm" color="primary" variant="flat">{contactStats.emailPercentage.toFixed(1)}%</Chip>
                    </div>
                  </div>
                  <Progress 
                    aria-label={`${contactStats.emailPercentage}% компаний с Email`}
                    value={contactStats.emailPercentage} 
                    color="primary"
                    classNames={{
                      track: "border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                      label: "tracking-wider font-medium text-default-600",
                    }}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Веб-сайт</p>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" variant="flat">{contactStats.withWebsite} компаний</Chip>
                      <Chip size="sm" color="primary" variant="flat">{contactStats.websitePercentage.toFixed(1)}%</Chip>
                    </div>
                  </div>
                  <Progress 
                    aria-label={`${contactStats.websitePercentage}% компаний с веб-сайтом`}
                    value={contactStats.websitePercentage} 
                    color="primary"
                    classNames={{
                      track: "border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                      label: "tracking-wider font-medium text-default-600",
                    }}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium">Телефон</p>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" variant="flat">{contactStats.withPhone} компаний</Chip>
                      <Chip size="sm" color="primary" variant="flat">{contactStats.phonePercentage.toFixed(1)}%</Chip>
                    </div>
                  </div>
                  <Progress 
                    aria-label={`${contactStats.phonePercentage}% компаний с телефоном`}
                    value={contactStats.phonePercentage} 
                    color="primary"
                    classNames={{
                      track: "border-default",
                      indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                      label: "tracking-wider font-medium text-default-600",
                    }}
                  />
                </div>
              </div>
            </div>
          </Tab>
          
          <Tab key="social" title="По соцсетям и мессенджерам">
            <div className="space-y-6 mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Компании в социальных сетях</h3>
                <Chip color="primary" variant="flat">Всего: {socialStats.total}</Chip>
              </div>
              
              <div className="space-y-4">
                {socialStats.networks.slice(0, expandedSections.social ? undefined : 4).map((network, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">{network.name}</p>
                      <div className="flex items-center gap-2">
                        <Chip size="sm" variant="flat">{network.count} компаний</Chip>
                        <Chip size="sm" color="primary" variant="flat">{network.percentage.toFixed(1)}%</Chip>
                      </div>
                    </div>
                    <Progress 
                      aria-label={`${network.percentage}% компаний в ${network.name}`}
                      value={network.percentage} 
                      color="primary"
                      classNames={{
                        track: "border-default",
                        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label: "tracking-wider font-medium text-default-600",
                      }}
                    />
                  </div>
                ))}
                
                {socialStats.networks.length > 4 && (
                  <Button 
                    size="sm" 
                    variant="flat" 
                    color="primary" 
                    onClick={() => toggleSection('social')}
                  >
                    {expandedSections.social ? 'Свернуть' : 'Показать все социальные сети'}
                  </Button>
                )}
              </div>
              
              <Divider className="my-4" />
              
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Компании в мессенджерах</h3>
                <Chip color="primary" variant="flat">Всего: {messengerStats.total}</Chip>
              </div>
              
              <div className="space-y-4">
                {messengerStats.messengers.map((messenger, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">{messenger.name}</p>
                      <div className="flex items-center gap-2">
                        <Chip size="sm" variant="flat">{messenger.count} компаний</Chip>
                        <Chip size="sm" color="primary" variant="flat">{messenger.percentage.toFixed(1)}%</Chip>
                      </div>
                    </div>
                    <Progress 
                      aria-label={`${messenger.percentage}% компаний в ${messenger.name}`}
                      value={messenger.percentage} 
                      color="primary"
                      classNames={{
                        track: "border-default",
                        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label: "tracking-wider font-medium text-default-600",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          
          <Tab key="regions" title="По регионам">
            <div className="p-8 text-center">
              <p className="text-default-500">Здесь будет статистика по регионам</p>
              <p className="text-default-500">Раздел находится в разработке</p>
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}