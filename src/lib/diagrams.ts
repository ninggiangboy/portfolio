import type { DiagramEdge, DiagramNode } from "@/components/system-diagram";

export const sendflowDiagram: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  viewBox: { w: number; h: number };
} = {
  viewBox: { w: 1200, h: 440 },
  nodes: [
    { id: "client", label: "Dashboard / API client", x: 110, y: 60 },
    { id: "recipient", label: "Recipient", x: 110, y: 170 },
    { id: "provider", label: "Email provider", x: 110, y: 280 },
    { id: "operator", label: "Operator", x: 110, y: 390, muted: true },
    { id: "gateway", label: "Gateway", x: 370, y: 170 },
    { id: "api", label: "API service", x: 650, y: 100 },
    { id: "worker", label: "Worker service", x: 650, y: 310 },
    { id: "postgres", label: "Postgres", x: 980, y: 50 },
    { id: "redis", label: "Redis", x: 980, y: 130 },
    { id: "kafka", label: "Kafka / Redpanda", x: 980, y: 210 },
    { id: "clickhouse", label: "ClickHouse", x: 980, y: 290 },
    { id: "storage", label: "MinIO / S3", x: 980, y: 370 },
    {
      id: "observability",
      label: "Observability",
      x: 650,
      y: 390,
      muted: true,
    },
  ],
  edges: [
    { from: "client", to: "gateway", pulse: true, delay: 0 },
    { from: "recipient", to: "gateway" },
    { from: "provider", to: "gateway" },
    { from: "gateway", to: "api", pulse: true, delay: 0.3 },
    { from: "api", to: "postgres", pulse: true, delay: 0.6 },
    { from: "api", to: "redis" },
    { from: "api", to: "kafka", pulse: true, delay: 0.9 },
    { from: "api", to: "storage", dashed: true },
    { from: "kafka", to: "worker", pulse: true, delay: 1.2 },
    { from: "worker", to: "postgres" },
    { from: "worker", to: "redis" },
    { from: "worker", to: "clickhouse", pulse: true, delay: 1.5 },
    { from: "worker", to: "provider", pulse: true, delay: 1.8 },
    { from: "worker", to: "storage", dashed: true },
    { from: "api", to: "observability", dashed: true },
    { from: "worker", to: "observability", dashed: true },
    { from: "operator", to: "observability" },
  ],
};
