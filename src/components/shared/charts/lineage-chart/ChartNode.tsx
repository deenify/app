"use client"

import { cn } from "@/lib/utils/clsx"
import type { LineageChartNode } from "./types"

type ChartNodeProps = {
    node: LineageChartNode & { x: number; y: number }
    selected: boolean
    width: number
    height: number
    onSelect: () => void
}

export function ChartNode({ node, selected, width, height, onSelect }: ChartNodeProps) {
    const honorific = node.data?.honorific as string | undefined
    const epithet = node.data?.epithet as string | undefined
    const refLabel = node.ref !== undefined ? String(node.ref) : null

    return (
        <button
            type="button"
            data-lineage-node
            onClick={onSelect}
            className={cn(
                "absolute text-left outline-none transition-[box-shadow,border-color] duration-150",
                "rounded-xl border bg-white/95 backdrop-blur-[2px]",
                "focus-visible:ring-2 focus-visible:ring-emerald-200",
                selected
                    ? "z-10 border-emerald-400 shadow-[0_12px_40px_rgba(16,185,129,0.2)] ring-1 ring-emerald-100"
                    : "border-gray-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.06)] hover:border-emerald-300 hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]"
            )}
            style={{ width, height }}
        >
            <span className="flex h-full flex-col px-3.5 py-3">
                <span className="flex items-center justify-between gap-2">
                    {refLabel ? (
                        <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-gray-500">
                            {refLabel}
                        </span>
                    ) : (
                        <span />
                    )}
                    {honorific ? (
                        <span className="truncate text-[10px] font-medium text-emerald-700">{honorific}</span>
                    ) : null}
                </span>
                <span className="mt-1.5 truncate text-sm font-semibold text-gray-900">{node.label}</span>
                {node.subtitle ? (
                    <span className="font-arabic mt-0.5 truncate text-right text-[15px] text-emerald-800" dir="rtl">
                        {node.subtitle}
                    </span>
                ) : null}
                {epithet ? (
                    <span className="mt-auto line-clamp-1 text-[11px] leading-snug text-gray-500">{epithet}</span>
                ) : null}
            </span>
        </button>
    )
}
