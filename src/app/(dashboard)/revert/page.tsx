import { Metadata } from "next"
import RevertPage from "@/components/pages/dashboard/revert/RevertPage"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Revert Guide" },
    description: "Steps and resources for new Muslims and those exploring Islam.",
}

export default function Page() {
    return <RevertPage />
}
