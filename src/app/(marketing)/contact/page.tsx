// app/contact/page.tsx
import { Metadata } from "next"
import ContactPage from "@/components/pages/platform/contact/ContactPage"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Contact` },
    description: `Contact the ${serverEnv.APP_NAME} team for support, feedback, partnerships, or general inquiries.`,
}

const Page = () => {
    return <ContactPage />
}

export default Page
