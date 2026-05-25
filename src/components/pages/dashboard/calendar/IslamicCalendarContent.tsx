"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/shared/SectionHeader"
import {
    CALENDAR_EDITORIAL,
    DEMO_MONTH_EVENTS,
    HIJRI_ANCHOR_VERSE,
    ISLAMIC_MONTH_NAMES,
    UPCOMING_EVENTS_DEMO,
} from "@/components/pages/dashboard/content"
import { cn } from "@/lib/utils/clsx"
import {
    Book,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Heart,
    Moon,
    Sparkles,
    Star,
} from "lucide-react"

/** Demo anchor — replace with API-driven Hijri month length & weekday offset */
const DEMO_YEAR = 1447
const DEMO_TODAY = { monthIndex: 9, day: 15 }
const PAD_START = 2

export default function IslamicCalendarContent() {
    const [monthIndex, setMonthIndex] = useState(DEMO_TODAY.monthIndex)
    const [selectedDay, setSelectedDay] = useState<number | null>(DEMO_TODAY.day)

    const daysInMonth = 30
    const monthName = ISLAMIC_MONTH_NAMES[monthIndex]

    const cells = useMemo(() => {
        const pads = Array.from({ length: PAD_START }, (_, i) => ({ type: "pad" as const, key: `pad-${i}` }))
        const days = Array.from({ length: daysInMonth }, (_, i) => ({
            type: "day" as const,
            day: i + 1,
            key: `d-${i + 1}`,
        }))
        return [...pads, ...days]
    }, [])

    const eventsForDay = DEMO_MONTH_EVENTS.filter((e) => e.day === selectedDay)

    return (
        <div className="bg-white">
            <SectionHeader
                variant="purple"
                icon={Calendar}
                label="Lunar orientation"
                heading="Hijri calendar as a map of sacred time"
                descriptions={[CALENDAR_EDITORIAL.lunarLead]}
                classNames={{ heading: "max-w-[620px]" }}
            >
                <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/60 px-3 py-1.5 text-sm text-purple-950">
                        <Moon className="h-4 w-4" />
                        <span>
                            Today (demo): {DEMO_TODAY.day} {ISLAMIC_MONTH_NAMES[DEMO_TODAY.monthIndex]} {DEMO_YEAR} AH
                        </span>
                    </div>
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-gray-300 sm:inline-block" />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    <Button href="/guides" variant="secondary" shouldScale className="gap-2" size="sm">
                        <Book className="h-4 w-4" />
                        Seasonal guides
                    </Button>
                    <Button href="/guides" variant="secondary" shouldScale className="gap-2" size="sm">
                        <Heart className="h-4 w-4" />
                        Charity & zakāh hub
                    </Button>
                </div>
            </SectionHeader>

            <section className="relative overflow-hidden">
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute left-[-60px] top-24 h-52 w-52 rounded-full bg-purple-200/35 blur-3xl"
                    animate={{ opacity: [0.25, 0.42, 0.25], scale: [1, 1.06, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute right-[-20px] top-48 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl"
                    animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />

                <div className="container relative py-8 sm:py-10">
                    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-12">
                        <div className="min-w-0 space-y-10">
                            <Card className="overflow-hidden border-gray-100 shadow-none">
                                <CardContent className="space-y-4 p-6 sm:p-8">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                                                Integration
                                            </p>
                                            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-600">
                                                {CALENDAR_EDITORIAL.integration}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-800">
                                            <Sparkles className="mr-1 h-3.5 w-3.5" />
                                            Lunar-first worldview
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50/40 via-white to-white">
                                <div className="flex flex-col gap-4 border-b border-purple-100/80 p-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Observing month
                                        </p>
                                        <h2 className="mt-1 text-2xl font-semibold text-gray-900">{monthName}</h2>
                                        <p className="text-xs text-gray-500">
                                            {DEMO_YEAR} AH · demo grid ({daysInMonth} days)
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-9 w-9 p-0"
                                            onClick={() => setMonthIndex((m) => Math.max(0, m - 1))}
                                            disabled={monthIndex === 0}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-9 w-9 p-0"
                                            onClick={() => setMonthIndex((m) => Math.min(11, m + 1))}
                                            disabled={monthIndex === 11}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <div className="mb-3 grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                            <div key={d}>{d.slice(0, 1)}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {cells.map((cell) =>
                                            cell.type === "pad" ? (
                                                <div key={cell.key} className="aspect-square rounded-xl bg-transparent" />
                                            ) : (
                                                <button
                                                    key={cell.key}
                                                    type="button"
                                                    onClick={() => setSelectedDay(cell.day)}
                                                    className={cn(
                                                        "aspect-square rounded-xl border text-sm font-semibold transition-all",
                                                        monthIndex === DEMO_TODAY.monthIndex &&
                                                        cell.day === DEMO_TODAY.day &&
                                                        "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-500/25",
                                                        !(monthIndex === DEMO_TODAY.monthIndex && cell.day === DEMO_TODAY.day) &&
                                                        DEMO_MONTH_EVENTS.some((e) => e.day === cell.day) &&
                                                        "border-emerald-200 bg-emerald-50 text-emerald-950 hover:bg-emerald-100",
                                                        !(monthIndex === DEMO_TODAY.monthIndex && cell.day === DEMO_TODAY.day) &&
                                                        !DEMO_MONTH_EVENTS.some((e) => e.day === cell.day) &&
                                                        "border-gray-100 bg-white text-gray-800 hover:border-purple-200 hover:bg-purple-50/40"
                                                    )}
                                                >
                                                    {cell.day}
                                                </button>
                                            )
                                        )}
                                    </div>

                                    {selectedDay !== null && (
                                        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Selected · day {selectedDay}
                                            </p>
                                            {eventsForDay.length > 0 ? (
                                                <ul className="mt-3 space-y-2">
                                                    {eventsForDay.map((ev) => (
                                                        <li
                                                            key={ev.title}
                                                            className="flex items-start justify-between gap-3 text-sm text-gray-800"
                                                        >
                                                            <span>{ev.title}</span>
                                                            <Badge
                                                                variant="outline"
                                                                className={cn(
                                                                    "shrink-0 text-[10px]",
                                                                    ev.tone === "eid" &&
                                                                    "border-emerald-200 bg-emerald-50 text-emerald-800",
                                                                    ev.tone === "fast" && "border-blue-200 bg-blue-50 text-blue-800",
                                                                    ev.tone === "note" &&
                                                                    "border-gray-200 bg-white text-gray-700"
                                                                )}
                                                            >
                                                                {ev.tone}
                                                            </Badge>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-2 text-sm text-gray-600">
                                                    No demo markers on this date—hook Hijri event data to populate acts,
                                                    fasts, and holidays.
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="mb-3 text-sm font-semibold text-gray-900">Twelve gates of the year</p>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                                    {ISLAMIC_MONTH_NAMES.map((m, i) => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => setMonthIndex(i)}
                                            className={cn(
                                                "shrink-0 rounded-full border px-4 py-2 text-left text-xs font-medium transition-all",
                                                monthIndex === i
                                                    ? "border-purple-400 bg-purple-600 text-white shadow-md"
                                                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-200"
                                            )}
                                        >
                                            <span className="block text-[10px] uppercase text-gray-400">M{i + 1}</span>
                                            <span className="mt-0.5 block max-w-[120px] truncate">{m}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
                                <CardContent className="flex gap-4 p-6">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold tracking-wide text-blue-800">
                                            {HIJRI_ANCHOR_VERSE.ref}
                                        </p>
                                        <p className="mt-2 text-sm italic leading-relaxed text-gray-800">
                                            &ldquo;{HIJRI_ANCHOR_VERSE.text}&rdquo;
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <aside className="min-w-0 space-y-8 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-layout-separator lg:pl-8">
                            <section>
                                <div className="mb-4 flex items-center justify-between">
                                    <p className="text-sm font-semibold text-gray-900">Horizon events</p>
                                    <Moon className="h-4 w-4 text-purple-600" />
                                </div>
                                <div className="relative space-y-3 pl-4">
                                    <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-purple-200 via-emerald-200 to-transparent" />
                                    {UPCOMING_EVENTS_DEMO.map((ev) => (
                                        <div key={ev.name} className="relative rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                                            <span className="absolute -left-[9px] top-5 h-2.5 w-2.5 rounded-full border-2 border-white bg-purple-500 shadow" />
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium leading-snug text-gray-900">{ev.name}</p>
                                                <Badge variant="outline" className="shrink-0 text-[10px]">
                                                    {ev.horizon}
                                                </Badge>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">{ev.when}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <Card className="border-amber-100 bg-gradient-to-br from-amber-50/70 to-white">
                                <CardContent className="space-y-3 p-5">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-semibold text-gray-900">Moon phase · illustrative</p>
                                        <Moon className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <div className="flex items-center gap-4 rounded-xl border border-amber-100 bg-white p-4">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-yellow-100 shadow-inner">
                                            <Moon className="h-7 w-7 text-white drop-shadow" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Waxing gibbous</p>
                                            <p className="text-xs text-gray-600">Wire astronomical API for illumination %</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <section>
                                <div className="mb-3 flex items-center gap-2">
                                    <Star className="h-4 w-4 text-amber-600" />
                                    <p className="text-sm font-semibold text-gray-900">Sacred months (ḥurūm)</p>
                                </div>
                                <div className="grid gap-2">
                                    {["Muharram", "Rajab", "Dhul-Qa'dah", "Dhul-Hijjah"].map((m) => (
                                        <div
                                            key={m}
                                            className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50/50 px-3 py-2 text-sm text-gray-800"
                                        >
                                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-600" />
                                            {m}
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                                    Sacredness implies heightened awareness—not automatic prohibition of everything.
                                    Follow qualified guidance for rulings.
                                </p>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    )
}
