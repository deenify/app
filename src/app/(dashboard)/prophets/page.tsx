import { Metadata } from "next"
import ProphetsPage from "@/components/pages/dashboard/prophets-lineage/ProphetsPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Prophetic Lineage" },
    description: "Explore the chain of prophets from Adam to Muhammad ﷺ.",
}

export default function Page() {
    return <ProphetsPage />
}
