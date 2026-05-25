import { Metadata } from "next"
import PillarsPage from "@/components/pages/dashboard/pillars/PillarsPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Five Pillars" },
    description: "Learn the five pillars of Islam in plain language.",
}

export default function Page() {
    return <PillarsPage />
}
