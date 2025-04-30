// app/analytics/page.tsx
import { title, subtitle } from "@/components/primitives";
import { AnalyticsContent } from "@/components/content/analytics-content";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={title({ size: "md" })}>Аналитика</h1>
        <p className={subtitle()}>
          Статистика и анализ данных по компаниям
        </p>
      </div>
      
      <AnalyticsContent />
    </div>
  );
}