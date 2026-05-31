"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { islamicDate } from "@/lib/utils/format-date"
import { useScrollIntoView } from "@/hooks/useScrollIntoView"
import CalendarDayDetail from "./CalendarDayDetail"
import {
    dayHasEvents,
    getHijriToday,
    getMonthByIndex,
    MONTH_GRID_OFFSET,
} from "./content"

type CalendarPanelProps = {
    monthIndex: number
    onMonthChange: (index: number) => void
}

export default function CalendarPanel({ monthIndex, onMonthChange }: CalendarPanelProps) {
    const month = getMonthByIndex(monthIndex)
    const hijriToday = useMemo(() => getHijriToday(), [])
    const [selectedDay, setSelectedDay] = useState<number | null>(() => getHijriToday().day)
    const { ref: detailRef, scrollIntoView: scrollToDetail } = useScrollIntoView({ offset: 112 })

    useEffect(() => {
        setSelectedDay((prev) => {
            if (prev !== null && prev <= month.daysInMonth) return prev
            return 1
        })
    }, [monthIndex, month.daysInMonth])

    const cells = useMemo(() => {
        const pads = Array.from({ length: MONTH_GRID_OFFSET }, (_, i) => ({
            type: "pad" as const,
            key: `pad-${i}`,
        }))
        const days = Array.from({ length: month.daysInMonth }, (_, i) => ({
            type: "day" as const,
            day: i + 1,
            key: `d-${i + 1}`,
        }))
        return [...pads, ...days]
    }, [month.daysInMonth])

    const isToday = (day: number) =>
        monthIndex === hijriToday.monthIndex && day === hijriToday.day

    const selectDay = (day: number) => {
        setSelectedDay(day)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => scrollToDetail())
        })
    }

    const metaLine = useMemo(() => {
        const yearLabel = islamicDate(undefined, { day: false, month: false, year: true })
        const parts = [`${yearLabel}`, `${month.daysInMonth} days`]
        if (monthIndex === hijriToday.monthIndex) {
            parts.push(`Today · day ${hijriToday.day}`)
        }
        return parts.join(" · ")
    }, [month.daysInMonth, monthIndex, hijriToday.day, hijriToday.monthIndex])

    return (
        <section className="overflow-hidden rounded-2xl border border-purple-200/80 bg-gradient-to-br from-purple-50/90 via-white to-white p-5 shadow-lg shadow-purple-100/40 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-500">
                        Observing month
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                        {month.nameEnglish}
                    </h2>
                    <p className="font-arabic mt-0.5 text-sm text-purple-800/85" dir="rtl">
                        {month.nameArabic}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{metaLine}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                    <Button
                        type="button"
                        variant="ghost-purple"
                        size="sm"
                        className="h-9 w-9 bg-gray-100/70 p-0 hover:border hover:border-purple-300 hover:bg-purple-50"
                        onClick={() => onMonthChange(Math.max(0, monthIndex - 1))}
                        disabled={monthIndex === 0}
                        shouldScale
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="ghost-purple"
                        size="sm"
                        className="h-9 w-9 bg-gray-100/70 p-0 hover:border hover:border-purple-300 hover:bg-purple-50"
                        onClick={() => onMonthChange(Math.min(11, monthIndex + 1))}
                        disabled={monthIndex === 11}
                        shouldScale
                        aria-label="Next month"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="pt-5">
                <div className="grid grid-cols-7 gap-1.5 pb-3 sm:gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <span
                            key={d}
                            className="text-center text-[10px] font-semibold uppercase tracking-wide text-gray-500 sm:text-[11px]"
                        >
                            <span className="hidden sm:inline">{d}</span>
                            <span className="sm:hidden">{d.slice(0, 1)}</span>
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {cells.map((cell) =>
                        cell.type === "pad" ? (
                            <div key={cell.key} className="aspect-square rounded-lg" aria-hidden />
                        ) : (
                            <button
                                key={cell.key}
                                type="button"
                                onClick={() => selectDay(cell.day)}
                                aria-pressed={selectedDay === cell.day}
                                aria-label={`${cell.day} ${month.nameEnglish}`}
                                className={cn(
                                    "aspect-square rounded-lg border text-sm font-semibold tabular-nums transition-all",
                                    isToday(cell.day) &&
                                    selectedDay !== cell.day &&
                                    "border-purple-500 bg-purple-100 text-purple-900",
                                    selectedDay === cell.day &&
                                    "border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-500/30 ring-2 ring-purple-300/50",
                                    selectedDay !== cell.day &&
                                    !isToday(cell.day) &&
                                    dayHasEvents(monthIndex, cell.day) &&
                                    "border-emerald-200 bg-emerald-50 text-emerald-950 hover:bg-emerald-100",
                                    selectedDay !== cell.day &&
                                    !isToday(cell.day) &&
                                    !dayHasEvents(monthIndex, cell.day) &&
                                    "border-gray-200 bg-white text-gray-800 hover:border-purple-200 hover:bg-purple-50/80"
                                )}
                            >
                                {cell.day}
                            </button>
                        )
                    )}
                </div>
            </div>

            {selectedDay !== null ? (
                <div
                    ref={detailRef}
                    className="mt-5 scroll-mt-28 border-t border-purple-200 pt-5"
                >
                    <CalendarDayDetail monthIndex={monthIndex} day={selectedDay} />
                </div>
            ) : null}
        </section>
    )
}
