import { type Dictionary, t } from "intlayer";

const siteContent = {
  key: "site",
  content: {
    profile: {
      role: t({
        en: "Full-Stack Developer",
        vi: "Full-Stack Developer",
      }),
      based: t({
        en: "Hanoi, Vietnam",
        vi: "Hanoi, Vietnam",
      }),
      positioning: t({
        en: "Full-stack developer building reliable backend platforms and thoughtful product interfaces, with a focus on event-driven systems and maintainable architecture.",
        vi: "Full-stack developer building reliable backend platforms and thoughtful product interfaces, with a focus on event-driven systems and maintainable architecture.",
      }),
      portraitAlt: t({
        en: "Portrait of Ha Duy Khanh",
        vi: "Portrait of Ha Duy Khanh",
      }),
    },
    nav: {
      about: t({ en: "About", vi: "About" }),
      stack: t({ en: "Stack", vi: "Stack" }),
      work: t({ en: "Work", vi: "Work" }),
      experience: t({ en: "Experience", vi: "Experience" }),
      now: t({ en: "Now", vi: "Now" }),
      blog: t({ en: "Notes", vi: "Notes" }),
      openMenu: t({ en: "Open menu", vi: "Open menu" }),
      closeMenu: t({ en: "Close menu", vi: "Close menu" }),
    },
    hero: {
      intro: t({
        en: "I build backend systems that scale with clarity and the product interfaces that make them useful. My work centers on event-driven architecture, strong boundaries, and software teams can keep moving inside.",
        vi: "I build backend systems that scale with clarity and the product interfaces that make them useful. My work centers on event-driven architecture, strong boundaries, and software teams can keep moving inside.",
      }),
      primaryCta: t({
        en: "Contact me",
        vi: "Contact me",
      }),
      secondaryCta: t({
        en: "View work",
        vi: "View work",
      }),
    },
    about: {
      title: t({ en: "About", vi: "About" }),
      paragraphs: [
        t({
          en: "I am a full-stack developer based in Hanoi, building backend platforms in Go and Spring and the frontend experiences that sit on top of them.",
          vi: "I am a full-stack developer based in Hanoi, building backend platforms in Go and Spring and the frontend experiences that sit on top of them.",
        }),
        t({
          en: "I care about systems that remain understandable as they grow: clear contracts, dependable delivery pipelines, useful observability, and code that still reads cleanly after several iterations.",
          vi: "I care about systems that remain understandable as they grow: clear contracts, dependable delivery pipelines, useful observability, and code that still reads cleanly after several iterations.",
        }),
      ],
    },
    sections: {
      work: {
        title: t({ en: "Selected work", vi: "Selected work" }),
        description: t({
          en: "A focused look at the projects that best reflect how I design systems, structure code, and ship product-facing software.",
          vi: "A focused look at the projects that best reflect how I design systems, structure code, and ship product-facing software.",
        }),
      },
      approach: {
        title: t({ en: "Approach", vi: "Approach" }),
        description: t({
          en: "The engineering patterns I rely on most often when a project needs to stay maintainable, observable, and ready to grow.",
          vi: "The engineering patterns I rely on most often when a project needs to stay maintainable, observable, and ready to grow.",
        }),
      },
      stack: {
        title: t({ en: "Toolbox", vi: "Toolbox" }),
        description: t({
          en: "The technologies I reach for across backend, data, frontend, and platform work.",
          vi: "The technologies I reach for across backend, data, frontend, and platform work.",
        }),
      },
      experience: {
        title: t({ en: "Experience", vi: "Experience" }),
        description: t({
          en: "The teams I have worked with and the foundation that shaped how I build software today.",
          vi: "The teams I have worked with and the foundation that shaped how I build software today.",
        }),
      },
      now: {
        title: t({ en: "Now", vi: "Now" }),
        description: t({
          en: "What I am focused on at the moment, from day-to-day work to the systems ideas I am actively sharpening.",
          vi: "What I am focused on at the moment, from day-to-day work to the systems ideas I am actively sharpening.",
        }),
      },
    },
    stackGroups: [
      {
        label: t({ en: "Backend", vi: "Backend" }),
        note: t({
          en: "Go, Java, and Kotlin for backend services that stay clear under load and easy to evolve.",
          vi: "Go, Java, and Kotlin for backend services that stay clear under load and easy to evolve.",
        }),
        items: [
          { name: "Java", slug: "openjdk" },
          { name: "Spring Boot", slug: "springboot" },
          { name: "Kotlin", slug: "kotlin" },
          { name: "Go", slug: "go" },
        ],
      },
      {
        label: t({ en: "Data", vi: "Data" }),
        note: t({
          en: "Data systems chosen for clear ownership, fast paths, event streams, and practical analytics.",
          vi: "Data systems chosen for clear ownership, fast paths, event streams, and practical analytics.",
        }),
        items: [
          { name: "PostgreSQL", slug: "postgresql" },
          { name: "Redis", slug: "redis" },
          { name: "Kafka", slug: "apachekafka" },
          { name: "ClickHouse", slug: "clickhouse" },
        ],
      },
      {
        label: t({ en: "Frontend", vi: "Frontend" }),
        note: t({
          en: "TypeScript-first interfaces in React or Vue, built to stay aligned with backend boundaries.",
          vi: "TypeScript-first interfaces in React or Vue, built to stay aligned with backend boundaries.",
        }),
        items: [
          { name: "React", slug: "react" },
          { name: "Next.js", slug: "nextdotjs" },
          { name: "TypeScript", slug: "typescript" },
          { name: "Vue", slug: "vuedotjs" },
          { name: "Tailwind", slug: "tailwindcss" },
        ],
      },
      {
        label: t({ en: "Platform", vi: "Platform" }),
        note: t({
          en: "Containerized delivery, orchestration, and observability that support day-two operations.",
          vi: "Containerized delivery, orchestration, and observability that support day-two operations.",
        }),
        items: [
          { name: "Docker", slug: "docker" },
          { name: "Kubernetes", slug: "kubernetes" },
          { name: "Prometheus", slug: "prometheus" },
          { name: "Grafana", slug: "grafana" },
        ],
      },
    ],
    patterns: [
      {
        name: t({ en: "Modular monolith", vi: "Modular monolith" }),
        detail: t({
          en: "Start with well-defined domain boundaries in one deployable, then keep the seams ready for future extraction when scale or team structure demands it.",
          vi: "Start with well-defined domain boundaries in one deployable, then keep the seams ready for future extraction when scale or team structure demands it.",
        }),
      },
      {
        name: t({ en: "Event-driven", vi: "Event-driven" }),
        detail: t({
          en: "Use events to decouple workflows, with a transactional outbox and CDC to keep the database and message bus in sync.",
          vi: "Use events to decouple workflows, with a transactional outbox and CDC to keep the database and message bus in sync.",
        }),
      },
      {
        name: t({ en: "Clean architecture", vi: "Clean architecture" }),
        detail: t({
          en: "Keep business rules at the center, push frameworks to the edges, and make the codebase easier to test, change, and reason about.",
          vi: "Keep business rules at the center, push frameworks to the edges, and make the codebase easier to test, change, and reason about.",
        }),
      },
      {
        name: t({ en: "Observability first", vi: "Observability first" }),
        detail: t({
          en: "Add logs, metrics, and traces early so performance issues and failures are visible before they become expensive to untangle.",
          vi: "Add logs, metrics, and traces early so performance issues and failures are visible before they become expensive to untangle.",
        }),
      },
    ],
    projects: [
      {
        name: "send-flow-backend",
        kind: t({
          en: "Go · Kafka · PostgreSQL · ClickHouse",
          vi: "Go · Kafka · PostgreSQL · ClickHouse",
        }),
        description: t({
          en: "An email delivery platform built in Go with a modular monolith architecture, Kafka-driven workflows, a transactional outbox with Debezium CDC, and ClickHouse for delivery analytics.",
          vi: "An email delivery platform built in Go with a modular monolith architecture, Kafka-driven workflows, a transactional outbox with Debezium CDC, and ClickHouse for delivery analytics.",
        }),
        href: "https://github.com/ninggiangboy/send-flow-backend",
        accent: "Go",
        diagram: true,
      },
      {
        name: "send-flow-frontend",
        kind: t({
          en: "TypeScript · React · Vite",
          vi: "TypeScript · React · Vite",
        }),
        description: t({
          en: "The operational dashboard for send-flow, built with React, TanStack Router, and Vite in a feature-first structure that mirrors backend domain boundaries.",
          vi: "The operational dashboard for send-flow, built with React, TanStack Router, and Vite in a feature-first structure that mirrors backend domain boundaries.",
        }),
        href: "https://github.com/ninggiangboy/send-flow-frontend",
        accent: "TypeScript",
      },
    ],
    workUi: {
      repository: t({ en: "Repository", vi: "Repository" }),
      inProgress: t({ en: "In progress", vi: "In progress" }),
      systemArchitecture: t({
        en: "System architecture",
        vi: "System architecture",
      }),
      architectureDiagramSuffix: t({
        en: "system architecture diagram",
        vi: "system architecture diagram",
      }),
    },
    experience: {
      jobs: [
        {
          org: "Rabiloo",
          role: t({
            en: "Full-Stack Developer",
            vi: "Full-Stack Developer",
          }),
          period: t({
            en: "June 2024 - Present",
            vi: "June 2024 - Present",
          }),
          location: t({
            en: "Hanoi, Vietnam",
            vi: "Hanoi, Vietnam",
          }),
        },
        {
          org: "FPT Software",
          role: t({
            en: "Intern Developer",
            vi: "Intern Developer",
          }),
          period: t({
            en: "January 2024 - April 2024",
            vi: "January 2024 - April 2024",
          }),
          location: t({
            en: "Hanoi, Vietnam",
            vi: "Hanoi, Vietnam",
          }),
        },
      ],
      educationLabel: t({ en: "Education", vi: "Education" }),
      education: {
        school: "FPT University",
        degree: t({
          en: "Bachelor's degree in Software Engineering",
          vi: "Bachelor's degree in Software Engineering",
        }),
        period: t({
          en: "2021 - 2025",
          vi: "2021 - 2025",
        }),
      },
    },
    nowEntries: [
      {
        label: t({ en: "Role", vi: "Role" }),
        detail: t({
          en: "Working as a Full-Stack Developer, shipping product features across backend services and frontend surfaces.",
          vi: "Working as a Full-Stack Developer, shipping product features across backend services and frontend surfaces.",
        }),
      },
      {
        label: t({ en: "Learning", vi: "Learning" }),
        detail: t({
          en: "Going deeper on domain-driven design, event-driven systems, and the operational tradeoffs that come with running distributed software in production.",
          vi: "Going deeper on domain-driven design, event-driven systems, and the operational tradeoffs that come with running distributed software in production.",
        }),
      },
      {
        label: t({ en: "Building", vi: "Building" }),
        detail: t({
          en: "Building send-flow, an email delivery platform with Kafka-based workflows, ClickHouse analytics, and a clear split between API and worker responsibilities.",
          vi: "Building send-flow, an email delivery platform with Kafka-based workflows, ClickHouse analytics, and a clear split between API and worker responsibilities.",
        }),
      },
    ],
    footer: {
      eyebrow: t({ en: "Get in touch", vi: "Get in touch" }),
      cta: t({ en: "Start a conversation", vi: "Start a conversation" }),
      description: t({
        en: "I am open to conversations about backend platforms, full-stack product work, and teams building reliable software.",
        vi: "I am open to conversations about backend platforms, full-stack product work, and teams building reliable software.",
      }),
      form: {
        nameLabel: t({ en: "Name", vi: "Name" }),
        namePlaceholder: t({
          en: "How should I address you?",
          vi: "How should I address you?",
        }),
        nameValidation: t({
          en: "Enter a name with at least 2 characters.",
          vi: "Enter a name with at least 2 characters.",
        }),
        emailLabel: t({ en: "Email", vi: "Email" }),
        emailPlaceholder: t({
          en: "Where should I reply?",
          vi: "Where should I reply?",
        }),
        emailValidation: t({
          en: "Enter a valid email address.",
          vi: "Enter a valid email address.",
        }),
        messageLabel: t({ en: "Message", vi: "Message" }),
        messagePlaceholder: t({
          en: "Share the project, role, or question you have in mind.",
          vi: "Share the project, role, or question you have in mind.",
        }),
        messageValidation: t({
          en: "Add a bit more context so I can respond usefully.",
          vi: "Add a bit more context so I can respond usefully.",
        }),
        submit: t({ en: "Send message", vi: "Send message" }),
        pending: t({ en: "Sending...", vi: "Sending..." }),
        success: t({
          en: "Message sent. I will reply as soon as I can.",
          vi: "Message sent. I will reply as soon as I can.",
        }),
        formError: t({
          en: "The message could not be sent. Please try again in a moment.",
          vi: "The message could not be sent. Please try again in a moment.",
        }),
        turnstileError: t({
          en: "Complete the spam check before sending your message.",
          vi: "Complete the spam check before sending your message.",
        }),
      },
    },
  },
} satisfies Dictionary;

export default siteContent;
