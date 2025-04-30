// components/optimized-sidebar.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import {
  Listbox,
  ListboxItem,
  Tooltip,
  Button,
  ScrollShadow
} from "@heroui/react";
import { sidebarItems } from "./sidebar-items";
import { ArrowLeftIcon, CloseIcon } from "@/components/icons";
import { cn } from "@/utils/cn"; 

// Типы SidebarItem
export enum SidebarItemType {
  Nest = "nest",
}

export type SidebarItem = {
  key: string;
  title: string;
  href?: string;
  type?: SidebarItemType.Nest;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
};

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({
  collapsed,
  setCollapsed,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen
}: SidebarProps) {
  const pathname = usePathname();
  const currentPath = pathname.split('/')[1] || '';
  
  // Мобильная версия сайдбара
  if (isMobile) {
    return (
      <>
        {/* Затемнение при открытом меню */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Мобильное меню */}
        <div
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-72 bg-background z-50 transition-transform duration-300 flex flex-col border-r border-divider ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 h-14 border-b">
            <NextLink href="/" className="flex items-center gap-2 text-lg font-medium">
              Меню
            </NextLink>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <CloseIcon size={18} />
            </Button>
          </div>
          
          <ScrollShadow className="flex-1 py-4">
            <Listbox
              aria-label="Навигация"
              className="p-2"
              selectedKeys={[currentPath]}
              selectionMode="single"
              variant="flat"
              itemClasses={{
                base: "px-3 rounded-md h-12 mb-1 data-[selected=true]:bg-primary-100 data-[selected=true]:text-primary-500",
                title: "text-default-700 data-[selected=true]:text-primary-500"
              }}
            >
              {sidebarItems.map((item) => (
                <ListboxItem
                  key={item.key}
                  href={item.href}
                  as={NextLink}
                  textValue={item.title}
                  startContent={
                    <div className="text-default-500 data-[selected=true]:text-primary-500">
                      {item.startContent}
                    </div>
                  }
                >
                  {item.title}
                </ListboxItem>
              ))}
            </Listbox>
          </ScrollShadow>
        </div>
      </>
    );
  }

  // Десктопная версия сайдбара
  return (
    <div 
      className={`h-[calc(100vh-3.5rem)] bg-background border-r border-divider flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Основное меню */}
      <ScrollShadow className="flex-1 py-4">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2 px-2">
            {sidebarItems.map((item) => {
              const isActive = currentPath === item.key;
              
              return (
                <Tooltip
                  key={item.key}
                  content={item.title}
                  placement="right"
                >
                  <Button
                    as={NextLink}
                    href={item.href}
                    isIconOnly
                    variant={isActive ? "flat" : "light"}
                    color={isActive ? "primary" : "default"}
                    className={`${isActive ? "bg-primary-100" : ""}`}
                  >
                    {item.startContent}
                  </Button>
                </Tooltip>
              );
            })}
          </div>
        ) : (
          <Listbox
            aria-label="Навигация"
            className="p-2"
            selectedKeys={[currentPath]}
            selectionMode="single"
            variant="flat"
            itemClasses={{
              base: "px-3 rounded-md h-12 mb-1 data-[selected=true]:bg-primary-100 data-[selected=true]:text-primary-500",
              title: "text-default-700 data-[selected=true]:text-primary-500"
            }}
          >
            {sidebarItems.map((item) => (
              <ListboxItem
                key={item.key}
                href={item.href}
                as={NextLink}
                textValue={item.title}
                startContent={
                  <div className="text-default-500 data-[selected=true]:text-primary-500">
                    {item.startContent}
                  </div>
                }
              >
                {item.title}
              </ListboxItem>
            ))}
          </Listbox>
        )}
      </ScrollShadow>
      
      {/* Футер сайдбара */}
      <div className={`p-4 border-t flex ${collapsed ? "justify-center" : "justify-end"} items-center`}>
        {collapsed ? (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => setCollapsed(false)}
          >
            <ArrowLeftIcon className="rotate-180" size={18} />
          </Button>
        ) : (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onClick={() => setCollapsed(true)}
          >
            <ArrowLeftIcon size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}