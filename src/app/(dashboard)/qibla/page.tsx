import { Metadata } from "next"
import QiblaPage from "@/components/pages/dashboard/qibla/QiblaPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Qibla Finder" },
    description: "Find the direction of the Kaʿbah from your location.",
}

export default function Page() {
    return <QiblaPage />
}
