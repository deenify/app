import { Metadata } from "next"
import SupportPage from "@/components/pages/dashboard/support/SupportPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Support" },
    description: "Get help, browse FAQs, and contact the Deenify team.",
}

export default function Page() {
    return <SupportPage />
}
