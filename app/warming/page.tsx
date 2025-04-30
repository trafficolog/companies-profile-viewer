// app/warming/page.tsx
"use client";

import { useState, useEffect } from "react";
import { title, subtitle } from "@/components/primitives";
import { WarmingContent } from "@/components/content/warming-content";
import { Button, Chip, Card, CardBody, CardHeader, Divider, Tooltip } from "@heroui/react";
import { InfoIcon, RefreshIcon } from "@/components/icons";

export default function WarmingPage() {
  // Status state for tracking operations
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Set the current time when the component mounts
  useEffect(() => {
    const now = new Date();
    setLastRefresh(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
  }, []);

  // Function to handle manual refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setApiStatus("Обновление данных...");
    
    // This is just for UI effect - simulate network delay
    setTimeout(() => {
      const now = new Date();
      setLastRefresh(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
      setApiStatus("Данные обновлены");
      setIsRefreshing(false);
      
      // Clear status message after 3 seconds
      setTimeout(() => setApiStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className={title({ size: "md" })}>Прогрев Email</h1>
          <p className={subtitle()}>
            Управление рассылками и прогревом email-адресов компаний
          </p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {lastRefresh && (
            <Tooltip content="Время последнего обновления данных">
              <Chip variant="flat" size="sm" startContent={<InfoIcon size={16} />}>
                Обновлено: {lastRefresh}
              </Chip>
            </Tooltip>
          )}
          
          {apiStatus && (
            <Chip color="warning" variant="flat">
              {apiStatus}
            </Chip>
          )}
          
          <Button
            color="primary"
            variant="flat"
            size="sm"
            startContent={<RefreshIcon />}
            onClick={handleRefresh}
            isLoading={isRefreshing}
          >
            Обновить
          </Button>
        </div>
      </div>
      
      <Card className="shadow-none border mb-4">
        <CardHeader>
          <h2 className="text-lg font-medium">О модуле прогрева Email</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-2">
            <p>
              Этот модуль позволяет автоматизировать процесс 'прогрева' email-адресов компаний с помощью
              искусственного интеллекта. Процесс работы:
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Выполните анализ компании, чтобы получить подробное описание её деятельности</li>
              <li>На основе анализа, сгенерируйте шаблоны писем для различных сценариев коммуникации</li>
              <li>Отправьте письмо, чтобы начать процесс прогрева</li>
              <li>Управляйте статусом прогрева и отслеживайте результаты</li>
            </ol>
          </div>
        </CardBody>
      </Card>
      
      <WarmingContent />
    </div>
  );
}