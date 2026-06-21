import { Metadata } from "next"
import PillarsPage from "@/components/pages/dashboard/pillars/PillarsPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Five Pillars` },
    description: "Learn the five pillars of Islam in plain language.",
}

export default function Page() {
    return <PillarsPage />
}
