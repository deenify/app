import { Metadata } from "next"
import HistoryPage from "@/components/pages/dashboard/history/HistoryPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Islamic History" },
    description: "Explore key moments in Islamic history in simple, short reads.",
}

export default function Page() {
    return <HistoryPage />
}
