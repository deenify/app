"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { RotateCcw, Plus, Sparkles, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DHIKR_TARGET_QUICK, type DhikrPreset } from "./content"

type DhikrCounterPanelProps = {
    preset: DhikrPreset
    count: number
    target: number
    onIncrement: () => void
    onReset: () => void
    onTargetChange: (target: number) => void
}

export default function DhikrCounterPanel({
    preset,
    count,
    target,
    onIncrement,
    onReset,
    onTargetChange,
}: DhikrCounterPanelProps) {
    const progress = Math.min(100, (count / Math.max(target, 1)) * 100)
    const milestone = count >= target

    // Helper to truncate adkhar title for the button
    const getTruncatedTitle = (text: string) => {
        const words = text.split(" ")
        if (words.length > 5) {
            return words.slice(0, 5).join(" ") + "..."
        }
        return text
    }

    return (
        <Card className="overflow-hidden rounded-3xl border border-emerald-300 bg-white 
        shadow-xl shadow-gray-50/50 bg-gradient-to-br from-emerald-50 via-white to-white">
            <CardContent className="p-6 sm:p-10">
                <div className="flex flex-col items-center gap-8">
                    {/* Header Info - Above Counter */}
                    <div className="text-center space-y-3 w-full max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-2">
                            <BookOpen className="h-4 w-4 text-emerald-600" />
                            <span className="text-xs font-bold text-emerald-700/70">Active Adkar</span>
                        </div>
                        <h2 className="font-arabic.. text-5xl leading-none text-gray-900" dir="rtl">
                            {preset.arabic}
                        </h2>
                        <div className="space-y-1 pt-2">
                            <p className="text-lg font-bold text-gray-900 sm:text-2xl tracking-tight">
                                {preset.title}
                            </p>
                            <p className="text-sm font-medium leading-relaxed text-gray-500 mx-auto max-w-md">
                                {preset.insight}
                            </p>
                        </div>
                    </div>

                    {/* Central Circular Counter */}
                    <div className="relative flex aspect-square w-full max-w-[300px] sm:max-w-[340px] items-center justify-center p-4">
                        <svg className="absolute inset-0 h-full w-full -rotate-90 transform overflow-visible">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="46%"
                                className="fill-none stroke-gray-100"
                                strokeWidth="2"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="46%"
                                className="fill-none stroke-emerald-700/70"
                                strokeWidth="5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: progress / 100 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                            />
                        </svg>

                        <div className="relative flex h-[85%] w-[85%] flex-col items-center justify-center 
                        rounded-full bg-white shadow-[0_15px_50px_-15px_rgba(16,185,129,0.20)] 
                        ring-1 ring-emerald-50/50">
                            <div className="flex items-baseline gap-1 tabular-nums">
                                <motion.span
                                    key={count}
                                    initial={{ y: 5, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-6xl font-bold font-heading text-emerald-700 sm:text-6xl"
                                >
                                    {count}
                                </motion.span>
                                <span className="text-2xl font-medium text-gray-300">/</span>
                                <span className="text-xl font-semibold text-gray-500 min-w-11 tracking-tighter">{target}</span>
                            </div>

                            {milestone && (
                                <div className="mt-4">
                                    <Badge variant="emerald" className="px-3 py-1 h-6 text-[11px] uppercase font-bold tracking-widest shadow-sm">
                                        Goal reached
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Target Toggles */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {DHIKR_TARGET_QUICK.map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => onTargetChange(n)}
                                className={cn(
                                    "flex h-9 min-w-[56px] items-center justify-center rounded-xl px-4 text-xs font-bold transition-all",
                                    target === n
                                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                                )}
                            >
                                {n}
                            </button>
                        ))}
                    </div>

                    {/* Actions - Row Below */}
                    <div className="grid grid-cols-2 w-full max-w-lg gap-1">
                        <Button
                            variant="ghost-emerald"
                            size="lg"
                            className="h-14 rounded-lg w-full"
                            onClick={onReset}
                            shouldScale
                        >
                            <RotateCcw className="h-5 w-5" />
                            <span className="hidden sm:inline">Reset session</span>
                            <span className="sm:hidden">Reset</span>
                        </Button>

                        <Button
                            variant="default"
                            size="lg"
                            className="h-14 rounded-lg w-full"
                            onClick={onIncrement}
                            shouldScale
                        >
                            <div className="flex items-center gap-2 truncate px-2">
                                <Plus className="h-5 w-5 shrink-0" />
                                <span className="truncate">{getTruncatedTitle(preset.title)}</span>
                                <span className="shrink-0 text-emerald-200">+1</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
