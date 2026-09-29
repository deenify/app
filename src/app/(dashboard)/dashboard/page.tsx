import DashboardPage from "@/components/pages/dashboard/overview/DashboardPage"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Dashboard` },
    description: `Manage your ${serverEnv.APP_NAME} dashboard, privacy, and preferences.`,
}

export default function Page() {
    return <DashboardPage />
}
