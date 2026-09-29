// app/about/page.tsx
import { Metadata } from "next"
import AboutPage from "@/components/pages/platform/about/AboutPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - About` },
    description:
        `Learn about the mission, craft, and values behind ${serverEnv.APP_NAME} — Islamic software authored with editorial discipline for daily practice.`,
}

const Page = () => {
    return <AboutPage />
}

export default Page
