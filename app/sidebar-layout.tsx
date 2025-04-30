// app/sidebar-layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar/optimized-sidebar";
import { Topbar } from "@/components/sidebar/topbar";
import Breadcrumbs from "@/components/breadcrumbs";
import { MenuIcon } from "@/components/icons";

interface SidebarLayoutProps {
  children: ReactNode;
}

export default function SidebarLayout({
  children,
}: SidebarLayoutProps) {
  // Состояние для отслеживания состояния сайдбара (свернут/развернут)
  const [collapsed, setCollapsed] = useState(false);
  
  // Состояние для отслеживания мобильной версии
  const [isMobile, setIsMobile] = useState(false);
  
  // Состояние для отображения/скрытия мобильного меню
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  
  // Определяем, нужно ли скрывать хлебные крошки на главной странице
  const hideBreadscrumbs = pathname === '/';
  
  // Обработчик изменения размера окна для определения мобильной версии
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };
    
    // Первоначальная проверка
    checkIfMobile();
    
    // Обработчик изменения размера окна
    window.addEventListener("resize", checkIfMobile);
    
    // Очистка
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  
  // Закрыть мобильное меню при изменении маршрута
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  return (
    <div className="flex flex-col h-screen">
      {/* Топбар на всю ширину */}
      <Topbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Боковое меню */}
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        
        {/* Основное содержимое */}
        <div 
          className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ease-in-out ${
            collapsed ? "lg:ml-4" : "lg:ml-4"
          } ml-0`}
        >
          {/* Мобильная кнопка меню */}
          {isMobile && (
            <div className="h-12 flex items-center px-4 border-b sticky top-0 z-10 bg-background">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-primary-100"
              >
                <MenuIcon className="h-5 w-5 text-primary-500" />
              </button>
            </div>
          )}
          
          <div className="p-4 md:p-6 flex-1">
            {!hideBreadscrumbs && <Breadcrumbs />}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}