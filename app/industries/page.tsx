// app/industries/page.tsx
import { title, subtitle } from "@/components/primitives";
import LayoutWrapper from "../layout-wrapper";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";

// Пример данных для демонстрации
const industriesData = [
  { id: 1, name: "Информационные технологии", companies: 125 },
  { id: 2, name: "Розничная торговля", companies: 310 },
  { id: 3, name: "Производство", companies: 87 },
  { id: 4, name: "Строительство", companies: 142 },
  { id: 5, name: "Медицина и здравоохранение", companies: 76 },
];

export default function IndustriesPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h1 className={title({ size: "md" })}>Отрасли</h1>
          <p className={subtitle()}>
            Категории компаний по сферам деятельности
          </p>
        </div>
        
        <Card className="shadow-none border">
          <CardHeader>
            <h2 className="text-xl font-medium">Список отраслей</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              {industriesData.map((industry) => (
                <Card key={industry.id} className="shadow-none border">
                  <CardBody className="flex flex-row justify-between items-center p-4">
                    <h3 className="text-lg font-medium">{industry.name}</h3>
                    <Chip color="primary" variant="flat">
                      {industry.companies} компаний
                    </Chip>
                  </CardBody>
                </Card>
              ))}
              
              <div className="text-center mt-4 text-default-500">
                <p>* Раздел в процессе разработки. Показаны примеры данных.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
