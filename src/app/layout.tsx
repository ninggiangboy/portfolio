import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Nav } from "@/components/nav";
import { ThemeController } from "@/components/theme-toggle";
import { metadataCopy, profile } from "@/lib/data";
import "./globals.css";

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

export const metadata: Metadata = {
  title: metadataCopy.title,
  description: metadataCopy.description,
  authors: { name: profile.name },
  keywords: [
    "full-stack developer",
    "Go",
    "Java",
    "Kotlin",
    "Spring Boot",
    "Kafka",
    "modular monolith",
    "event-driven",
    "Hanoi",
    "portfolio",
    "ninggiangboy",
  ],
  openGraph: {
    title: metadataCopy.title,
    description: metadataCopy.description,
    type: "profile",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: metadataCopy.title,
    description: metadataCopy.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeController />
        <Nav />
        {children}
      </body>
    </html>
  );
}
