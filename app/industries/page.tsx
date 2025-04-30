// app/industries/page.tsx
import { title, subtitle } from "@/components/primitives";
import { DataSourcesContent } from "@/components/data-sources-content";

export default function IndustriesPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={title({ size: "md" })}>Источники данных</h1>
        <p className={subtitle()}>
          Просмотр и анализ компаний по источникам данных
        </p>
      </div>
      
      <DataSourcesContent />
    </div>
  );
}