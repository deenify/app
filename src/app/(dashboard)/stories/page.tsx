import { Metadata } from "next"
import StoriesPage from "@/components/pages/dashboard/stories/StoriesPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Prophetic Stories` },
    description: "Stories from the Quran and Sunnah with lessons for everyday life.",
}

export default function Page() {
    return <StoriesPage />
}
