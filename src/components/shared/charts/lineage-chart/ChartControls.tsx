"use client"

import { GitBranch, Move, Spline } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import type { LineageEdgeRouting } from "./types"

type ChartSidebarControlsProps = {
    edgeRouting: LineageEdgeRouting
    onEdgeRoutingChange: (r: LineageEdgeRouting) => void
    className?: string
}

export function ChartSidebarControls({
    edgeRouting,
    onEdgeRoutingChange,
    className,
}: ChartSidebarControlsProps) {
    return (
        <aside className={cn("flex flex-col gap-4", className)}>
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Edge routing
                </p>
                <div className="mt-2 flex flex-col gap-1">
                    <RoutingOption
                        active={edgeRouting === "orthogonal"}
                        onClick={() => onEdgeRoutingChange("orthogonal")}
                        icon={<GitBranch className="h-4 w-4" />}
                        label="Orthogonal"
                        hint="Right-angle schema lines (solid)"
                    />
                    <RoutingOption
                        active={edgeRouting === "smooth"}
                        onClick={() => onEdgeRoutingChange("smooth")}
                        icon={<Spline className="h-4 w-4" />}
                        label="Smooth"
                        hint="Curved branch lines (dashed)"
                    />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                    Applies to every connector on the chart. Orthogonal uses cornered paths; smooth uses
                    Bézier curves with a dashed stroke so the change is easy to see.
                </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-3 text-xs 
            hidden md:block leading-relaxed text-gray-600">
                <p className="flex items-center gap-2 font-medium text-gray-800">
                    <Move className="h-3.5 w-3.5 shrink-0" />
                    Navigation
                </p>
                <ul className="mt-2 space-y-1.5 pl-0.5">
                    <li>Viewport (+ / − / reset) — top-left of chart</li>
                    <li>Lock & layout — top-right of chart</li>
                    <li>Pan arrows — bottom-left of chart</li>
                    <li>Drag — pan canvas</li>
                    <li>Scroll — pan (trackpad)</li>
                    <li>Pinch or Ctrl+scroll — zoom</li>
                    <li>Select a card — opens detail modal</li>
                </ul>
            </div>
        </aside>
    )
}

/** @deprecated Use ChartSidebarControls */
export const ChartControls = ChartSidebarControls

function RoutingOption({
    active,
    onClick,
    icon,
    label,
    hint,
}: {
    active: boolean
    onClick: () => void
    icon: React.ReactNode
    label: string
    hint: string
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors",
                active
                    ? "border-emerald-300 bg-emerald-50/80 text-emerald-950"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            )}
        >
            <span className={cn("mt-0.5 shrink-0", active ? "text-emerald-700" : "text-gray-500")}>{icon}</span>
            <span>
                <span className="block text-sm font-medium">{label}</span>
                <span className="block text-[11px] text-gray-500">{hint}</span>
            </span>
        </button>
    )
}

export const PAN_STEP = 72
