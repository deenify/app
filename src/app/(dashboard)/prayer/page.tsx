import PrayerTimesContent from "@/components/pages/dashboard/prayer/PrayerTimesContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Prayer Times" },
    description: `Get the latest prayer times for your location and stay on track with your daily prayers.`,
}

export default function PrayerPage() {
    return <PrayerTimesContent />
}
