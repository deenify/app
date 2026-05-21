import { Suspense } from "react"
import { Metadata } from "next"
import DonatePaymentContent from "@/components/pages/dashboard/donate/DonatePaymentContent"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Checkout" },
    description: "Complete your support for Deenify.",
}

export default function DonatePaymentPage() {
    return (
        <Suspense fallback={<div className="container py-16 text-center text-sm text-gray-500">Loading...</div>}>
            <DonatePaymentContent />
        </Suspense>
    )
}
