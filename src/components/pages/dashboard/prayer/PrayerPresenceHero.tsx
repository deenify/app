"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
    DEFAULT_LOCATION_LABEL,
    DEMO_COUNTDOWN,
    DEMO_CURRENT_PRAYER_ID,
    DEMO_NEXT_PRAYER_ID,
    PRAYER_SECTIONS,
    presenseHeroStats,
    SUNRISE_TIME
} from "./content"
import {
    Bell,
    Calendar,
    Clock,
    MapPin,
    Sparkles,
    Sunrise,
} from "lucide-react"
import PrayerTimelineArc from "@/components/shared/charts/timeline-arc/TimelineArc"
import { cn } from "@/lib/utils/clsx"


function formatClock() {
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }).format(new Date())
}

function formatHeadingDate() {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(new Date())
}

function formatHijriDate() {
    return new Intl.DateTimeFormat("en-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date())
}

function splitTime(time: string) {
    const match = time.match(/^(.+?)\s*(AM|PM)$/i)
    if (!match) return { main: time, period: "" }
    return { main: match[1].trim(), period: match[2].toUpperCase() }
}



export default function PrayerPresenceHero({ loggedCount }: { loggedCount: number }) {
    const [now, setNow] = useState("")
    const DAILY_PRAYERS = PRAYER_SECTIONS[0].entries

    useEffect(() => {
        const tick = () => setNow(formatClock())
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    const next = DAILY_PRAYERS.find((e) => e.id === DEMO_NEXT_PRAYER_ID)
    const nextParts = next ? splitTime(next.time) : { main: "", period: "" }
    const presenseHeroStatContent = presenseHeroStats(loggedCount)

    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1c1c1c] 
        text-white shadow-[0_24px_64px_rgba(0,0,0,0.22)]...">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <Image
                    src={"/images/pages/prayer/presense-hero-background.avif"}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover opacity-95"
                    priority
                />

                {/* < md  */}
                <div className="absolute inset-0 md:hidden bg-gradient-to-br from-[#141414] from-0% via-[#141414]/88 via-[38%] to-transparent to-72%" />
                <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#141414] from-0% via-[#141414]/65 via-[32%] to-transparent to-[58%]" />
                <div className="absolute inset-0 md:hidden bg-gradient-to-t from-[#141414]/75 from-0% via-[#141414]/35 via-[28%] to-transparent to-[55%]" />

                {/* md → lg  */}
                <div className="absolute inset-0 hidden bg-gradient-to-r from-[#141414] from-0% via-[#141414]/80 via-[52%] to-transparent md:block lg:hidden" />
                <div className="absolute inset-0 hidden bg-gradient-to-br from-[#141414]/92 from-0% via-transparent via-[32%] to-transparent md:block lg:hidden" />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-[#141414]/50 via-transparent to-[#141414]/25 md:block lg:hidden" />

                {/* lg+  */}
                <div className="absolute inset-0 hidden bg-gradient-to-r from-[#141414] from-0% via-[#141414]/70 via-[46%] to-transparent lg:block" />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-[#141414]/55 via-transparent to-[#141414]/30 lg:block" />
                <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_85%_75%_at_76%_48%,transparent_0%,rgba(20,20,20,0.32)_52%,rgba(20,20,20,0.58)_100%)] lg:block" />
            </div>

            <div className="relative px-5 py-8 lg:p-6">
                <div
                    className={cn(
                        "grid gap-4 sm:gap-5",
                        "md:grid-cols-[minmax(0,1fr)_minmax(200px,38%)] md:items-stretch md:gap-5",
                        "lg:grid-cols-2 lg:gap-6"
                    )}
                >
                    <section className="flex min-w-0 flex-col justify-between">
                        <div>
                            <p className="text-[11px] font-normal uppercase tracking-wider text-white/45 sm:text-[10px]">
                                {formatHijriDate()}
                            </p>
                            <h5
                                className={cn(
                                    "pt-1 font-semibold leading-none tabular-nums tracking-tight font-body",
                                    "text-3xl sm:text-4xl"
                                )}
                            >
                                {now || "—"}
                            </h5>
                        </div>
                        <div className="flex w-full min-w-0 items-end md:pt-6 lg:pt-0">
                            <PrayerTimelineArc
                                prayers={DAILY_PRAYERS}
                                currentId={DEMO_CURRENT_PRAYER_ID}
                            />
                        </div>
                    </section>

                    <section className="flex w-full min-w-0 md:justify-end">
                        <div
                            className={cn(
                                "relative flex w-full flex-col justify-between gap-3 rounded-md border",
                                "border-white/5 bg-[#323232]/70 p-3.5 backdrop-blur-md sm:gap-4 sm:p-4",
                                "max-w-none md:min-h-full md:max-w-[260px] lg:max-w-[220px] lg:shrink-0"
                            )}
                        >
                            <Sparkles
                                className="absolute right-3 top-3 h-3.5 w-3.5 text-white/35"
                                strokeWidth={1.5}
                            />
                            <div>
                                <p className="text-[11px] capitalize tracking-wide text-white/50 sm:text-[10px]">
                                    Next
                                </p>
                                <p className="text-lg font-semibold leading-tight sm:text-xl">
                                    {next?.name}
                                </p>
                                <p
                                    className="font-arabic mt-0.5 text-sm text-white/55 sm:text-[0.8125rem]"
                                    dir="rtl"
                                >
                                    {next?.arabic}
                                </p>
                                <p className="mt-2 text-2xl font-semibold leading-none tabular-nums tracking-tight sm:mt-3 sm:text-[1.65rem]">
                                    {DEMO_COUNTDOWN}
                                </p>
                                <p className="mt-1 text-sm tabular-nums text-white/50">
                                    {nextParts.main}
                                    {nextParts.period ? ` ${nextParts.period}` : ""}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="flex items-center gap-1.5 truncate text-[11px] text-white/55">
                                    <MapPin size={11} strokeWidth={1.5} className="shrink-0" />
                                    {DEFAULT_LOCATION_LABEL}
                                </p>
                                <p className="flex items-center gap-1.5 truncate text-[11px] text-white/55">
                                    <Calendar size={11} strokeWidth={1.5} className="shrink-0" />
                                    {formatHeadingDate()}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 sm:gap-2.5 sm:pt-5 lg:grid-cols-4 lg:gap-2.5 lg:pt-5">
                    {presenseHeroStatContent.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <div
                                key={stat.label}
                                className="flex items-start justify-between gap-2 rounded-md border border-white/[0.08] bg-[#323232]/70 px-2.5 py-2 backdrop-blur-sm sm:px-3 sm:py-2.5"
                            >
                                <div className="min-w-0">
                                    <p className="text-[11px] uppercase tracking-wide text-white/45 sm:text-[10px]">
                                        {stat.label}
                                    </p>
                                    <p className="mt-0.5 truncate text-sm font-semibold tabular-nums sm:text-[0.8125rem] md:text-sm">
                                        {stat.value}
                                    </p>
                                    <p className="truncate text-[11px] text-white/40 sm:text-[10px]">
                                        {stat.sub}
                                    </p>
                                </div>
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08]">
                                    <Icon className="h-3.5 w-3.5 text-white/55" strokeWidth={1.5} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                    <Badge
                        variant="outline"
                        className="rounded-full border-none bg-white/[0.06] px-2.5 py-1 text-[11px] font-normal text-white/70 ring-1 ring-white/15 backdrop-blur-sm sm:px-3"
                    >
                        <Clock className="mr-1.5 h-3 w-3 text-white/50" />
                        Sunrise {SUNRISE_TIME}
                    </Badge>
                    <Badge
                        variant="outline"
                        className="rounded-full border-none bg-white/[0.06] px-2.5 py-1 text-[11px] font-normal text-white/70 ring-1 ring-white/15 backdrop-blur-sm sm:px-3"
                    >
                        <Bell className="mr-1.5 h-3 w-3 text-white/50" />
                        {formatHijriDate()}
                    </Badge>
                    <Badge
                        variant="outline"
                        className="rounded-full border-none bg-white/[0.06] px-2.5 py-1 text-[11px] font-normal text-white/70 ring-1 ring-white/15 backdrop-blur-sm sm:px-3"
                    >
                        <Sunrise className="mr-1.5 h-3 w-3 text-white/50" />
                        Demo schedule
                    </Badge>
                </div>
            </div>
        </div>
    )
}
