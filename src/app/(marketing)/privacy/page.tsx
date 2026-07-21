import { Metadata } from "next"
import LegalDocumentPage from "@/components/pages/platform/legal/LegalDocumentPage"
import { PRIVACY_DOCUMENT } from "@/components/pages/platform/legal/content"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Privacy Policy` },
    description: `Privacy policy for ${serverEnv.APP_NAME} — what we collect, why we collect it, and the choices you keep over your data.`,
}

const Page = () => {
    return <LegalDocumentPage document={PRIVACY_DOCUMENT} />
}

export default Page
