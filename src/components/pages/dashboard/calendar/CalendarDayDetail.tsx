"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import { islamicDate } from "@/lib/utils/format-date"
import {
    CALENDAR_EDITORIAL,
    EVENT_TONE_STYLES,
    getEventsForDay,
    getMonthByIndex,
    type HijriEventTone,
} from "./content"

type CalendarDayDetailProps = {
    monthIndex: number
    day: number
}

const CHIP_LABEL: Record<HijriEventTone, string> = {
    eid: "Holiday",
    fast: "Fasting",
    sacred: "Sacred",
    reminder: "Reminder",
}

function isHolidayTone(tone: HijriEventTone) {
    return tone === "eid" || tone === "sacred"
}

export default function CalendarDayDetail({ monthIndex, day }: CalendarDayDetailProps) {
    const month = getMonthByIndex(monthIndex)
    const events = getEventsForDay(monthIndex, day)
    const hasHoliday = events.some((e) => isHolidayTone(e.tone))

    return (
        <section
            className=" bg-purple-50/30"
            aria-live="polite"
        >
            <div className="flex flex-wrap items-center justify-between gap-2 gap-y-1">
                <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                        Day {day}
                    </p>
                    <p className="text-sm font-semibold leading-tight text-gray-900">
                        {month.nameEnglish}
                        <span className="font-normal text-gray-500">
                            {" "}
                            · {islamicDate(undefined, { day: false, month: false, year: true })}
                        </span>
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                    {hasHoliday ? (
                        <Badge
                            variant="outline"
                            className="border-amber-200 bg-amber-50 text-[10px] text-amber-900"
                        >
                            Holiday
                        </Badge>
                    ) : null}
                    {events.length > 0 ? (
                        <Badge variant="outline" className="border-purple-200 bg-white text-[10px] text-purple-800">
                            {events.length} {events.length === 1 ? "event" : "events"}
                        </Badge>
                    ) : null}
                </div>
            </div>

            {events.length === 0 ? (
                <p className="mt-2 text-xs leading-relaxed text-gray-600">{CALENDAR_EDITORIAL.emptyDay}</p>
            ) : (
                <ul className="mt-2 space-y-1.5">
                    {events.map((event) => {
                        const styles = EVENT_TONE_STYLES[event.tone]
                        return (
                            <li
                                key={`${event.day}-${event.title}`}
                                className="rounded-md bg-white/80"
                            >
                                <div className="flex flex-wrap items-center gap-1.5">
                                    <span
                                        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", styles.dot)}
                                        aria-hidden
                                    />
                                    <p className="text-xs font-semibold text-gray-900">{event.title}</p>
                                    <Badge
                                        variant="outline"
                                        className={cn("h-5 px-1.5 text-[9px]", styles.badge)}
                                    >
                                        {CHIP_LABEL[event.tone]}
                                    </Badge>
                                </div>
                                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-gray-600">
                                    {event.description}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}
