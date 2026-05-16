"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    ChartSidebarControls,
    LineageCanvas,
    LineageChartNode,
    PAN_STEP,
    type ChartLayoutDirection,
    type LineageCanvasHandle,
    type LineageEdgeRouting,
} from "@/components/shared/lineage-chart"
import {
    PROPHETIC_CHAIN_EDITORIAL,
    PROPHETIC_CHAIN_GRAPH,
    PROPHETIC_CHAIN_INITIAL_VIEW,
} from "./content"
import { PropheticChartNode } from "./PropheticChartNode"
import type { PropheticNodeData } from "./prophetic-data"
import { PROPHETIC_NODES } from "./prophetic-data"
import PropheticDetailModal from "./PropheticDetailModal"

export default function PropheticChainContent() {
    const canvasRef = useRef<LineageCanvasHandle>(null)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [edgeRouting, setEdgeRouting] = useState<LineageEdgeRouting>("orthogonal")
    const [locked, setLocked] = useState(false)
    const [direction, setDirection] = useState<ChartLayoutDirection>(
        PROPHETIC_CHAIN_GRAPH.layout?.direction ?? "horizontal"
    )

    const graph = useMemo(
        () => ({
            ...PROPHETIC_CHAIN_GRAPH,
            layout: {
                ...PROPHETIC_CHAIN_GRAPH.layout,
                direction,
            },
        }),
        [direction]
    )

    const selected = useMemo(
        () => (selectedId ? PROPHETIC_NODES.find((n) => n.id === selectedId) ?? null : null),
        [selectedId]
    )

    useEffect(() => {
        const t = window.setTimeout(() => canvasRef.current?.fitToView(), 50)
        return () => window.clearTimeout(t)
    }, [direction])

    const canvasControls = {
        onZoomIn: () => canvasRef.current?.zoomIn(),
        onZoomOut: () => canvasRef.current?.zoomOut(),
        onFit: () => canvasRef.current?.fitToView(),
        onPanLeft: () => canvasRef.current?.panBy(PAN_STEP, 0),
        onPanRight: () => canvasRef.current?.panBy(-PAN_STEP, 0),
        onPanUp: () => canvasRef.current?.panBy(0, PAN_STEP),
        onPanDown: () => canvasRef.current?.panBy(0, -PAN_STEP),
        locked,
        onToggleLock: () => setLocked((v) => !v),
        direction,
        onDirectionChange: setDirection,
    }

    return (
        <div className="bg-white">
            <header className="border-b border-layout-separator">
                <div className="container px-4 py-6 sm:px-6 md:py-8">
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 flex items-center gap-2.5"
                    >
                        <div className="flex items-center justify-center rounded-lg bg-teal-50 p-2.5 text-teal-700">
                            <Users className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <Badge variant="emerald" className="text-xs font-medium">
                            {PROPHETIC_CHAIN_EDITORIAL.badge}
                        </Badge>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 }}
                        className="max-w-2xl text-3xl font-medium tracking-tight text-gray-900"
                    >
                        {PROPHETIC_CHAIN_EDITORIAL.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600"
                    >
                        {PROPHETIC_CHAIN_EDITORIAL.lead}
                    </motion.p>
                </div>
            </header>

            <section className="container px-4 py-6 sm:px-6 sm:py-8">
                <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8">
                    <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
                        <ChartSidebarControls
                            edgeRouting={edgeRouting}
                            onEdgeRoutingChange={setEdgeRouting}
                        />
                    </div>

                    <LineageCanvas
                        ref={canvasRef}
                        graph={graph}
                        initialViewport={PROPHETIC_CHAIN_INITIAL_VIEW}
                        forceRouting={edgeRouting}
                        canvasControls={canvasControls}
                        onNodeSelect={setSelectedId}
                        className="min-h-[min(68vh,640px)]"
                        renderNode={(node, isSelected, select, scale) => (
                            <PropheticChartNode
                                node={node as typeof node & { data: PropheticNodeData }}
                                selected={isSelected}
                                scale={scale}
                                onSelect={select}
                            />
                        )}
                    />
                </div>

                <p className="mx-auto mt-8 max-w-3xl border-t border-gray-100 pt-6 text-sm leading-relaxed text-gray-600">
                    {PROPHETIC_CHAIN_EDITORIAL.afterChart}
                </p>
            </section>


            {/* Prephet Details  */}
            <PropheticDetailModal
                selected={selected as LineageChartNode<PropheticNodeData>}
                isOpen={Boolean(selectedId && selected)}
                onOpenChange={(open: boolean) => setSelectedId(open ? selectedId : null)}
            />
        </div>
    )
}

