import { Metadata } from "next"
import CalendarPage from "@/components/pages/dashboard/calendar/CalendarPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Islamic Calendar" },
    description: "Hijri calendar with sacred months and upcoming events.",
}

export default function Page() {
    return <CalendarPage />
}
