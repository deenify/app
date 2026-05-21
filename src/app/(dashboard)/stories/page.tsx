import StoriesExploreContent from "@/components/pages/dashboard/stories/StoriesExploreContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Prophetic Stories" },
    description: "Stories from the prophets that teach patience, trust, and good character.",
}

export default function StoriesPage() {
    return <StoriesExploreContent />
}
