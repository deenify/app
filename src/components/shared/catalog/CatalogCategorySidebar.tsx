"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { Bookmark, Filter, History, Layers } from "lucide-react"

export type CatalogCategory = {
    id: string
    label: string
}

type CatalogCategorySidebarProps = {
    title?: string
    categories: CatalogCategory[]
    selectedIds: Set<string>
    onToggle: (id: string) => void
    onClearAll: () => void
    categoryCounts: Record<string, number>
    hideHeader?: boolean
    className?: string
    note?: {
        quote: string
        reference: string
    }
    chips?: {
        title: string
        items: CatalogCategory[]
        selectedIds: Set<string>
        onToggle: (id: string) => void
    }
}

export default function CatalogCategorySidebar({
    title = "Collections",
    categories,
    selectedIds,
    onToggle,
    onClearAll,
    categoryCounts,
    hideHeader = false,
    className,
    note,
    chips,
}: CatalogCategorySidebarProps) {
    const hasFilters = selectedIds.size > 0 || (chips?.selectedIds.size ?? 0) > 0

    return (
        <aside className={cn("flex w-full flex-col gap-8", className)}>
            {!hideHeader && (
                <div className="flex items-center justify-between border-b border-layout-separator pb-2">
                    <div className="flex items-center gap-1.5">
                        <Filter className="h-4 w-4 text-gray-900" />
                        <h2 className="text-[11px] font-black uppercase tracking-wider text-gray-900">
                            Query Engine
                        </h2>
                    </div>
                    {hasFilters && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                onClearAll()
                            }}
                            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tight text-emerald-600 transition-colors hover:text-emerald-700"
                        >
                            <History size={14} />
                            Reset
                        </button>
                    )}
                </div>
            )}

            <div className="space-y-5">
                <div className="flex items-center gap-1.5 px-1">
                    <Layers size={14} className="text-gray-400" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">{title}</h3>
                </div>
                <div className="space-y-0.5">
                    {categories.map((cat) => {
                        const isSelected = selectedIds.has(cat.id)
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onToggle(cat.id)
                                }}
                                className={cn(
                                    "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition-all",
                                    isSelected
                                        ? "bg-emerald-50/50 font-bold text-emerald-700"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={cn(
                                            "h-1.5 w-1.5 rounded-full transition-all duration-300",
                                            isSelected
                                                ? "scale-125 bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                                                : "bg-gray-200 group-hover:bg-gray-400"
                                        )}
                                    />
                                    <span className="text-sm tracking-tight">{cat.label}</span>
                                </div>
                                <span
                                    className={cn(
                                        "rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums transition-colors",
                                        isSelected ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"
                                    )}
                                >
                                    {String(categoryCounts[cat.id] || 0).padStart(2, "0")}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {chips && (
                <div className="space-y-5">
                    <div className="flex items-center gap-1.5 px-1">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            {chips.title}
                        </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 px-1">
                        {chips.items.map((item) => {
                            const isSelected = chips.selectedIds.has(item.id)
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        chips.onToggle(item.id)
                                    }}
                                    className={cn(
                                        "rounded-full border px-3.5 pb-[4px] pt-[5px] text-[10px] font-bold uppercase tracking-tight shadow-sm transition-all duration-200",
                                        isSelected
                                            ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-900/10"
                                            : "border-emerald-100 bg-emerald-50/30 text-emerald-500 hover:border-emerald-300 hover:text-emerald-600"
                                    )}
                                >
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {note && (
                <Card className="overflow-hidden rounded-lg border-emerald-100 bg-emerald-50/30 shadow-sm">
                    <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-100 text-emerald-600">
                                <Bookmark size={14} strokeWidth={2.5} />
                            </div>
                            <div className="space-y-2">
                                <p className="text-left text-xs font-medium italic leading-relaxed text-emerald-900/80">
                                    &ldquo;{note.quote}&rdquo;
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-emerald-200/50" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">
                                        {note.reference}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </aside>
    )
}
