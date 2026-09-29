import { Metadata } from "next"
import CalendarPage from "@/components/pages/dashboard/calendar/CalendarPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Islamic Calendar` },
    description: "Hijri calendar with sacred months and upcoming events.",
}

export default function Page() {
    return <CalendarPage />
}
