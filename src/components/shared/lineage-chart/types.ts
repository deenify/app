/** Edge routing — orthogonal reads like schema diagrams; smooth for organic descent. */
export type LineageEdgeRouting = "orthogonal" | "smooth" | "straight"

export type LineageChartNode<T extends Record<string, unknown> = Record<string, unknown>> = {
    id: string
    /** Display / sort reference — any serializable token */
    ref?: number | string
    label: string
    subtitle?: string
    /** Arbitrary payload; UI reads known keys, chart ignores the rest */
    data?: T
    /** When set, auto-layout skips this node */
    position?: { x: number; y: number }
}

export type LineageChartEdge = {
    id: string
    source: string
    target: string
    routing?: LineageEdgeRouting
    label?: string
    data?: Record<string, unknown>
}

export type LineageChartLayoutConfig = {
    direction?: "vertical" | "horizontal"
    nodeWidth?: number
    nodeHeight?: number
    columnGap?: number
    rowGap?: number
}

export type LineageChartGraph<
    T extends Record<string, unknown> = Record<string, unknown>,
> = {
    nodes: LineageChartNode<T>[]
    edges: LineageChartEdge[]
    layout?: LineageChartLayoutConfig
}

export type PositionedNode<T extends Record<string, unknown> = Record<string, unknown>> =
    LineageChartNode<T> & {
        x: number
        y: number
    }

export type LayoutBounds = {
    minX: number
    minY: number
    maxX: number
    maxY: number
    width: number
    height: number
}

export type LayoutResult<T extends Record<string, unknown> = Record<string, unknown>> = {
    nodes: PositionedNode<T>[]
    bounds: LayoutBounds
}

/**
 * Initial camera when the chart mounts (page load).
 * Define per-page in content.ts and pass to LineageCanvas as `initialViewport`.
 */
export type ChartViewportConfig = {
    /** `fit` = entire graph centered (default). `node` = center on `focusNodeId`. */
    mode?: "fit" | "node"
    /** Node id to center — e.g. `"ibrahim"`, `"muhammad"`, `"adam"` */
    focusNodeId?: string
    /** Zoom level (0.4–2.2). Omit to auto-calculate from container size. */
    scale?: number
    /** For `fit` mode: multiply auto-fit scale (default 1.15). */
    fitMultiplier?: number
    /** Minimum zoom when auto-fitting (default 0.72). */
    minScale?: number
    /** Nudge after focus, in screen pixels (+ right / + down). */
    panOffset?: { x?: number; y?: number }
}
