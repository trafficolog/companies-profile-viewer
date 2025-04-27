// app/page.tsx
import { title, subtitle } from "@/components/primitives";
import LayoutWrapper from "./layout-wrapper";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className={title({ size: "lg" })}>Агрегатор профилей компаний</h1>
          <p className={subtitle()}>
            Просматривайте и анализируйте данные о компаниях, собранные из различных публичных источников
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button as={Link} href="/companies" color="primary" size="lg">
              Перейти к компаниям
            </Button>
          </div>
        </div>
        
        <Divider className="my-8" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card shadow="sm" isHoverable className="border-none">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h2 className="font-bold text-2xl">Компании</h2>
              <p className="text-default-500 text-sm">Информация о компаниях</p>
            </CardHeader>
            <CardBody className="overflow-visible py-4">
              <p className="text-default-600">
                Просмотр информации о компаниях из различных источников, включая контактные данные, отрасли и ценовые категории.
              </p>
            </CardBody>
            <CardFooter>
              <Button as={Link} color="primary" href="/companies" fullWidth>
                Перейти
              </Button>
            </CardFooter>
          </Card>
          
          <Card shadow="sm" isHoverable className="border-none">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h2 className="font-bold text-2xl">Отрасли</h2>
              <p className="text-default-500 text-sm">Информация по отраслям</p>
            </CardHeader>
            <CardBody className="overflow-visible py-4">
              <p className="text-default-600">
                Классификация компаний по отраслям и специализациям для быстрого поиска и анализа данных.
              </p>
            </CardBody>
            <CardFooter>
              <Button as={Link} color="primary" href="/industries" fullWidth>
                Перейти
              </Button>
            </CardFooter>
          </Card>
          
          <Card shadow="sm" isHoverable className="border-none">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h2 className="font-bold text-2xl">Аналитика</h2>
              <p className="text-default-500 text-sm">Статистика и инсайты</p>
            </CardHeader>
            <CardBody className="overflow-visible py-4">
              <p className="text-default-600">
                Визуальные отчеты и статистика по компаниям, с возможностью анализа по различным параметрам.
              </p>
            </CardBody>
            <CardFooter>
              <Button as={Link} color="primary" href="/analytics" fullWidth>
                Перейти
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  );
}