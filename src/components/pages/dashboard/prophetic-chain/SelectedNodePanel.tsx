"use client"

import { cn } from "@/lib/utils/clsx"
import type { LineageChartNode } from "@/components/shared/lineage-chart"
import type { PropheticNodeData } from "./prophetic-data"

type SelectedNodePanelProps = {
    node: LineageChartNode<PropheticNodeData> | null
    className?: string
}

export function SelectedNodePanel({ node, className }: SelectedNodePanelProps) {
    if (!node?.data) {
        return (
            <div className={cn("rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4", className)}>
                <p className="text-sm leading-relaxed text-gray-500">
                    Select a reference card to inspect relation, era, and gloss.
                </p>
            </div>
        )
    }

    const d = node.data

    return (
        <div className={cn("rounded-xl border border-emerald-200 bg-emerald-50/50 p-4", className)}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                ref · {node.ref}
            </p>
            <h2 className="mt-2 text-lg font-medium text-gray-900">
                {node.label}
                <span className="ml-2 text-sm font-normal text-emerald-800">{d.nameEnglish}</span>
            </h2>
            {node.subtitle ? (
                <p className="font-arabic mt-1 text-right text-2xl text-emerald-900" dir="rtl">
                    {node.subtitle}
                </p>
            ) : null}
            <dl className="mt-4 space-y-2 text-sm">
                <DetailRow label="Relation" value={d.relation} />
                <DetailRow label="Era" value={d.era} />
                <DetailRow label="Lifespan" value={d.lifespan} />
                <DetailRow label="Passing" value={d.passing} />
            </dl>
            <p className="mt-4 text-sm font-medium text-gray-800">{d.epithet}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{d.gloss}</p>
        </div>
    )
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{label}</dt>
            <dd className="text-gray-800">{value}</dd>
        </div>
    )
}
