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
};

export type NowEntry = {
  label: string;
  detail: string;
};

export const profile = {
  name: "Ha Duy Khanh",
  handle: "ninggiangboy",
  role: "Full-stack Developer",
  based: "Ha Noi, Vietnam",
  email: "haduykhanh.hs@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/75935431?s=400&v=4",
  quote: "What we need is not sensitivity but a measuring stick.",
  positioning:
    "Full-stack developer building distributed backends with modular monoliths and a transactional outbox.",
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
    note: "Java and Kotlin in the Spring ecosystem, Go for production services.",
    items: [
      { name: "Java", slug: "openjdk" },
      { name: "Spring Boot", slug: "springboot" },
      { name: "Kotlin", slug: "kotlin" },
      { name: "Go", slug: "go" },
    ],
  },
  {
    label: "Data",
    note: "Postgres for truth, Redis for hot paths, Kafka for events, ClickHouse for analytics.",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Redis", slug: "redis" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "ClickHouse", slug: "clickhouse" },
    ],
  },
  {
    label: "Frontend",
    note: "React and Vue, depending on the project. TypeScript always.",
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
    note: "Containers, orchestration, and an observability stack I actually use.",
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
      "Bounded contexts in one deployable, with seams wide enough to split when the load asks for it.",
  },
  {
    name: "Event-driven",
    detail:
      "Kafka and a transactional outbox, with Debezium CDC so the database and the bus never disagree.",
  },
  {
    name: "Clean architecture",
    detail:
      "Domain at the center, use cases around it, ports and adapters outward. Frameworks stay on the edge.",
  },
  {
    name: "Observability first",
    detail:
      "Prometheus, Grafana, Loki, and Tempo wired in from the first commit, not bolted on before launch.",
  },
];

export const projects: Project[] = [
  {
    name: "send-flow-backend",
    kind: "Go · Kafka · PostgreSQL · ClickHouse",
    description:
      "A modular monolith email delivery platform in Go. Clean architecture, event-driven with a Kafka and Debezium outbox, ClickHouse analytics, and an API plus worker split.",
    href: "https://github.com/ninggiangboy/send-flow-backend",
    accent: "Go",
  },
  {
    name: "send-flow-frontend",
    kind: "TypeScript · React · Vite",
    description:
      "The dashboard for send-flow. React, TanStack Router, and Vite, organized feature-first to mirror the backend's bounded contexts.",
    href: "https://github.com/ninggiangboy/send-flow-frontend",
    accent: "TypeScript",
  },
];

export const nowEntries: NowEntry[] = [
  {
    label: "Role",
    detail:
      "Started a new full-stack role. Settling in, shipping the first tickets.",
  },
  {
    label: "Learning",
    detail:
      "Going deeper on domain-driven design, event-driven design, and running distributed systems in production.",
  },
  {
    label: "Building",
    detail:
      "send-flow, an email delivery platform. Kafka outbox, ClickHouse analytics, an API and a worker.",
  },
];

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
    role: "Full Stack Developer",
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
    degree: "Bachelor's degree, Computer Software Engineering",
    period: "2021 - 2025",
  },
];
