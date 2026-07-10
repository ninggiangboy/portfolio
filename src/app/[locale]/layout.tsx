import { getHTMLTextDir } from "intlayer";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { NextLayoutIntlayer } from "next-intlayer";
import { generateStaticParams, IntlayerClientProvider } from "next-intlayer";
import { Nav } from "@/components/nav";
import { ThemeController } from "@/components/theme-toggle";
import { assertSiteLocale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeScript = `
(() => {
  const storageKey = "theme";
  const storedTheme = window.localStorage.getItem(storageKey);
  const theme =
    storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
`;

export { generateStaticParams };

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  const safeLocale = assertSiteLocale(locale ?? "");

  return (
    <html
      lang={safeLocale}
      dir={getHTMLTextDir(safeLocale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <IntlayerClientProvider locale={safeLocale}>
          <ThemeController />
          <Nav />
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
