"use client"

import { Input } from "@/components/ui/input"
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Tabs from "@/components/shared/Tabs"
import FilterDropdown from "@/components/shared/FilterDropdown"

type SortOption = "recommended" | "shortest" | "longest" | "alphabetical"

type SupplicationsTopBarProps = {
    searchQuery: string
    onSearchChange: (query: string) => void
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
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
    resultCount,
    onMobileFilterToggle,
}: SupplicationsTopBarProps) {
    return (
        <div className="flex flex-col gap-6">
            {/* Native Search Prop - Clean Implementation */}
            <Input
                search
                placeholder="Search titles, themes, or keywords..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="h-14 bg-transparent border-0 border-b border-gray-100 focus:border-emerald-500 rounded-none shadow-none text-base font-medium placeholder:text-gray-400 focus-visible:ring-0 transition-all duration-300"
            />

            {/* Utility Toolbar - Refined UI */}
            <div className="flex items-center justify-between flex-wrap">
                <div className="flex-1 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
                        <span className="text-[11px] font-black tabular-nums text-gray-900">{resultCount}</span>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Matched</span>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* View Control - Improved Visibility */}

                        <Tabs
                            allTabs={[{
                                id: "grid" as const,
                                label: "",
                                icon: LayoutGrid,
                            }, {
                                id: "list" as const,
                                label: "",
                                icon: List,
                            }]}
                            activeTab={viewMode}
                            variant="pills"
                            onTabChange={(tabId) => onViewModeChange(tabId as "grid" | "list")}
                            tabClassName="py-1.5 px-2.5 rounded-lg"
                            tabsContainerClassName="border border-gray-200/60 rounded-full w-max rounded-lg"
                            contentContainerClassName="hidden"
                            classNames={{
                                pillsIndicator: "bg-white border border-gray-200/60 rounded-lg",
                                tabsWrapper: "border border-gray-200/60 rounded-lg",
                                icon: "text-gray-600",
                                iconActive: "text-emerald-600",
                            }}
                        />
                    </div>
                </div>

                <div className="h-6 w-px bg-gray-200 mx-3 hidden md:block" />
                <div className="flex items-center justify-between gap-3 md:w-max w-full pt-3 md:pt-0">
                    {/* Sort menu */}
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
                                <span className="text-emerald-500 text-[9px] font-bold uppercase tracking-tighter">
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
                        className="h-10 w-10 lg:hidden rounded-xl p-0 bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
