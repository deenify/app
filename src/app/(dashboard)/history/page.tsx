import HistoryExploreContent from "@/components/pages/dashboard/history/HistoryExploreContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Islamic History" },
    description: "Explore key moments in Islamic history in simple, short reads.",
}

export default function HistoryPage() {
    return <HistoryExploreContent />
}
