import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { BlogTeaser } from "@/components/blog-teaser";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Now } from "@/components/now";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Stack />
      <Approach />
      <Work />
      <Experience />
      <Now />
      <BlogTeaser />
      <Footer />
    </main>
  );
}
