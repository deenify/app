import RevertContent from "@/components/pages/dashboard/revert/RevertContent"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Becoming Muslim" },
    description: "A simple roadmap for new Muslims and anyone learning about Islam.",
}

export default function RevertPage() {
    return <RevertContent />
}
