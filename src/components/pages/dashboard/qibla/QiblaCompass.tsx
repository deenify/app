"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Compass, Navigation } from "lucide-react"
import { cardinalFromDegrees, QIBLA_DEMO_BEARING_DEG } from "./content"
import { useBreakpoint } from "@/hooks/useBreakpoint"

const TICK_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as const

const CARDINAL_LABELS = [
    { label: "N", x: 200, y: 34, fill: "#111827" },
    { label: "E", x: 366, y: 206, fill: "#6b7280" },
    { label: "S", x: 200, y: 378, fill: "#6b7280" },
    { label: "W", x: 34, y: 206, fill: "#6b7280" },
] as const

type QiblaCompassProps = {
    bearingDeg?: number
}

export default function QiblaCompass({ bearingDeg = QIBLA_DEMO_BEARING_DEG }: QiblaCompassProps) {
    const bearing = cardinalFromDegrees(bearingDeg)
    const isXsUp = useBreakpoint("xs", "up")

    return (
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/80 via-white to-white shadow-lg shadow-emerald-100/40">
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
                    {CARDINAL_LABELS.map(({ label, x, y, fill }) => (
                        <text
                            key={label}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            className="text-[15px] font-semibold"
                            fill={fill}
                        >
                            {label}
                        </text>
                    ))}
                    {TICK_ANGLES.map((angle) => (
                        <g key={angle} transform={`rotate(${angle} 200 200)`}>
                            <line x1="200" y1="28" x2="200" y2="40" stroke="#9ca3af" strokeWidth="2" />
                        </g>
                    ))}
                    <g transform={`rotate(${bearingDeg} 200 200)`}>
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

            <div className="flex flex-col items-center gap-3 px-6 py-5 bg-transparent">
                <Badge variant="solid" className="gap-2 py-2 pl-3 pr-4 text-sm truncate">
                    <Navigation className="h-4 w-4" />
                    {bearingDeg}° {bearing} · toward Makkah
                </Badge>
                <Button type="button" size="lg" className="gap-2 truncate py-3 text-sm">
                    <Compass className="h-4 w-4 flex-shrink-0" />
                    {isXsUp ? "Calibrate device compass" : "Calibrate compass"}
                </Button>
            </div>
        </div>
    )
}
