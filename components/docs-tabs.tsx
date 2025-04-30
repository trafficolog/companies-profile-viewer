// components/docs-tabs.tsx
'use client';

import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Code } from "@heroui/code";

export function DocsTabs() {
  return (
    <Tabs aria-label="Разделы документации" color="primary">
      <Tab key="overview" title="Обзор">
        <Card>
          <CardBody>
            <div className="space-y-4">
              <h2 className="text-lg font-medium">О проекте</h2>
              <p>
                Агрегатор профилей компаний — это система для сбора, обработки и 
                отображения информации о компаниях из различных публичных источников.
              </p>
              
              <h3 className="text-md font-medium">Ключевые возможности:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Просмотр и поиск компаний по различным параметрам</li>
                <li>Сортировка и фильтрация данных</li>
                <li>Информация из различных публичных источников</li>
                <li>Группировка компаний по отраслям</li>
                <li>Аналитические отчеты и статистика</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </Tab>
      
      <Tab key="usage" title="Использование">
        <Card>
          <CardBody>
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Как использовать систему</h2>
              
              <h3 className="text-md font-medium">Поиск компаний</h3>
              <p>
                На странице "Компании" вы можете искать интересующие вас организации по названию.
                Введите поисковый запрос в поле в верхней части страницы и нажмите Enter.
              </p>
              
              <h3 className="text-md font-medium">Сортировка результатов</h3>
              <p>
                Кликните на заголовок столбца в таблице для сортировки результатов 
                по соответствующему параметру. Повторный клик меняет порядок сортировки.
              </p>
              
              <h3 className="text-md font-medium">Фильтрация</h3>
              <p>
                Используйте кнопку "Фильтры" для открытия панели расширенной фильтрации.
              </p>
            </div>
          </CardBody>
        </Card>
      </Tab>
      
      <Tab key="api" title="API">
        <Card>
          <CardBody>
            <div className="space-y-4">
              <h2 className="text-lg font-medium">API для разработчиков</h2>
              <p>
                Система предоставляет API для интеграции с другими сервисами.
                Ниже приведены основные эндпоинты:
              </p>
              
              <Divider />
              
              <div>
                <h3 className="text-md font-medium">Получение списка компаний</h3>
                <Code>
                  GET /api/company-profiles
                </Code>
                <p className="text-small text-default-500 mt-1">
                  Возвращает список компаний с пагинацией.
                </p>
              </div>
              
              <Divider />
              
              <div>
                <h3 className="text-md font-medium">Поиск компании по ID</h3>
                <Code>
                  GET /api/company-profiles/:id
                </Code>
                <p className="text-small text-default-500 mt-1">
                  Возвращает детальную информацию о компании по её ID.
                </p>
              </div>
              
              <Divider />
              
              <div>
                <h3 className="text-md font-medium">Поиск компании по ИНН</h3>
                <Code>
                  GET /api/company-profiles/tax-id/:taxId
                </Code>
                <p className="text-small text-default-500 mt-1">
                  Поиск компании по ИНН.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Tab>
      
      <Tab key="faq" title="FAQ">
        <Card>
          <CardBody>
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Часто задаваемые вопросы</h2>
              
              <div>
                <h3 className="text-md font-medium">Откуда берутся данные о компаниях?</h3>
                <p>
                  Данные собираются из различных публичных источников, включая 
                  2GIS, Яндекс.Карты, Яндекс.Справочник и другие открытые источники.
                </p>
              </div>
              
              <Divider />
              
              <div>
                <h3 className="text-md font-medium">Как часто обновляются данные?</h3>
                <p>
                  Обновление данных происходит по расписанию, обычно раз в неделю
                  для большинства источников. Некоторые источники могут обновляться 
                  чаще или реже в зависимости от их специфики.
                </p>
              </div>
              
              <Divider />
              
              <div>
                <h3 className="text-md font-medium">Что означают различные ценовые категории?</h3>
                <p>
                  Ценовые категории (бюджет, средний, премиум) определяются на основе 
                  анализа публичных данных о компании, таких как прайс-листы, 
                  расположение филиалов и другие параметры.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
