"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    DEFAULT_LOCATION_LABEL,
    POST_SALAH_DHIKR,
    PRAYER_EDITORIAL,
    PRAYER_FIQH_NOTE,
    PRAYER_WINDOWS,
    type PrayerWindow,
} from "@/components/pages/dashboard/content"
import { cn } from "@/lib/utils/clsx"
import {
    Bell,
    BookOpen,
    Calendar,
    Check,
    ChevronRight,
    Clock,
    Compass,
    Flame,
    MapPin,
    Moon,
    Settings,
    Sparkles,
    Sun,
    Sunrise,
    Sunset,
} from "lucide-react"

const phaseIcon = (p: PrayerWindow["phase"]) => {
    switch (p) {
        case "dawn":
            return Sunrise
        case "dusk":
            return Sunset
        case "night":
            return Moon
        case "afternoon":
        case "noon":
            return Sun
        default:
            return Sun
    }
}

function seededDayCompletion(dayIndex: number) {
    return ((dayIndex * 7 + 3) % 5) + 1
}

export default function PrayerTimesContent() {
    const [completed, setCompleted] = useState<Record<string, boolean>>({
        Fajr: true,
        Dhuhr: true,
        Asr: false,
        Maghrib: false,
        Isha: false,
    })

    const currentId = "Asr"

    const monthlyDays = useMemo(
        () =>
            Array.from({ length: 30 }, (_, i) => ({
                day: i + 1,
                completed: seededDayCompletion(i),
            })),
        []
    )

    const totalPrayers = monthlyDays.reduce((sum, d) => sum + d.completed, 0)
    const completionRate = Math.round((totalPrayers / (monthlyDays.length * 5)) * 100)
    const streakDays = 12

    const toggle = (id: string) => setCompleted((p) => ({ ...p, [id]: !p[id] }))

    return (
        <div className="bg-white">
            <section className="border-b border-layout-separator">
                <div className="container px-4 pb-8 pt-6 sm:px-6 sm:pb-9 sm:pt-8 md:pt-10">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 flex items-center gap-2.5"
                    >
                        <div className="flex items-center justify-center rounded-lg bg-emerald-50 p-2.5 text-emerald-700">
                            <Clock className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <Badge variant="emerald" className="text-xs font-medium">
                            Prayer rhythm
                        </Badge>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="space-y-4"
                    >
                        <h1 className="max-w-[560px] text-4xl font-medium tracking-tight text-gray-900">
                            The day, measured in remembrance
                        </h1>
                        <p className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
                            A mature prayer surface isn&apos;t only clocks—it&apos;s context: where you are, what phase
                            the sun is in, and how salah punctuates thought. Below is a structured experience layer you
                            can later bind to real calculation APIs.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            <Badge variant="outline" className="border-gray-200 bg-gray-50 text-sm text-gray-700">
                                <MapPin className="mr-1 h-3.5 w-3.5" />
                                {DEFAULT_LOCATION_LABEL}
                            </Badge>
                            <Badge variant="outline" className="border-gray-200 bg-gray-50 text-sm text-gray-700">
                                <Calendar className="mr-1 h-3.5 w-3.5" />
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-sm text-emerald-800">
                                <Sparkles className="mr-1 h-3.5 w-3.5" />
                                Demo times
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-3">
                            <Button variant="secondary" type="button" shouldScale className="gap-2" size="sm">
                                <Bell className="h-4 w-4" />
                                Notifications
                            </Button>
                            <Button variant="secondary" type="button" shouldScale className="gap-2" size="sm">
                                <Settings className="h-4 w-4" />
                                Calculation settings
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="relative">
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute left-[-48px] top-12 h-48 w-48 rounded-full bg-emerald-200/35 blur-3xl"
                    animate={{ opacity: [0.25, 0.42, 0.25], scale: [1, 1.07, 1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute right-[-32px] top-40 h-44 w-44 rounded-full bg-amber-200/30 blur-3xl"
                    animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <div className="container relative py-8 sm:py-10">
                    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-12">
                        <div className="min-w-0 space-y-12">
                            <section className="space-y-6">
                                <div className="max-w-2xl">
                                    <p className="text-sm font-semibold text-gray-900">Arc of the day</p>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{PRAYER_EDITORIAL.arcLead}</p>
                                </div>

                                <div className="relative rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 via-white to-white px-4 py-8 sm:px-8">
                                    <div className="absolute left-8 right-8 top-[42px] hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent sm:block" />
                                    <div className="grid grid-cols-5 gap-2 sm:gap-3">
                                        {PRAYER_WINDOWS.map((w) => {
                                            const done = completed[w.id]
                                            const active = w.id === currentId
                                            const Icon = phaseIcon(w.phase)
                                            return (
                                                <button
                                                    key={w.id}
                                                    type="button"
                                                    onClick={() => toggle(w.id)}
                                                    className="flex flex-col items-center gap-2 text-center"
                                                >
                                                    <span
                                                        className={cn(
                                                            "relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 transition-all",
                                                            active &&
                                                            "border-emerald-500 bg-white shadow-[0_8px_24px_rgba(16,185,129,0.2)]",
                                                            done && !active && "border-emerald-400 bg-emerald-50",
                                                            !done && !active && "border-gray-200 bg-white hover:border-emerald-200"
                                                        )}
                                                    >
                                                        <Icon className="h-5 w-5 text-gray-800" />
                                                        {done && (
                                                            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                                                                <Check className="h-3 w-3" />
                                                            </span>
                                                        )}
                                                    </span>
                                                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                                                        {w.name}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <p className="mt-6 text-center text-xs text-gray-500">
                                        Tap a phase to mark intention—local persistence can replace this toggle later.
                                    </p>
                                </div>
                            </section>

                            <section className="space-y-5">
                                <div className="max-w-2xl">
                                    <p className="text-sm font-semibold text-gray-900">Today&apos;s salaḥ windows</p>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{PRAYER_EDITORIAL.windowsLead}</p>
                                </div>

                                <div className="grid gap-4">
                                    {PRAYER_WINDOWS.map((w) => {
                                        const Icon = phaseIcon(w.phase)
                                        const active = w.id === currentId
                                        const done = completed[w.id]
                                        return (
                                            <div
                                                key={w.id}
                                                className={cn(
                                                    "group relative overflow-hidden rounded-2xl border bg-white transition-all",
                                                    active
                                                        ? "border-emerald-400 shadow-[0_16px_40px_rgba(16,185,129,0.12)]"
                                                        : "border-gray-100 hover:border-emerald-100"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "absolute inset-y-0 left-0 w-1 bg-gradient-to-b",
                                                        active ? "from-emerald-500 to-teal-500" : "from-gray-200 to-gray-100"
                                                    )}
                                                />
                                                <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-gray-800 ring-1 ring-gray-100">
                                                            <Icon className="h-6 w-6" />
                                                        </div>
                                                        <div>
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h3 className="text-lg font-semibold text-gray-900">{w.name}</h3>
                                                                {active && (
                                                                    <Badge variant="emerald" className="text-[10px] uppercase">
                                                                        Current window
                                                                    </Badge>
                                                                )}
                                                                {done && (
                                                                    <Badge
                                                                        variant="outline"
                                                                        className="border-emerald-200 bg-emerald-50 text-[10px] text-emerald-800"
                                                                    >
                                                                        Logged
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="font-arabic mt-1 text-2xl text-gray-900" dir="rtl">
                                                                {w.arabic}
                                                            </p>
                                                            <p className="text-xs font-medium text-gray-500">{w.transliteration}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                                                        <p className="text-3xl font-semibold tracking-tight text-gray-900 tabular-nums">
                                                            {w.time}
                                                        </p>
                                                        <Button
                                                            type="button"
                                                            variant={done ? "outline-emerald" : "default"}
                                                            size="sm"
                                                            onClick={() => toggle(w.id)}
                                                            shouldScale
                                                        >
                                                            {done ? "Undo mark" : "Mark offered"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>

                            <section className="grid gap-6 lg:grid-cols-2">
                                <Card className="border-gray-100 bg-gray-50/50">
                                    <CardContent className="space-y-3 p-6">
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <BookOpen className="h-4 w-4 text-emerald-600" />
                                            <p className="text-sm font-semibold">Stillness between obligations</p>
                                        </div>
                                        <p className="text-sm leading-relaxed text-gray-600">{PRAYER_EDITORIAL.stillness}</p>
                                    </CardContent>
                                </Card>

                                <Card className="border-purple-100 bg-gradient-to-br from-purple-50/60 to-white">
                                    <CardContent className="space-y-4 p-6">
                                        <p className="text-sm font-semibold text-gray-900">Post-salah dhikr lattice</p>
                                        <p className="text-xs text-gray-600">
                                            Compact lattice—expand into full dhikr flows on your counter page.
                                        </p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {POST_SALAH_DHIKR.map((d) => (
                                                <div
                                                    key={d.label}
                                                    className="rounded-xl border border-purple-100 bg-white p-3 text-center shadow-sm"
                                                >
                                                    <p className="font-arabic text-lg text-gray-900" dir="rtl">
                                                        {d.arabic}
                                                    </p>
                                                    <p className="mt-1 text-[10px] text-gray-500">{d.label}</p>
                                                    <Badge
                                                        variant="outline"
                                                        className="mt-2 border-purple-200 bg-purple-50 text-[10px] text-purple-800"
                                                    >
                                                        {d.count}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            href="/dhikr"
                                            variant="ghost"
                                            className="h-9 w-full gap-1 text-purple-700 hover:bg-purple-50"
                                        >
                                            Open dhikr counter
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </section>
                        </div>

                        <aside className="min-w-0 space-y-8 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-layout-separator lg:pl-8">
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Flame className="h-4 w-4 text-orange-600" />
                                    <p className="text-sm font-semibold text-gray-900">Rhythm intelligence</p>
                                </div>
                                <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/90 to-white p-5">
                                    <p className="text-xs uppercase tracking-wide text-orange-800/80">Streak</p>
                                    <p className="mt-2 text-4xl font-bold text-gray-900">{streakDays}</p>
                                    <p className="text-xs text-gray-600">Days of intentional logging (demo)</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                        <span>Month completion</span>
                                        <span className="font-semibold text-gray-900">{completionRate}%</span>
                                    </div>
                                    <Progress value={completionRate} className="h-1.5" />
                                    <div className="grid grid-cols-7 gap-1 pt-2">
                                        {monthlyDays.slice(0, 28).map((d) => (
                                            <div
                                                key={d.day}
                                                title={`Day ${d.day}`}
                                                className="aspect-square rounded-sm"
                                                style={{
                                                    backgroundColor:
                                                        d.completed === 5
                                                            ? "#059669"
                                                            : d.completed >= 3
                                                                ? "#6ee7b7"
                                                                : d.completed >= 1
                                                                    ? "#d1fae5"
                                                                    : "#f3f4f6",
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-500">Heat strip · illustrative consistency grid</p>
                                </div>
                            </section>

                            <section className="border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-emerald-600" />
                                    <p className="text-sm font-semibold text-gray-900">Scholarly grounding</p>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-gray-600">{PRAYER_FIQH_NOTE}</p>
                            </section>

                            <section className="space-y-3">
                                <p className="text-sm font-semibold text-gray-900">Navigate worship</p>
                                <div className="space-y-2">
                                    <Button
                                        href="/calendar"
                                        variant="outline"
                                        className="h-auto w-full flex-col items-start gap-1 py-3 text-left sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <span className="flex items-center gap-2 font-medium">
                                            <Calendar className="h-4 w-4 shrink-0" />
                                            Hijri calendar
                                        </span>
                                        <span className="w-full text-xs font-normal text-gray-500 sm:w-auto sm:text-right">
                                            Lunar seasons & events
                                        </span>
                                    </Button>
                                    <Button
                                        href="/qibla"
                                        variant="outline"
                                        className="h-auto w-full flex-col items-start gap-1 py-3 text-left sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <span className="flex items-center gap-2 font-medium">
                                            <Compass className="h-4 w-4 shrink-0" />
                                            Qibla finder
                                        </span>
                                        <span className="w-full text-xs font-normal text-gray-500 sm:w-auto sm:text-right">
                                            Bearing toward Makkah
                                        </span>
                                    </Button>
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    )
}
