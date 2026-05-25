import { Metadata } from "next"
import GuidesPage from "@/components/pages/dashboard/guides/GuidesPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Guides" },
    description:
        "Explore the guides and learn about their meaning and teachings in a simple and easy to understand way.",
}

export default function Page() {
    return <GuidesPage />
}
