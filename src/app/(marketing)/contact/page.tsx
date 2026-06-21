import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Contact` },
    description: `Contact the ${serverEnv.APP_NAME} team for support, feedback, or inquiries.`,
}

const ContactPage = () => {
    return (
        <div>ContactPage</div>
    )
}

export default ContactPage
