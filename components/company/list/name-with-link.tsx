// components/company-name-with-link.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Tooltip } from "@heroui/react";
import { InfoIcon } from "../../icons";

interface CompanyNameWithLinkProps {
  id: number;
  name: string;
  showIcon?: boolean;
}

export default function CompanyNameWithLink({ id, name, showIcon = true }: CompanyNameWithLinkProps) {
  return (
    <div className="flex items-center gap-1">
      <Link 
        href={`/companies/${id}`} 
        className="text-primary hover:underline font-medium"
      >
        {name}
      </Link>
      
      {showIcon && (
        <Tooltip content="Просмотреть профиль компании">
          <Link href={`/companies/${id}`} className="text-default-400 hover:text-primary">
            <InfoIcon size={16} />
          </Link>
        </Tooltip>
      )}
    </div>
  );
}