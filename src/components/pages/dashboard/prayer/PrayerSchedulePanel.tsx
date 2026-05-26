"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Moon, Sunrise } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import PrayerPresenceHero from "./PrayerPresenceHero"
import PrayerTimeCard from "./PrayerTimeCard"
import {
    DEMO_CURRENT_PRAYER_ID,
    POST_SALAH_DHIKR,
    PRAYER_EDITORIAL,
    PRAYER_SECTIONS,
    type PrayerEntry,
} from "./content"

type PrayerSchedulePanelProps = {
    logged: Record<string, boolean>
    onToggle: (id: string) => void
    phaseIcon: (phase: PrayerEntry["phase"]) => LucideIcon | undefined
}

export default function PrayerSchedulePanel({
    logged,
    onToggle,
    phaseIcon,
}: PrayerSchedulePanelProps) {
    const dailyLoggedCount = useMemo(
        () => PRAYER_SECTIONS[0].entries.filter((e) => logged[e.id]).length,
        [logged]
    )

    return (
        <div className="min-w-0 space-y-10">
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Sunrise className="h-4 w-4 text-orange-600" />
                    <p className="text-sm font-semibold text-gray-900">Arc of the day</p>
                </div>
                <PrayerPresenceHero loggedCount={dailyLoggedCount} />
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-gray-600">
                Tap a row to log salah — tap again to clear.
                Times are demo placeholders until calculation APIs connect.
            </p>

            {PRAYER_SECTIONS.map((section) => (
                <section key={section.id} className="space-y-3">
                    <div className="flex items-end justify-between gap-4 border-b border-gray-100 pb-3">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">{section.title}</h2>
                            <p className="mt-0.5 text-xs text-gray-500">{section.subtitle}</p>
                        </div>
                        {section.id === "voluntary" && (
                            <Moon className="h-4 w-4 shrink-0 text-indigo-400/80" aria-hidden />
                        )}
                    </div>

                    <div className="space-y-2.5">
                        {section.entries.map((entry) => (
                            <PrayerTimeCard
                                key={entry.id}
                                entry={entry}
                                phaseIcon={entry.phase ? phaseIcon(entry.phase) : undefined}
                                isCurrent={
                                    section.id === "daily" && entry.id === DEMO_CURRENT_PRAYER_ID
                                }
                                logged={Boolean(logged[entry.id])}
                                onToggle={() => onToggle(entry.id)}
                                variant={section.id === "daily" ? "daily" : "voluntary"}
                            />
                        ))}
                    </div>
                </section>
            ))}

            <section className="grid gap-4 sm:grid-cols-2">
                <Card className="border-gray-200 bg-gray-50/70">
                    <CardContent className="space-y-2 p-5">
                        <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-emerald-600" />
                            <p className="text-sm font-semibold text-gray-900">Between obligations</p>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600">{PRAYER_EDITORIAL.stillness}</p>
                    </CardContent>
                </Card>

                <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-white">
                    <CardContent className="space-y-3 p-5">
                        <p className="text-sm font-semibold text-gray-900">Post-salah dhikr</p>
                        <div className="flex flex-col gap-1">
                            {POST_SALAH_DHIKR.map((d) => (
                                <div
                                    key={d.label}
                                    className="flex-1 border rounded-md border-purple-200
                                    bg-transparent px-3 py-2 text-center flex items-center justify-between"
                                >
                                    <p className="mt-1 text-xs text-gray-600">{d.count}</p>
                                    <p className="font-arabic text-sm text-gray-900" dir="rtl">
                                        {d.arabic}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Button
                            href="/dhikr"
                            variant="link-purple"
                            size="max"
                            className="w-max h-max p-0 text-xs"
                        >
                            Open dhikr counter
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
