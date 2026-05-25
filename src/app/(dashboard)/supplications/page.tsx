import { Metadata } from "next"
import SupplicationsPage from "@/components/pages/dashboard/supplications/SupplicationsPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Supplications" },
    description: "Curated duʿāʾ for salah, travel, gratitude, and difficult moments.",
}

export default function Page() {
    return <SupplicationsPage />
}
