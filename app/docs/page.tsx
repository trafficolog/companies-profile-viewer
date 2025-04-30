// app/docs/page.tsx
import { title, subtitle } from "@/components/primitives";
import { DocsContent } from "@/components/docs-content";

export default function DocsPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={title({ size: "md" })}>Документация</h1>
        <p className={subtitle()}>
          Руководство по использованию агрегатора профилей компаний
        </p>
      </div>
      
      <DocsContent />
    </div>
  );
}