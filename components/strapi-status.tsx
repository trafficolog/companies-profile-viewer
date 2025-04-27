// src/components/strapi-status.tsx
"use client";

import { useEffect, useState } from 'react';
import { checkStrapiStatus } from '@/lib/api';
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { CheckCircleIcon, ExclamationCircleIcon, CubesLinearIcon } from "@/components/icons";

export function StrapiStatus() {
  const [status, setStatus] = useState<'ok' | 'error' | 'loading'>('loading');

  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      const result = await checkStrapiStatus();
      if (isMounted) setStatus(result);
    };
    
    checkStatus();
    
    // Проверяем статус каждые 30 секунд
    const interval = setInterval(checkStatus, 30000);
    
    return () => { 
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getStatusConfig = () => {
    switch(status) {
      case 'ok':
        return {
          label: 'Агрегатор профилей: онлайн',
          color: 'success',
          icon: <CheckCircleIcon />
        };
      case 'error':
        return {
          label: 'Агрегатор профилей: нет соединения',
          color: 'danger',
          icon: <ExclamationCircleIcon />
        };
      default:
        return {
          label: 'Агрегатор профилей: проверка...',
          color: 'default',
          icon: <CubesLinearIcon />
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Tooltip content="Статус подключения к Strapi API">
      <Chip
        startContent={config.icon}
        variant="flat"
        color={config.color as any}
        size="sm"
      >
        {config.label}
      </Chip>
    </Tooltip>
  );
}