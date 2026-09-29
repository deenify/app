import { Metadata } from "next"
import GuidesPage from "@/components/pages/dashboard/guides/GuidesPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Guides` },
    description:
        "Explore the guides and learn about their meaning and teachings in a simple and easy to understand way.",
}

export default function Page() {
    return <GuidesPage />
}
