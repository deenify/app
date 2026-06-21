import { Metadata } from "next"
import PrayerPage from "@/components/pages/dashboard/prayer/PrayerPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Prayer Times` },
    description: "Get the latest prayer times for your location and stay on track with your daily prayers.",
}

export default function Page() {
    return <PrayerPage />
}
