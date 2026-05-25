import { Metadata } from "next"
import DonatePaymentPage from "@/components/pages/dashboard/donate/DonatePaymentPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Checkout" },
    description: "Complete your donation securely.",
}

export default function Page() {
    return <DonatePaymentPage />
}
