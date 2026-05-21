import PillarsContent from "@/components/pages/dashboard/pillars/PillarsContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Five Pillars" },
    description: "Understand the five pillars of Islam in plain language.",
}

export default function PillarsPage() {
    return <PillarsContent />
}
