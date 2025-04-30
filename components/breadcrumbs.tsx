// components/breadcrumbs.tsx
"use client";

import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  currentPageName?: string;
}

export default function Breadcrumbs({ items = [], currentPageName }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // If no items and currentPageName provided, generate from pathname
  if (items.length === 0 && !currentPageName) {
    const paths = pathname.split('/').filter(Boolean);
    
    if (paths.length > 0) {
      // Build items from path
      items = paths.slice(0, -1).map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        return {
          name: path.charAt(0).toUpperCase() + path.slice(1),
          href
        };
      });
      
      // Set current page name from last path segment
      currentPageName = paths[paths.length - 1].charAt(0).toUpperCase() + paths[paths.length - 1].slice(1);
    }
  }
  
  // If no items and no path segments, don't render breadcrumbs
  if (items.length === 0 && !currentPageName) {
    return null;
  }
  
  // Custom name mapping for better readability
  const getDisplayName = (name: string): string => {
    const nameMap: Record<string, string> = {
      'Companies': 'Компании',
      'Industries': 'Источники данных',
      'Analytics': 'Аналитика',
      'Docs': 'Документация',
      'Warming': 'Прогрев'
    };
    
    return nameMap[name] || name;
  };
  
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center text-sm">
        <li>
          <div className="flex items-center">
            <Link href="/" color="foreground" underline="hover" className="text-default-500 text-sm">Главная</Link>
          </div>
        </li>
        
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <span className="mx-2 text-default-400">/</span>
              <Link 
                href={item.href} 
                color="foreground" 
                underline="hover"
                className="text-default-500 text-sm"
              >
                {getDisplayName(item.name)}
              </Link>
            </div>
          </li>
        ))}
        
        {currentPageName && (
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-default-400">/</span>
              <span className="text-primary text-sm">
                {getDisplayName(currentPageName)}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}