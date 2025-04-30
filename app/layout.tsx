// app/layout.tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";
import SidebarLayout from "./sidebar-layout";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { HeartIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <SidebarLayout>
            <div className="flex flex-col min-h-full">
              {children}
              <footer className="flex items-center justify-center py-3 mt-auto border-t-1">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-sm"
                  href="https://splatglobal.com"
                  title="splatglobal.com homepage"
                >
                  <span className="text-default-600">Разработано c </span>
                  <span><HeartIcon/></span>
                  <span className="text-default-600"> командой</span>
                  <p className="text-primary">Frame Digital Mega Best Website Team</p>
                </Link>
              </footer>
            </div>
          </SidebarLayout>
        </Providers>
      </body>
    </html>
  );
}