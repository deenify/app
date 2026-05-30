"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
    CALCULATION_METHOD,
    DEFAULT_LOCATION_LABEL,
    DEMO_COUNTDOWN,
    DEMO_CURRENT_PRAYER_ID,
    DEMO_FAJR_STREAK,
    DEMO_NEXT_PRAYER_ID,
    DEMO_QAZA_COUNT,
    PRAYER_SECTIONS,
    SUNRISE_TIME,
    type PrayerEntry,
} from "./content"
import { motion, AnimatePresence } from "framer-motion"
import {
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    MapPin,
    Moon,
    Sparkles,
    Sunrise,
} from "lucide-react"
import { cn } from "@/lib/utils/clsx"

const DAILY_PRAYERS = PRAYER_SECTIONS[0].entries

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

type TimelinePoint = { x: number; y: number }

/** Straight line — mobile (< md). */
const LINE_MARKERS: TimelinePoint[] = [
    { x: 30, y: 50 },
    { x: 115, y: 50 },
    { x: 200, y: 50 },
    { x: 285, y: 50 },
    { x: 370, y: 50 },
]

/** Curved arc — tablet & desktop (md+). M 30 68 Q 200 4 370 68 */
const ARC_MARKERS: TimelinePoint[] = [
    { x: 30, y: 68 },
    { x: 115, y: 44 },
    { x: 200, y: 36 },
    { x: 285, y: 44 },
    { x: 370, y: 68 },
]

function TimelineMarkers({
    prayers,
    currentId,
    positions,
    glowGradientId,
    labelOffset,
}: {
    prayers: PrayerEntry[]
    currentId: string
    positions: TimelinePoint[]
    glowGradientId: string
    labelOffset: { active: number; idle: number }
}) {
    return (
        <>
            {prayers.map((prayer, i) => {
                const pos = positions[i]
                if (!pos) return null
                const isCurrent = prayer.id === currentId

                return (
                    <g key={prayer.id} className="cursor-default">
                        <motion.circle
                            initial={false}
                            animate={{
                                r: isCurrent ? 4.5 : 2.5,
                                fill: isCurrent ? "#ffffff" : "rgba(255,255,255,0.35)",
                            }}
                            cx={pos.x}
                            cy={pos.y}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <AnimatePresence mode="wait">
                            {isCurrent && (
                                <g key="current-marker-aura">
                                    <motion.circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={4.5}
                                        fill="#ffffff"
                                        initial={{ scale: 1, opacity: 0.4 }}
                                        animate={{ scale: 4, opacity: 0 }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                    />
                                    <motion.circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={20}
                                        fill={`url(#${glowGradientId})`}
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={4.5}
                                        fill="#ffffff"
                                        animate={{ scale: [1, 1.25, 1] }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            transformOrigin: `${pos.x}px ${pos.y}px`,
                                        }}
                                    />
                                </g>
                            )}
                        </AnimatePresence>

                        <text
                            x={pos.x}
                            y={pos.y + (labelOffset.idle)}
                            textAnchor="middle"
                            fontSize={12}
                            className={cn(
                                "select-none transition-colors duration-500",
                                isCurrent
                                    ? "fill-white font-medium"
                                    : "fill-white/60 font-normal"
                            )}
                        >
                            {prayer.name}
                        </text>
                    </g>
                )
            })}
        </>
    )
}

function TimelineGradientDefs({
    lineId,
    glowId,
}: {
    lineId: string
    glowId: string
}) {
    return (
        <defs>
            <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0.05" />
                <stop offset="50%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id={glowId}>
                <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
        </defs>
    )
}

function PrayerTimelineArc({
    prayers,
    currentId,
}: {
    prayers: PrayerEntry[]
    currentId: string
}) {
    return (
        <div className="relative w-full min-w-0 lg:mt-8 py-0 sm:pb-5 md:py-0">
            {/* Mobile: straight timeline */}
            <svg
                viewBox="0 0 400 88"
                preserveAspectRatio="xMidYMid meet"
                className="aspect-[400/88] h-auto w-full min-h-[88px] md:hidden"
                aria-hidden
            >
                <TimelineGradientDefs lineId="arc-gradient-line" glowId="inner-glow-line" />
                <path
                    d="M 24 50 L 376 50"
                    fill="none"
                    stroke="url(#arc-gradient-line)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <TimelineMarkers
                    prayers={prayers}
                    currentId={currentId}
                    positions={LINE_MARKERS}
                    glowGradientId="inner-glow-line"
                    labelOffset={{ active: 26, idle: 28 }}
                />
            </svg>

            {/* Tablet & desktop: curved arc */}
            <svg
                viewBox="0 0 400 112"
                preserveAspectRatio="xMidYMid meet"
                className="hidden aspect-[400/112] h-auto w-full min-h-[100px] md:block md:min-h-[100px]"
                aria-hidden
            >
                <TimelineGradientDefs lineId="arc-gradient-curved" glowId="inner-glow-curved" />
                <path
                    d="M 30 68 Q 200 4 370 68"
                    fill="none"
                    stroke="url(#arc-gradient-curved)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <TimelineMarkers
                    prayers={prayers}
                    currentId={currentId}
                    positions={ARC_MARKERS}
                    glowGradientId="inner-glow-curved"
                    labelOffset={{ active: 34, idle: 28 }}
                />
            </svg>
        </div>
    )
}

type StatCard = {
    label: string
    value: string
    sub: string
    icon: typeof CheckCircle2
}

export default function PrayerPresenceHero({ loggedCount }: { loggedCount: number }) {
    const [now, setNow] = useState("")

    useEffect(() => {
        const tick = () => setNow(formatClock())
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    const next = DAILY_PRAYERS.find((e) => e.id === DEMO_NEXT_PRAYER_ID)
    const totalDaily = DAILY_PRAYERS.length
    const nextParts = next ? splitTime(next.time) : { main: "", period: "" }

    const stats: StatCard[] = [
        {
            label: "Today",
            value: `${loggedCount}/${totalDaily}`,
            sub: "farḍ logged",
            icon: CheckCircle2,
        },
        {
            label: "Fajr streak",
            value: String(DEMO_FAJR_STREAK),
            sub: "mornings",
            icon: Calendar,
        },
        {
            label: "Qaza",
            value: String(DEMO_QAZA_COUNT),
            sub: "to make up",
            icon: Moon,
        },
        {
            label: "Method",
            value: CALCULATION_METHOD.split(" ").slice(0, 2).join(" "),
            sub: "calculation",
            icon: FileText,
        },
    ]

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
                    {stats.map((stat) => {
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
