import SupplicationsExploreContent from "@/components/pages/dashboard/supplications/SupplicationsExploreContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Supplications" },
    description: `Explore the supplications and learn about their meaning and teachings 
    in a simple and easy to understand way.`,
}

export default function SupplicationsPage() {
    return <SupplicationsExploreContent />
}
