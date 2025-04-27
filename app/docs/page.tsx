// app/docs/page.tsx
import { title, subtitle } from "@/components/primitives";
import LayoutWrapper from "../layout-wrapper";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { DocsTabs } from "@/components/docs-tabs";
import { Link } from "@heroui/link";

export default function DocsPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-8">
        <div>
          <h1 className={title({ size: "md" })}>Документация</h1>
          <p className={subtitle()}>
            Руководство по использованию агрегатора компаний
          </p>
        </div>
        
        <DocsTabs />

        <div className="mt-8">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Дополнительная информация</h2>
            </CardHeader>
            <CardBody>
              <p>
                Если у вас остались вопросы или нужна дополнительная помощь,
                вы можете обратиться в службу поддержки или посетить нашу 
                <Link href="mailto:info@framedigi.com" className="ml-1">
                  info@framedigi.com
                </Link>.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}
