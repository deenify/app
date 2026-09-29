"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { RotateCcw, Plus, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DHIKR_TARGET_QUICK, type DhikrPreset } from "./content"

type DhikrCounterPanelProps = {
    preset: DhikrPreset
    count: number
    tasbihCount: number
    target: number
    onIncrement: () => void
    onReset: () => void
    onTargetChange: (target: number) => void
}

interface TargetTabsProps {
    target: number
    onTargetChange: (n: number) => void
}



function TargetTabs({ target, onTargetChange }: TargetTabsProps) {
    return (
        <div className="relative inline-flex items-center rounded-full bg-gray-100/90 p-0.5 ring-1 ring-gray-200/60">
            {DHIKR_TARGET_QUICK.map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onTargetChange(n)}
                    className={cn(
                        "relative z-10 h-7 min-w-[38px] px-2.5 text-[11px] font-bold transition-colors",
                        target === n ? "text-white" : "text-gray-500 hover:text-gray-800"
                    )}
                >
                    {target === n && (
                        <motion.span
                            layoutId="dhikr-target-pill"
                            className="absolute inset-0 rounded-full bg-emerald-600 shadow-sm"
                            transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        />
                    )}
                    <span className="relative z-10 tabular-nums">{n}</span>
                </button>
            ))}
        </div>
    )
}



export default function DhikrCounterPanel({
    preset,
    count,
    tasbihCount,
    target,
    onIncrement,
    onReset,
    onTargetChange,
}: DhikrCounterPanelProps) {

    const progress = Math.min(100, (count / Math.max(target, 1)) * 100)
    const milestone = count >= target
    const arabicLines = preset.arabic.length > 28 ? 2 : 1

    const getTruncatedTitle = (text: string) => {
        const words = text.split(" ")
        if (words.length > 4) return words.slice(0, 4).join(" ") + "..."
        return text
    }

    return (
        <Card className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-white shadow-lg 
        shadow-emerald-50/40 bg-gradient-to-br from-emerald-50 via-white to-white">
            <CardContent className="p-4 sm:p-6 lg:p-7">
                <div className="flex flex-col items-center gap-4 sm:gap-5 max-h-[min(88vh,720px)]">
                    {/* Header */}
                    <div className="w-full max-w-xl space-y-2 text-center">
                        <div className="sm:pb-2">
                            <TargetTabs target={target} onTargetChange={onTargetChange} />
                        </div>

                        <h2
                            className={cn(
                                "font-arabic leading-tight text-gray-900 truncate",
                                arabicLines > 1
                                    ? "text-[clamp(1.25rem,4.5vw,2rem)] line-clamp-2"
                                    : "text-[clamp(1.5rem,5vw,2.25rem)] line-clamp-1"
                            )}
                            dir="rtl"
                        >
                            {preset.arabic}
                        </h2>

                        <div className="space-y-0.5">
                            <p className="text-base font-bold text-gray-900 sm:text-lg tracking-tight line-clamp-1 truncate">
                                {preset.title}
                            </p>
                            <p className="text-xs font-medium text-gray-500 mx-auto max-w-md line-clamp-2 leading-relaxed">
                                {preset.insight}
                            </p>
                        </div>
                    </div>

                    {/* Counter ring */}
                    <div className="relative mx-auto flex size-[clamp(148px,52vw,240px)] max-w-[240px] shrink-0 items-center justify-center">
                        <svg className="absolute inset-0 h-full w-full -rotate-90 transform overflow-visible">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="46%"
                                className="fill-none stroke-gray-100/50"
                                strokeWidth="2"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="46%"
                                className="fill-none stroke-emerald-600/75"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: progress / 100 }}
                                transition={{ duration: 0.6, ease: "circOut" }}
                            />
                        </svg>

                        <div className="relative flex h-[86%] w-[86%] flex-col items-center justify-center 
                        rounded-full bg-white shadow-[0_12px_40px_-12px_rgba(16,185,129,0.22)] ring-1 
                        ring-emerald-100/80">
                            <AnimatePresence>
                                {tasbihCount > 0 && (
                                    <motion.div
                                        initial={{ y: 8, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="absolute top-[18%] flex items-center gap-1"
                                    >
                                        <Sparkles size={14} className="text-emerald-500" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                                            Tasbih <span className="text-emerald-600 text-xs inline">{tasbihCount}</span>
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex items-baseline gap-0.5 tabular-nums">
                                <motion.span
                                    key={count}
                                    initial={{ y: 4, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-[clamp(2.5rem,8vw,3.25rem)] font-bold font-heading text-emerald-700 leading-none"
                                >
                                    {count}
                                </motion.span>
                                <span className="text-lg font-medium text-gray-300">/</span>
                                <span className="text-base font-semibold text-gray-500 min-w-9 tracking-tighter">{target}</span>
                            </div>

                            {milestone && (
                                <div className="mt-2">
                                    <Badge variant="emerald" className="h-5 px-2 text-[9px] uppercase font-bold tracking-widest">
                                        Goal reached
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex w-full max-w-md flex-col gap-2 xs:flex-row xs:items-center">
                        <Button
                            variant="ghost-red"
                            size="sm"
                            className="h-11 w-full rounded-xl px-6 text-red-600 text-xs xs:w-auto xs:shrink-0"
                            onClick={onReset}
                            shouldScale
                        >
                            <RotateCcw className="h-4 w-4" />
                            Reset
                        </Button>

                        <Button
                            variant="default"
                            size="lg"
                            className="h-11 w-full min-w-0 rounded-xl xs:flex-1"
                            onClick={onIncrement}
                            shouldScale
                        >
                            <div className="flex min-w-0 items-center justify-center gap-2 truncate">
                                <Plus className="h-4 w-4 shrink-0" />
                                <span className="truncate text-sm font-bold">{getTruncatedTitle(preset.title)}</span>
                                <span className="shrink-0 text-emerald-200 text-sm font-bold">+1</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
