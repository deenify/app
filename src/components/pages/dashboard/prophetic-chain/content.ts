import type { ChartViewportConfig, LineageChartGraph } from "@/components/shared/lineage-chart"
import { PROPHETIC_EDGES, PROPHETIC_NODES, type PropheticNodeData } from "./prophetic-data"

/** Horizontal schema layout — columns = succession depth, rows = branches. */
export const PROPHETIC_CHAIN_GRAPH: LineageChartGraph<PropheticNodeData> = {
    layout: {
        direction: "horizontal",
        nodeWidth: 220,
        nodeHeight: 100,
        columnGap: 120,
        rowGap: 50,
    },
    nodes: PROPHETIC_NODES,
    edges: PROPHETIC_EDGES,
}

/**
 * Initial chart camera on page load — edit this to change zoom and which prophet is centered.
 *
 * Node ids (from prophetic-data.ts): adam, idris, nuh, hud, salih, ibrahim, lut, ismail,
 * ishaq, yaqub, yusuf, ayub, shuayb, musa, harun, dawud, sulayman, ilyas, yasa, yunus,
 * zakariyya, yahya, isa, muhammad
 *
 * Examples:
 * - Center Ibrāhīm at 1× zoom: `{ mode: "node", focusNodeId: "ibrahim", scale: 1 }`
 * - Fit entire chain: `{ mode: "fit", fitMultiplier: 1.1, minScale: 0.65 }`
 * - Start on seal of prophets, zoomed in: `{ mode: "node", focusNodeId: "muhammad", scale: 1.15 }`
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
