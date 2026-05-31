"use client"

import React, { useState } from "react"
import { Modal } from "@/components/shared/Modal"
import Tabs, { type TabItem } from "@/components/shared/Tabs"
import { usePagination } from "@/hooks/usePagination"
import { Input } from "@/components/ui/input"
import {
    Sparkles,
    BookOpen,
    Quote,
    Plus,
    ArrowRight,
    Edit3,
    Search,
    Heart,
    Flame
} from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { motion, AnimatePresence } from "framer-motion"
import { Pagination } from "@/components/ui/pagination"
import SwitchWrapper from "../../profile/generic/SwitchWrapper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type TabsType = "custom" | "quran" | "hadith"
interface DhikrAddModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onAdd: (dhikr: any) => void
}

const QURANIC_DHIKRS = Array.from({ length: 25 }, (_, i) => ({
    id: `quran-${i}`,
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
    translation: "Our Lord, give us in this world [that which is] good.",
    source: "Surah Al-Baqarah 2:201",
    likes: 124 + i,
    popularity: i % 5 === 0 ? "Trending" : null
}))

const HADITH_DHIKRS = Array.from({ length: 20 }, (_, i) => ({
    id: `hadith-${i}`,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    translation: "Glory be to Allah and His is the praise.",
    source: "Sahih Bukhari",
    likes: 89 + i,
    popularity: i % 4 === 0 ? "Featured" : null
}))

const tabs: TabItem[] = [
    { id: "custom", label: "Custom Adkar", icon: Sparkles },
    { id: "quran", label: "Quranic Adkar", icon: BookOpen },
    { id: "hadith", label: "Prophetic Adkar", icon: Quote },
]


export function DhikrAddModal({ isOpen, onOpenChange, onAdd }: DhikrAddModalProps) {
    const [activeTab, setActiveTab] = useState<TabsType>("custom")

    // Pagination States for Browse Tabs
    const [quranSearch, setQuranSearch] = useState("")
    const [hadithSearch, setHadithSearch] = useState("")

    const filteredQuran = QURANIC_DHIKRS.filter(item =>
        item.translation.toLowerCase().includes(quranSearch.toLowerCase()) ||
        item.source.toLowerCase().includes(quranSearch.toLowerCase())
    )
    const quranPagination = usePagination(filteredQuran, 5)

    const filteredHadith = HADITH_DHIKRS.filter(item =>
        item.translation.toLowerCase().includes(hadithSearch.toLowerCase()) ||
        item.source.toLowerCase().includes(hadithSearch.toLowerCase())
    )
    const hadithPagination = usePagination(filteredHadith, 5)

    // Custom Dhikr Form State
    const [customDhikr, setCustomDhikr] = useState({
        arabic: "",
        title: "",
        transliteration: "",
        target: 33
    })

    const handleAddCustom = () => {
        if (!customDhikr.arabic || !customDhikr.title) return
        onAdd({ ...customDhikr, id: `custom-${Date.now()}` })
        onOpenChange(false)
        // Reset form
        setCustomDhikr({ arabic: "", title: "", transliteration: "", target: 33 })
    }


    // Determine footer content (pagination or nothing)
    const renderFooter = () => {
        if (activeTab === "quran" && quranPagination.totalPages > 1) {
            return (
                <Pagination
                    page={quranPagination.page}
                    totalPages={quranPagination.totalPages}
                    onPageChange={quranPagination.setPage}
                    align="center"
                    isMobile={typeof window !== 'undefined' && window.innerWidth < 640}
                />
            )
        }
        if (activeTab === "hadith" && hadithPagination.totalPages > 1) {
            return (
                <Pagination
                    page={hadithPagination.page}
                    totalPages={hadithPagination.totalPages}
                    onPageChange={hadithPagination.setPage}
                    align="center"
                    isMobile={typeof window !== 'undefined' && window.innerWidth < 640}
                />
            )
        }
        return null
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => {
                onOpenChange(open);
                if (!open) setActiveTab("custom")
            }}
            title={
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                        <Plus className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">Add to Adkar library</p>
                        <p className="text-[10px] font-medium text-gray-500 truncate sm:text-[11px]">Expand your daily remembrance lattice</p>
                    </div>
                </div>
            }
            className="w-[min(calc(100vw-2rem),640px)]"
            classNames={{
                body: "p-0",
                content: "p-0 overflow-hidden flex flex-col h-[500px] sm:h-[580px]",
                footer: "border-t border-gray-100 bg-gray-50/50 py-3"
            }}
            footer={renderFooter()}
        >
            <Tabs
                allTabs={tabs}
                activeTab={activeTab}
                onTabChange={(id) => setActiveTab(id as TabsType)}
                variant="underline"
                stretchTabs
                className="h-full flex flex-col"
                tabsContainerClassName="bg-white px-2 border-b border-gray-100 flex-shrink-0 z-20 shadow-sm"
                contentContainerClassName="flex-1 overflow-hidden"
            >
                <div className="h-full overflow-y-auto p-4 sm:p-6 scrollbar-thin relative z-10">
                    <AnimatePresence mode="wait">
                        {activeTab === "custom" && (
                            <motion.div
                                key="custom"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <SwitchWrapper
                                    variant="emerald"
                                    cardHeader={{
                                        title: "Draft your Adkar",
                                        description: "Craft a unique formula for your personal library.",
                                        icon: Edit3,
                                    }}
                                    buttonSection={{
                                        visible: true,
                                        primaryButton: {
                                            label: "Save Adkar",
                                            onClick: handleAddCustom,
                                            buttonProps: { variant: "default", className: "h-11 px-8 rounded-xl font-bold shadow-lg shadow-emerald-100" },
                                        },
                                        secondaryButton: {
                                            label: "Cancel",
                                            onClick: () => onOpenChange(false),
                                            buttonProps: { variant: "ghost", className: "h-11 px-6 rounded-xl" },
                                        },
                                    }}
                                    classNames={{
                                        card: "border-gray-100 shadow-sm bg-white rounded-2xl",
                                        cardHeader: "px-6 pt-6",
                                        cardContent: "px-6 pb-6",
                                        buttonsWrapper: "pt-6"
                                    }}
                                >
                                    <div className="grid gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Arabic Script</label>
                                            <Input
                                                textarea
                                                placeholder="أدخل النص العربي هنا..."
                                                className="min-h-[100px] sm:min-h-[120px] text-right font-arabic text-2xl sm:text-3xl resize-none bg-gray-50/30 border-gray-100 focus:bg-white focus:border-emerald-300 rounded-xl"
                                                dir="rtl"
                                                value={customDhikr.arabic}
                                                onChange={(e) => setCustomDhikr({
                                                    ...customDhikr, arabic: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <Input
                                                label="Title / Meaning"
                                                labelVariant="auth"
                                                placeholder="e.g. Istighfar"
                                                value={customDhikr.title}
                                                onChange={(e) => setCustomDhikr({
                                                    ...customDhikr, title: e.target.value
                                                })}
                                                className="w-full"
                                                classNames={{ input: "rounded-xl bg-gray-50/30 border-gray-100 focus:bg-white" }}
                                            />
                                            <Input
                                                label="Transliteration"
                                                labelVariant="auth"
                                                placeholder="Phonetic reading..."
                                                value={customDhikr.transliteration}
                                                onChange={(e) => setCustomDhikr({
                                                    ...customDhikr, transliteration: e.target.value
                                                })}
                                                className="w-full"
                                                classNames={{ input: "rounded-xl bg-gray-50/30 border-gray-100 focus:bg-white" }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Default Target</label>
                                            <div className="flex gap-2">
                                                {[33, 100, 1000].map((t) => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setCustomDhikr({ ...customDhikr, target: t })}
                                                        className={cn(
                                                            "flex-1 h-10 rounded-xl text-sm font-bold transition-all",
                                                            customDhikr.target === t
                                                                ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                                                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                                        )}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SwitchWrapper>
                            </motion.div>
                        )}

                        {activeTab === "quran" && (
                            <BrowseAdkar
                                type="quran"
                                search={quranSearch}
                                onSearchChange={setQuranSearch}
                                items={quranPagination.paginatedItems}
                                onSelect={(d) => {
                                    onAdd(d)
                                    onOpenChange(false)
                                }}
                            />
                        )}

                        {activeTab === "hadith" && (
                            <BrowseAdkar
                                type="hadith"
                                search={hadithSearch}
                                onSearchChange={setHadithSearch}
                                items={hadithPagination.paginatedItems}
                                onSelect={(d) => {
                                    onAdd(d)
                                    onOpenChange(false)
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </Tabs>
        </Modal>
    )
}

function BrowseAdkar({
    type,
    search,
    onSearchChange,
    items,
    onSelect
}: {
    type: "quran" | "hadith",
    search: string,
    onSearchChange: (v: string) => void,
    items: any[],
    onSelect: (d: any) => void
}) {
    return (
        <div className="space-y-5">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
                <Input
                    placeholder={`Search ${type} Adkar...`}
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full"
                    classNames={{
                        input: "pl-9 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-emerald-300 h-11 rounded-xl shadow-sm"
                    }}
                />
            </div>

            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="group relative flex flex-col rounded-2xl border border-gray-100 p-4 sm:p-5 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50/30 bg-white hover:shadow-lg hover:shadow-emerald-50/50"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-3 flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-arabic text-xl sm:text-2xl text-gray-900 leading-relaxed" dir="rtl">{item.arabic}</p>
                                    {item.popularity && (
                                        <Badge variant="amber" className="bg-amber-50 text-amber-700 border-amber-100 gap-1 px-1.5 py-0 h-5 shrink-0">
                                            <Flame className="h-3 w-3" />
                                            <span className="text-[9px] font-bold uppercase">{item.popularity}</span>
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-[13px] font-medium text-gray-600 line-clamp-2 leading-relaxed">{item.translation}</p>
                                
                                <div className="flex items-center justify-between mt-4">
                                    <Badge variant="emerald" className="bg-emerald-50 text-[10px] uppercase font-bold text-emerald-700 border-emerald-100">
                                        {item.source}
                                    </Badge>
                                    
                                    <div className="flex items-center gap-3">
                                        <button 
                                            className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors"
                                            onClick={(e) => { e.stopPropagation(); }}
                                        >
                                            <Heart className="h-3.5 w-3.5" />
                                            <span className="text-[10px] font-bold tabular-nums">{item.likes}</span>
                                        </button>
                                        <Button 
                                            size="icon"
                                            onClick={() => onSelect(item)}
                                            className="h-8 w-8 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-emerald-600 group-hover:text-white transition-all group-hover:rotate-12 group-hover:shadow-md group-hover:shadow-emerald-100"
                                        >
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="py-20 text-center">
                        <p className="text-sm text-gray-400 font-medium">No results found for "{search}"</p>
                    </div>
                )}
            </div>
        </div>
    )
}
