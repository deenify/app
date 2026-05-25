import { Metadata } from "next"
import StoriesPage from "@/components/pages/dashboard/stories/StoriesPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Prophetic Stories" },
    description: "Stories from the Quran and Sunnah with lessons for everyday life.",
}

export default function Page() {
    return <StoriesPage />
}
