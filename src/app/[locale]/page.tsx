import type { Metadata } from "next";
import { IntlayerServerProvider } from "next-intlayer/server";
import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { BlogTeaser } from "@/components/blog-teaser";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Now } from "@/components/now";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";
import { assertSiteLocale } from "@/lib/i18n";
import { getHomeMetadata } from "@/lib/metadata";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return getHomeMetadata(assertSiteLocale(locale ?? ""));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const safeLocale = assertSiteLocale(locale ?? "");

  return (
    <IntlayerServerProvider locale={safeLocale}>
      <main className="flex flex-col">
        <Hero />
        <About />
        <Stack />
        <Approach />
        <Work />
        <Experience />
        <Now />
        <BlogTeaser locale={safeLocale} />
        <Footer />
      </main>
    </IntlayerServerProvider>
  );
}
