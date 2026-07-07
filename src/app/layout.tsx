import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ha Duy Khanh | Full-stack Developer",
  description:
    "Full-stack developer building distributed systems. Based in Ha Noi, Vietnam.",
  authors: { name: "Ha Duy Khanh" },
  keywords: [
    "full-stack developer",
    "Go",
    "Java",
    "Kotlin",
    "Spring Boot",
    "Kafka",
    "modular monolith",
    "event-driven",
    "Ha Noi",
    "portfolio",
    "ninggiangboy",
  ],
  openGraph: {
    title: "Ha Duy Khanh | Full-stack Developer",
    description:
      "Full-stack developer building distributed systems. Based in Ha Noi, Vietnam.",
    type: "profile",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ha Duy Khanh | Full-stack Developer",
    description: "Full-stack developer building distributed systems.",
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
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        {children}
      </body>
    </html>
  );
}
