"use client"

import { Input } from "@/components/ui/input"
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Tabs from "@/components/shared/Tabs"
import FilterDropdown from "@/components/shared/FilterDropdown"

type SortOption = "recommended" | "shortest" | "longest" | "alphabetical"

type ScopeOption = {
    value: string
    label: string
}

type SupplicationsTopBarProps = {
    searchQuery: string
    onSearchChange: (query: string) => void
    searchPlaceholder?: string
    scopeFilter?: {
        value: string
        onChange: (value: string) => void
        options: ScopeOption[]
        placeholder?: string
    }
    sortBy: SortOption
    onSortChange: (sort: SortOption) => void
    viewMode: "grid" | "list"
    onViewModeChange: (mode: "grid" | "list") => void
    resultCount: number
    onMobileFilterToggle: () => void
}

const sortLabels: Record<SortOption, string> = {
    recommended: "Recommended",
    shortest: "Shortest Duration",
    longest: "Longest Duration",
    alphabetical: "Alphabetical (A-Z)",
}

export default function SupplicationsTopBar({
    searchQuery,
    onSearchChange,
    searchPlaceholder = "Search titles, themes, or keywords...",
    scopeFilter,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
    resultCount,
    onMobileFilterToggle,
}: SupplicationsTopBarProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Input
                    search
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="h-10 min-w-0 flex-1 rounded-none border-0 border-b border-gray-100 bg-transparent text-base font-medium shadow-none placeholder:text-gray-400 transition-all duration-300 focus:border-emerald-500 focus-visible:ring-0"
                />
                {scopeFilter && (
                    <div className="w-full shrink-0 sm:w-[220px]">
                        <FilterDropdown
                            options={scopeFilter.options}
                            value={scopeFilter.value}
                            onChange={(value) => scopeFilter.onChange(String(value))}
                            placeholder={scopeFilter.placeholder ?? "View"}
                            theme="emerald"
                            className="w-full"
                            classNames={{ triggerButton: "h-10 w-full" }}
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-1 items-center justify-between gap-4">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1">
                        <span className="text-[11px] font-black tabular-nums text-gray-900">{resultCount}</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Matched</span>
                    </div>

                    <Tabs
                        allTabs={[
                            { id: "grid" as const, label: "", icon: LayoutGrid },
                            { id: "list" as const, label: "", icon: List },
                        ]}
                        activeTab={viewMode}
                        variant="pills"
                        onTabChange={(tabId) => onViewModeChange(tabId as "grid" | "list")}
                        tabClassName="rounded-lg px-2.5 py-1.5"
                        tabsContainerClassName="w-max rounded-lg border border-gray-200/60"
                        contentContainerClassName="hidden"
                        classNames={{
                            pillsIndicator: "rounded-lg border border-gray-200/60 bg-white",
                            tabsWrapper: "rounded-lg border border-gray-200/60",
                            icon: "text-gray-600",
                            iconActive: "text-emerald-600",
                        }}
                    />
                </div>

                <div className="mx-3 hidden h-6 w-px bg-gray-200 md:block" />

                <div className="flex w-full items-center justify-between gap-3 pt-3 md:w-max md:pt-0">
                    <div className="flex-1 xs:w-[220px] xs:flex-auto">
                        <FilterDropdown
                            id="sort"
                            options={Object.keys(sortLabels).map((option) => ({
                                value: option,
                                label: sortLabels[option as SortOption],
                            }))}
                            value={sortBy}
                            onChange={(value) => onSortChange(value as SortOption)}
                            placeholder="Sort by"
                            triggerIcon={
                                <span className="text-[9px] font-bold uppercase tracking-tighter text-emerald-500">
                                    Sort
                                </span>
                            }
                            theme="emerald"
                            className="w-full"
                            classNames={{ labelText: "text-[11px] font-black uppercase tracking-wider" }}
                        />
                    </div>

                    <Button
                        variant="ghost-emerald"
                        onClick={onMobileFilterToggle}
                        className="h-10 w-10 rounded-xl border border-emerald-100 bg-emerald-50 p-0 text-emerald-600 shadow-sm lg:hidden"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
