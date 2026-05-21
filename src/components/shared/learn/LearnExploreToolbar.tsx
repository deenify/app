"use client"

import { useMemo } from "react"
import { Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
import { cn } from "@/lib/utils/clsx"
import type { LearnCategory } from "./types"

type LearnExploreToolbarProps = {
    searchQuery: string
    onSearchChange: (value: string) => void
    category: string
    onCategoryChange: (value: string) => void
    categories: LearnCategory[]
    itemCount: number
    countLabel?: string
    placeholder?: string
    filterTheme?: "emerald" | "amber" | "blue" | "purple" | "slate"
    countToneClass?: string
    filterPlaceholder?: string
    getCategoryCount?: (categoryId: string) => number
    /** Count pill beside filter on small screens (hidden from sm+) */
    showMobileCount?: boolean
}

export function LearnExploreToolbar({
    searchQuery,
    onSearchChange,
    category,
    onCategoryChange,
    categories,
    itemCount,
    countLabel = "items",
    placeholder = "Search...",
    filterTheme = "purple",
    countToneClass = "border-emerald-200 bg-emerald-50/80 text-emerald-800",
    filterPlaceholder = "All topics",
    getCategoryCount,
    showMobileCount = true,
}: LearnExploreToolbarProps) {
    const categoryOptions = useMemo(
        () =>
            categories.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel: getCategoryCount ? String(getCategoryCount(c.id)) : undefined,
            })),
        [categories, getCategoryCount]
    )

    return (
        <section className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
            <Input
                search
                type="input"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full min-w-0 sm:min-w-0 sm:flex-1"
                classNames={{
                    inputWrapper: "w-full min-w-0",
                    input: "h-10 w-full min-w-0 rounded-md border-gray-200 bg-white text-base placeholder:text-gray-400 focus:bg-white",
                }}
            />

            <div className="flex w-full min-w-0 items-center gap-2 sm:max-w-[260px] sm:shrink-0 md:max-w-[280px]">
                <div className="min-w-0 flex-1 sm:w-full">
                    <FilterDropdown
                        options={categoryOptions}
                        value={category}
                        onChange={(v) => onCategoryChange(String(v))}
                        placeholder={filterPlaceholder}
                        triggerIcon={Filter}
                        theme={filterTheme}
                        className="w-full"
                        classNames={{
                            triggerButton: "w-full max-w-full",
                            content: "scrollbar-thin",
                        }}
                    />
                </div>

                {showMobileCount && (
                    <div
                        className={cn(
                            "inline-flex h-9 shrink-0 items-center justify-center rounded-md border px-2.5 text-xs font-medium shadow-sm sm:hidden",
                            countToneClass
                        )}
                    >
                        <span className="tabular-nums font-semibold">{itemCount}</span>
                        <span className="ml-1 truncate">{countLabel}</span>
                    </div>
                )}
            </div>

            <div
                className={cn(
                    "hidden h-9 shrink-0 items-center justify-center rounded-md border px-3 text-xs font-medium shadow-sm sm:inline-flex",
                    countToneClass
                )}
            >
                <span className="tabular-nums font-semibold">{itemCount}</span>
                <span className="ml-1">{countLabel}</span>
            </div>
        </section>
    )
}
