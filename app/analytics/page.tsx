// app/analytics/page.tsx
import { title, subtitle } from "@/components/primitives";
import LayoutWrapper from "../layout-wrapper";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";

export default function AnalyticsPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div>
          <h1 className={title({ size: "md" })}>Аналитика</h1>
          <p className={subtitle()}>
            Статистика и анализ данных по компаниям
          </p>
        </div>
        
        <Card className="shadow-none border">
          <CardHeader>
            <h2 className="text-xl font-medium">Аналитические отчеты</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <Tabs aria-label="Разделы аналитики" color="primary">
              <Tab key="overview" title="Общая статистика">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Card className="shadow-none border">
                    <CardBody className="text-center p-6">
                      <h3 className="text-xl font-medium mb-1">Всего компаний</h3>
                      <p className="text-4xl font-bold text-primary">1,245</p>
                    </CardBody>
                  </Card>
                  
                  <Card className="shadow-none border">
                    <CardBody className="text-center p-6">
                      <h3 className="text-xl font-medium mb-1">Отраслей</h3>
                      <p className="text-4xl font-bold text-primary">37</p>
                    </CardBody>
                  </Card>
                  
                  <Card className="shadow-none border">
                    <CardBody className="text-center p-6">
                      <h3 className="text-xl font-medium mb-1">Регионов</h3>
                      <p className="text-4xl font-bold text-primary">53</p>
                    </CardBody>
                  </Card>
                </div>
                
                <div className="mt-8 text-center text-default-500">
                  <p>* Раздел в процессе разработки. Показаны примеры данных.</p>
                </div>
              </Tab>
              
              <Tab key="industries" title="По отраслям">
                <div className="space-y-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Информационные технологии</p>
                    <Chip color="primary" variant="flat">125 компаний</Chip>
                  </div>
                  <Divider />
                  
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Розничная торговля</p>
                    <Chip color="primary" variant="flat">310 компаний</Chip>
                  </div>
                  <Divider />
                  
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Производство</p>
                    <Chip color="primary" variant="flat">87 компаний</Chip>
                  </div>
                  <Divider />
                  
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Строительство</p>
                    <Chip color="primary" variant="flat">142 компаний</Chip>
                  </div>
                  
                  <div className="mt-8 text-center text-default-500">
                    <p>* Раздел в процессе разработки. Показаны примеры данных.</p>
                  </div>
                </div>
              </Tab>
              
              <Tab key="regions" title="По регионам">
                <div className="p-8 text-center">
                  <p className="text-default-500">Здесь будет статистика по регионам</p>
                  <p className="text-default-500">Раздел находится в разработке</p>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
