"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { ChartViewportConfig, LayoutBounds, PositionedNode } from "./types"

const MIN_SCALE = 0.4
const MAX_SCALE = 2.2
const DEFAULT_READABLE_FLOOR = 0.72
const DEFAULT_FIT_MULTIPLIER = 1.15

export type ChartTransform = { x: number; y: number; scale: number }

type LayoutContext = {
    bounds: LayoutBounds
    nodes: PositionedNode[]
    nodeWidth: number
    nodeHeight: number
}

type Options = {
    bounds: LayoutBounds
    layout: LayoutContext
    initialViewport?: ChartViewportConfig
    locked?: boolean
    containerRef: React.RefObject<HTMLDivElement | null>
    viewportRef: React.RefObject<HTMLDivElement | null>
}

function clampScale(s: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))
}

function applyPan(el: HTMLDivElement, x: number, y: number) {
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
}

function computeFitScale(
    el: HTMLDivElement,
    bounds: LayoutBounds,
    config?: ChartViewportConfig
) {
    const pad = 28
    const availW = el.clientWidth - pad * 2
    const availH = el.clientHeight - pad * 2
    const fitScale = Math.min(availW / bounds.width, availH / bounds.height)
    const floor = config?.minScale ?? DEFAULT_READABLE_FLOOR
    const mult = config?.fitMultiplier ?? DEFAULT_FIT_MULTIPLIER
    return clampScale(Math.max(fitScale * mult, floor))
}

function applyTransform(
    scale: number,
    pan: { x: number; y: number },
    setScale: (s: number) => void,
    setPan: (p: { x: number; y: number }) => void,
    scaleRef: React.MutableRefObject<number>,
    panRef: React.MutableRefObject<{ x: number; y: number }>
) {
    scaleRef.current = scale
    panRef.current = pan
    setScale(scale)
    setPan(pan)
}

export function useChartViewport({
    bounds,
    layout,
    initialViewport,
    locked = false,
    containerRef,
    viewportRef,
}: Options) {
    const [scale, setScale] = useState(1)
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const panRef = useRef(pan)
    const scaleRef = useRef(scale)
    const boundsRef = useRef(bounds)
    const layoutRef = useRef(layout)
    const initialRef = useRef(initialViewport)
    const lockedRef = useRef(locked)
    const rafRef = useRef<number | null>(null)
    const dragRef = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null)
    const pinchRef = useRef<{ dist: number; scale: number; midX: number; midY: number } | null>(null)
    const pointersRef = useRef(new Map<number, { x: number; y: number }>())

    panRef.current = pan
    scaleRef.current = scale
    boundsRef.current = bounds
    layoutRef.current = layout
    initialRef.current = initialViewport
    lockedRef.current = locked

    const flushPan = useCallback(() => {
        const vp = viewportRef.current
        if (vp) applyPan(vp, panRef.current.x, panRef.current.y)
    }, [viewportRef])

    useEffect(() => {
        flushPan()
    }, [pan, flushPan])

    const zoomAt = useCallback(
        (clientX: number, clientY: number, nextScale: number) => {
            const el = containerRef.current
            if (!el) return

            const rect = el.getBoundingClientRect()
            const px = clientX - rect.left
            const py = clientY - rect.top
            const newScale = clampScale(nextScale)
            const prevScale = scaleRef.current
            const prevPan = panRef.current

            const worldX = (px - prevPan.x) / prevScale
            const worldY = (py - prevPan.y) / prevScale

            const newPan = {
                x: px - worldX * newScale,
                y: py - worldY * newScale,
            }

            applyTransform(newScale, newPan, setScale, setPan, scaleRef, panRef)
        },
        [containerRef]
    )

    const focusNode = useCallback(
        (
            nodeId: string,
            config?: ChartViewportConfig,
            scaleOverride?: number
        ) => {
            const el = containerRef.current
            const { bounds: b, nodes, nodeWidth, nodeHeight } = layoutRef.current
            if (!el) return false

            const node = nodes.find((n) => n.id === nodeId)
            if (!node) return false

            const newScale =
                scaleOverride ??
                config?.scale ??
                computeFitScale(el, b, config)
            const s = clampScale(newScale)
            const ox = config?.panOffset?.x ?? 0
            const oy = config?.panOffset?.y ?? 0

            const newPan = {
                x: el.clientWidth / 2 - b.minX * s - node.x * s - (nodeWidth * s) / 2 + ox,
                y: el.clientHeight / 2 - b.minY * s - node.y * s - (nodeHeight * s) / 2 + oy,
            }

            applyTransform(s, newPan, setScale, setPan, scaleRef, panRef)
            return true
        },
        [containerRef]
    )

    const fitEntireGraph = useCallback(
        (config?: ChartViewportConfig) => {
            const el = containerRef.current
            const b = boundsRef.current
            const cfg = config ?? initialRef.current
            if (!el || b.width <= 0) return

            const newScale = cfg?.scale ?? computeFitScale(el, b, cfg)

            const contentW = b.width * newScale
            const contentH = b.height * newScale
            const ox = cfg?.panOffset?.x ?? 0
            const oy = cfg?.panOffset?.y ?? 0
            const newPan = {
                x: (el.clientWidth - contentW) / 2 - b.minX * newScale + ox,
                y: (el.clientHeight - contentH) / 2 - b.minY * newScale + oy,
            }

            applyTransform(newScale, newPan, setScale, setPan, scaleRef, panRef)
        },
        [containerRef]
    )

    /** Applies `initialViewport` (or override): node focus or full-graph fit per `mode`. */
    const applyViewportConfig = useCallback(
        (config?: ChartViewportConfig) => {
            const cfg = config ?? initialRef.current
            const mode = cfg?.mode ?? (cfg?.focusNodeId ? "node" : "fit")

            if (mode === "node" && cfg?.focusNodeId) {
                const ok = focusNode(cfg.focusNodeId, cfg, cfg.scale)
                if (ok) return
            }

            fitEntireGraph(cfg)
        },
        [focusNode, fitEntireGraph]
    )

    // const fitToView = applyViewportConfig
    const zoomBy = useCallback(
        (factor: number) => {
            const el = containerRef.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, scaleRef.current * factor)
        },
        [containerRef, zoomAt]
    )

    const panBy = useCallback((dx: number, dy: number) => {
        setPan((p) => {
            const next = { x: p.x + dx, y: p.y + dy }
            panRef.current = next
            return next
        })
    }, [])

    useEffect(() => {
        applyViewportConfig()
    }, [applyViewportConfig, bounds.width, bounds.height])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const onWheel = (e: WheelEvent) => {
            if (lockedRef.current) return
            e.preventDefault()
            if (e.ctrlKey || e.metaKey) {
                const factor = e.deltaY < 0 ? 1.06 : 0.94
                zoomAt(e.clientX, e.clientY, scaleRef.current * factor)
                return
            }
            panBy(-e.deltaX, -e.deltaY)
        }

        el.addEventListener("wheel", onWheel, { passive: false })
        return () => el.removeEventListener("wheel", onWheel)
    }, [containerRef, zoomAt, panBy])

    useEffect(() => {
        const surface = containerRef.current
        if (!surface) return

        const isNode = (target: EventTarget | null) =>
            target instanceof Element && Boolean(target.closest("[data-lineage-node]"))

        const syncPointers = (e: PointerEvent) => {
            pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
        }

        const onDown = (e: PointerEvent) => {
            if (lockedRef.current || e.button !== 0 || isNode(e.target)) return
            syncPointers(e)
            if (pointersRef.current.size === 1) {
                dragRef.current = {
                    px: e.clientX,
                    py: e.clientY,
                    ox: panRef.current.x,
                    oy: panRef.current.y,
                }
                surface.style.cursor = "grabbing"
                surface.setPointerCapture(e.pointerId)
            }
        }

        const onMove = (e: PointerEvent) => {
            if (lockedRef.current) return
            syncPointers(e)
            const pts = Array.from(pointersRef.current.values())

            if (pts.length >= 2) {
                dragRef.current = null
                const [a, b] = pts
                const dist = Math.hypot(a.x - b.x, a.y - b.y)
                const midX = (a.x + b.x) / 2
                const midY = (a.y + b.y) / 2

                if (!pinchRef.current) {
                    pinchRef.current = { dist, scale: scaleRef.current, midX, midY }
                    return
                }
                const ratio = dist / pinchRef.current.dist
                zoomAt(pinchRef.current.midX, pinchRef.current.midY, pinchRef.current.scale * ratio)
                return
            }

            pinchRef.current = null
            if (!dragRef.current) return

            const dx = e.clientX - dragRef.current.px
            const dy = e.clientY - dragRef.current.py
            const next = {
                x: dragRef.current.ox + dx,
                y: dragRef.current.oy + dy,
            }
            panRef.current = next
            setPan(next)
        }

        const onUp = (e: PointerEvent) => {
            pointersRef.current.delete(e.pointerId)
            if (pointersRef.current.size < 2) pinchRef.current = null
            if (pointersRef.current.size === 0) {
                dragRef.current = null
                surface.style.cursor = "grab"
            }
            try {
                surface.releasePointerCapture(e.pointerId)
            } catch {
                /* noop */
            }
        }

        surface.addEventListener("pointerdown", onDown)
        surface.addEventListener("pointermove", onMove)
        surface.addEventListener("pointerup", onUp)
        surface.addEventListener("pointercancel", onUp)

        return () => {
            surface.removeEventListener("pointerdown", onDown)
            surface.removeEventListener("pointermove", onMove)
            surface.removeEventListener("pointerup", onUp)
            surface.removeEventListener("pointercancel", onUp)
        }
    }, [containerRef, zoomAt])

    return {
        scale,
        pan,
        fitToView: () => applyViewportConfig(),
        resetView: () => applyViewportConfig(),
        focusNode: (nodeId: string) => focusNode(nodeId, initialRef.current),
        zoomIn: () => zoomBy(1.12),
        zoomOut: () => zoomBy(0.89),
        panBy,
    }
}
