// config/site.ts
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Protiven",
  description: "Просмотр профилей компаний собранных с разных публичных источников",
  navItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Компании",
      href: "/companies",
    },
    {
      label: "Источники данных",
      href: "/industries",
    },
    {
      label: "Аналитика",
      href: "/analytics",
    },
    {
      label: "Документация",
      href: "/docs",
    }
  ],
  navMenuItems: [
    {
      label: "Настройки",
      href: "/settings",
    },
    {
      label: "Помощь",
      href: "/help",
    },
    {
      label: "Документация",
      href: "/docs",
    }
  ],
  links: {
    github: "https://github.com/splat-team"
  }
};
