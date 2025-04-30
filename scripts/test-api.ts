#!/usr/bin/env node
import { checkStrapiStatus } from '../lib/api';
import { companyProfileApi } from '../lib/api';
import { NormalizedCompany } from '../types/company';

async function testAPI() {
  console.log('=== Тестирование API агрегатора компаний ===\n');

  // 1. Проверка здоровья API
  console.log('[1/4] Проверка здоровья API...');
  try {
    const healthResponse = await fetch(`${process.env.STRAPI_API_URL || 'http://localhost:1337'}/health`);
    const healthData = await healthResponse.json();
    
    console.log('✓ Health Check:');
    console.log(`- Статус: ${healthData.status}`);
    console.log(`- Версия: ${healthData.version}`);
    console.log('- Сервисы:');
    console.log(`  • База данных: ${healthData.services.database ? '✔' : '✖'}`);
    console.log(`  • Кэш: ${healthData.services.cache ? '✔' : '✖'}`);
    console.log(`  • Хранилище: ${healthData.services.storage ? '✔' : '✖'}`);
  } catch (error) {
    console.error('✗ Health Check Failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }

  // 2. Проверка базовых операций
  console.log('\n[2/4] Тестирование CRUD операций...');
  try {
    // Получение списка компаний
    const { data: companies, meta } = await companyProfileApi.find({
      page: 1,
      pageSize: 2
    });
    
    console.log('✓ Получение списка:');
    console.log(`- Найдено компаний: ${meta.pagination.total}`);
    console.log(`- Страница: ${meta.pagination.page}/${meta.pagination.pageCount}`);
    
    if (companies.length > 0) {
      // Получение деталей первой компании
      const companyDetails = await companyProfileApi.findOne(companies[0].id);
      console.log('\n✓ Детали компании:');
      console.log(`- Название: ${companyDetails.name}`);
      console.log(`- ОПФ: ${companyDetails.legalStatus}`);
      //console.log(`- Отрасль: ${companyDetails.attributes.industry?.displayName || 'не указана'}`);
    }
  } catch (error) {
    console.error('✗ CRUD Operations Failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }

  // 3. Проверка кастомных роутов
  console.log('\n[3/4] Тестирование кастомных роутов...');
  try {
    // Поиск по slug
    const testSlug = 'test-company';
    const bySlug = await companyProfileApi.findBySlug(testSlug);
    console.log(`✓ Поиск по slug (${testSlug}):`);
    console.log(`- Найдена компания: ${bySlug.name}`);

    // Поиск по ИНН
    const testTaxId = '1234567890';
    const byTaxId = await companyProfileApi.findByTaxId(testTaxId);
    console.log(`\n✓ Поиск по ИНН (${testTaxId}):`);
    console.log(`- Найдена компания: ${byTaxId.name}`);
  } catch (error) {
    console.error('✗ Custom Routes Failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }

  // 4. Проверка компонентов
  console.log('\n[4/4] Проверка компонентов данных...');
  try {
    const testCompany = await companyProfileApi.findOne(1);
    
    console.log('✓ Контактная информация:');
    console.log(`- Телефон: ${testCompany.phone}`);
    console.log(`- Email: ${testCompany.email}`);
    
    if (testCompany.yandexDirectories) {
      console.log('\n✓ Данные Яндекс.Справочника:');
      console.log(`- Категории: ${testCompany.yandexDirectories.categories}`);
      console.log(`- Филиалов: ${testCompany.yandexDirectories.branches}`);
    }
  } catch (error) {
    console.error('✗ Components Check Failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }

  // 5. Проверка отраслей
  async function testIndustryRelations() {
    console.log('\n[5/6] Тестирование связей с отраслями...');
    
    try {
      // Тест получения компаний по отрасли
      const companiesByIndustry = await companyProfileApi.findByIndustry('1');
      console.log(`✓ Найдено компаний в отрасли: ${companiesByIndustry.length}`);
      
      // Тест иерархии отраслей
      const industryResponse = await fetch(`${process.env.STRAPI_API_URL}/api/industries/1`);
      const industryData = await industryResponse.json();
      console.log(`✓ Отрасль "${industryData.data.attributes.name}" (уровень ${industryData.data.attributes.level})`);
      
      if (industryData.data.attributes.children?.data?.length) {
        console.log(`- Подкатегорий: ${industryData.data.attributes.children.data.length}`);
      }
    } catch (error) {
      console.error('✗ Industry Relations Failed:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  }

  console.log('\n=== Все тесты успешно пройдены ===');
}

testAPI()
  .catch(error => {
    console.error('Fatal Error:', error);
    process.exit(1);
  });
