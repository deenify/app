import type {
    LayoutBounds,
    LayoutResult,
    LineageChartEdge,
    LineageChartGraph,
    LineageChartLayoutConfig,
    LineageChartNode,
    PositionedNode,
} from "./types"

const DEFAULT_LAYOUT: Required<LineageChartLayoutConfig> = {
    direction: "horizontal",
    nodeWidth: 260,
    nodeHeight: 118,
    columnGap: 88,
    rowGap: 40,
}

function mergeLayout(config?: LineageChartLayoutConfig): Required<LineageChartLayoutConfig> {
    return { ...DEFAULT_LAYOUT, ...config }
}

function buildAdjacency(edges: LineageChartEdge[]) {
    const incoming = new Map<string, string[]>()
    const outgoing = new Map<string, string[]>()

    for (const edge of edges) {
        if (!outgoing.has(edge.source)) outgoing.set(edge.source, [])
        outgoing.get(edge.source)!.push(edge.target)

        if (!incoming.has(edge.target)) incoming.set(edge.target, [])
        incoming.get(edge.target)!.push(edge.source)
    }

    return { incoming, outgoing }
}

function assignDepths(
    nodeIds: string[],
    edges: LineageChartEdge[],
    nodes: LineageChartNode[]
): Map<string, number> {
    const { incoming, outgoing } = buildAdjacency(edges)
    const depths = new Map<string, number>()

    const roots = nodeIds.filter((id) => (incoming.get(id)?.length ?? 0) === 0)
    const startIds =
        roots.length > 0
            ? roots
            : [
                  [...nodes]
                      .sort((a, b) => {
                          const ar = typeof a.ref === "number" ? a.ref : 0
                          const br = typeof b.ref === "number" ? b.ref : 0
                          return ar - br
                      })[0]?.id ?? nodeIds[0],
              ].filter(Boolean)

    const queue: { id: string; depth: number }[] = startIds.map((id) => ({ id, depth: 0 }))

    while (queue.length > 0) {
        const { id, depth } = queue.shift()!
        const prev = depths.get(id)
        if (prev !== undefined && prev >= depth) continue
        depths.set(id, depth)

        for (const child of outgoing.get(id) ?? []) {
            queue.push({ id: child, depth: depth + 1 })
        }
    }

    for (const id of nodeIds) {
        if (!depths.has(id)) depths.set(id, 0)
    }

    return depths
}

function computeBounds(
    positioned: PositionedNode[],
    nodeWidth: number,
    nodeHeight: number,
    padding = 96
): LayoutBounds {
    if (positioned.length === 0) {
        return { minX: 0, minY: 0, maxX: 400, maxY: 400, width: 400, height: 400 }
    }

    const minX = Math.min(...positioned.map((n) => n.x)) - padding
    const minY = Math.min(...positioned.map((n) => n.y)) - padding
    const maxX = Math.max(...positioned.map((n) => n.x + nodeWidth)) + padding
    const maxY = Math.max(...positioned.map((n) => n.y + nodeHeight)) + padding

    return {
        minX,
        minY,
        maxX,
        maxY,
        width: maxX - minX,
        height: maxY - minY,
    }
}

/**
 * Horizontal columns = succession depth; rows = siblings with full vertical separation (no overlap).
 */
export function layoutLineageGraph<T extends Record<string, unknown> = Record<string, unknown>>(
    graph: LineageChartGraph<T>
): LayoutResult<T> {
    const cfg = mergeLayout(graph.layout)
    const { nodeWidth, nodeHeight, columnGap, rowGap, direction } = cfg
    const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]))
    const ids = graph.nodes.map((n) => n.id)
    const depths = assignDepths(ids, graph.edges, graph.nodes)

    const byDepth = new Map<number, string[]>()
    for (const id of ids) {
        const d = depths.get(id) ?? 0
        if (!byDepth.has(d)) byDepth.set(d, [])
        byDepth.get(d)!.push(id)
    }

    Array.from(byDepth.values()).forEach((layerIds) => {
        layerIds.sort((a: string, b: string) => {
            const na = nodeMap.get(a)
            const nb = nodeMap.get(b)
            const ar = typeof na?.ref === "number" ? na.ref : String(na?.ref ?? a)
            const br = typeof nb?.ref === "number" ? nb.ref : String(nb?.ref ?? b)
            if (typeof ar === "number" && typeof br === "number") return ar - br
            return String(ar).localeCompare(String(br))
        })
    })

    /** Sibling axis: horizontal spread uses width; vertical spread uses height */
    const siblingStride =
        direction === "horizontal" ? nodeHeight + rowGap : nodeWidth + rowGap
    /** Succession axis: horizontal depth uses width; vertical depth uses height */
    const depthStride =
        direction === "horizontal" ? nodeWidth + columnGap : nodeHeight + columnGap

    const positioned: PositionedNode<T>[] = graph.nodes.map((node) => {
        if (node.position) {
            return { ...node, x: node.position.x, y: node.position.y }
        }

        const depth = depths.get(node.id) ?? 0
        const layer = byDepth.get(depth) ?? [node.id]
        const index = layer.indexOf(node.id)
        const centerOffset = ((layer.length - 1) * siblingStride) / 2
        const siblingOffset = index * siblingStride - centerOffset

        if (direction === "horizontal") {
            return {
                ...node,
                x: depth * depthStride,
                y: siblingOffset,
            }
        }

        return {
            ...node,
            x: siblingOffset,
            y: depth * depthStride,
        }
    })

    const bounds = computeBounds(positioned, nodeWidth, nodeHeight)
    return { nodes: positioned, bounds }
}
