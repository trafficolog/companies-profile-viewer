// components/sidebar-items.tsx
"use client";

import { SidebarItem } from "./optimized-sidebar";
import { 
  HomeIcon,
  CompaniesIcon, 
  WarmingIcon, 
  SourcesIcon, 
  AnalyticsIcon, 
  DocsIcon,
  SettingsIcon,
  HelpIcon 
} from "@/components/icons";
import { siteConfig } from "@/config/site";

// Карта иконок для пунктов меню
const iconMap: Record<string, JSX.Element> = {
  "Главная": <HomeIcon size={20} />,
  "Компании": <CompaniesIcon size={20} />,
  "Прогрев": <WarmingIcon size={20} />,
  "Источники данных": <SourcesIcon size={20} />,
  "Аналитика": <AnalyticsIcon size={20} />,
  "Документация": <DocsIcon size={20} />,
  "Настройки": <SettingsIcon size={20} />,
  "Помощь": <HelpIcon size={20} />
};

// Формируем основные пункты меню из siteConfig.navItems
// Добавляем пункт "Прогрев" после "Компании"
const mainMenuItems: SidebarItem[] = siteConfig.navItems
  .filter(item => item.label !== "Главная") // Удаляем пункт "Главная", если нужно
  .reduce((acc: SidebarItem[], item, index, arr) => {
    // Добавляем текущий пункт
    acc.push({
      key: item.href.replace("/", ""),
      title: item.label,
      href: item.href,
      startContent: iconMap[item.label]
    });
    
    // Если текущий пункт - "Компании", добавляем после него "Прогрев"
    if (item.label === "Компании") {
      acc.push({
        key: "warming",
        title: "Прогрев",
        href: "/warming",
        startContent: iconMap["Прогрев"]
      });
    }
    
    return acc;
  }, []);

// Добавляем пункт "Главная" в начало меню
const homeItem: SidebarItem = {
  key: "",
  title: "Главная",
  href: "/",
  startContent: iconMap["Главная"]
};

// Экспортируем итоговый список элементов меню
export const sidebarItems: SidebarItem[] = [
  homeItem,
  ...mainMenuItems
];

// Экспортируем элементы для подменю (если они потребуются)
export const sidebarMenuItems: SidebarItem[] = siteConfig.navMenuItems.map(item => ({
  key: item.href.replace("/", ""),
  title: item.label,
  href: item.href,
  startContent: iconMap[item.label]
}));