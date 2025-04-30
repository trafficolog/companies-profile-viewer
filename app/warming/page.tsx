// app/warming/page.tsx
import { title, subtitle } from "@/components/primitives";
import { WarmingContent } from "@/components/warming-content";

export default function WarmingPage() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className={title({ size: "md" })}>Прогрев Email</h1>
        <p className={subtitle()}>
          Управление рассылками и прогревом email-адресов компаний
        </p>
      </div>
      
      <WarmingContent />
    </div>
  );
}