// app/layout-wrapper.tsx
"use client";

import { container } from "@/components/primitives";
import Breadcrumbs from "@/components/breadcrumbs";

export default function LayoutWrapper({
  children,
  hideBreadscrumbs = false
}: {
  children: React.ReactNode;
  hideBreadscrumbs?: boolean;
}) {
  return (
    <div className={container()}>
      {!hideBreadscrumbs && <Breadcrumbs />}
      {children}
    </div>
  );
}