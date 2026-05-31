"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeader from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Hand, Moon, Sparkles, Zap, Info, ShieldCheck, Heart } from "lucide-react"
import { DHIKR_EDITORIAL, DHIKR_PRESETS, type DhikrPreset } from "./content"
import DhikrCounterPanel from "./DhikrCounterPanel"
import DhikrPresetGrid from "./DhikrPresetGrid"
import DhikrSidebar from "./DhikrSidebar"
import { DhikrAddModal } from "./DhikrAddModal"
import { WorldwideAdkarModal } from "./WorldwideAdkarModal"
import { useScrollIntoView } from "@/hooks/useScrollIntoView"

export default function DhikrPage() {
    const [presets, setPresets] = useState<DhikrPreset[]>(DHIKR_PRESETS)
    const [customPresets, setCustomPresets] = useState<DhikrPreset[]>([])
    const [presetId, setPresetId] = useState(presets[0].id)
    const [count, setCount] = useState(0)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isWorldwideModalOpen, setIsWorldwideModalOpen] = useState(false)

    // Tracks which tab the grid should show
    const [gridActiveTab, setGridActiveTab] = useState<string>("featured")

    const { ref: counterRef, scrollIntoView } = useScrollIntoView<HTMLDivElement>({
        offset: 120
    })

    const allPresets = useMemo(() => [...presets, ...customPresets], [presets, customPresets])

    const preset = useMemo(
        () => allPresets.find((p) => p.id === presetId) ?? allPresets[0],
        [presetId, allPresets]
    )

    const [target, setTarget] = useState(preset.defaultTarget)

    const progress = Math.min(100, (count / Math.max(target, 1)) * 100)

    const selectPreset = (next: DhikrPreset) => {
        setPresetId(next.id)
        setCount(0)
        setTarget(next.defaultTarget)
        // Smooth scroll to counter on selection
        setTimeout(() => scrollIntoView(), 100)
    }

    const handleAddAdkhar = (newDhikr: any) => {
        // Prevent duplicate addition
        if (allPresets.some(p => p.id === newDhikr.id)) {
            console.warn("Adkar already exists in library")
            return
        }

        const formattedDhikr: DhikrPreset = {
            id: newDhikr.id || `adhkar-${Date.now()}`,
            title: newDhikr.title || newDhikr.source || "New Adkar",
            arabic: newDhikr.arabic,
            transliteration: newDhikr.transliteration || "",
            defaultTarget: newDhikr.target || 33,
            context: "anytime",
            insight: newDhikr.translation || "Personal adkar added to library."
        }
        setCustomPresets(prev => [formattedDhikr, ...prev])

        // Auto-select the new adkar
        selectPreset(formattedDhikr)

        // Switch library grid tab to 'custom' to show the new item
        setGridActiveTab("custom")

        // Close modals
        setIsAddModalOpen(false)
        setIsWorldwideModalOpen(false)
    }

    const handleDeleteCustom = (id: string) => {
        setCustomPresets(prev => prev.filter(p => p.id !== id))
        if (presetId === id) {
            selectPreset(presets[0])
            setGridActiveTab("featured")
        }
    }

    return (
        <div >
            <SectionHeader
                variant="emerald"
                icon={Hand}
                label="Presence Lab"
                heading="Adkar counter · disciplined remembrance"
                descriptions={[DHIKR_EDITORIAL.lens]}
                classNames={{ heading: "max-w-[600px] tracking-tight text-2xl sm:text-3xl lg:text-4xl" }}
            >
                <div className="flex flex-wrap gap-2 pt-4">
                    <Badge variant="emerald" className="gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm text-[10px] sm:text-xs">
                        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Quantum session (v1.6)
                    </Badge>
                    <Badge variant="outline" className="gap-1.5 px-3 py-1 bg-white border-gray-200 text-gray-600 shadow-sm text-[10px] sm:text-xs">
                        <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-500" />
                        Real-time synchronization
                    </Badge>
                </div>
            </SectionHeader>

            <section className="container relative py-6 sm:py-12 px-4 sm:px-6">
                {/* Subtle Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -left-20 top-40 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-emerald-50/50 blur-[80px] sm:blur-[100px]"
                        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                        transition={{ duration: 15, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -right-20 bottom-40 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-purple-50/30 blur-[80px] sm:blur-[100px]"
                        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                        transition={{ duration: 18, repeat: Infinity, delay: 1 }}
                    />
                </div>

                <main className="relative mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
                    <section className="min-w-0 space-y-10 sm:space-y-12">
                        {/* Main Counter Panel */}
                        <div ref={counterRef} className="scroll-mt-24">
                            <DhikrCounterPanel
                                preset={preset}
                                count={count}
                                target={target}
                                onIncrement={() => setCount((c) => c + 1)}
                                onReset={() => setCount(0)}
                                onTargetChange={setTarget}
                            />
                        </div>

                        {/* Adkar Library Grid */}
                        <DhikrPresetGrid
                            activeId={presetId}
                            onSelect={selectPreset}
                            presets={presets}
                            customPresets={customPresets}
                            onAddAdkhar={() => setIsAddModalOpen(true)}
                            onViewAllWorldwide={() => setIsWorldwideModalOpen(true)}
                            onDeleteCustom={handleDeleteCustom}
                            activeTab={gridActiveTab}
                            onTabChange={setGridActiveTab}
                        />

                        {/* Refined Adab Section */}
                        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                            <Card className="border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-5 sm:p-6 space-y-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-gray-900 text-base sm:text-lg">Spiritual Adab</h4>
                                        <p className="text-xs sm:text-sm leading-relaxed text-gray-500">
                                            Posture your heart before your tongue. Seek quietude and maintain consistent focus for deeper acquaintance with the Divine.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-5 sm:p-6 space-y-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                        <Heart className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-gray-900 text-base sm:text-lg">Mechanical Focus</h4>
                                        <p className="text-xs sm:text-sm leading-relaxed text-gray-500">
                                            {DHIKR_EDITORIAL.mechanics} Use volume as a tool for discipline, not just a tally. Consistency beats chaotic hopping.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Sidebar Intelligence */}
                    <div className="w-full">
                        <DhikrSidebar preset={preset} progress={progress} />
                    </div>
                </main>
            </section>

            <DhikrAddModal
                isOpen={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
                onAdd={handleAddAdkhar}
            />

            <WorldwideAdkarModal
                isOpen={isWorldwideModalOpen}
                onOpenChange={setIsWorldwideModalOpen}
                onSelect={handleAddAdkhar}
                existingIds={allPresets.map(p => p.id)}
            />
        </div>
    )
}
