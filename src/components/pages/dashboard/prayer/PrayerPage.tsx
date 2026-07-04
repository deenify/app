"use client"

import { useState } from "react"
import { Bell, Calendar, MapPin, Settings, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DashboardHead from "../generic/DashboardHead"
import { getDashboardHeadMeta } from "../generic/dashboardHeaderMeta"
import PrayerRhythmSidebar from "./PrayerRhythmSidebar"
import PrayerSchedulePanel from "./PrayerSchedulePanel"
import {
    DEFAULT_LOCATION_LABEL,
    DEMO_FAJR_STREAK,
    INITIAL_LOGGED,
} from "./content"
import { islamicDate } from "@/lib/utils/format-date"


export default function PrayerPage() {
    const pageContent = getDashboardHeadMeta("/prayer")
    const [logged, setLogged] = useState(INITIAL_LOGGED)

    const toggleLogged = (id: string) => {
        setLogged((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <div className="bg-white">
            <DashboardHead
                lead={pageContent?.lead}
                accent={pageContent?.accent}
                subtitle={pageContent?.subtitle}
                mobileSubtitle={pageContent?.mobileSubtitle}
                separator
            >
                <div className="flex flex-wrap gap-2 pt-1">
                    <Badge variant="outline" >
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        {DEFAULT_LOCATION_LABEL}
                    </Badge>
                    <Badge variant="outline">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {islamicDate(Date.now())}
                    </Badge>
                    <Badge variant="emerald">
                        <Sparkles className="mr-1 h-3.5 w-3.5" />
                        Asr time
                    </Badge>
                </div>
            </DashboardHead>

            <section className="relative">
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                    <motion.div
                        className="absolute left-[-48px] top-12 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl"
                        animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.06, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                <div className="container relative pb-8 sm:pb-10">
                    <div className="mx-auto grid max-w-6xl items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-8">
                        <PrayerSchedulePanel
                            logged={logged}
                            onToggle={toggleLogged}
                        />
                        <PrayerRhythmSidebar streakDays={DEMO_FAJR_STREAK} />
                    </div>
                </div>
            </section>
        </div>
    )
}
