// components/topbar.tsx
"use client";

import React from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { StrapiStatus } from "@/components/strapi-status";
import { siteConfig } from "@/config/site";

export function Topbar() {
  return (
    <div className="w-full h-14 bg-background border-b flex items-center justify-between px-4 sticky top-0 z-20">
      <div className="flex items-center">
        <span className="font-bold text-3xl">{siteConfig.name}</span>
      </div>
      
      <div className="flex items-center gap-4">
        <StrapiStatus />
        <ThemeSwitch />
      </div>
    </div>
  );
}