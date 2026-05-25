import { Metadata } from "next"
import HadithPage from "@/components/pages/dashboard/hadith/HadithPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Hadith" },
    description:
        "Explore the Hadith and learn about its meaning and teachings in a simple and easy to understand way.",
}

export default function Page() {
    return <HadithPage />
}
