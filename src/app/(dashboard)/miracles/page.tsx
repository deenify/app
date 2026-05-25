import { Metadata } from "next"
import MiraclesPage from "@/components/pages/dashboard/miracles/MiraclesPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Islamic Miracles" },
    description: "Learn about miracles in the Quran, from the prophets, and in creation.",
}

export default function Page() {
    return <MiraclesPage />
}
