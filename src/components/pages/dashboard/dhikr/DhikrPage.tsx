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
export default function DhikrPage() {
    const [presets, setPresets] = useState<DhikrPreset[]>(DHIKR_PRESETS)
    const [customPresets, setCustomPresets] = useState<DhikrPreset[]>([])
    const [presetId, setPresetId] = useState(presets[0].id)
    const [count, setCount] = useState(0)
    const [tasbihCount, setTasbihCount] = useState(0)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isWorldwideModalOpen, setIsWorldwideModalOpen] = useState(false)

    // Tracks which tab the grid should show
    const [gridActiveTab, setGridActiveTab] = useState<string>("featured")

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
        setTasbihCount(0)
        setTarget(next.defaultTarget)
    }

    const handleIncrement = () => {
        if (count + 1 >= target) {
            setCount(0)
            setTasbihCount((t) => t + 1)
        } else {
            setCount((c) => c + 1)
        }
    }

    const handleReset = () => {
        setCount(0)
        setTasbihCount(0)
    }

    const handleAddAdkhar = (newDhikr: {
        id?: string
        title?: string
        arabic: string
        transliteration?: string
        target?: number
        translation?: string
        source?: string
    }) => {
        const id = newDhikr.id || `adhkar-${Date.now()}`

        if (allPresets.some((p) => p.id === id)) {
            return
        }

        const formattedDhikr: DhikrPreset = {
            id,
            title: newDhikr.title || newDhikr.source || "New Adkar",
            arabic: newDhikr.arabic,
            transliteration: newDhikr.transliteration || "",
            defaultTarget: newDhikr.target || 33,
            context: "anytime",
            insight: newDhikr.translation || "Personal adkar added to library.",
        }

        setCustomPresets((prev) => [formattedDhikr, ...prev])
        setGridActiveTab("custom")
    }

    const handleDeleteCustom = (id: string) => {
        setCustomPresets((prev) => prev.filter((p) => p.id !== id))
        if (presetId === id) {
            setPresetId(presets[0].id)
            setCount(0)
            setTasbihCount(0)
            setTarget(presets[0].defaultTarget)
            setGridActiveTab("featured")
        }
    }

    return (
        <div>
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

            <section className="container relative py-6 sm:py-12">
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

                <div className="mx-auto grid max-w-6xl items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
                    <main className="min-w-0 overflow-x-clip space-y-10 sm:space-y-12 pb-6 lg:pb-0">
                        {/* Main Counter Panel */}
                        <div>
                            <DhikrCounterPanel
                                preset={preset}
                                count={count}
                                tasbihCount={tasbihCount}
                                target={target}
                                onIncrement={handleIncrement}
                                onReset={handleReset}
                                onTargetChange={(newTarget) => {
                                    setTarget(newTarget)
                                    setCount(0)
                                    setTasbihCount(0)
                                }}
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
                    </main>

                    {/* Sidebar Intelligence */}
                    <DhikrSidebar preset={preset} progress={progress} />
                </div>
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
