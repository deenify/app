"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SUPPLICATION_CATEGORIES, SupplicationCategoryId, SupplicationTag } from "./content"
import { cn } from "@/lib/utils/clsx"
import { Filter, Layers, Hash, History, Bookmark } from "lucide-react"

type Props = {
    selectedCategories: Set<SupplicationCategoryId>
    onCategoryToggle: (id: SupplicationCategoryId) => void
    selectedTags: Set<SupplicationTag>
    onTagToggle: (tag: SupplicationTag) => void
    onClearAll: () => void
    categoryCounts: Record<string, number>
    className?: string
    hideHeader?: boolean
}

const TAGS: SupplicationTag[] = [
    "Prophetic",
    "Quranic",
    "Urgent",
    "Patience",
    "Night",
    "Morning",
    "Wealth",
    "Health",
    "Children",
    "Steadfastness",
    "Success",
]

export default function SupplicationsSidebar({
    selectedCategories,
    onCategoryToggle,
    selectedTags,
    onTagToggle,
    onClearAll,
    categoryCounts,
    className,
    hideHeader = false,
}: Props) {
    const hasFilters = selectedCategories.size > 0 || selectedTags.size > 0

    return (
        <aside className={cn("w-full flex flex-col gap-8", className)}>
            {/* Professional Filter Header */}
            {!hideHeader && (
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                        <Filter className="h-4 w-4 text-gray-900" />
                        <h2 className="text-[11px] font-black uppercase text-gray-900 tracking-wider">
                            Query Engine
                        </h2>
                    </div>
                    {hasFilters && (
                        <button
                            onClick={(e) => { e.preventDefault(); onClearAll(); }}
                            className="text-[10px] tracking-tight font-black uppercase text-rose-600 hover:text-rose-700 
                            flex items-center gap-1 transition-colors"
                        >
                            <History size={14} />
                            Reset
                        </button>
                    )}
                </div>
            )}

            {/* Collections Section - Calm Dot Approach */}
            <div className="space-y-5">
                <div className="flex items-center gap-1.5 px-1">
                    <Layers size={14} className="text-gray-400" />
                    <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Collections
                    </h3>
                </div>
                <div className="space-y-0.5">
                    {SUPPLICATION_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                        const isSelected = selectedCategories.has(cat.id)
                        return (
                            <button
                                key={cat.id}
                                onClick={(e) => { e.preventDefault(); onCategoryToggle(cat.id); }}
                                className={cn(
                                    "flex w-full items-center justify-between px-3 py-2.5 rounded-xl transition-all group",
                                    isSelected
                                        ? "bg-rose-50/50 text-rose-700 font-bold"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-1.5 w-1.5 rounded-full transition-all duration-300",
                                        isSelected ? "bg-rose-600 scale-125 shadow-[0_0_8px_rgba(225,29,72,0.4)]" : "bg-gray-200 group-hover:bg-gray-400"
                                    )} />
                                    <span className="text-sm tracking-tight">{cat.label}</span>
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-md transition-colors",
                                    isSelected ? "bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-400"
                                )}>
                                    {String(categoryCounts[cat.id] || 0).padStart(2, '0')}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Context Section - Fully Rounded Chips */}
            <div className="space-y-5">
                <div className="flex items-center gap-1.5 px-1">
                    <Hash size={14} className="text-gray-400" />
                    <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Mood & Need
                    </h3>
                </div>
                <div className="flex flex-wrap gap-2 px-1">
                    {TAGS.map((tag) => {
                        const isSelected = selectedTags.has(tag)
                        return (
                            <button
                                key={tag}
                                onClick={(e) => { e.preventDefault(); onTagToggle(tag); }}
                                className={cn(
                                    "rounded-full border px-3.5 pt-[5px] pb-[4px] text-[10px] font-bold uppercase",
                                    "tracking-tight transition-all duration-200 shadow-sm",
                                    isSelected
                                        ? "bg-rose-600 border-rose-600 text-white shadow-rose-900/10"
                                        : "bg-rose-50/30 border-rose-100 text-rose-400 hover:border-rose-300 hover:text-rose-600"
                                )}
                            >
                                {tag}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Verse Note - Refined Profile Style */}
            <Card className="border-rose-100 bg-rose-50/30 shadow-sm overflow-hidden rounded-lg">
                <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-rose-100 text-rose-600">
                            <Bookmark size={14} strokeWidth={2.5} />
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs leading-relaxed text-rose-900/80 font-medium italic text-left">
                                "I respond to the call of the caller when he calls upon Me."
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="h-px flex-1 bg-rose-200/50" />
                                <span className="text-[9px] font-bold uppercase text-rose-500 tracking-widest">Al-Baqarah 2:186</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </aside>
    )
}
