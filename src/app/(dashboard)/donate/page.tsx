import { Metadata } from "next"
import DonatePage from "@/components/pages/dashboard/donate/DonatePage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Donate" },
    description: "Support Deenify and help us build better tools for the ummah.",
}

export default function Page() {
    return <DonatePage />
}
