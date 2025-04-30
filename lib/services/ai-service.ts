// lib/services/ai-service.ts
import { NormalizedCompany } from '@/types/company';

interface OpenRouterResponse {
  id: string;
  choices: {
    message: {
      content: string;
    };
    index: number;
    finish_reason: string;
  }[];
}

interface EmailTemplate {
  subject: string;
  body: string;
}

/**
 * Service for interacting with AI models through OpenRouter
 */
export class AIService {
  // API configuration
  private static API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  private static API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
  private static SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://protiven.ru';
  private static SITE_NAME = 'Protiven Company Profiles';

  /**
   * Make request to OpenRouter API
   */
  private static async makeOpenRouterRequest(prompt: string): Promise<string> {
    try {
      if (!this.API_KEY) {
        throw new Error('OpenRouter API key is not configured');
      }

      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'HTTP-Referer': this.SITE_URL,
          'X-Title': this.SITE_NAME,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/o3',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json() as OpenRouterResponse;
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error making OpenRouter request:', error);
      throw error;
    }
  }

  /**
   * Analyze a company and return a detailed description
   */
  static async analyzeCompany(company: NormalizedCompany): Promise<string> {
    const companyData = {
      name: company.name,
      legalStatus: company.legalStatus,
      website: company.website,
      industry: company.industry?.displayName,
      address: company.address,
      social: company.social || {},
      contacts: company.contacts || {},
      branchesCount: company.branchesCount,
      foundedYear: company.foundedYear,
      employeesCount: company.employeesCount
    };


    const prompt = `Я компания, которая продвигает свой бренд A.L.L. в сегменте Уход за волосами с ценовой категорией премиум. У меня есть огромная база компаний по различным сегментам и с различных источников, агреггированная по ключевым параметрам. Мне необходимо оценить представленную компанию на ее активность и попадание в сегмент и ценовую категорию и перспетиву взаимодействия с ней через прямые контакты, вот ключевая информация по этой компании:
    
    ${JSON.stringify(companyData, null, 2)}

    Выполните следующие шаги для выполнения задания: 1. Тщательно изучите компанию, используя надежные источники, такие как официальные веб-сайты компании, финансовые отчеты, новостные статьи и авторитетные бизнес-базы данных. 2. Соберите информацию по каждой из следующих категорий: - Общая информация - Деловая информация - Финансовая информация - Операционная информация - Рынок и конкуренция - Последние события 3. Структурируйте свой вывод в следующем формате, заполнив информацию для каждого поля: **{{COMPANY_NAME}}** **Общая информация:** - Название компании: [Полное юридическое название компании] - Год основания: [Год основания компании] - Расположение штаб-квартиры: [Город и страна] - Учредители: [Имена и краткие биографические данные основателей] - Генеральный директор и ключевые руководители: [Текущий генеральный директор и другие ключевые руководители] **Деловая информация:** - Отрасль: [Отрасль или отрасли, в которых работает компания] - Код NAICS: [Код NAICS компании] - Продукты и услуги: [Описание основных предлагаемых продуктов и услуг] - Бизнес-модель: [Как компания получает доход] **Финансовая информация:** - Рыночная капитализация: [Если акции компании торгуются на бирже, рыночная капитализация за 2023 год] - Информация об акциях: [Тикерный символ, динамика акций, основные акционеры] - Финансирование и инвесторы: [Ключевые раунды финансирования, основные инвесторы] **Операционная информация:** - Количество сотрудников: [Общая численность персонала] **Рынок и конкуренция:** - Доля рынка: [Положение на рынке относительно конкурентов] - Основные конкуренты: [Ключевые конкуренты в отрасли] - Конкурентное преимущество: [Что отличает компанию от конкурентов] **Последние события:** - Последние новости: [Любые важные недавние новости или объявления] - Слияния и поглощения: [Недавняя или значительная деятельность по слияниям и поглощениям] - Партнерства и альянсы: [Стратегические партнерства] 4. Если вы не можете найти информацию по определенной области, напишите «Информация отсутствует» вместо того, чтобы оставлять поле пустым. 5. Если вы не уверены в какой-либо информации, начните ее с «Сообщается» или «Согласно [источник]», чтобы указать уровень уверенности. 6. Дважды проверьте всю информацию на точность и последовательность, прежде чем включать ее в свой вывод. 7. Убедитесь, что ваш ответ краткий, но информативный, предоставляя ключевые детали без ненужных подробностей. 8. Представьте весь свой вывод в чистом и структурированном формате, как показано выше. Не забудьте сосредоточиться на предоставлении точной, актуальной информации из надежных источников. Если вы не можете найти достаточно информации о компании, четко укажите это в своем ответе.`;

    return this.makeOpenRouterRequest(prompt);
  }

  /**
   * Generate email templates based on company data
   */
  static async generateEmailTemplates(company: NormalizedCompany): Promise<EmailTemplate[]> {
    if (!company.description) {
      throw new Error('Компания должна иметь описание для генерации шаблонов. Сначала проведите анализ компании.');
    }

    const companyData = {
      name: company.name,
      description: company.description,
      industry: company.industry?.displayName,
      website: company.website
    };

    const prompt = `Создай 3 разных шаблона писем для email-рассылки с целью установления делового сотрудничества с компанией. 
    
Данные о компании-получателе:
${JSON.stringify(companyData, null, 2)}

Создай 3 различных варианта писем со следующими характеристиками:
1. Формальное письмо-представление
2. Письмо с конкретным коммерческим предложением
3. Письмо-приглашение на консультацию или демонстрацию

Каждый шаблон должен включать тему письма и текст письма.
Результат верни строго в формате JSON-массива:
[
  {
    "subject": "Тема первого письма",
    "body": "Текст первого письма"
  },
  {
    "subject": "Тема второго письма",
    "body": "Текст второго письма"
  },
  {
    "subject": "Тема третьего письма",
    "body": "Текст третьего письма"
  }
]`;

    try {
      const result = await this.makeOpenRouterRequest(prompt);
      return JSON.parse(result) as EmailTemplate[];
    } catch (error) {
      console.error('Error parsing templates JSON:', error);
      // Fallback in case JSON parsing fails
      return [
        {
          subject: 'Ошибка при создании шаблонов',
          body: 'Произошла ошибка при генерации шаблонов писем. Пожалуйста, попробуйте еще раз.'
        }
      ];
    }
  }
}