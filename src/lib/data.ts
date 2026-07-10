export type Social = {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "x" | "instagram" | "facebook" | "email";
};

export type StackItem = {
  name: string;
  slug: string;
};

export type StackGroup = {
  label: string;
  note: string;
  items: StackItem[];
};

export type Pattern = {
  name: string;
  detail: string;
};

export type Project = {
  name: string;
  kind: string;
  description: string;
  href?: string;
  status?: "in-progress";
  accent: string;
  diagram?: boolean;
};

export type NowEntry = {
  label: string;
  detail: string;
};

export type SectionIntro = {
  title: string;
  description: string;
};

export type BlogIntroCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type BlogUiCopy = {
  backToBlog: string;
  readArticle: string;
  publishedOn: string;
  emptyState: string;
  tocTitle: string;
  scrollToTopLabel: string;
};

export const profile = {
  name: "Ha Duy Khanh",
  handle: "ninggiangboy",
  role: "Full-Stack Developer",
  based: "Hanoi, Vietnam",
  email: "haduykhanh.hs@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/75935431?s=400&v=4",
  positioning:
    "Full-stack developer building reliable backend platforms and thoughtful product interfaces, with a focus on event-driven systems and maintainable architecture.",
};

export const socials: Social[] = [
  {
    label: "GitHub",
    href: "https://github.com/ninggiangboy",
    handle: "@ninggiangboy",
    icon: "github",
  },
  {
    label: "X",
    href: "https://twitter.com/ninggiangboy",
    handle: "@ninggiangboy",
    icon: "x",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ninggiangboy/",
    handle: "@ninggiangboy",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ninggiangboy/",
    handle: "ninggiangboy",
    icon: "facebook",
  },
  {
    label: "Email",
    href: "mailto:haduykhanh.hs@gmail.com",
    handle: "haduykhanh.hs@gmail.com",
    icon: "email",
  },
];

export const stack: StackGroup[] = [
  {
    label: "Backend",
    note: "Go, Java, and Kotlin for backend services that stay clear under load and easy to evolve.",
    items: [
      { name: "Java", slug: "openjdk" },
      { name: "Spring Boot", slug: "springboot" },
      { name: "Kotlin", slug: "kotlin" },
      { name: "Go", slug: "go" },
    ],
  },
  {
    label: "Data",
    note: "Data systems chosen for clear ownership, fast paths, event streams, and practical analytics.",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Redis", slug: "redis" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "ClickHouse", slug: "clickhouse" },
    ],
  },
  {
    label: "Frontend",
    note: "TypeScript-first interfaces in React or Vue, built to stay aligned with backend boundaries.",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Vue", slug: "vuedotjs" },
      { name: "Tailwind", slug: "tailwindcss" },
    ],
  },
  {
    label: "Platform",
    note: "Containerized delivery, orchestration, and observability that support day-two operations.",
    items: [
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Prometheus", slug: "prometheus" },
      { name: "Grafana", slug: "grafana" },
    ],
  },
];

export const patterns: Pattern[] = [
  {
    name: "Modular monolith",
    detail:
      "Start with well-defined domain boundaries in one deployable, then keep the seams ready for future extraction when scale or team structure demands it.",
  },
  {
    name: "Event-driven",
    detail:
      "Use events to decouple workflows, with a transactional outbox and CDC to keep the database and message bus in sync.",
  },
  {
    name: "Clean architecture",
    detail:
      "Keep business rules at the center, push frameworks to the edges, and make the codebase easier to test, change, and reason about.",
  },
  {
    name: "Observability first",
    detail:
      "Add logs, metrics, and traces early so performance issues and failures are visible before they become expensive to untangle.",
  },
];

export const projects: Project[] = [
  {
    name: "send-flow-backend",
    kind: "Go · Kafka · PostgreSQL · ClickHouse",
    description:
      "An email delivery platform built in Go with a modular monolith architecture, Kafka-driven workflows, a transactional outbox with Debezium CDC, and ClickHouse for delivery analytics.",
    href: "https://github.com/ninggiangboy/send-flow-backend",
    accent: "Go",
    diagram: true,
  },
  {
    name: "send-flow-frontend",
    kind: "TypeScript · React · Vite",
    description:
      "The operational dashboard for send-flow, built with React, TanStack Router, and Vite in a feature-first structure that mirrors backend domain boundaries.",
    href: "https://github.com/ninggiangboy/send-flow-frontend",
    accent: "TypeScript",
  },
];

export const nowEntries: NowEntry[] = [
  {
    label: "Role",
    detail:
      "Working as a Full-Stack Developer, shipping product features across backend services and frontend surfaces.",
  },
  {
    label: "Learning",
    detail:
      "Going deeper on domain-driven design, event-driven systems, and the operational tradeoffs that come with running distributed software in production.",
  },
  {
    label: "Building",
    detail:
      "Building send-flow, an email delivery platform with Kafka-based workflows, ClickHouse analytics, and a clear split between API and worker responsibilities.",
  },
];

export const heroCopy = {
  intro:
    "I build backend systems that scale with clarity and the product interfaces that make them useful. My work centers on event-driven architecture, strong boundaries, and software teams can keep moving inside.",
  primaryCta: "Email me",
  secondaryCta: "View work",
};

export const aboutCopy = {
  title: "About",
  paragraphs: [
    "I am a full-stack developer based in Hanoi, building backend platforms in Go and Spring and the frontend experiences that sit on top of them.",
    "I care about systems that remain understandable as they grow: clear contracts, dependable delivery pipelines, useful observability, and code that still reads cleanly after several iterations.",
  ],
};

export const sectionCopy: Record<
  "work" | "approach" | "stack" | "experience" | "now",
  SectionIntro
> = {
  work: {
    title: "Selected work",
    description:
      "A focused look at the projects that best reflect how I design systems, structure code, and ship product-facing software.",
  },
  approach: {
    title: "Approach",
    description:
      "The engineering patterns I rely on most often when a project needs to stay maintainable, observable, and ready to grow.",
  },
  stack: {
    title: "Toolbox",
    description:
      "The technologies I reach for across backend, data, frontend, and platform work.",
  },
  experience: {
    title: "Experience",
    description:
      "The teams I have worked with and the foundation that shaped how I build software today.",
  },
  now: {
    title: "Now",
    description:
      "What I am focused on at the moment, from day-to-day work to the systems ideas I am actively sharpening.",
  },
};

export const footerCopy = {
  eyebrow: "Get in touch",
  cta: "Email me",
  description:
    "I am open to conversations about backend platforms, full-stack product work, and teams building reliable software.",
};

export const blogIntro: BlogIntroCopy = {
  eyebrow: "Blog",
  title: "Writing on systems, product, and craft",
  description:
    "Notes on backend architecture, product engineering, and the tradeoffs that shape maintainable software.",
};

export const blogUiCopy: BlogUiCopy = {
  backToBlog: "Back to blog",
  readArticle: "Read article",
  publishedOn: "Published",
  emptyState: "No posts available for this locale yet.",
  tocTitle: "On this page",
  scrollToTopLabel: "Back to top",
};

export const blogSwitcherLabel: Record<"en" | "vi", string> = {
  en: "Switch to English version",
  vi: "Switch to Vietnamese version",
};

export const metadataCopy = {
  title: "Ha Duy Khanh | Full-Stack Developer",
  description:
    "Full-stack developer in Hanoi building reliable backend platforms and product interfaces with event-driven architecture and maintainable systems design.",
};

export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  location: string;
};

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
};

export const experience: ExperienceEntry[] = [
  {
    org: "Rabiloo",
    role: "Full-Stack Developer",
    period: "June 2024 - Present",
    location: "Hanoi, Vietnam",
  },
  {
    org: "FPT Software",
    role: "Intern Developer",
    period: "January 2024 - April 2024",
    location: "Hanoi, Vietnam",
  },
];

export const education: EducationEntry[] = [
  {
    school: "FPT University",
    degree: "Bachelor's degree in Software Engineering",
    period: "2021 - 2025",
  },
];
