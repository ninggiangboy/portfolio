"use client";

import {
  BracketsCurly,
  Broadcast,
  Browser,
  ChartLineUp,
  CloudArrowUp,
  Cpu,
  Database,
  EnvelopeSimple,
  GearSix,
  type Icon,
  Lightning,
  Pulse,
  User,
  UserGear,
  X,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export type DiagramNode = {
  id: string;
  label: string;
  detail?: string;
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

const nodeIconMap: Record<string, Icon> = {
  client: Browser,
  recipient: User,
  provider: EnvelopeSimple,
  operator: UserGear,
  gateway: BracketsCurly,
  api: Cpu,
  worker: GearSix,
  postgres: Database,
  redis: Lightning,
  kafka: Broadcast,
  clickhouse: ChartLineUp,
  storage: CloudArrowUp,
  observability: Pulse,
};

const pulsePhaseOffsets = [0, 1, 2] as const;

function estimateTooltipTextWidth(text: string, fontSize: number) {
  let width = 0;

  for (const char of text) {
    if (char === " ") {
      width += fontSize * 0.34;
      continue;
    }

    if (/[.,;:'"`!|]/.test(char)) {
      width += fontSize * 0.3;
      continue;
    }

    if (/[/\\()[\]{}]/.test(char)) {
      width += fontSize * 0.42;
      continue;
    }

    width += fontSize * 0.56;
  }

  return width;
}

function wrapTooltipText(text: string, maxWidth: number, fontSize: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (estimateTooltipTextWidth(nextLine, fontSize) <= maxWidth) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
      continue;
    }

    lines.push(word);
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length ? lines : [text];
}

export function SystemDiagram({
  nodes,
  edges,
  viewBox,
  className,
  ariaLabel,
  nodeScale = 1,
}: {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  viewBox: { w: number; h: number };
  className?: string;
  ariaLabel: string;
  nodeScale?: number;
}) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [tooltipNodeId, setTooltipNodeId] = useState<string | null>(null);
  const [mobileNodeId, setMobileNodeId] = useState<string | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const nodeH = 40 * nodeScale;
  const nodeRadius = 7 * nodeScale;
  const iconSize = 16 * nodeScale;
  const textSize = 11.5 * nodeScale;
  const detailTextSize = 10.5 * nodeScale;
  const iconGap = 10 * nodeScale;
  const horizontalPadding = 16 * nodeScale;
  const tooltipWidth = 220 * nodeScale;
  const tooltipPaddingX = 12 * nodeScale;
  const tooltipPaddingY = 10 * nodeScale;
  const tooltipLineHeight = 14 * nodeScale;
  const tooltipGap = 14 * nodeScale;
  const pulseRadius = 3 * nodeScale;
  const pulseSpeed = 220 * nodeScale;
  const pulseGap = 0.14;
  const pulseFadeDuration = 0.28;
  const pulseRepeatDelay = 1.5;
  const widthOf = (node: DiagramNode) =>
    Math.max(
      96 * nodeScale,
      node.label.length * 8.1 * nodeScale +
        iconSize +
        iconGap +
        horizontalPadding * 2,
    );
  const tooltipTextWidth = tooltipWidth - tooltipPaddingX * 2;
  const tooltipHeightOf = (node: DiagramNode) => {
    if (!node.detail) return 0;
    const lines = wrapTooltipText(
      node.detail,
      tooltipTextWidth,
      detailTextSize,
    ).length;
    return tooltipPaddingY * 2 + 18 * nodeScale + lines * tooltipLineHeight;
  };
  const anchorBetween = (from: DiagramNode, to: DiagramNode) => {
    const fromW = widthOf(from);
    const toW = widthOf(to);
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy);

    if (!length) {
      return {
        x1: from.x,
        y1: from.y,
        x2: to.x,
        y2: to.y,
      };
    }

    const ux = dx / length;
    const uy = dy / length;
    const fromInset = Math.min(
      Math.abs(fromW / 2 / (ux || Number.EPSILON)),
      Math.abs(nodeH / 2 / (uy || Number.EPSILON)),
    );
    const toInset = Math.min(
      Math.abs(toW / 2 / (ux || Number.EPSILON)),
      Math.abs(nodeH / 2 / (uy || Number.EPSILON)),
    );

    return {
      x1: from.x + ux * fromInset,
      y1: from.y + uy * fromInset,
      x2: to.x - ux * toInset,
      y2: to.y - uy * toInset,
    };
  };

  useEffect(() => {
    if (activeNodeId) {
      setTooltipNodeId(activeNodeId);
    }
  }, [activeNodeId]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchMode = () => {
      const nextIsTouchMode = mediaQuery.matches;
      setIsTouchMode(nextIsTouchMode);
      if (!nextIsTouchMode) {
        setMobileNodeId(null);
      }
    };

    updateTouchMode();
    mediaQuery.addEventListener("change", updateTouchMode);
    return () => mediaQuery.removeEventListener("change", updateTouchMode);
  }, []);

  const tooltipNode = activeNodeId
    ? byId[activeNodeId]
    : tooltipNodeId
      ? byId[tooltipNodeId]
      : null;
  const tooltipVisible = Boolean(activeNodeId && tooltipNode?.detail);
  const mobileNode = mobileNodeId ? byId[mobileNodeId] : null;
  const pulseEdges = edges.filter((edge) => edge.pulse);
  const pulseSegments = pulseEdges
    .map((edge) => {
      const from = byId[edge.from];
      const to = byId[edge.to];
      if (!from || !to) return null;
      const points = anchorBetween(from, to);
      return {
        ...points,
        length: Math.hypot(points.x2 - points.x1, points.y2 - points.y1),
      };
    })
    .filter((segment): segment is NonNullable<typeof segment> =>
      Boolean(segment),
    );
  const pulseTimelineLength = Math.max(
    0.001,
    pulseSegments.reduce(
      (total, segment) => total + segment.length / pulseSpeed + pulseGap,
      0,
    ) - pulseGap,
  );
  const pulseFrames = pulseSegments.flatMap((segment, index) => {
    const elapsedBeforeSegment = pulseSegments
      .slice(0, index)
      .reduce(
        (total, current) => total + current.length / pulseSpeed + pulseGap,
        0,
      );
    const segmentStartTime = elapsedBeforeSegment / pulseTimelineLength;
    const segmentDuration = segment.length / pulseSpeed;
    const fadeTravelDuration = Math.min(
      pulseFadeDuration,
      Math.max(segmentDuration * 0.65, 0.14),
    );
    const fadeStartProgress = Math.max(
      0,
      (segmentDuration - fadeTravelDuration) / segmentDuration,
    );
    const fadeMidProgress = Math.max(
      fadeStartProgress,
      (segmentDuration - fadeTravelDuration * 0.45) / segmentDuration,
    );
    const fadeStartX =
      segment.x1 + (segment.x2 - segment.x1) * fadeStartProgress;
    const fadeStartY =
      segment.y1 + (segment.y2 - segment.y1) * fadeStartProgress;
    const fadeMidX = segment.x1 + (segment.x2 - segment.x1) * fadeMidProgress;
    const fadeMidY = segment.y1 + (segment.y2 - segment.y1) * fadeMidProgress;
    const fadeStartTime =
      (elapsedBeforeSegment +
        Math.max(segmentDuration - fadeTravelDuration, 0)) /
      pulseTimelineLength;
    const fadeMidTime =
      (elapsedBeforeSegment +
        Math.max(segmentDuration - fadeTravelDuration * 0.45, 0)) /
      pulseTimelineLength;
    const travelEndTime =
      (elapsedBeforeSegment + segmentDuration) / pulseTimelineLength;
    const gapEndTime =
      (elapsedBeforeSegment + segmentDuration + pulseGap) / pulseTimelineLength;
    const visibleAt = Math.min(segmentStartTime + 0.0001, 1);

    if (index === 0) {
      return [
        { x: segment.x1, y: segment.y1, opacity: 0, time: segmentStartTime },
        { x: segment.x1, y: segment.y1, opacity: 1, time: visibleAt },
        { x: fadeStartX, y: fadeStartY, opacity: 1, time: fadeStartTime },
        { x: fadeMidX, y: fadeMidY, opacity: 0.45, time: fadeMidTime },
        {
          x: segment.x2,
          y: segment.y2,
          opacity: 0,
          time: Math.min(travelEndTime, 1),
        },
        {
          x: segment.x2,
          y: segment.y2,
          opacity: 0,
          time: Math.min(gapEndTime, 1),
        },
      ];
    }

    return [
      {
        x: segment.x1,
        y: segment.y1,
        opacity: 0,
        time: Math.min(segmentStartTime, 1),
      },
      {
        x: segment.x1,
        y: segment.y1,
        opacity: 1,
        time: visibleAt,
      },
      {
        x: fadeStartX,
        y: fadeStartY,
        opacity: 1,
        time: Math.min(fadeStartTime, 1),
      },
      {
        x: fadeMidX,
        y: fadeMidY,
        opacity: 0.45,
        time: Math.min(fadeMidTime, 1),
      },
      {
        x: segment.x2,
        y: segment.y2,
        opacity: 0,
        time: Math.min(travelEndTime, 1),
      },
      {
        x: segment.x2,
        y: segment.y2,
        opacity: 0,
        time: Math.min(gapEndTime, 1),
      },
    ];
  });
  const pulseXFrames = pulseFrames.map((frame) => frame.x);
  const pulseYFrames = pulseFrames.map((frame) => frame.y);
  const pulseOpacityFrames = pulseFrames.map((frame) => frame.opacity);
  const pulseTimes = pulseFrames.map((frame) => frame.time);
  const pulseCycleLength = pulseTimelineLength + pulseRepeatDelay;

  return (
    <div className={`relative ${className ?? ""}`}>
      <svg
        viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
        className="h-auto w-full"
        role="img"
        aria-label={ariaLabel}
        onPointerDown={() => {
          if (isTouchMode) {
            setMobileNodeId(null);
          }
        }}
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
          const points = anchorBetween(from, to);
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={points.x1}
              y1={points.y1}
              x2={points.x2}
              y2={points.y2}
              stroke="var(--line)"
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeDasharray={edge.dashed ? "2 5" : undefined}
            />
          );
        })}

        {!reduce && pulseSegments.length > 0
          ? pulsePhaseOffsets.map((pulseIndex) => (
              <motion.circle
                key={`pulse-flow-${pulseIndex}`}
                r={pulseRadius}
                fill="var(--accent)"
                filter="url(#diagram-glow)"
                initial={{
                  cx: pulseSegments[0].x1,
                  cy: pulseSegments[0].y1,
                  opacity: 0,
                }}
                animate={{
                  cx: pulseXFrames,
                  cy: pulseYFrames,
                  opacity: pulseOpacityFrames,
                }}
                transition={{
                  duration: pulseTimelineLength,
                  times: pulseTimes,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: pulseRepeatDelay,
                  delay: -(
                    (pulseCycleLength / pulsePhaseOffsets.length) *
                    pulseIndex
                  ),
                  ease: "linear",
                }}
                fillOpacity={pulseIndex === 0 ? 1 : 0.82}
              />
            ))
          : null}

        {nodes.map((node) => {
          const Icon = nodeIconMap[node.id];
          const w = widthOf(node);
          const iconX = node.x - w / 2 + horizontalPadding;
          const textX = iconX + iconSize + iconGap;
          const isActive =
            activeNodeId === node.id ||
            (isTouchMode && mobileNodeId === node.id);
          const activate = () => {
            if (!isTouchMode) {
              setActiveNodeId(node.id);
            }
          };
          const deactivate = () => {
            if (!isTouchMode) {
              setActiveNodeId((current) =>
                current === node.id ? null : current,
              );
            }
          };
          const selectNode = (event: { stopPropagation: () => void }) => {
            if (!isTouchMode) return;
            event.stopPropagation();
            setMobileNodeId(node.id);
          };
          return (
            <g key={node.id}>
              <title>{node.label}</title>
              <rect
                x={node.x - w / 2}
                y={node.y - nodeH / 2}
                width={w}
                height={nodeH}
                rx={nodeRadius}
                fill={node.muted ? "var(--background)" : "var(--surface)"}
                stroke={
                  node.muted
                    ? "var(--line)"
                    : "color-mix(in srgb, var(--foreground) 22%, var(--line))"
                }
                strokeWidth={1}
                strokeDasharray={node.muted ? "3 4" : undefined}
                onPointerEnter={activate}
                onPointerLeave={deactivate}
                onPointerDown={selectNode}
                style={{
                  transition: "fill 150ms ease, stroke 150ms ease",
                  fill: isActive
                    ? node.muted
                      ? "color-mix(in srgb, var(--background) 88%, var(--accent))"
                      : "color-mix(in srgb, var(--surface) 85%, var(--accent))"
                    : node.muted
                      ? "var(--background)"
                      : "var(--surface)",
                  stroke: isActive
                    ? "color-mix(in srgb, var(--accent) 58%, var(--foreground))"
                    : node.muted
                      ? "var(--line)"
                      : "color-mix(in srgb, var(--foreground) 22%, var(--line))",
                }}
              />
              {Icon ? (
                <Icon
                  x={iconX}
                  y={node.y - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  weight="regular"
                  color={node.muted ? "var(--muted-2)" : "var(--foreground)"}
                  aria-hidden
                  onPointerEnter={activate}
                  onPointerLeave={deactivate}
                  onPointerDown={selectNode}
                />
              ) : null}
              <text
                x={textX}
                y={node.y + 1}
                textAnchor="start"
                dominantBaseline="middle"
                className="font-mono"
                fontSize={textSize}
                letterSpacing={0.3}
                fill={node.muted ? "var(--muted-2)" : "var(--foreground)"}
                onPointerEnter={activate}
                onPointerLeave={deactivate}
                onPointerDown={selectNode}
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {!isTouchMode && tooltipNode?.detail
          ? (() => {
              const tooltipHeight = tooltipHeightOf(tooltipNode);
              const tooltipLines = wrapTooltipText(
                tooltipNode.detail,
                tooltipTextWidth,
                detailTextSize,
              );
              const margin = 18 * nodeScale;
              const nodeWidth = widthOf(tooltipNode);
              const preferredRightX =
                tooltipNode.x + nodeWidth / 2 + tooltipGap;
              const preferredLeftX =
                tooltipNode.x - nodeWidth / 2 - tooltipGap - tooltipWidth;
              const hasRoomOnRight =
                preferredRightX + tooltipWidth <= viewBox.w - margin;
              const hasRoomOnLeft = preferredLeftX >= margin;
              const x = hasRoomOnRight
                ? preferredRightX
                : hasRoomOnLeft
                  ? preferredLeftX
                  : Math.min(
                      Math.max(margin, preferredRightX),
                      viewBox.w - tooltipWidth - margin,
                    );
              const y = Math.min(
                Math.max(margin, tooltipNode.y - tooltipHeight / 2),
                viewBox.h - tooltipHeight - margin,
              );

              return (
                <motion.g
                  pointerEvents="none"
                  aria-hidden
                  initial={false}
                  animate={
                    reduce
                      ? { opacity: tooltipVisible ? 1 : 0, x, y }
                      : {
                          opacity: tooltipVisible ? 1 : 0,
                          x,
                          y,
                        }
                  }
                  transition={
                    reduce
                      ? { duration: 0.1 }
                      : {
                          opacity: { duration: 0.12, ease: "linear" },
                          x: { duration: 0 },
                          y: { duration: 0 },
                        }
                  }
                >
                  <motion.rect
                    x={0}
                    y={0}
                    width={tooltipWidth}
                    height={tooltipHeight}
                    rx={10 * nodeScale}
                    fill="color-mix(in srgb, var(--background) 92%, black)"
                    stroke="color-mix(in srgb, var(--accent) 30%, var(--line))"
                    strokeWidth={1}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduce ? 0.1 : 0.18 }}
                  />
                  <text
                    x={tooltipPaddingX}
                    y={tooltipPaddingY + 10 * nodeScale}
                    className="font-mono"
                    fontSize={10.5 * nodeScale}
                    letterSpacing={0.5}
                    fill="var(--accent)"
                  >
                    {tooltipNode.label.toUpperCase()}
                  </text>
                  <text
                    x={tooltipPaddingX}
                    y={tooltipPaddingY + 28 * nodeScale}
                    fontSize={detailTextSize}
                    fill="var(--muted)"
                  >
                    {tooltipLines.map((line, index) => (
                      <tspan
                        key={`${tooltipNode.id}-detail-${index}`}
                        x={tooltipPaddingX}
                        dy={index === 0 ? 0 : tooltipLineHeight}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </motion.g>
              );
            })()
          : null}
      </svg>

      {isTouchMode && mobileNode?.detail ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 10 }}
          transition={{
            duration: reduce ? 0.1 : 0.16,
            ease: "easeOut",
          }}
          className="absolute right-3 bottom-3 left-3 z-10 rounded-2xl border border-line bg-background/96 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.22)] backdrop-blur-md"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-accent">
                {mobileNode.label.toUpperCase()}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {mobileNode.detail}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close component details"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-foreground"
              onClick={() => setMobileNodeId(null)}
            >
              <X size={14} weight="bold" aria-hidden />
            </button>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
