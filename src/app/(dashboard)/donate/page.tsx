import DonateContent from "@/components/pages/dashboard/donate/DonateContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Donate" },
    description: "Support Deenify and help keep Islamic learning tools free for everyone.",
}

export default function DonatePage() {
    return <DonateContent />
}
