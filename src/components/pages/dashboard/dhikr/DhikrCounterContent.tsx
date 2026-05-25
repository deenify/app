"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import SectionHeader from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DHIKR_EDITORIAL, DHIKR_PRESETS, type DhikrPreset } from "./content"
import { cn } from "@/lib/utils/clsx"
import {
    Clock12,
    Hand,
    HeartHandshake,
    Moon,
    Sparkles,
    Target,
} from "lucide-react"

export default function DhikrCounterContent() {
    const [presetId, setPresetId] = useState(DHIKR_PRESETS[0].id)
    const [count, setCount] = useState(0)

    const preset = useMemo(
        () => DHIKR_PRESETS.find((p) => p.id === presetId) ?? DHIKR_PRESETS[0],
        [presetId]
    )

    const [target, setTarget] = useState(preset.defaultTarget)

    const progress = Math.min(100, (count / Math.max(target, 1)) * 100)
    const milestone = count >= target

    const selectPreset = (p: DhikrPreset) => {
        setPresetId(p.id)
        setCount(0)
        setTarget(p.defaultTarget)
    }

    const increment = () => setCount((c) => c + 1)
    const reset = () => setCount(0)

    return (
        <div className="bg-white">
            <SectionHeader
                variant="emerald"
                icon={Hand}
                label="Presence lab"
                heading="Dhikr counter · disciplined remembrance"
                descriptions={[DHIKR_EDITORIAL.lens]}
            >
                <div className="flex flex-wrap gap-2 pt-1">
                    <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-sm text-emerald-900">
                        <Sparkles className="mr-1 h-3.5 w-3.5" />
                        Local-first session (browser memory later)
                    </Badge>
                    <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                        Post-salah lattice compatible
                    </Badge>
                </div>
            </SectionHeader>

            <section className="relative overflow-hidden">
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute left-[-60px] top-16 h-52 w-52 rounded-full bg-teal-200/35 blur-3xl"
                    animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.06, 1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute right-[-40px] top-48 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl"
                    animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <div className="container relative py-8 sm:py-10">
                    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12">
                        <div className="min-w-0 space-y-8">
                            <Card className="overflow-hidden border-emerald-100 shadow-[0_24px_80px_rgba(15,118,110,0.09)]">
                                <CardContent className="p-6 sm:p-10">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center rounded-full p-3 sm:max-w-[360px]"
                                            style={{
                                                background: `conic-gradient(rgb(16 185 129) ${progress}%, rgb(229 231 235) 0)`,
                                            }}
                                        >
                                            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white p-8 text-center shadow-inner">
                                                <p className="font-arabic text-3xl text-gray-900 sm:text-4xl" dir="rtl">
                                                    {preset.arabic}
                                                </p>
                                                <p className="mt-3 text-sm font-medium text-emerald-800">
                                                    {preset.transliteration}
                                                </p>
                                                <div className="mt-8 flex items-baseline gap-2 tabular-nums">
                                                    <span className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                                                        {count}
                                                    </span>
                                                    <span className="text-lg text-gray-400">/</span>
                                                    <span className="text-2xl font-medium text-gray-500">{target}</span>
                                                </div>
                                                {milestone && (
                                                    <Badge variant="emerald" className="mt-5">
                                                        Target reached — continue or reset
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                                            <Button
                                                type="button"
                                                size="lg"
                                                className="h-14 flex-1 text-base"
                                                onClick={increment}
                                                shouldScale
                                            >
                                                Count +1
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="lg"
                                                className="h-14 flex-1 gap-2"
                                                onClick={reset}
                                            >
                                                <Clock12 className="h-5 w-5" />
                                                Reset
                                            </Button>
                                        </div>

                                        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Target
                                            </span>
                                            {[33, 34, 100].map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => setTarget(n)}
                                                    className={cn(
                                                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                                                        target === n
                                                            ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                                                            : "border-gray-200 bg-white text-gray-600 hover:border-emerald-200"
                                                    )}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div>
                                <p className="mb-3 text-sm font-semibold text-gray-900">Presets · choose one lane</p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {DHIKR_PRESETS.map((p) => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => selectPreset(p)}
                                            className={cn(
                                                "rounded-2xl border p-4 text-left transition-all",
                                                presetId === p.id
                                                    ? "border-emerald-400 bg-emerald-50/80 shadow-sm"
                                                    : "border-gray-100 bg-white hover:border-emerald-100"
                                            )}
                                        >
                                            <p className="font-arabic text-xl text-gray-900" dir="rtl">
                                                {p.arabic}
                                            </p>
                                            <p className="mt-1 text-sm font-medium text-gray-800">{p.title}</p>
                                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
                                                {p.insight}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Card className="border-gray-100 bg-gray-50/70">
                                <CardContent className="space-y-3 p-6">
                                    <div className="flex items-center gap-2">
                                        <Moon className="h-4 w-4 text-emerald-700" />
                                        <p className="text-sm font-semibold text-gray-900">Mechanics & adab</p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-600">{DHIKR_EDITORIAL.mechanics}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <aside className="min-w-0 space-y-8 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-layout-separator lg:pl-8">
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-purple-600" />
                                    <p className="text-sm font-semibold text-gray-900">Session intelligence</p>
                                </div>
                                <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Active formula</span>
                                        <span className="font-semibold text-gray-900">{preset.title}</span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between border-t border-purple-100 pt-4 text-sm">
                                        <span className="text-gray-600">Completion</span>
                                        <span className="font-semibold tabular-nums text-purple-800">
                                            {Math.round(progress)}%
                                        </span>
                                    </div>
                                    <p className="mt-4 text-xs leading-relaxed text-gray-600">
                                        Wire this panel to streaks, weekly aggregates, and export when you add a backend.
                                    </p>
                                </div>
                            </section>

                            <section className="border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-2">
                                    <HeartHandshake className="h-4 w-4 text-emerald-600" />
                                    <p className="text-sm font-semibold text-gray-900">Companion surfaces</p>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <Button
                                        href="/supplications"
                                        variant="outline"
                                        className="h-auto w-full justify-between py-3 text-left"
                                    >
                                        <span className="font-medium">Supplication library</span>
                                        <span className="text-xs font-normal text-gray-500">Duʿāʾ corpus</span>
                                    </Button>
                                    <Button
                                        href="/prayer"
                                        variant="outline"
                                        className="h-auto w-full justify-between py-3 text-left"
                                    >
                                        <span className="font-medium">Prayer rhythm</span>
                                        <span className="text-xs font-normal text-gray-500">Windows & lattice</span>
                                    </Button>
                                </div>
                            </section>

                            <section className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
                                <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/90">
                                    Teaching note
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-amber-950/90">
                                    Quantities like 33/33/34 are sunnah frameworks—not magical tallies. Priority is humble,
                                    attentive repetition aligned with what reliable scholarship transmits for your madhhab
                                    context.
                                </p>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    )
}
