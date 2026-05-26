"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import type { LucideIcon } from "lucide-react"
import type { PrayerEntry } from "./content"

type PrayerTimeCardProps = {
    entry: PrayerEntry
    phaseIcon?: LucideIcon
    isCurrent?: boolean
    logged: boolean
    onToggle: () => void
    variant?: "daily" | "voluntary"
}

function splitTime(time: string) {
    const match = time.match(/^(.+?)\s*(AM|PM)$/i)
    if (!match) return { main: time, period: "" }
    return { main: match[1].trim(), period: match[2].toUpperCase() }
}

export default function PrayerTimeCard({
    entry,
    phaseIcon: Icon,
    isCurrent,
    logged,
    onToggle,
    variant = "daily",
}: PrayerTimeCardProps) {
    const { main, period } = splitTime(entry.time)

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={logged}
            className={cn(
                "group relative flex w-full items-stretch gap-0 overflow-hidden flex-col sm:flex-row",
                "border text-left transition-all duration-200 rounded-lg ",
                "border-gray-300 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]..",
                "hover:border-emerald-500 hover:shadow-[0_8px_28px_rgba(16,185,129,0.07)]..",
                isCurrent && "border-emerald-500 bg-emerald-50/30 sm:bg-white",
            )}
        >
            <div
                className={cn(
                    "w-full h-1 shrink-0 transition-all duration-200 sm:w-1 sm:h-auto",
                    isCurrent
                        ? "bg-emerald-500"
                        : logged
                            ? "bg-transparent"
                            : "bg-transparent"
                )}
            />

            <div className="flex min-w-0 flex-1 flex-col items-start gap-3 px-4 py-5 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-4">
                {/* Mobile: time + check circle in the same top row */}
                <div className="flex w-full items-start justify-between gap-4 sm:w-auto sm:flex-none sm:justify-start sm:items-center">
                    <div className="shrink-0 px-0 sm:px-3">
                        <p className="text-2xl font-semibold leading-none tracking-tight 
                    text-gray-900 tabular-nums sm:text-[1.75rem]">
                            {main}
                        </p>
                        {period && (
                            <p className="pt-1 text-xs font-semibold uppercase 
                        tracking-wider text-gray-400">
                                {period}
                            </p>
                        )}
                    </div>

                    <div className="flex shrink-0 items-center self-start pr-1 sm:hidden">
                        <div
                            className={cn(
                                "flex w-9 h-9 items-center justify-center rounded-full border-[2.5px] transition-all duration-300",
                                logged
                                    ? "border-emerald-600 bg-emerald-600"
                                    : "border-gray-200 group-hover:border-emerald-500"
                            )}
                        >
                            <motion.svg
                                viewBox="0 0 25 25"
                                fill="none"
                                className="w-6 h-6 overflow-visible"
                                aria-hidden
                            >
                                <motion.path
                                    d="M6 12.5 L10.25 16.75 L18.25 7"
                                    fill="none"
                                    stroke={logged ? "#fff" : "transparent"}
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={false}
                                    animate={{
                                        pathLength: logged ? 1 : 0,
                                        opacity: logged ? 1 : 0,
                                        stroke: logged ? "#fff" : "rgba(255,255,255,0)"
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.svg>
                        </div>
                    </div>
                </div>

                <div className="min-w-0 flex-1 border-l-0 pt-2 sm:border-l sm:border-gray-300 sm:pl-4 sm:pt-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                        {Icon && (
                            <span className={cn(
                                "flex h-7 w-7 shrink-0 items-center",
                                "justify-center rounded-md border border-gray-200",
                                "group-hover:border-emerald-200",
                                "bg-gray-50 text-gray-600 group-hover:bg-emerald-50",
                                "group-hover:text-emerald-600",
                                logged
                                    ? "border-emerald-600 bg-emerald-600 text-white group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                                    : "border-gray-200 group-hover:border-emerald-500"
                            )}
                            >
                                <Icon className="h-3.5 w-3.5" />
                            </span>
                        )}
                        <span className="text-base font-semibold text-gray-900">{entry.name}</span>
                        <span className="font-arabic text-base text-gray-700" dir="rtl">
                            {entry.arabic}
                        </span>
                        {isCurrent && (
                            <Badge variant="emerald" className="text-[11px] uppercase">
                                Now
                            </Badge>
                        )}
                        {logged && (
                            <Badge variant="amber" className="text-[10px]">
                                Logged
                            </Badge>
                        )}
                    </div>

                    <p className="mt-0.5 text-[11px] font-medium uppercase 
                    tracking-wide text-gray-400">
                        {entry.transliteration}
                    </p>

                    {(entry.description || entry.hint) && (
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-600">
                            {entry.description ?? entry.hint}
                        </p>
                    )}

                    {entry.chips && entry.chips.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {entry.chips.map((chip) => (
                                <Badge
                                    key={chip}
                                    variant={
                                        ["Jamāʿah", "witr"].includes(chip)
                                            ? "purple"
                                            : "emerald"
                                    }
                                    className="text-[10px]"
                                >
                                    {chip}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop/tablet: keep check circle on the far right */}
                <div className="hidden shrink-0 items-center self-end pr-1 sm:flex sm:self-auto sm:pr-2">
                    <div
                        className={cn(
                            "flex w-10 h-10 items-center justify-center rounded-full border-[2.5px] transition-all duration-300",
                            logged
                                ? "border-emerald-600 bg-emerald-600"
                                : "border-gray-200 group-hover:border-emerald-500"
                        )}
                    >
                        <motion.svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-6 w-6 overflow-visible"
                            aria-hidden
                        >
                            <motion.path
                                d="M6 12.5 L10.25 16.75 L18.25 7"
                                fill="none"
                                stroke={logged ? "#fff" : "transparent"}
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={false}
                                animate={{
                                    pathLength: logged ? 1 : 0,
                                    opacity: logged ? 1 : 0,
                                    stroke: logged ? "#fff" : "rgba(255,255,255,0)"
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.svg>
                    </div>
                </div>
            </div>
        </button>
    )
}
