"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    QIBLA_EDITORIAL,
    QIBLA_PROTOCOL_STEPS,
} from "@/components/pages/dashboard/content"
import { Compass, Info, MapPin, Navigation, Sparkles } from "lucide-react"

const BEARING_DEG = 58
const DISTANCE_KM = 10247

function cardinalFromDegrees(deg: number) {
    const n = ((deg % 360) + 360) % 360
    if (n >= 337.5 || n < 22.5) return "N"
    if (n < 67.5) return "NE"
    if (n < 112.5) return "E"
    if (n < 157.5) return "SE"
    if (n < 202.5) return "S"
    if (n < 247.5) return "SW"
    if (n < 292.5) return "W"
    return "NW"
}

export default function QiblaFinderContent() {
    const bearing = cardinalFromDegrees(BEARING_DEG)

    return (
        <div className="bg-white">
            <section className="border-b border-layout-separator">
                <div className="container px-4 pb-8 pt-6 sm:px-6 sm:pb-9 sm:pt-8 md:pt-10">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="mb-4 flex items-center gap-2.5"
                    >
                        <div className="flex items-center justify-center rounded-lg bg-emerald-50 p-2.5 text-emerald-700">
                            <Compass className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <Badge variant="emerald" className="text-xs font-medium">
                            Qibla & direction
                        </Badge>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="max-w-3xl space-y-3"
                    >
                        <h1 className="max-w-[520px] text-4xl font-medium tracking-tight text-gray-900">
                            Face the House with clarity
                        </h1>
                        <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                            {QIBLA_EDITORIAL.lead}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="outline" className="border-emerald-200 bg-emerald-50/50 text-sm font-medium text-emerald-800">
                                <Sparkles className="mr-1 h-3.5 w-3.5" />
                                Unified axis · Kaʿbah
                            </Badge>
                            <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                                Demo bearing · connect GPS later
                            </Badge>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="relative overflow-hidden">
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl"
                    animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 right-[-40px] h-64 w-64 rounded-full bg-teal-200/35 blur-3xl"
                    animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.06, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />

                <div className="container relative py-8 sm:py-10">
                    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">Field bearing</p>
                                <p className="mt-1 text-sm text-gray-600">
                                    Visual reference only—pair with real location services for your city.
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 via-white to-white shadow-[0_24px_60px_rgba(6,78,59,0.08)]">
                                <div className="relative mx-auto aspect-square max-h-[min(72vw,420px)] p-6 sm:p-10">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.12),transparent_55%)]" />
                                    <svg viewBox="0 0 400 400" className="relative h-full w-full drop-shadow-sm" aria-hidden>
                                        <defs>
                                            <linearGradient id="qiblaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#34d399" />
                                                <stop offset="100%" stopColor="#059669" />
                                            </linearGradient>
                                        </defs>
                                        <circle cx="200" cy="200" r="178" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                                        <circle
                                            cx="200"
                                            cy="200"
                                            r="168"
                                            fill="none"
                                            stroke="#d1d5db"
                                            strokeWidth="1"
                                            strokeDasharray="4 6"
                                        />
                                        {["N", "E", "S", "W"].map((label, i) => {
                                            const pos = [
                                                { x: 200, y: 34, fill: "#111827" },
                                                { x: 366, y: 206, fill: "#6b7280" },
                                                { x: 200, y: 378, fill: "#6b7280" },
                                                { x: 34, y: 206, fill: "#6b7280" },
                                            ][i]
                                            return (
                                                <text
                                                    key={label}
                                                    x={pos.x}
                                                    y={pos.y}
                                                    textAnchor="middle"
                                                    className="text-[15px] font-semibold"
                                                    fill={pos.fill}
                                                >
                                                    {label}
                                                </text>
                                            )
                                        })}
                                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                                            <g key={angle} transform={`rotate(${angle} 200 200)`}>
                                                <line x1="200" y1="28" x2="200" y2="40" stroke="#9ca3af" strokeWidth="2" />
                                            </g>
                                        ))}
                                        <g transform={`rotate(${BEARING_DEG} 200 200)`}>
                                            <path
                                                d="M 200 52 L 214 188 L 200 176 L 186 188 Z"
                                                fill="url(#qiblaGrad)"
                                                stroke="#047857"
                                                strokeWidth="2"
                                            />
                                        </g>
                                        <circle cx="200" cy="200" r="9" fill="#047857" />
                                    </svg>
                                </div>
                                <div className="flex flex-col items-center gap-3 border-t border-emerald-100/80 bg-white/90 px-6 py-5 sm:flex-row sm:justify-between">
                                    <Badge variant="solid" className="gap-2 py-2 pl-3 pr-4 text-sm">
                                        <Navigation className="h-4 w-4" />
                                        {BEARING_DEG}° {bearing} · toward Makkah
                                    </Badge>
                                    <Button type="button" size="lg" className="gap-2">
                                        <Compass className="h-4 w-4" />
                                        Calibrate device compass
                                    </Button>
                                </div>
                            </div>

                            <Card className="border-amber-200 bg-gradient-to-br from-amber-50/90 to-white">
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <Info className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
                                        <div>
                                            <p className="font-semibold text-amber-950">Accuracy & humility</p>
                                            <p className="mt-2 text-sm leading-relaxed text-amber-950/90">
                                                {QIBLA_EDITORIAL.accuracy}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <aside className="space-y-6 lg:sticky lg:top-24 lg:border-l lg:border-layout-separator lg:pl-8">
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-emerald-600" />
                                    <p className="text-sm font-semibold text-gray-900">Locale snapshot</p>
                                </div>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900/80">
                                            Bearing
                                        </p>
                                        <p className="mt-2 text-3xl font-semibold text-emerald-950">{BEARING_DEG}°</p>
                                        <p className="text-xs text-emerald-800/90">Clockwise from true north (demo)</p>
                                    </div>
                                    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/80">
                                            Great-circle km
                                        </p>
                                        <p className="mt-2 text-3xl font-semibold text-blue-950">
                                            {DISTANCE_KM.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-blue-800/90">Approximate distance to Makkah</p>
                                    </div>
                                </div>
                            </section>

                            <section className="border-t border-gray-100 pt-6">
                                <p className="text-sm font-semibold text-gray-900">Calibration protocol</p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Treat this like a checklist—small physical habits improve bearing stability.
                                </p>
                                <ol className="mt-5 space-y-4">
                                    {QIBLA_PROTOCOL_STEPS.map((step, i) => (
                                        <li key={step} className="relative pl-9">
                                            <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
                                                {i + 1}
                                            </span>
                                            <p className="text-sm leading-relaxed text-gray-700">{step}</p>
                                        </li>
                                    ))}
                                </ol>
                            </section>

                            <section className="rounded-2xl border border-gray-100 bg-gray-50/80 p-5">
                                <p className="text-sm font-semibold text-gray-900">Why direction matters</p>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    Standing toward the Qibla externalizes tawḥīd in space: one qiblah, one ummah, one Lord.
                                    Technology should serve that orientation—not replace adab or learning from teachers.
                                </p>
                            </section>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    )
}
