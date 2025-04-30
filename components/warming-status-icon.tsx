// components/warming-status-icon.tsx
import React from "react";
import { Tooltip } from "@heroui/tooltip";

export type WarmingStatus = "active" | "waiting" | "stopped";

interface WarmingStatusIconProps {
  status: WarmingStatus;
  size?: number;
}

export default function WarmingStatusIcon({ status, size = 16 }: WarmingStatusIconProps) {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-success-500";
      case "waiting":
        return "bg-warning-500";
      case "stopped":
        return "bg-danger-500";
      default:
        return "bg-default-300";
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case "active":
        return "Активен";
      case "waiting":
        return "Ожидание";
      case "stopped":
        return "Остановлен";
      default:
        return "Неизвестно";
    }
  };
  
  return (
    <Tooltip content={getStatusText()}>
      <div 
        className={`rounded-full ${getStatusColor()}`} 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          boxShadow: `0 0 ${Math.floor(size/3)}px ${Math.floor(size/6)}px ${status === 'active' ? 'rgba(75, 216, 100, 0.5)' : 
                                                              status === 'waiting' ? 'rgba(240, 173, 78, 0.5)' : 
                                                              'rgba(255, 77, 79, 0.5)'}`
        }}
      />
    </Tooltip>
  );
}