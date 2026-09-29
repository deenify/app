import { Metadata } from "next"
import DhikrPage from "@/components/pages/dashboard/dhikr/DhikrPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Dhikr Counter` },
    description: "Count dhikr with presets and a simple session rhythm.",
}

export default function Page() {
    return <DhikrPage />
}
