// app/(pages)/guides/page.tsx

import GuidesExplorePage from "../../../components/pages/dashboard/guides/GuidesExplorePage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Guides" },
    description: `Explore the guides and learn about their meaning and teachings 
    in a simple and easy to understand way.`,
}

export default function GuidesPage() {
    return (
        <div>
            <GuidesExplorePage />
        </div>
    )
}

