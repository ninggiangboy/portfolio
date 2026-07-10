"use client";

import { motion, useReducedMotion } from "motion/react";

export type DiagramNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  muted?: boolean;
};

export type DiagramEdge = {
  from: string;
  to: string;
  dashed?: boolean;
  pulse?: boolean;
  delay?: number;
};

export function SystemDiagram({
  nodes,
  edges,
  viewBox,
  className,
  ariaLabel,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  viewBox: { w: number; h: number };
  className?: string;
  ariaLabel: string;
}) {
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const nodeH = 34;
  const widthOf = (node: DiagramNode) =>
    Math.max(76, node.label.length * 7.4 + 28);

  return (
    <svg
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <filter
          id="diagram-glow"
          x="-200%"
          y="-200%"
          width="500%"
          height="500%"
        >
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map((edge) => {
        const from = byId[edge.from];
        const to = byId[edge.to];
        if (!from || !to) return null;
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="var(--line)"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeDasharray={edge.dashed ? "2 5" : undefined}
          />
        );
      })}

      {!reduce &&
        edges
          .filter((e) => e.pulse)
          .map((edge) => {
            const from = byId[edge.from];
            const to = byId[edge.to];
            if (!from || !to) return null;
            return (
              <motion.circle
                key={`pulse-${edge.from}-${edge.to}`}
                r={3}
                fill="var(--accent)"
                filter="url(#diagram-glow)"
                animate={{
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.2,
                  delay: edge.delay ?? 0,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
              />
            );
          })}

      {nodes.map((node) => {
        const w = widthOf(node);
        return (
          <g key={node.id}>
            <rect
              x={node.x - w / 2}
              y={node.y - nodeH / 2}
              width={w}
              height={nodeH}
              rx={7}
              fill={node.muted ? "var(--background)" : "var(--surface)"}
              stroke={
                node.muted
                  ? "var(--line)"
                  : "color-mix(in srgb, var(--foreground) 22%, var(--line))"
              }
              strokeWidth={1}
              strokeDasharray={node.muted ? "3 4" : undefined}
            />
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono"
              fontSize={10.5}
              letterSpacing={0.3}
              fill={node.muted ? "var(--muted-2)" : "var(--foreground)"}
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
