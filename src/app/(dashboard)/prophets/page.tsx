// app/(dashboard)/prophets/page.tsx

import PropheticChainContent from "@/components/pages/dashboard/prophets-lineage/PropheticChainContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Prophets Lineage" },
    description: `Explore the prophets lineage and learn about their meaning and teachings 
    in a simple and easy to understand way.`,
}

export default function ProphetsPage() {
    return <PropheticChainContent />
}
