"use client"

import { Drawer, DrawerContent, DrawerThumb, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CatalogCategorySidebar, { type CatalogCategory } from "./CatalogCategorySidebar"
import type { ComponentProps } from "react"

type CatalogFiltersDrawerProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onClearAll: () => void
    categories: CatalogCategory[]
    selectedIds: Set<string>
    onToggle: (id: string) => void
    categoryCounts: Record<string, number>
    sidebarTitle?: string
    note?: { quote: string; reference: string }
    chips?: ComponentProps<typeof CatalogCategorySidebar>["chips"]
}

export default function CatalogFiltersDrawer({
    isOpen,
    onOpenChange,
    onClearAll,
    categories,
    selectedIds,
    onToggle,
    categoryCounts,
    sidebarTitle,
    note,
    chips,
}: CatalogFiltersDrawerProps) {
    const filterCount = selectedIds.size + (chips?.selectedIds.size ?? 0)
    const hasActiveFilters = filterCount > 0

    return (
        <Drawer open={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent className="z-[100] overflow-hidden rounded-t-xl border-none bg-white p-0">
                <div className="flex h-max max-h-[92vh] flex-col">
                    <DrawerThumb className="mx-auto h-1.5 w-12 rounded-full bg-gray-100" />
                    <div className="shrink-0 px-4 py-3">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <DrawerTitle className="text-2xl font-black uppercase tracking-tight text-gray-900">
                                    Filters
                                </DrawerTitle>
                                {hasActiveFilters && (
                                    <Badge variant="emerald" className="h-5 rounded-full px-2 py-0 text-[10px] font-black">
                                        {filterCount}
                                    </Badge>
                                )}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onClearAll()
                                }}
                                className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 hover:bg-emerald-50"
                                disabled={!hasActiveFilters}
                            >
                                Reset All
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 scrollbar-none">
                        <CatalogCategorySidebar
                            hideHeader
                            title={sidebarTitle}
                            categories={categories}
                            selectedIds={selectedIds}
                            onToggle={onToggle}
                            onClearAll={onClearAll}
                            categoryCounts={categoryCounts}
                            note={note}
                            chips={chips}
                        />
                    </div>

                    <div className="shrink-0 border-t border-gray-50 bg-gradient-to-t from-white via-white to-white/80 p-6 pt-2">
                        <Button
                            type="button"
                            className="h-14 w-full rounded-2xl bg-gray-900 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale"
                            onClick={() => onOpenChange(false)}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
