"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PRAYER_FIQH_NOTE } from "./content"
import { Calendar, Compass, Flame, Sparkles } from "lucide-react"

type PrayerRhythmSidebarProps = {
    streakDays: number
}

export default function PrayerRhythmSidebar({ streakDays }: PrayerRhythmSidebarProps) {
    const monthlyDays = useMemo(
        () =>
            Array.from({ length: 28 }, (_, i) => ({
                day: i + 1,
                completed: ((i * 7 + 3) % 5) + 1,
            })),
        []
    )

    const totalPrayers = monthlyDays.reduce((sum, d) => sum + d.completed, 0)
    const completionRate = Math.round((totalPrayers / (monthlyDays.length * 5)) * 100)

    return (
        <aside className="min-w-0 space-y-7 lg:sticky lg:top-20 lg:self-start lg:border-l lg:border-layout-separator lg:pl-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-600" />
                    <p className="text-sm font-semibold text-gray-900">Rhythm intelligence</p>
                </div>
                <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50/90 to-white p-5">
                    <p className="text-xs uppercase tracking-wide text-orange-800/80">Streak</p>
                    <p className="mt-2 text-4xl font-bold text-gray-900">{streakDays}</p>
                    <p className="text-xs text-gray-600">Days of intentional logging (demo)</p>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Month completion</span>
                        <span className="font-semibold text-gray-900">{completionRate}%</span>
                    </div>
                    <Progress value={completionRate} className="h-1.5" />
                    <div className="grid grid-cols-7 gap-1 pt-1">
                        {monthlyDays.map((d) => (
                            <div
                                key={d.day}
                                title={`Day ${d.day}`}
                                className="aspect-square rounded-sm"
                                style={{
                                    backgroundColor:
                                        d.completed === 5
                                            ? "#059669"
                                            : d.completed >= 3
                                              ? "#6ee7b7"
                                              : d.completed >= 1
                                                ? "#d1fae5"
                                                : "#f3f4f6",
                                }}
                            />
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-500">Consistency heat · demo</p>
                </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm font-semibold text-gray-900">Scholarly grounding</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{PRAYER_FIQH_NOTE}</p>
            </section>

            <section className="space-y-3">
                <p className="text-sm font-semibold text-gray-900">Navigate worship</p>
                <div className="space-y-2">
                    <Button
                        href="/calendar"
                        variant="outline"
                        className="h-auto w-full justify-between gap-2 py-3"
                    >
                        <span className="flex items-center gap-2 font-medium">
                            <Calendar className="h-4 w-4" />
                            Hijri calendar
                        </span>
                    </Button>
                    <Button href="/qibla" variant="outline" className="h-auto w-full justify-between gap-2 py-3">
                        <span className="flex items-center gap-2 font-medium">
                            <Compass className="h-4 w-4" />
                            Qibla finder
                        </span>
                    </Button>
                </div>
            </section>
        </aside>
    )
}
