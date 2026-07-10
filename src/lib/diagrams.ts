import type { DiagramEdge, DiagramNode } from "@/components/system-diagram";

export const sendflowDiagram: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  viewBox: { w: number; h: number };
} = {
  viewBox: { w: 1200, h: 440 },
  nodes: [
    {
      id: "client",
      label: "Dashboard / API client",
      detail:
        "Surface for operators and external apps to trigger sends, manage templates, and inspect delivery state.",
      x: 190,
      y: 60,
    },
    {
      id: "recipient",
      label: "Recipient",
      detail:
        "End user inbox destination receiving transactional or campaign email.",
      x: 190,
      y: 170,
    },
    {
      id: "provider",
      label: "Email provider",
      detail:
        "Outbound SMTP or API provider responsible for final delivery to recipient domains.",
      x: 190,
      y: 280,
    },
    {
      id: "operator",
      label: "Operator",
      detail:
        "Internal user reviewing metrics, tracing incidents, and adjusting messaging operations.",
      x: 190,
      y: 390,
      muted: true,
    },
    {
      id: "gateway",
      label: "Gateway",
      detail:
        "Edge entrypoint handling auth, rate limiting, request normalization, and routing into backend services.",
      x: 450,
      y: 170,
    },
    {
      id: "api",
      label: "API service",
      detail:
        "Core control plane that validates payloads, persists state, and publishes jobs for async execution.",
      x: 730,
      y: 100,
    },
    {
      id: "worker",
      label: "Worker service",
      detail:
        "Background processors consuming queue events to render, send, retry, and record outcomes.",
      x: 730,
      y: 310,
    },
    {
      id: "postgres",
      label: "Postgres",
      detail:
        "Primary relational store for tenants, templates, message metadata, and delivery state.",
      x: 1060,
      y: 50,
    },
    {
      id: "redis",
      label: "Redis",
      detail:
        "Low-latency cache and coordination layer for throttling, idempotency, and ephemeral state.",
      x: 1060,
      y: 130,
    },
    {
      id: "kafka",
      label: "Kafka / Redpanda",
      detail:
        "Durable event stream buffering email jobs and internal state transitions between services.",
      x: 1060,
      y: 210,
    },
    {
      id: "clickhouse",
      label: "ClickHouse",
      detail:
        "Analytics store optimized for high-volume event ingestion and operational reporting.",
      x: 1060,
      y: 290,
    },
    {
      id: "storage",
      label: "MinIO / S3",
      detail:
        "Object storage for template assets, exports, message payload archives, and artifacts.",
      x: 1060,
      y: 370,
    },
    {
      id: "observability",
      label: "Observability",
      detail:
        "Unified logs, metrics, and traces used to monitor throughput, failures, and latency across the stack.",
      x: 730,
      y: 390,
      muted: true,
    },
  ],
  edges: [
    { from: "client", to: "gateway", pulse: true },
    { from: "recipient", to: "gateway" },
    { from: "provider", to: "gateway" },
    { from: "gateway", to: "api", pulse: true },
    { from: "api", to: "postgres", pulse: true },
    { from: "api", to: "redis", pulse: true },
    { from: "api", to: "kafka", pulse: true },
    { from: "api", to: "storage", dashed: true, pulse: true },
    { from: "kafka", to: "worker", pulse: true },
    { from: "worker", to: "postgres", pulse: true },
    { from: "worker", to: "redis", pulse: true },
    { from: "worker", to: "clickhouse", pulse: true },
    { from: "worker", to: "storage", dashed: true, pulse: true },
    { from: "worker", to: "provider", pulse: true },
    { from: "api", to: "observability", dashed: true },
    { from: "worker", to: "observability", dashed: true },
    { from: "operator", to: "observability" },
  ],
};

export const sendflowDiagramMobile: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  viewBox: { w: number; h: number };
} = {
  viewBox: { w: 560, h: 920 },
  nodes: [
    {
      id: "client",
      label: "Dashboard / API client",
      detail:
        "Surface for operators and external apps to trigger sends, manage templates, and inspect delivery state.",
      x: 160,
      y: 80,
    },
    {
      id: "recipient",
      label: "Recipient",
      detail:
        "End user inbox destination receiving transactional or campaign email.",
      x: 160,
      y: 180,
    },
    {
      id: "provider",
      label: "Email provider",
      detail:
        "Outbound SMTP or API provider responsible for final delivery to recipient domains.",
      x: 160,
      y: 600,
    },
    {
      id: "operator",
      label: "Operator",
      detail:
        "Internal user reviewing metrics, tracing incidents, and adjusting messaging operations.",
      x: 160,
      y: 840,
      muted: true,
    },
    {
      id: "gateway",
      label: "Gateway",
      detail:
        "Edge entrypoint handling auth, rate limiting, request normalization, and routing into backend services.",
      x: 390,
      y: 180,
    },
    {
      id: "api",
      label: "API service",
      detail:
        "Core control plane that validates payloads, persists state, and publishes jobs for async execution.",
      x: 390,
      y: 300,
    },
    {
      id: "worker",
      label: "Worker service",
      detail:
        "Background processors consuming queue events to render, send, retry, and record outcomes.",
      x: 390,
      y: 540,
    },
    {
      id: "postgres",
      label: "Postgres",
      detail:
        "Primary relational store for tenants, templates, message metadata, and delivery state.",
      x: 160,
      y: 400,
    },
    {
      id: "redis",
      label: "Redis",
      detail:
        "Low-latency cache and coordination layer for throttling, idempotency, and ephemeral state.",
      x: 390,
      y: 400,
    },
    {
      id: "kafka",
      label: "Kafka / Redpanda",
      detail:
        "Durable event stream buffering email jobs and internal state transitions between services.",
      x: 160,
      y: 500,
    },
    {
      id: "clickhouse",
      label: "ClickHouse",
      detail:
        "Analytics store optimized for high-volume event ingestion and operational reporting.",
      x: 160,
      y: 700,
    },
    {
      id: "storage",
      label: "MinIO / S3",
      detail:
        "Object storage for template assets, exports, message payload archives, and artifacts.",
      x: 390,
      y: 700,
    },
    {
      id: "observability",
      label: "Observability",
      detail:
        "Unified logs, metrics, and traces used to monitor throughput, failures, and latency across the stack.",
      x: 390,
      y: 840,
      muted: true,
    },
  ],
  edges: sendflowDiagram.edges,
};
