import { Metadata } from "next"
import DonatePaymentPage from "@/components/pages/dashboard/donate/DonatePaymentPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Checkout` },
    description: "Complete your donation securely.",
}

export default function Page() {
    return <DonatePaymentPage />
}
