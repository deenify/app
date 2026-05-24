"use client"

import {
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowDownUp,
    ArrowRightLeft,
    Lock,
    LockOpen,
    Maximize2,
    Minus,
    Plus,
} from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export type ChartLayoutDirection = "horizontal" | "vertical"

export type ChartCanvasControls = {
    onZoomIn: () => void
    onZoomOut: () => void
    onFit: () => void
    onPanLeft: () => void
    onPanRight: () => void
    onPanUp: () => void
    onPanDown: () => void
    locked: boolean
    onToggleLock: () => void
    direction: ChartLayoutDirection
    onDirectionChange: (direction: ChartLayoutDirection) => void
}

type ChartCanvasToolbarsProps = ChartCanvasControls & {
    className?: string
}

export function ChartCanvasToolbars({
    onZoomIn,
    onZoomOut,
    onFit,
    onPanLeft,
    onPanRight,
    onPanUp,
    onPanDown,
    locked,
    onToggleLock,
    direction,
    onDirectionChange,
    className,
}: ChartCanvasToolbarsProps) {
    return (
        <>
            {/* Top-left: viewport */}
            <div
                className={cn(
                    "pointer-events-none absolute left-3 top-3 z-50 flex flex-col gap-1.5 sm:left-4 sm:top-4",
                    className
                )}
            >
                <p className="pointer-events-none text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800/80">
                    Viewport
                </p>
                <div
                    className={cn(
                        "pointer-events-auto flex gap-1 rounded-lg border border-gray-200/90 bg-white/95 p-1 shadow-md backdrop-blur-sm",
                        locked && "pointer-events-none opacity-50"
                    )}
                >
                    <ToolbarBtn label="Zoom in" onClick={onZoomIn} icon={<Plus className="h-4 w-4" />} disabled={locked} />
                    <ToolbarBtn label="Zoom out" onClick={onZoomOut} icon={<Minus className="h-4 w-4" />} disabled={locked} />
                    <ToolbarBtn label="Reset view" onClick={onFit} icon={<Maximize2 className="h-4 w-4" />} disabled={locked} />
                </div>
            </div>

            {/* Top-right: lock + layout direction */}
            <motion.div className="pointer-events-none absolute right-3 top-3 z-50 flex flex-col items-end gap-1.5 sm:right-4 sm:top-4">
                <p className="pointer-events-none text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800/80">
                    Chart
                </p>
                <div className="pointer-events-auto flex flex-col gap-1.5 sm:flex-row sm:items-center">
                    <div className="flex rounded-md border border-gray-200/90 bg-white/95 p-1 shadow-md backdrop-blur-sm">
                        <DirectionBtn
                            active={direction === "horizontal"}
                            label="Horizontal layout"
                            onClick={() => onDirectionChange("horizontal")}
                            icon={<ArrowRightLeft className="h-3.5 w-3.5" />}
                        />
                        <DirectionBtn
                            active={direction === "vertical"}
                            label="Vertical layout"
                            onClick={() => onDirectionChange("vertical")}
                            icon={<ArrowDownUp className="h-3.5 w-3.5" />}
                        />
                    </div>
                    <Button
                        type="button"
                        variant={locked ? "outline-amber" : "outline-emerald"}
                        onClick={onToggleLock}
                        shouldScale
                        aria-label={locked ? "Unlock chart" : "Lock chart"}
                        aria-pressed={locked}
                        className={cn(
                            "flex shadow-md h-9 items-center gap-1.5 rounded-md",
                        )}
                    >
                        {locked ? (
                            <Lock className="shrink-0" size={14} />
                        ) : (
                            <LockOpen className="shrink-0" size={14} />
                        )}
                        <span className="sm:text-xs text-[10px] font-medium">{!locked ? "Lock" : "Unlock"}</span>
                    </Button>
                </div>
            </motion.div>

            {/* Bottom-left: pan */}
            <div className="pointer-events-none absolute bottom-3 left-3 z-50 flex flex-col gap-1.5 sm:bottom-4 sm:left-4">
                <p className="pointer-events-none text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-800/80">
                    Pan
                </p>
                <div
                    className={cn(
                        "pointer-events-auto inline-grid grid-cols-3 gap-1 rounded-lg border border-gray-200/90 bg-white/95 p-1 shadow-md backdrop-blur-sm",
                        locked && "pointer-events-none opacity-50"
                    )}
                >
                    <span />
                    <ToolbarBtn label="Pan up" onClick={onPanUp} icon={<ArrowUp className="h-4 w-4" />} disabled={locked} />
                    <span />
                    <ToolbarBtn label="Pan left" onClick={onPanLeft} icon={<ArrowLeft className="h-4 w-4" />} disabled={locked} />
                    <span />
                    <ToolbarBtn label="Pan right" onClick={onPanRight} icon={<ArrowRight className="h-4 w-4" />} disabled={locked} />
                    <span />
                    <ToolbarBtn label="Pan down" onClick={onPanDown} icon={<ArrowDown className="h-4 w-4" />} disabled={locked} />
                    <span />
                </div>
            </div>
        </>
    )
}

function ToolbarBtn({
    label,
    onClick,
    icon,
    disabled,
}: {
    label: string
    onClick: () => void
    icon: React.ReactNode
    disabled?: boolean
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            title={label}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-700"
        >
            {icon}
        </button>
    )
}

function DirectionBtn({
    active,
    label,
    onClick,
    icon,
}: {
    active: boolean
    label: string
    onClick: () => void
    icon: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            className={cn(
                "flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                active
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
            )}
        >
            {icon}
            <span className="hidden sm:inline">
                {label.includes("Horizontal") ? "Horizontal" : "Vertical"}
            </span>
        </button>
    )
}
