"use client"

import { PRAYER_WINDOWS } from "@/components/pages/dashboard/content"
import { DashboardConsistencyChart } from "./DashboardConsistencyChart"
import { DashboardDailyProgress } from "./DashboardDailyProgress"
import { DashboardHeader } from "./DashboardHeader"
import { DashboardInspirationCard } from "./DashboardInspirationCard"
import { DashboardPrayerSchedule } from "./DashboardPrayerSchedule"
import { DashboardRecentActivity } from "./DashboardRecentActivity"
import { DashboardStats } from "./DashboardStats"
import {
    DASHBOARD_ACTIVITY_DATA,
    DASHBOARD_CHART_SERIES,
    DASHBOARD_DAILY_GOALS,
    DASHBOARD_EDITORIAL,
    DASHBOARD_INSPIRATION,
    DASHBOARD_PRAYER_COMPLETED,
    DASHBOARD_PRAYER_HIGHLIGHT,
    DASHBOARD_RECENT_ACTIVITY,
    DASHBOARD_STATS,
} from "./content"

export default function DashboardContent() {
    return (
        <div className="bg-white">
            <div className="container space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
                <DashboardHeader
                    badge={DASHBOARD_EDITORIAL.badge}
                    title={DASHBOARD_EDITORIAL.title}
                    lead={DASHBOARD_EDITORIAL.lead}
                />

                <DashboardStats items={DASHBOARD_STATS} />

                <div className="grid gap-6 lg:grid-cols-3">
                    <DashboardConsistencyChart
                        title="Consistency analytics"
                        description="Activity across spiritual categories"
                        data={DASHBOARD_ACTIVITY_DATA}
                        series={DASHBOARD_CHART_SERIES}
                    />
                    <DashboardPrayerSchedule
                        prayers={PRAYER_WINDOWS}
                        highlightId={DASHBOARD_PRAYER_HIGHLIGHT}
                        completedIds={DASHBOARD_PRAYER_COMPLETED}
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <DashboardRecentActivity items={DASHBOARD_RECENT_ACTIVITY} />
                    <div className="space-y-6">
                        <DashboardDailyProgress goals={DASHBOARD_DAILY_GOALS} />
                        <DashboardInspirationCard
                            badge={DASHBOARD_INSPIRATION.badge}
                            quote={DASHBOARD_INSPIRATION.quote}
                            source={DASHBOARD_INSPIRATION.source}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
