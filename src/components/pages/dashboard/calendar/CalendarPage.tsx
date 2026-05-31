"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/shared/SectionHeader"
import { Book, Calendar, Heart, Moon, Sparkles } from "lucide-react"
import { englishDate, islamicDate } from "@/lib/utils/format-date"
import { useScrollIntoView } from "@/hooks/useScrollIntoView"
import {
    CALENDAR_EDITORIAL,
    HIJRI_ANCHOR_VERSE,
    getHijriToday,
} from "./content"
import HijriMonthSwiper from "./HijriMonthSwiper"
import CalendarSidebar from "./CalendarSidebar"
import CalendarPanel from "./CalendarPanel"

export default function CalendarPage() {
    const [monthIndex, setMonthIndex] = useState<number>(() => getHijriToday().monthIndex)
    const { ref: calendarRef, scrollIntoView: scrollToCalendar } = useScrollIntoView({ offset: 96 })

    return (
        <div>
            <SectionHeader
                variant="purple"
                icon={Calendar}
                label="Lunar orientation"
                heading="Hijri calendar as a map of sacred time"
                descriptions={[CALENDAR_EDITORIAL.lunarLead]}
                classNames={{ heading: "max-w-[620px]" }}
            >
                <div className="flex flex-wrap items-center gap-3 pt-1">
                    <Badge variant="purple" className="gap-1.5">
                        <Moon className="h-4 w-4" />
                        Today: {islamicDate(Date.now())}
                    </Badge>
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-gray-300 sm:inline-block" />
                    <Badge variant="secondary" className="gap-1.5">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        {englishDate(Date.now())}
                    </Badge>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    <Button href="/guides" variant="secondary" shouldScale className="gap-2" size="sm">
                        <Book className="h-4 w-4" />
                        Seasonal guides
                    </Button>
                    <Button href="/donate" variant="secondary" shouldScale className="gap-2" size="sm">
                        <Heart className="h-4 w-4" />
                        Charity & zakāh hub
                    </Button>
                </div>
            </SectionHeader>

            <section className="container relative py-8 sm:py-10">
                <div className="overflow-hidden relative">
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute left-[-60px] top-24 h-52 w-52 rounded-full bg-purple-200/35 blur-3xl"
                        animate={{ opacity: [0.25, 0.42, 0.25], scale: [1, 1.06, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute right-[-20px] top-48 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl"
                        animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    />
                </div>

                <main className="relative mx-auto grid max-w-6xl items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
                    <section className="min-w-0 space-y-8">
                        <div ref={calendarRef} className="scroll-mt-24">
                            <CalendarPanel
                                monthIndex={monthIndex}
                                onMonthChange={setMonthIndex}
                            />
                        </div>

                        <div className="border-b border-purple-200 pb-8">
                            <HijriMonthSwiper
                                monthIndex={monthIndex}
                                onSelect={setMonthIndex}
                                onAfterSelect={scrollToCalendar}
                            />
                        </div>

                        <Card className="overflow-hidden border-purple-100/80 shadow-sm">
                            <CardContent className="space-y-3 p-5 sm:p-6">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                                            Worship rhythm
                                        </p>
                                        <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-600">
                                            {CALENDAR_EDITORIAL.integration}
                                        </p>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className="border-purple-200 bg-purple-50 text-purple-800"
                                    >
                                        <Sparkles className="mr-1 h-3.5 w-3.5" />
                                        Lunar-first
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
                            <CardContent className="flex gap-4 p-5 sm:p-6">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold tracking-wide text-blue-800">
                                        {HIJRI_ANCHOR_VERSE.ref}
                                    </p>
                                    <p className="mt-2 text-sm italic leading-relaxed text-gray-800">
                                        &ldquo;{HIJRI_ANCHOR_VERSE.text}&rdquo;
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <CalendarSidebar />
                </main>
            </section>
        </div>
    )
}
