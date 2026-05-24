"use client"

import { CheckCircle2, Clock, Moon, Sun, Sunrise, Sunset } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import type { PrayerWindow } from "@/components/pages/dashboard/content"
import { useState } from "react"
import AnimateUp from "@/components/shared/motion/AnimateUp"

type DashboardPrayerScheduleProps = {
    prayers: PrayerWindow[]
    highlightId: string
    nextLabel?: string
}

const PRAYER_ICONS: Record<string, typeof Sun> = {
    Fajr: Sunrise,
    Dhuhr: Sun,
    Asr: Sun,
    Maghrib: Sunset,
    Isha: Moon,
}

export function DashboardPrayerSchedule({
    prayers,
    highlightId,
    nextLabel = "Next: Asr in 2h 15m",
}: DashboardPrayerScheduleProps) {
    const [completedPrayers, setCompletedPrayers] = useState<PrayerWindow[]>(prayers)

    const handleMarkPrayerAsDone = (prayerId: string) => {
        setCompletedPrayers(completedPrayers.map((prayer) =>
            prayer.id === prayerId ? { ...prayer, completed: !prayer.completed } : prayer
        ) as PrayerWindow[])
    }

    return (
        <AnimateUp delay={0.2}>
            <Card className="overflow-hidden border border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100 bg-gray-50/50 p-4">
                    <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                            <CardTitle className="text-base font-medium sm:text-lg">Today&apos;s schedule</CardTitle>
                            <CardDescription className="flex items-center gap-1 text-sm">
                                <Clock className="h-3 w-3" />
                                {nextLabel}
                            </CardDescription>
                        </div>
                        <Badge variant="emerald" className="shrink-0">
                            On track
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <ul className="divide-y divide-gray-100">
                        {completedPrayers.map((prayer) => {
                            const isHighlight = prayer.id === highlightId
                            const isDone = prayer.completed
                            const Icon = PRAYER_ICONS[prayer.id] ?? Sun

                            return (
                                <li
                                    key={prayer.id}
                                    className="flex items-center justify-between gap-3 px-4 py-3.5 
                                transition-colors hover:bg-gray-50 sm:px-5 sm:py-4 cursor-pointer"
                                    onClick={() => handleMarkPrayerAsDone(prayer.id)}
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div
                                            className={cn(
                                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10",
                                                isHighlight
                                                    ? "bg-emerald-600 text-white shadow-sm"
                                                    : "bg-gray-100 text-gray-500"
                                            )}
                                        >
                                            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p
                                                className={cn(
                                                    "text-sm font-medium",
                                                    isHighlight ? "text-emerald-900" : "text-gray-900"
                                                )}
                                            >
                                                {prayer.name}
                                            </p>
                                            <p className="truncate text-[11px] text-gray-500">
                                                {prayer.arabic} · {prayer.time}
                                            </p>
                                        </div>
                                    </div>
                                    {isDone ? (
                                        <CheckCircle2
                                            className="h-5 w-5 shrink-0 text-emerald-600"
                                            aria-label="Completed"
                                        />
                                    ) : (
                                        <span
                                            className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-200"
                                            aria-hidden
                                        />
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </CardContent>
            </Card>
        </AnimateUp>
    )
}
