// src/lib/services/company-service.ts

import { LegalStatus, PriceTier } from '@/types/company';

/**
 * Класс для работы с данными компаний
 */
export class CompanyService {
  /**
   * Форматирует организационно-правовую форму для отображения
   */
  static formatLegalStatus(status: LegalStatus): string {
    const statusMap: Record<LegalStatus, string> = {
      company: 'Компания',
      individual_entrepreneur: 'ИП',
      self_employed: 'Самозанятый',
      individual: 'Физлицо',
      unknown: 'Не указано'
    };
    return statusMap[status] || 'Не указано';
  }

  /**
   * Форматирует ценовой уровень для отображения
   */
  static formatPriceTier(tier: PriceTier): string {
    const tierMap: Record<PriceTier, string> = {
      premium: 'Премиум',
      'mid-range': 'Средний',
      budget: 'Бюджетный',
      unknown: 'Не определен'
    };
    return tierMap[tier] || 'Не определен';
  }

  /**
   * Форматирует URL сайта, добавляя протокол, если он отсутствует
   */
  static formatWebsiteUrl(website: string): string {
    return website.startsWith('http') ? website : `https://${website}`;
  }

  /**
   * Форматирует номер телефона для отображения
   */
  static formatPhoneNumber(phone: string): string {
    // Очищаем номер от символов, кроме цифр
    const digits = phone.replace(/\D/g, '');
    
    // Если это российский номер (11 цифр, начинается с 7 или 8)
    if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
      const countryCode = '+7';
      const areaCode = digits.substring(1, 4);
      const firstPart = digits.substring(4, 7);
      const secondPart = digits.substring(7, 9);
      const thirdPart = digits.substring(9, 11);
      
      return `${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
    }
    
    // Для других номеров возвращаем без изменений
    return phone;
  }

  /**
   * Создает ссылку для социальной сети на основе имени и значения
   */
  static formatSocialLink(network: string, value: string): string {
    if (!value) return '';
    
    switch(network) {
      case 'telegram':
        return value.startsWith('https://t.me/') ? value : `https://t.me/${value.replace('@', '')}`;
      case 'whatsapp':
        return value.startsWith('https://wa.me/') ? value : `https://wa.me/${value.replace(/[^0-9]/g, '')}`;
      case 'viber':
        return value.startsWith('viber://') ? value : `viber://chat?number=${value.replace(/[^0-9]/g, '')}`;
      case 'vkontakte':
        return value.startsWith('https://vk.com/') ? value : `https://vk.com/${value}`;
      case 'odnoklassniki':
        return value.startsWith('https://ok.ru/') ? value : `https://ok.ru/${value}`;
      case 'instagram':
        return value.startsWith('https://instagram.com/') ? value : `https://instagram.com/${value.replace('@', '')}`;
      case 'facebook':
        return value.startsWith('https://facebook.com/') ? value : `https://facebook.com/${value}`;
      case 'rutube':
        return value.startsWith('https://rutube.ru/') ? value : `https://rutube.ru/channel/${value}`;
      case 'yandexZen':
        return value.startsWith('https://zen.yandex.ru/') ? value : `https://zen.yandex.ru/${value}`;
      case 'youtube':
        return value.startsWith('https://youtube.com/') ? value : `https://youtube.com/${value}`;
      case 'twitter':
        return value.startsWith('https://twitter.com/') ? value : `https://twitter.com/${value.replace('@', '')}`;
      default:
        return value;
    }
  }
}