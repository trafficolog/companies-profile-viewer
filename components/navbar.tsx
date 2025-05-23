// components/navbar.tsx
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { StrapiStatus } from "@/components/strapi-status";

// Updated navigation items without Home
const navItems = siteConfig.navItems.filter(item => item.label !== "Главная");

// Add "Прогрев" item after "Компании"
const updatedNavItems = [...navItems];
const companiesIndex = updatedNavItems.findIndex(item => item.label === "Компании");
if (companiesIndex !== -1) {
  updatedNavItems.splice(companiesIndex + 1, 0, {
    label: "Прогрев",
    href: "/warming"
  });
}

export const Navbar = () => {
  return (
    <HeroUINavbar className="container m-auto" maxWidth="full" position="sticky">
      {/* Логотип и пункты меню */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as={NextLink} href="/" className="cursor-pointer">
          <span className="font-bold text-3xl">{siteConfig.name}</span>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-6">
          {updatedNavItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* Статус Strapi и переключатель темы */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-4 items-center">
          <StrapiStatus />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Мобильное меню */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Меню для мобильных устройств */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {updatedNavItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <NextLink
                href={item.href}
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
          <div className="mt-4 border-t border-default-200 pt-4">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <NextLink
                  href={item.href}
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            ))}
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};