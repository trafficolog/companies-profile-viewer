// app/page.tsx
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { 
  CompaniesIcon, 
  SourcesIcon, 
  AnalyticsIcon, 
  WarmingIcon 
} from "@/components/icons";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Верхний блок - обзор платформы */}
      <Card className="border shadow-sm">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h1 className={title({ size: "lg", className: "text-left" })}>
                Агрегатор <span className="text-primary-500">профилей компаний</span>
              </h1>
              <p className="text-xl mt-2 mb-4 text-default-600">
                Единая платформа для сбора, анализа и работы с данными о компаниях
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button as={Link} href="/companies" color="primary" className="bg-primary-500" size="lg">
                  Начать работу
                </Button>
                <Button as={Link} href="/docs" variant="bordered" size="lg">
                  Документация
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-primary-50 p-6 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-bold text-primary-500">1,245</p>
                  <p className="text-default-600">Компаний</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-bold text-primary-500">7</p>
                  <p className="text-default-600">Источников</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-bold text-primary-500">843</p>
                  <p className="text-default-600">Email</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-3xl font-bold text-primary-500">53</p>
                  <p className="text-default-600">Регионов</p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Основные модули - сетка */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-100 text-primary-500">
              <CompaniesIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Компании</h2>
              <p className="text-small text-default-500">База данных организаций</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-600">
              Полная информация о компаниях с возможностью фильтрации, сортировки и экспорта данных.
              Персонализированные представления и настройки отображения.
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Поиск</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Фильтрация</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Экспорт CSV</Chip>
            </div>
          </CardBody>
          <CardFooter>
            <Button as={Link} href="/companies" variant="bordered">
              Перейти к компаниям
            </Button>
          </CardFooter>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-100 text-primary-500">
              <SourcesIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Источники данных</h2>
              <p className="text-small text-default-500">Мультиплатформенный сбор</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-600">
              Данные из различных источников: Яндекс.Справочник, Яндекс.Поиск, 2GIS, 
              Яндекс.Карты и других сервисов в одном месте.
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Яндекс.Поиск</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Яндекс.Справочник</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">2GIS</Chip>
            </div>
          </CardBody>
          <CardFooter>
            <Button as={Link} href="/industries" variant="bordered">
              Источники данных
            </Button>
          </CardFooter>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-100 text-primary-500">
              <AnalyticsIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Аналитика</h2>
              <p className="text-small text-default-500">Визуализация и отчеты</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-600">
              Статистика и анализ данных по компаниям. Распределение по источникам,
              наличию контактных данных, социальным сетям и мессенджерам.
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Статистика</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Графики</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Отчеты</Chip>
            </div>
          </CardBody>
          <CardFooter>
            <Button as={Link} href="/analytics" variant="bordered">
              Перейти к аналитике
            </Button>
          </CardFooter>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-100 text-primary-500">
              <WarmingIcon size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Email-прогрев</h2>
              <p className="text-small text-default-500">Автоматизация рассылок</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-default-600">
              Управление рассылками для компаний с email-адресами. Контроль статуса прогрева,
              отправка писем и отслеживание статистики открытий.
            </p>
            <div className="flex gap-2 flex-wrap mt-4">
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Рассылки</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Статусы</Chip>
              <Chip size="sm" color="primary" className="bg-primary-50" variant="flat">Статистика</Chip>
            </div>
          </CardBody>
          <CardFooter>
            <Button as={Link} href="/warming" variant="bordered">
              Перейти к прогреву
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Нижний блок CTA */}
      <Card className="bg-primary-500 shadow-md border-none">
        <CardBody className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h2 className="text-2xl font-bold">Начните работу прямо сейчас</h2>
              <p className="text-white/80 mt-2">
                Получите доступ к полной базе данных компаний из различных источников
              </p>
            </div>
            <Button 
              as={Link} 
              href="/companies" 
              size="lg" 
              color="default" 
              variant="solid"
              className="bg-white text-primary-500 font-medium"
            >
              Перейти к данным
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}