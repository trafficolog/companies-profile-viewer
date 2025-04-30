// components/docs-content.tsx
"use client";

import { useState } from "react";
import { 
  Card, 
  CardBody, 
  Tabs, 
  Tab, 
  Accordion, 
  AccordionItem,
  Divider,
  Link,
  Code,
  Chip,
  Button,
  Image
} from "@heroui/react";

export function DocsContent() {
  return (
    <Card className="shadow-none border">
      <CardBody>
        <Tabs aria-label="Разделы документации" color="primary" variant="underlined">
          <Tab key="overview" title="О проекте">
            <div className="space-y-6 py-4">
              <h2 className="text-2xl font-semibold">Обзор системы</h2>
              <p>
                Агрегатор профилей компаний — это комплексная система для сбора, обработки и
                отображения информации о компаниях из различных публичных источников. 
                Платформа позволяет централизованно хранить и анализировать данные, 
                а также взаимодействовать с компаниями через систему прогрева email-контактов.
              </p>

              <h3 className="text-xl font-medium mt-8">Цели проекта</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Создание единой базы данных компаний из различных источников</li>
                <li>Обеспечение удобного доступа к информации о компаниях</li>
                <li>Предоставление инструментов для анализа собранных данных</li>
                <li>Автоматизация работы с email-контактами компаний</li>
                <li>Обеспечение актуальности и достоверности собранной информации</li>
              </ul>

              <h3 className="text-xl font-medium mt-8">Источники данных</h3>
              <p>
                Система агрегирует информацию из следующих публичных источников:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <Card shadow="sm" className="border border-default-200">
                  <CardBody>
                    <h4 className="font-medium mb-2">Яндекс.Поиск</h4>
                    <p className="text-small text-default-600">
                      Данные, собранные при анализе результатов поисковой выдачи Яндекса.
                      Включают описания компаний, используемые CMS и даты парсинга.
                    </p>
                  </CardBody>
                </Card>
                
                <Card shadow="sm" className="border border-default-200">
                  <CardBody>
                    <h4 className="font-medium mb-2">Яндекс.Справочник</h4>
                    <p className="text-small text-default-600">
                      Официальная информация из справочника организаций.
                      Содержит категории, количество филиалов и типы организаций.
                    </p>
                  </CardBody>
                </Card>
                
                <Card shadow="sm" className="border border-default-200">
                  <CardBody>
                    <h4 className="font-medium mb-2">Яндекс.Карты</h4>
                    <p className="text-small text-default-600">
                      Геоданные о местоположении организаций.
                      Включает адреса, координаты и информацию о филиалах.
                    </p>
                  </CardBody>
                </Card>
                
                <Card shadow="sm" className="border border-default-200">
                  <CardBody>
                    <h4 className="font-medium mb-2">2GIS</h4>
                    <p className="text-small text-default-600">
                      Информация из электронного справочника 2GIS.
                      Содержит адреса, рейтинги и отзывы о компаниях.
                    </p>
                  </CardBody>
                </Card>
                
                <Card shadow="sm" className="border border-default-200">
                  <CardBody>
                    <h4 className="font-medium mb-2">RusBase</h4>
                    <p className="text-small text-default-600">
                      Данные о технологических компаниях и стартапах.
                      Включает год основания, инвестиции и информацию об основателях.
                    </p>
                  </CardBody>
                </Card>
                
                <Card shadow="sm" className="border border-default-200">
                  <CardBody>
                    <h4 className="font-medium mb-2">DIKIDI и YClients</h4>
                    <p className="text-small text-default-600">
                      Информация из систем автоматизации сервисных компаний.
                      Содержит данные об услугах, специалистах и графиках работы.
                    </p>
                  </CardBody>
                </Card>
              </div>

              <h3 className="text-xl font-medium mt-8">Структура системы</h3>
              <div className="mt-4 space-y-3">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-medium">Модуль "Компании"</h4>
                  <p className="text-default-600">
                    Основной модуль для просмотра, поиска и фильтрации информации о компаниях.
                    Включает возможности экспорта данных и сохранения пользовательских настроек.
                  </p>
                </div>
                
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-medium">Модуль "Источники данных"</h4>
                  <p className="text-default-600">
                    Модуль для просмотра информации о компаниях в разрезе источников данных.
                    Позволяет анализировать специфические поля, доступные в каждом источнике.
                  </p>
                </div>
                
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-medium">Модуль "Аналитика"</h4>
                  <p className="text-default-600">
                    Модуль для статистического анализа собранных данных.
                    Предоставляет информацию о распределении компаний по различным параметрам.
                  </p>
                </div>
                
                <div className="p-4 bg-primary-50 rounded-lg">
                  <h4 className="font-medium">Модуль "Email-прогрев"</h4>
                  <p className="text-default-600">
                    Модуль для работы с email-контактами компаний.
                    Позволяет управлять статусами прогрева и отправлять сообщения.
                  </p>
                </div>
              </div>
            </div>
          </Tab>
          
          <Tab key="usage" title="Руководство пользователя">
            <div className="space-y-6 py-4">
              <h2 className="text-2xl font-semibold">Как использовать систему</h2>
              
              <Accordion variant="splitted">
                <AccordionItem key="companies" aria-label="Работа с модулем Компании" title="Работа с модулем Компании">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Основные возможности</h3>
                    <p>
                      Модуль "Компании" предоставляет полный доступ к базе данных организаций
                      с расширенными возможностями поиска, фильтрации и экспорта данных.
                    </p>
                    
                    <h4 className="font-medium mt-4">Поиск компаний</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Для поиска компаний используйте поисковое поле в верхней части страницы.
                        Поиск осуществляется по названию и другим ключевым полям.
                      </p>
                      <div className="flex items-center gap-2 my-2">
                        <Chip color="primary" variant="flat" size="sm">Совет</Chip>
                        <p className="text-small">
                          Для более точного поиска используйте полное название компании или ИНН
                        </p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mt-4">Фильтрация данных</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Система предоставляет возможность фильтрации компаний по различным параметрам:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Ценовой сегмент (премиум, средний, бюджетный)</li>
                        <li>Наличие электронной почты</li>
                        <li>Организационно-правовая форма</li>
                        <li>Другие параметры через расширенные фильтры</li>
                      </ul>
                    </div>
                    
                    <h4 className="font-medium mt-4">Экспорт данных</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Для экспорта данных в формате CSV используйте кнопку "Экспорт в CSV" 
                        в верхней части таблицы. Экспортироваться будут все найденные компании
                        с учетом примененных фильтров.
                      </p>
                    </div>
                    
                    <h4 className="font-medium mt-4">Персонализация отображения</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Система запоминает настройки отображения для каждого пользователя:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Выбранные колонки для отображения</li>
                        <li>Настройки сортировки</li>
                        <li>Применённые фильтры</li>
                      </ul>
                      <p className="mt-2">
                        Для сброса всех настроек используйте кнопку "Сбросить настройки".
                      </p>
                    </div>
                  </div>
                </AccordionItem>
                
                <AccordionItem key="sources" aria-label="Работа с модулем Источники данных" title="Работа с модулем Источники данных">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Основные возможности</h3>
                    <p>
                      Модуль "Источники данных" позволяет просматривать информацию о компаниях
                      в разрезе источников данных, с отображением специфических полей каждого источника.
                    </p>
                    
                    <h4 className="font-medium mt-4">Выбор источника данных</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        На главной странице модуля представлены все доступные источники данных.
                        Для просмотра компаний из конкретного источника выберите соответствующую карточку.
                      </p>
                      <div className="flex items-center gap-2 my-2">
                        <Chip color="primary" variant="flat" size="sm">Совет</Chip>
                        <p className="text-small">
                          Обратите внимание на уникальные поля, доступные в каждом источнике
                        </p>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mt-4">Просмотр специфических данных</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        При выборе источника данных в таблице компаний отображаются как общие поля
                        (название, контакты), так и специфические поля выбранного источника.
                      </p>
                      <p className="mb-2">
                        Примеры специфических полей для источников:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Яндекс.Поиск: описание, CMS, дата парсинга</li>
                        <li>Яндекс.Справочник: категории, филиалы, типы</li>
                        <li>2GIS: адрес, рейтинг, отзывы</li>
                        <li>RusBase: год основания, инвестиции, основатели</li>
                      </ul>
                    </div>
                    
                    <h4 className="font-medium mt-4">Поиск и фильтрация</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        В каждом представлении источника данных доступны стандартные возможности
                        поиска и фильтрации для быстрого нахождения нужной информации.
                      </p>
                    </div>
                  </div>
                </AccordionItem>
                
                <AccordionItem key="analytics" aria-label="Работа с модулем Аналитика" title="Работа с модулем Аналитика">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Основные возможности</h3>
                    <p>
                      Модуль "Аналитика" предоставляет статистическую информацию о компаниях
                      в различных разрезах для анализа данных.
                    </p>
                    
                    <h4 className="font-medium mt-4">Общая статистика</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        На вкладке "Общая статистика" представлена сводная информация:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Общее количество компаний в базе данных</li>
                        <li>Количество отраслей</li>
                        <li>Количество регионов</li>
                      </ul>
                    </div>
                    
                    <h4 className="font-medium mt-4">Распределение по источникам</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        На вкладке "По источникам данных" представлена информация о количестве
                        и процентном соотношении компаний из различных источников данных.
                      </p>
                      <p className="mb-2">
                        Также отображается статистика по наличию контактных данных:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Процент компаний с email-адресами</li>
                        <li>Процент компаний с веб-сайтами</li>
                        <li>Процент компаний с телефонными номерами</li>
                      </ul>
                    </div>
                    
                    <h4 className="font-medium mt-4">Социальные сети и мессенджеры</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        На вкладке "По соцсетям и мессенджерам" представлена статистика
                        по наличию у компаний профилей в социальных сетях и контактов в мессенджерах.
                      </p>
                    </div>
                  </div>
                </AccordionItem>
                
                <AccordionItem key="warming" aria-label="Работа с модулем Email-прогрев" title="Работа с модулем Email-прогрев">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Основные возможности</h3>
                    <p>
                      Модуль "Email-прогрев" предназначен для управления рассылками
                      и прогревом email-адресов компаний.
                    </p>
                    
                    <h4 className="font-medium mt-4">Статусы прогрева</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Система поддерживает следующие статусы прогрева email-адресов:
                      </p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-success-500"></div>
                          <p><strong>Активен</strong> - прогрев выполняется по расписанию</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-warning-500"></div>
                          <p><strong>Ожидание</strong> - прогрев приостановлен временно</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-danger-500"></div>
                          <p><strong>Остановлен</strong> - прогрев полностью остановлен</p>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mt-4">Отправка сообщений</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Для отправки индивидуального сообщения компании используйте
                        кнопку с иконкой конверта в колонке "Активности".
                      </p>
                      <p className="mb-2">
                        В открывшемся модальном окне вы можете:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Указать тему письма</li>
                        <li>Составить текст сообщения</li>
                        <li>Отправить сообщение одним нажатием кнопки</li>
                      </ul>
                    </div>
                    
                    <h4 className="font-medium mt-4">Управление статусами</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Для изменения статуса прогрева используйте кнопку с выпадающим меню
                        в колонке "Активности". Доступные действия зависят от текущего статуса.
                      </p>
                    </div>
                    
                    <h4 className="font-medium mt-4">Статистика и отслеживание</h4>
                    <div className="ml-4">
                      <p className="mb-2">
                        Система отслеживает следующие метрики для каждой компании:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Количество отправленных писем</li>
                        <li>Количество открытых писем</li>
                        <li>Процент отклика</li>
                        <li>Дата последней активности</li>
                      </ul>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </Tab>
          
          <Tab key="faq" title="Часто задаваемые вопросы">
            <div className="space-y-6 py-4">
              <h2 className="text-2xl font-semibold">FAQ</h2>
              
              <Accordion>
                <AccordionItem key="data-sources" title="Откуда берутся данные о компаниях?">
                  <p>
                    Данные о компаниях собираются из различных публичных источников, включая:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Яндекс.Поиск - данные из поисковой выдачи</li>
                    <li>Яндекс.Справочник - официальный справочник организаций</li>
                    <li>Яндекс.Карты - геоданные и адресная информация</li>
                    <li>2GIS - электронный справочник с рейтингами и отзывами</li>
                    <li>RusBase - информация о технологических компаниях</li>
                    <li>DIKIDI - данные о сервисных компаниях</li>
                    <li>YClients - информация об организациях из системы автоматизации</li>
                  </ul>
                  <p className="mt-2">
                    Все данные собираются из общедоступных ресурсов в соответствии с правилами
                    их использования.
                  </p>
                </AccordionItem>
                
                <AccordionItem key="data-update" title="Как часто обновляются данные?">
                  <p>
                    Обновление данных происходит по расписанию и зависит от конкретного источника:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Яндекс.Поиск - еженедельное обновление</li>
                    <li>Яндекс.Справочник - обновление раз в две недели</li>
                    <li>Яндекс.Карты - обновление раз в месяц</li>
                    <li>2GIS - обновление раз в месяц</li>
                    <li>RusBase - обновление каждые две недели</li>
                    <li>DIKIDI и YClients - обновление раз в месяц</li>
                  </ul>
                  <p className="mt-2">
                    Дата последнего обновления данных для каждой компании отображается
                    в соответствующем поле.
                  </p>
                </AccordionItem>
                
                <AccordionItem key="price-tiers" title="Что означают различные ценовые категории?">
                  <p>
                    Ценовые категории определяются системой на основе анализа публичных данных
                    о компании и разделяются на следующие типы:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Премиум</strong> - компании высокого ценового сегмента, обычно с фирменным стилем, качественным сайтом и представительствами в престижных локациях</li>
                    <li><strong>Средний</strong> - компании среднего ценового сегмента с умеренными ценами</li>
                    <li><strong>Бюджетный</strong> - компании с низкими ценами, ориентированные на массовый рынок</li>
                    <li><strong>Не определен</strong> - категория не удалось определить из доступных данных</li>
                  </ul>
                  <p className="mt-2">
                    Определение категории происходит автоматически на основе алгоритмов
                    машинного обучения и может корректироваться при обновлении данных.
                  </p>
                </AccordionItem>
                
                <AccordionItem key="email-warming" title="Как работает система Email-прогрева?">
                  <p>
                    Система Email-прогрева предназначена для постепенного налаживания
                    коммуникации с компаниями через электронную почту.
                  </p>
                  <p className="mt-2">
                    Основные принципы работы системы:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Постепенное увеличение количества отправляемых писем</li>
                    <li>Отслеживание открытий и ответов на письма</li>
                    <li>Автоматическая регуляция интенсивности рассылок</li>
                    <li>Возможность ручного управления процессом</li>
                  </ul>
                  <p className="mt-2">
                    Система поддерживает три статуса прогрева:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Активен</strong> - прогрев выполняется по расписанию</li>
                    <li><strong>Ожидание</strong> - прогрев приостановлен временно</li>
                    <li><strong>Остановлен</strong> - прогрев полностью остановлен</li>
                  </ul>
                </AccordionItem>
                
                <AccordionItem key="export" title="Как экспортировать данные из системы?">
                  <p>
                    Система предоставляет возможность экспорта данных о компаниях в формате CSV.
                  </p>
                  <p className="mt-2">
                    Для экспорта данных следуйте этим шагам:
                  </p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li>Перейдите на страницу "Компании"</li>
                    <li>При необходимости примените фильтры для отбора нужных данных</li>
                    <li>Нажмите кнопку "Экспорт в CSV" в верхней части таблицы</li>
                    <li>Файл будет автоматически загружен на ваше устройство</li>
                  </ol>
                  <p className="mt-2">
                    Экспортированный файл будет содержать все колонки, выбранные для отображения
                    в таблице, и все строки, соответствующие примененным фильтрам.
                  </p>
                </AccordionItem>
                
                <AccordionItem key="user-preferences" title="Сохраняются ли настройки отображения данных?">
                  <p>
                    Да, система автоматически сохраняет настройки отображения данных
                    для каждого пользователя.
                  </p>
                  <p className="mt-2">
                    Сохраняются следующие настройки:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Выбранные колонки для отображения</li>
                    <li>Настройки сортировки (колонка и направление)</li>
                    <li>Применённые фильтры (ценовой сегмент, наличие email и др.)</li>
                  </ul>
                  <p className="mt-2">
                    Настройки сохраняются в локальном хранилище браузера и будут применены
                    при следующем посещении страницы.
                  </p>
                  <p className="mt-2">
                    Для сброса всех настроек к значениям по умолчанию используйте кнопку "Сбросить настройки"
                    в верхней части таблицы.
                  </p>
                </AccordionItem>
                
                <AccordionItem key="contact" title="Куда обращаться с вопросами по системе?">
                  <p>
                    По всем вопросам, связанным с использованием системы, вы можете обратиться
                    в службу поддержки по электронной почте:
                  </p>
                  <p className="mt-2">
                    <Link href="mailto:info@framedigi.com" color="primary">
                      info@framedigi.com
                    </Link>
                  </p>
                  <p className="mt-4">
                    Время работы поддержки: понедельник-пятница с 9:00 до 18:00 (МСК).
                  </p>
                  <p className="mt-2">
                    При обращении в поддержку, пожалуйста, указывайте:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Ваше имя и контактные данные</li>
                    <li>Название компании</li>
                    <li>Подробное описание вопроса или проблемы</li>
                    <li>Скриншоты, если применимо</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </div>
          </Tab>
          
          <Tab key="terms" title="Правовая информация">
            <div className="space-y-6 py-4">
              <h2 className="text-2xl font-semibold">Правовая информация</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium">Источники данных и их использование</h3>
                  <p className="mt-2">
                    Все данные, представленные в системе, собраны из публичных источников
                    в соответствии с их правилами использования. Мы не собираем и не храним
                    конфиденциальную или закрытую информацию о компаниях.
                  </p>
                  <p className="mt-2">
                    Система агрегирует только ту информацию, которая была добровольно
                    размещена компаниями в публичном доступе.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium">Ограничения ответственности</h3>
                  <p className="mt-2">
                    Мы прилагаем все усилия для обеспечения точности и актуальности данных,
                    однако не можем гарантировать полное отсутствие ошибок или неточностей.
                  </p>
                  <p className="mt-2">
                    Пользователи системы должны самостоятельно проверять критически важную
                    информацию перед её использованием для принятия решений.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium">Правила использования системы прогрева</h3>
                  <p className="mt-2">
                    Система Email-прогрева предназначена для установления делового контакта
                    с компаниями и должна использоваться в соответствии с законодательством
                    о рекламе и персональных данных.
                  </p>
                  <p className="mt-2">
                    При использовании системы прогрева необходимо:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Соблюдать законодательство о рекламе</li>
                    <li>Не отправлять спам или навязчивую рекламу</li>
                    <li>Предоставлять возможность отписаться от рассылки</li>
                    <li>Уважать запросы компаний о прекращении коммуникации</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium">Конфиденциальность данных</h3>
                  <p className="mt-2">
                    Мы серьезно относимся к конфиденциальности данных. Информация о действиях
                    пользователей в системе не передается третьим лицам и используется исключительно
                    для улучшения функциональности и производительности системы.
                  </p>
                  <p className="mt-2">
                    Для получения полной информации о политике конфиденциальности обратитесь
                    в службу поддержки.
                  </p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}