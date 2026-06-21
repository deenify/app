import { Metadata } from "next"
import QiblaPage from "@/components/pages/dashboard/qibla/QiblaPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Qibla Finder` },
    description: "Find the direction of the Kaʿbah from your location.",
}

export default function Page() {
    return <QiblaPage />
}
