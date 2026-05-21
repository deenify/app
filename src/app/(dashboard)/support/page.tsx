import SupportContent from "@/components/pages/dashboard/support/SupportContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Support Center" },
    description: "Get help with Deenify — FAQs and contact options.",
}

export default function SupportPage() {
    return <SupportContent />
}
