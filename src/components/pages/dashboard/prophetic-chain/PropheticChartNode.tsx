"use client"

import { cn } from "@/lib/utils/clsx"
import type { LineageChartNode } from "@/components/shared/lineage-chart"
import { getCardDensity } from "./cardDensity"
import type { PropheticNodeData } from "./prophetic-data"
import { getProphetScripture } from "./scripture"

type PropheticChartNodeProps = {
    node: LineageChartNode<PropheticNodeData> & { x: number; y: number }
    selected: boolean
    scale: number
    onSelect: () => void
}

export function PropheticChartNode({ node, selected, scale, onSelect }: PropheticChartNodeProps) {
    const d = node.data
    if (!d) return null

    const density = getCardDensity(scale)
    const scripture = getProphetScripture(node.id)

    return (
        <button
            type="button"
            data-lineage-node
            onClick={onSelect}
            className={cn(
                "flex h-full w-full overflow-hidden text-left outline-none",
                "rounded-md border bg-white",
                "transition-[border-color,box-shadow] duration-150",
                "focus-visible:ring-2 focus-visible:ring-emerald-300",
                selected
                    ? "z-20 border-emerald-500 shadow-[0_8px_28px_rgba(16,185,129,0.2)] ring-2 ring-emerald-100"
                    : "z-10 border-gray-200 shadow-sm hover:border-emerald-400"
            )}
        >
            {density === "minimal" ? (
                <MinimalBody node={node} d={d} scale={scale} />
            ) : density === "standard" ? (
                <StandardBody node={node} d={d} scale={scale} />
            ) : (
                <RichBody node={node} d={d} scale={scale} scripture={scripture} />
            )}
        </button>
    )
}

function MinimalBody({
    node,
    d,
    scale,
}: {
    node: LineageChartNode<PropheticNodeData>
    d: PropheticNodeData
    scale: number
}) {
    const enSize = clampPx(10, 12, scale * 11)
    const arSize = clampPx(11, 14, scale * 12.5)

    return (
        <span className="flex h-full w-full flex-col items-center justify-center gap-0.5 px-1.5 py-1 text-center">
            <span
                className="w-full truncate font-semibold leading-tight text-gray-900"
                style={{ fontSize: enSize }}
                title={node.label}
            >
                {node.label}
            </span>
            {node.subtitle ? (
                <span
                    className="font-arabic w-full truncate leading-tight text-emerald-900"
                    dir="rtl"
                    style={{ fontSize: arSize }}
                    title={node.subtitle}
                >
                    {node.subtitle}
                </span>
            ) : (
                <span
                    className="w-full truncate text-gray-500"
                    style={{ fontSize: clampPx(9, 11, scale * 10) }}
                >
                    {d.nameEnglish}
                </span>
            )}
        </span>
    )
}

function StandardBody({
    node,
    d,
    scale,
}: {
    node: LineageChartNode<PropheticNodeData>
    d: PropheticNodeData
    scale: number
}) {
    return (
        <span className="flex h-full w-full min-h-0 flex-col justify-center gap-1 overflow-hidden px-2 py-1.5">
            <span className="flex shrink-0 items-center justify-between gap-1">
                <span
                    className="shrink-0 rounded bg-emerald-600 px-1 py-px font-bold tabular-nums text-white"
                    style={{ fontSize: clampPx(8, 10, scale * 9) }}
                >
                    {node.ref}
                </span>
                <span
                    className="min-w-0 truncate text-emerald-800"
                    style={{ fontSize: clampPx(8, 10, scale * 9) }}
                    title={d.honorific}
                >
                    {d.honorific}
                </span>
            </span>
            <span className="min-h-0 shrink">
                <span
                    className="block truncate font-semibold leading-tight text-gray-900"
                    style={{ fontSize: clampPx(10, 12, scale * 11) }}
                    title={node.label}
                >
                    {node.label}
                </span>
                <span
                    className="block truncate text-gray-500"
                    style={{ fontSize: clampPx(9, 11, scale * 10) }}
                >
                    {d.nameEnglish}
                </span>
                {node.subtitle ? (
                    <span
                        className="font-arabic mt-0.5 block truncate text-right leading-tight text-emerald-900"
                        dir="rtl"
                        style={{ fontSize: clampPx(11, 14, scale * 12) }}
                        title={node.subtitle}
                    >
                        {node.subtitle}
                    </span>
                ) : null}
            </span>
        </span>
    )
}

function RichBody({
    node,
    d,
    scale,
    scripture,
}: {
    node: LineageChartNode<PropheticNodeData>
    d: PropheticNodeData
    scale: number
    scripture: string | null
}) {
    return (
        <span className="flex h-full w-full min-h-0 flex-col overflow-hidden px-2.5 py-2">
            <span className="flex shrink-0 items-center justify-between gap-1 border-b border-gray-100 pb-1.5">
                <span
                    className="rounded-md bg-emerald-600 px-1.5 py-0.5 font-bold tabular-nums text-white"
                    style={{ fontSize: clampPx(9, 11, scale * 10) }}
                >
                    ref {node.ref}
                </span>
                <span
                    className="min-w-0 truncate font-medium text-emerald-800"
                    style={{ fontSize: clampPx(8, 10, scale * 9) }}
                >
                    {d.honorific}
                </span>
            </span>

            <span className="mt-1.5 shrink-0">
                <span
                    className="block truncate font-semibold text-gray-900"
                    style={{ fontSize: clampPx(11, 13, scale * 12) }}
                >
                    {node.label}
                </span>
                <span
                    className="block truncate text-gray-500"
                    style={{ fontSize: clampPx(9, 11, scale * 10) }}
                >
                    {d.nameEnglish}
                </span>
                {node.subtitle ? (
                    <span
                        className="font-arabic block truncate text-right text-emerald-900"
                        dir="rtl"
                        style={{ fontSize: clampPx(12, 15, scale * 13) }}
                    >
                        {node.subtitle}
                    </span>
                ) : null}
            </span>

            <span className="mt-1.5 min-h-0 flex-1 space-y-1 overflow-hidden">
                <ChipRow scale={scale} label="Era" value={d.era} />
                <ChipRow scale={scale} label="Laqab" value={d.epithet} />
                {scripture ? (
                    <span
                        className="inline-block max-w-full truncate rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 font-medium text-emerald-900"
                        style={{ fontSize: clampPx(8, 10, scale * 9) }}
                        title={scripture}
                    >
                        Scripture · {scripture}
                    </span>
                ) : (
                    <span
                        className="inline-block truncate rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-gray-600"
                        style={{ fontSize: clampPx(8, 10, scale * 9) }}
                    >
                        No separate book named in tradition
                    </span>
                )}
            </span>
        </span>
    )
}

function ChipRow({ label, value, scale }: { label: string; value: string; scale: number }) {
    return (
        <span className="block min-w-0">
            <span
                className="font-semibold uppercase tracking-wide text-gray-400"
                style={{ fontSize: clampPx(7, 9, scale * 8) }}
            >
                {label}
            </span>
            <span
                className="block truncate text-gray-700"
                style={{ fontSize: clampPx(9, 11, scale * 10) }}
                title={value}
            >
                {value}
            </span>
        </span>
    )
}

function clampPx(min: number, max: number, preferred: number) {
    return `${Math.round(Math.min(max, Math.max(min, preferred)))}px`
}
