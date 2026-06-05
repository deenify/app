"use client"

import { Plus, CheckCircle2 } from "lucide-react"
import { type DhikrPreset } from "./content"
import Tabs, { TabItem } from "@/components/shared/Tabs"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import AdkharCard from "./AdkharCard"
import AnimateUp from "@/components/shared/motion/AnimateUp"
import { usePagination } from "@/hooks/usePagination"
import { useBreakpoint } from "@/hooks/useBreakpoint"

const CUSTOM_PAGE_SIZE = 10

type DhikrPresetGridProps = {
    activeId: string
    onSelect: (preset: DhikrPreset) => void
    presets: DhikrPreset[]
    customPresets: DhikrPreset[]
    onAddAdkhar: () => void
    onViewAllWorldwide: () => void
    onDeleteCustom?: (id: string) => void
}



export default function DhikrPresetGrid({
    activeId,
    onSelect,
    presets,
    customPresets,
    onAddAdkhar,
    onViewAllWorldwide,
    onDeleteCustom,
    activeTab,
    onTabChange
}: DhikrPresetGridProps & { activeTab: string, onTabChange: (id: string) => void }) {
    const isMobile = useBreakpoint("sm", "down")
    const {
        paginatedItems: paginatedCustomPresets,
        page: customPage,
        setPage: setCustomPage,
        totalPages: customTotalPages,
    } = usePagination(customPresets, CUSTOM_PAGE_SIZE)

    const tabs: TabItem[] = [
        { id: "featured", label: "Featured" },
        { id: "custom", label: "Your Adkar" },
    ]

    return (
        <section className="min-w-0 space-y-6 overflow-hidden">
            <div className="flex flex-col gap-4 text-center items-center" >
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight xs:text-xl">Adkar library</h3>
                    <p className="text-xs text-gray-500 xs:text-sm">Select a lane or contribute to worldwide remembrance</p>
                </div>
                <Tabs
                    allTabs={tabs}
                    activeTab={activeTab}
                    onTabChange={(id) => onTabChange(id as string)}
                    variant="pills"
                    align="center"
                    stretchTabs={false}
                    tabClassName="px-4 xs:px-6 sm:px-8 h-7 xs:h-8"
                    tabsContainerClassName="bg-transparent justify-center max-w-full"
                    contentContainerClassName="hidden"
                    classNames={{
                        tabsWrapper: "max-w-full",
                        labelClassName: "text-[10px] xs:text-xs",
                    }}
                />
            </div>

            <div>
                {activeTab === "featured" ? (
                    <AnimateUp
                        key="featured"
                        className="grid gap-4 sm:grid-cols-2"
                    >
                        {presets.map((preset, idx) => (
                            <AdkharCard
                                key={preset.id}
                                preset={preset}
                                isActive={activeId === preset.id}
                                onSelect={() => onSelect(preset)}
                                // Mock 0 contribution state for first 2 featured cards
                                hasContributions={idx > 1}
                            />
                        ))}
                    </AnimateUp>
                ) : (
                    <AnimateUp
                        key="custom"
                        className="h-full"
                    >
                        {customPresets.length > 0 ? (
                            <div className="space-y-4">
                                <div
                                    id="custom-adkar-list"
                                    className="grid gap-4 sm:grid-cols-2 scroll-mt-24"
                                >
                                    {paginatedCustomPresets.map((preset) => (
                                        <AdkharCard
                                            key={preset.id}
                                            preset={preset}
                                            isActive={activeId === preset.id}
                                            onSelect={() => onSelect(preset)}
                                            onDelete={() => onDeleteCustom?.(preset.id)}
                                            isCustom
                                        />
                                    ))}
                                </div>

                                {customTotalPages > 1 && (
                                    <Pagination
                                        page={customPage}
                                        totalPages={customTotalPages}
                                        onPageChange={setCustomPage}
                                        align="center"
                                        isMobile={isMobile}
                                        scrollContainerId="custom-adkar-list"
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={1.5} />
                                </div>
                                <h4 className="text-gray-900 font-bold text-lg mb-2">
                                    No custom Adkar yet
                                </h4>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-[280px]">
                                    Start building your personal library by adding custom formulas or verses.
                                </p>
                            </div>
                        )}
                    </AnimateUp>
                )}
            </div>

            <div className="space-y-3 pt-4 sm:space-y-4 sm:pt-6">
                <Button
                    variant="default"
                    className="w-full h-11 rounded-xl font-bold text-sm shadow-md shadow-emerald-100 sm:h-12 sm:rounded-2xl sm:text-base"
                    onClick={onAddAdkhar}
                    shouldScale
                >
                    <Plus className="h-4 w-4 mr-1 sm:h-5 sm:w-5" />
                    Add Adkar
                </Button>

                <div className="flex justify-center">
                    <Button
                        variant="transparent"
                        size="max"
                        className="text-[13px] font-bold text-gray-400 hover:text-emerald-600 transition-colors"
                        onClick={onViewAllWorldwide}
                    >
                        View all Adkar worldwide
                    </Button>
                </div>
            </div>
        </section>
    )
}
