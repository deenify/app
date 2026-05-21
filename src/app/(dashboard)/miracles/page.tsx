import MiraclesExploreContent from "@/components/pages/dashboard/miracles/MiraclesExploreContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Islamic Miracles" },
    description: "Learn about miracles in the Quran, from the prophets, and in creation.",
}

export default function MiraclesPage() {
    return <MiraclesExploreContent />
}
