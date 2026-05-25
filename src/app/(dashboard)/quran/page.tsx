import { Metadata } from "next"
import QuranPage from "@/components/pages/dashboard/quran/QuranPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Quran" },
    description:
        "Explore the Quran and learn about its meaning and teachings in a simple and easy to understand way.",
}

export default function Page() {
    return <QuranPage />
}
