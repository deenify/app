import { Metadata } from "next"
import HadithPage from "@/components/pages/dashboard/hadith/HadithPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Hadith` },
    description:
        "Explore the Hadith and learn about its meaning and teachings in a simple and easy to understand way.",
}

export default function Page() {
    return <HadithPage />
}
