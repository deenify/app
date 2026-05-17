import IslamicCalendarContent from "@/components/pages/dashboard/calendar/IslamicCalendarContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Islamic Calendar" },
    description: `Explore the Islamic calendar and learn about its meaning and teachings 
    in a simple and easy to understand way.`,
}

export default function CalendarPage() {
    return <IslamicCalendarContent />
}
