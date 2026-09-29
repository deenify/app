// app/faqs/page.tsx
import { Metadata } from "next"
import FaqsPage from "@/components/pages/platform/faqs/FaqsPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - FAQs` },
    description:
        `Answers about ${serverEnv.APP_NAME} — getting started, features, billing, privacy, and how the platform supports your daily deen.`,
}

const Page = () => {
    return <FaqsPage />
}

export default Page
