// app/layout-wrapper.tsx
"use client";

import { section, container } from "@/components/primitives";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={container()}>
      {children}
    </div>
  );
}