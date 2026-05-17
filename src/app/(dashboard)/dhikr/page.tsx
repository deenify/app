import DhikrCounterContent from "@/components/pages/dashboard/dhikr/DhikrCounterContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Dhikr Counter" },
    description: `Track your daily dhikr count and stay on track with your daily prayers.`,
}

export default function DhikrPage() {
    return <DhikrCounterContent />
}
