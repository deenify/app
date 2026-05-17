import QiblaFinderContent from "@/components/pages/dashboard/qibla/QiblaFinderContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Qibla Finder" },
    description: `Find the direction of the Qibla and learn about its meaning and teachings 
    in a simple and easy to understand way.`,
}

export default function QiblaPage() {
    return <QiblaFinderContent />
}
