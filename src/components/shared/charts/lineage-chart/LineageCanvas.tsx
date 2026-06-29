"use client"

import { forwardRef, useId, useImperativeHandle, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils/clsx"
import { buildEdgePath, computeSiblingBusX } from "./buildEdgePath"
import { layoutLineageGraph } from "./layoutGraph"
import { ChartCanvasToolbars, type ChartCanvasControls } from "./ChartCanvasToolbars"
import { useChartViewport } from "./useChartViewport"
import type {
    ChartViewportConfig,
    LineageChartGraph,
    LineageChartLayoutConfig,
    LineageChartNode,
    LineageEdgeRouting,
} from "./types"

export type LineageCanvasHandle = {
    zoomIn: () => void
    zoomOut: () => void
    fitToView: () => void
    panBy: (dx: number, dy: number) => void
}

type LineageCanvasProps<T extends Record<string, unknown> = Record<string, unknown>> = {
    graph: LineageChartGraph<T>
    className?: string
    canvasClassName?: string
    renderNode?: (
        node: LineageChartNode<T> & { x: number; y: number },
        selected: boolean,
        select: () => void,
        scale: number
    ) => React.ReactNode
    onNodeSelect?: (nodeId: string | null) => void
    /** Overrides per-edge routing so the control visibly affects all lines */
    forceRouting?: LineageEdgeRouting
    /** Renders viewport (top-left) and pan (bottom-left) toolbars on the chart */
    canvasControls?: ChartCanvasControls
    /** Initial zoom / focus when the page loads — set in prophetic-chain/content.ts */
    initialViewport?: ChartViewportConfig
}

const DEFAULT_CFG: Required<LineageChartLayoutConfig> = {
    direction: "horizontal",
    nodeWidth: 260,
    nodeHeight: 118,
    columnGap: 88,
    rowGap: 40,
}

function LineageCanvasInner<T extends Record<string, unknown> = Record<string, unknown>>(
    {
        graph,
        className,
        canvasClassName,
        renderNode,
        onNodeSelect,
        forceRouting,
        canvasControls,
        initialViewport,
    }: LineageCanvasProps<T>,
    ref: React.Ref<LineageCanvasHandle>
) {
    const markerId = useId().replace(/:/g, "")
    const containerRef = useRef<HTMLDivElement>(null)
    const viewportRef = useRef<HTMLDivElement>(null)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const locked = canvasControls?.locked ?? false

    const layout = useMemo(() => layoutLineageGraph(graph), [graph])
    const cfg = useMemo(
        () => ({ ...DEFAULT_CFG, ...graph.layout }),
        [graph.layout]
    )
    const { scale, fitToView, zoomIn, zoomOut, panBy } = useChartViewport({
        bounds: layout.bounds,
        layout: {
            bounds: layout.bounds,
            nodes: layout.nodes,
            nodeWidth: cfg.nodeWidth,
            nodeHeight: cfg.nodeHeight,
        },
        initialViewport,
        locked,
        containerRef,
        viewportRef,
    })

    useImperativeHandle(
        ref,
        () => ({ zoomIn, zoomOut, fitToView, panBy }),
        [zoomIn, zoomOut, fitToView, panBy]
    )

    const scaled = useMemo(() => {
        const w = cfg.nodeWidth * scale
        const h = cfg.nodeHeight * scale
        const nodes = layout.nodes.map((n) => ({
            ...n,
            x: n.x * scale,
            y: n.y * scale,
        }))
        const minX = layout.bounds.minX * scale
        const minY = layout.bounds.minY * scale
        const width = layout.bounds.width * scale
        const height = layout.bounds.height * scale
        return { nodes, nodeW: w, nodeH: h, minX, minY, width, height }
    }, [layout, cfg, scale])

    const edges = useMemo(() => {
        const routingDefault = forceRouting ?? "orthogonal"
        const bySource = new Map<string, typeof graph.edges>()
        for (const edge of graph.edges) {
            if (!bySource.has(edge.source)) bySource.set(edge.source, [])
            bySource.get(edge.source)!.push(edge)
        }

        const busBySource = new Map<string, number>()
        Array.from(bySource.entries()).forEach(([sourceId, siblings]) => {
            if (siblings.length < 2 || cfg.direction !== "horizontal") return
            const parent = scaled.nodes.find((n) => n.id === sourceId)
            if (!parent) return
            const childLefts = siblings
                .map((e: (typeof graph.edges)[number]) =>
                    scaled.nodes.find((n) => n.id === e.target)
                )
                .filter((n): n is (typeof scaled.nodes)[number] => Boolean(n))
                .map((n) => n.x)
            busBySource.set(
                sourceId,
                computeSiblingBusX(parent.x + scaled.nodeW, childLefts, scaled.nodeW)
            )
        })

        return graph.edges
            .map((edge) => {
                const from = scaled.nodes.find((n) => n.id === edge.source)
                const to = scaled.nodes.find((n) => n.id === edge.target)
                if (!from || !to) return null
                const routing = forceRouting ?? edge.routing ?? routingDefault
                const busX = busBySource.get(edge.source)
                return {
                    id: edge.id,
                    d: buildEdgePath({
                        from: { x: from.x, y: from.y },
                        to: { x: to.x, y: to.y },
                        nodeWidth: scaled.nodeW,
                        nodeHeight: scaled.nodeH,
                        routing,
                        direction: cfg.direction,
                        busX: routing === "orthogonal" ? busX : undefined,
                    }),
                    routing,
                }
            })
            .filter(Boolean) as { id: string; d: string; routing: LineageEdgeRouting }[]
    }, [graph, scaled, cfg.direction, forceRouting])

    const selectNode = (id: string) => {
        if (locked) return
        setSelectedId(id)
        onNodeSelect?.(id)
    }

    return (
        <div className={cn("relative min-h-0 flex-1", className)}>
            <div
                className={cn(
                    "relative h-full min-h-[480px] overflow-hidden rounded-md border border-gray-200 bg-[#f4f9f7] shadow-inner",
                    canvasClassName
                )}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-80"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)",
                        backgroundSize: `${20 * scale}px ${20 * scale}px`,
                    }}
                />

                {canvasControls ? <ChartCanvasToolbars {...canvasControls} /> : null}

                {locked ? (
                    <div className="absolute inset-0 z-40 cursor-not-allowed bg-white/15" aria-hidden />
                ) : null}

                <div
                    ref={containerRef}
                    data-chart-surface
                    className={cn(
                        "absolute inset-3 select-none sm:inset-4",
                        locked && "pointer-events-none"
                    )}
                    style={{ cursor: locked ? "default" : "grab", touchAction: "none" }}
                >
                    <div
                        ref={viewportRef}
                        className="absolute left-0 top-0"
                        style={{ willChange: "transform" }}
                    >
                        <svg
                            className="pointer-events-none absolute overflow-visible"
                            width={scaled.width}
                            height={scaled.height}
                            style={{ left: scaled.minX, top: scaled.minY }}
                        >
                            <defs>
                                <marker
                                    id={markerId}
                                    markerWidth={8}
                                    markerHeight={8}
                                    refX={6}
                                    refY={4}
                                    orient="auto"
                                >
                                    <path d="M0,0 L8,4 L0,8 Z" fill="rgba(16,185,129,0.5)" />
                                </marker>
                            </defs>
                            {edges.map(({ id, d, routing }) => (
                                <path
                                    key={id}
                                    d={d}
                                    fill="none"
                                    stroke={
                                        routing === "smooth"
                                            ? "rgba(5,150,105,0.55)"
                                            : "rgba(16,185,129,0.45)"
                                    }
                                    strokeWidth={routing === "smooth" ? 2 : 1.75}
                                    strokeDasharray={routing === "smooth" ? "6 4" : undefined}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    markerEnd={`url(#${markerId})`}
                                />
                            ))}
                        </svg>

                        <div
                            className="relative"
                            style={{
                                width: scaled.width,
                                height: scaled.height,
                                left: scaled.minX,
                                top: scaled.minY,
                            }}
                        >
                            {scaled.nodes.map((node) => {
                                const selected = selectedId === node.id
                                return (
                                    <div
                                        key={node.id}
                                        className="absolute"
                                        style={{
                                            left: node.x,
                                            top: node.y,
                                            width: scaled.nodeW,
                                            height: scaled.nodeH,
                                        }}
                                    >
                                        {renderNode?.(node, selected, () => selectNode(node.id), scale) ??
                                            null}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const LineageCanvas = forwardRef(LineageCanvasInner) as <
    T extends Record<string, unknown> = Record<string, unknown>,
>(
    props: LineageCanvasProps<T> & { ref?: React.Ref<LineageCanvasHandle> }
) => React.ReactElement

export default LineageCanvas
