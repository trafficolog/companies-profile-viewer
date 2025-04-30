// components/company/company-social-networks.tsx
import React from 'react';
import { Card } from "@heroui/react";
import { Link } from "@heroui/link";
import { LinkIcon } from "@/components/icons";
import { NormalizedCompany } from '@/types/company';

interface CompanySocialNetworksProps {
  social?: Record<string, any>;
}

const CompanySocialNetworks: React.FC<CompanySocialNetworksProps> = ({ social }) => {
  if (!social || Object.keys(social).filter(key => !!social[key]).length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <p className="text-default-500">Нет данных о социальных сетях для этой компании</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Перебираем все поля social и отображаем их */}
        {Object.entries(social).map(([key, value]) => {
          if (!value) return null;
          
          // Формируем ссылку в зависимости от платформы
          let href = value as string;
          let displayName = key.charAt(0).toUpperCase() + key.slice(1);
          
          switch (key) {
            case 'telegram':
              href = (value as string).startsWith('https://t.me/') 
                ? value as string 
                : `https://t.me/${(value as string).replace('@', '')}`;
              displayName = 'Telegram';
              break;
            case 'whatsapp':
              href = (value as string).startsWith('https://wa.me/') 
                ? value as string 
                : `https://wa.me/${(value as string).replace(/[^0-9]/g, '')}`;
              displayName = 'WhatsApp';
              break;
            case 'viber':
              href = (value as string).startsWith('viber://') 
                ? value as string 
                : `viber://chat?number=${(value as string).replace(/[^0-9]/g, '')}`;
              displayName = 'Viber';
              break;
            case 'vkontakte':
              href = (value as string).startsWith('https://vk.com/') 
                ? value as string 
                : `https://vk.com/${value as string}`;
              displayName = 'ВКонтакте';
              break;
            case 'odnoklassniki':
              href = (value as string).startsWith('https://ok.ru/') 
                ? value as string 
                : `https://ok.ru/${value as string}`;
              displayName = 'Одноклассники';
              break;
            case 'instagram':
              href = (value as string).startsWith('https://instagram.com/') 
                ? value as string 
                : `https://instagram.com/${(value as string).replace('@', '')}`;
              displayName = 'Instagram';
              break;
            case 'facebook':
              href = (value as string).startsWith('https://facebook.com/') 
                ? value as string 
                : `https://facebook.com/${value as string}`;
              displayName = 'Facebook';
              break;
            case 'rutube':
              href = (value as string).startsWith('https://rutube.ru/') 
                ? value as string 
                : `https://rutube.ru/channel/${value as string}`;
              displayName = 'Rutube';
              break;
            case 'yandexZen':
              href = (value as string).startsWith('https://zen.yandex.ru/') 
                ? value as string 
                : `https://zen.yandex.ru/${value as string}`;
              displayName = 'Яндекс Дзен';
              break;
            case 'youtube':
              href = (value as string).startsWith('https://youtube.com/') 
                ? value as string 
                : `https://youtube.com/${value as string}`;
              displayName = 'YouTube';
              break;
            case 'twitter':
              href = (value as string).startsWith('https://twitter.com/') 
                ? value as string 
                : `https://twitter.com/${(value as string).replace('@', '')}`;
              displayName = 'Twitter';
              break;
          }
          
          return (
            <Card shadow="none" className="border p-4" key={key}>
              <div className="flex items-center gap-2">
                <div className="text-default-500 w-8 flex justify-center">
                  <LinkIcon size={16} />
                </div>
                <div>
                  <div className="text-sm font-medium">{displayName}</div>
                  <Link 
                    href={href}
                    isExternal
                    showAnchorIcon
                    color="primary"
                  >
                    {value}
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CompanySocialNetworks;