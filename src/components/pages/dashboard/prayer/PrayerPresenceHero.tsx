"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
    CALCULATION_METHOD,
    DEFAULT_LOCATION_LABEL,
    DEMO_COUNTDOWN,
    DEMO_FAJR_STREAK,
    DEMO_NEXT_PRAYER_ID,
    DEMO_QAZA_COUNT,
    PRAYER_SECTIONS,
    SUNRISE_TIME,
} from "./content"
import { Calendar, MapPin, Sparkles, Sunrise } from "lucide-react"


function formatClock(locale: string) {
    return new Intl.DateTimeFormat(locale, {
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
    const [nowEn, setNowEn] = useState("")
    const [nowAr, setNowAr] = useState("")

    useEffect(() => {
        const tick = () => {
            setNowEn(formatClock("en-US"))
            setNowAr(formatClock("ar-SA"))
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])


    const next = PRAYER_SECTIONS[0].entries.find((e) => e.id === DEMO_NEXT_PRAYER_ID)
    const totalDaily = PRAYER_SECTIONS[0].entries.length
    const nextParts = next ? splitTime(next.time) : { main: "", period: "" }


    return (
        <div className="relative overflow-hidden rounded-lg border border-emerald-200/70 bg-[#0c1412] text-white shadow-[0_20px_56px_rgba(6,78,59,0.18)]">
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-12 top-0 h-48 w-48 rounded-full bg-emerald-500/80 blur-3xl
                xs:h-56 xs:w-56"
                animate={{ opacity: [0.22, 0.42, 0.22], scale: [1, 1.08, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-teal-400 blur-3xl"
                animate={{ opacity: [0.15, 0.32, 0.15], scale: [1, 1.06, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
            <div
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 xs:h-32 xs:w-32 
                rounded-full border border-emerald-400/15"
            />

            <div className="relative xs:px-5 px-4 py-8 sm:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                    <div className="min-w-0 flex-1 flex flex-col justify-between gap-6">
                        <div>
                            <p className="text-xs font-normal text-emerald-300 tracking-wider 
                            flex items-center gap-2"
                            >
                                {formatHijriDate()}
                            </p>
                            <p className="text-3xl xs:text-4xl sm:text-[40px] font-light tabular-nums font-mono pt-1 uppercase">
                                {nowEn || "—"}
                            </p>
                        </div>
                        <p
                            className="font-arabic text-xl tracking-wider text-emerald-300"
                            dir="rtl"
                        >
                            {nowAr}
                        </p>
                    </div>

                    <div className="flex flex-col justify-between gap-4 rounded-lg border 
                    border-white/15 bg-white/[0.04] p-4 lg:w-[210px] lg:shrink-0">
                        <div>
                            <p className="text-[10px] capitalize tracking-wider text-white/60">Next</p>
                            <p className="text-xl font-medium">{next?.name}</p>
                            <p className="font-arabic text-base text-emerald-200/90" dir="rtl">
                                {next?.arabic}
                            </p>
                            <p className="mt-2 text-2xl font-semibold tabular-nums text-emerald-400">
                                {DEMO_COUNTDOWN}
                            </p>
                            <p className="mt-0.5 text-sm tabular-nums text-white/70 tracking-wider">
                                {nextParts.main}
                                {nextParts.period ? ` ${nextParts.period}` : ""}
                            </p>
                        </div>

                        <div>
                            <p className="flex items-center gap-1.5 truncate text-[11px] text-emerald-100 tracking-wide">
                                <MapPin size={12} strokeWidth={1.5} className="shrink-0" />
                                {DEFAULT_LOCATION_LABEL}
                            </p>
                            <p className="flex items-center gap-1.5 truncate text-[11px] text-emerald-100 pt-1 tracking-wide">
                                <Calendar size={12} strokeWidth={1.5} className="shrink-0" />
                                {formatHeadingDate()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid gap-2 pt-4 xs:mt-5 xs:grid-cols-2 xs:border-t xs:border-white/15 xs:pt-5 lg:grid-cols-4">
                    {[
                        { label: "Today", value: `${loggedCount}/${totalDaily}`, sub: "farḍ logged" },
                        { label: "Fajr streak", value: String(DEMO_FAJR_STREAK), sub: "mornings" },
                        { label: "Qaza", value: String(DEMO_QAZA_COUNT), sub: "to make up" },
                        { label: "Method", value: CALCULATION_METHOD, sub: "calculation" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-md bg-white/5 px-2.5 py-2.5 ring-1 ring-white/15 backdrop-blur-sm xs:px-3 xs:py-2.5"
                        >
                            <p className="text-xs uppercase tracking-wide text-white/60">{stat.label}</p>
                            <p className="mt-0.5 text-sm font-semibold leading-snug tabular-nums">{stat.value}</p>
                            <p className="text-[10px] text-white/45">{stat.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    <Badge
                        variant="outline"
                        className="rounded-full bg-white/5  ring-1 ring-white/20 
                        backdrop-blur-sm text-xs text-emerald-50 border-none"
                    >
                        <Sunrise className="mr-1 h-3 w-3" />
                        Sunrise {SUNRISE_TIME}
                    </Badge>
                    <Badge
                        variant="outline"
                        className="rounded-full bg-white/5  ring-1 ring-white/20 
                        backdrop-blur-sm text-xs text-emerald-50 border-none"
                    >
                        <Sparkles className="mr-1 h-3 w-3" />
                        Demo schedule
                    </Badge>
                </div>
            </div>
        </div>
    )
}
