import type {
    ChartLayoutDirection,
    ChartViewportConfig,
    LineageChartGraph,
} from "@/components/shared/lineage-chart"
import { PROPHETIC_EDGES, PROPHETIC_NODES, type PropheticNodeData } from "./prophetic-data"

const PROPHETIC_NODE_SIZE = {
    nodeWidth: 220,
    nodeHeight: 100,
} as const

/**
 * Gaps per layout direction — columnGap = succession axis; rowGap = sibling branches.
 * Edit these independently when horizontal vs vertical spacing feels off.
 */
export const PROPHETIC_CHAIN_LAYOUT_BY_DIRECTION: Record<
    ChartLayoutDirection,
    {
        nodeWidth: number
        nodeHeight: number
        columnGap: number
        rowGap: number
    }
> = {
    horizontal: {
        ...PROPHETIC_NODE_SIZE,
        columnGap: 120,
        rowGap: 50,
    },
    vertical: {
        ...PROPHETIC_NODE_SIZE,
        columnGap: 88,
        rowGap: 72,
    },
}

/** Default graph — horizontal layout; direction toggled in UI swaps gaps via `getPropheticChainLayout`. */
export const PROPHETIC_CHAIN_GRAPH: LineageChartGraph<PropheticNodeData> = {
    layout: {
        direction: "horizontal",
        ...PROPHETIC_CHAIN_LAYOUT_BY_DIRECTION.horizontal,
    },
    nodes: PROPHETIC_NODES,
    edges: PROPHETIC_EDGES,
}

export function getPropheticChainLayout(direction: ChartLayoutDirection) {
    return {
        direction,
        ...PROPHETIC_CHAIN_LAYOUT_BY_DIRECTION[direction],
    }
}

/**
 * Initial chart camera on page load — edit this to change zoom and which prophet is centered.
 *
 * Node ids (from prophetic-data.ts): adam, idris, nuh, hud, salih, ibrahim, lut, ismail,
 * ishaq, yaqub, yusuf, ayub, shuayb, musa, harun, dawud, sulayman, ilyas, yasa, yunus,
 * zakariyya, yahya, isa, muhammad
 */
export const PROPHETIC_CHAIN_INITIAL_VIEW: ChartViewportConfig = {
    mode: "node",
    focusNodeId: "adam",
    scale: 0.92,
    panOffset: { x: 0, y: 0 },
}

export const PROPHETIC_CHAIN_EDITORIAL = {
    badge: "Lineage topology",
    title: "Prophetic chain as reference schema",
    lead: "Messengers arranged in columns—edges cite succession or descent, not a single vertical spine. Pan the plane; pinch (or Ctrl+scroll) to zoom.",
    afterChart:
        "Orthogonal edges follow the main address; smooth curves mark collateral lines. Figures and lifespans follow common scholarly summaries unless the Qurʾān names an event explicitly.",
} as const

export type { PropheticNodeData }
