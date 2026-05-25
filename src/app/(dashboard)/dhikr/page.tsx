import { Metadata } from "next"
import DhikrPage from "@/components/pages/dashboard/dhikr/DhikrPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Dhikr Counter" },
    description: "Count dhikr with presets and a simple session rhythm.",
}

export default function Page() {
    return <DhikrPage />
}
