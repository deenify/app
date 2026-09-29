import { Metadata } from "next"
import LegalDocumentPage from "@/components/pages/platform/legal/LegalDocumentPage"
import { TERMS_DOCUMENT } from "@/components/pages/platform/legal/content"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Terms of Use` },
    description: `Terms of use for ${serverEnv.APP_NAME} — how the service works, your responsibilities, and the agreement that keeps both sides clear.`,
}

const Page = () => {
    return <LegalDocumentPage document={TERMS_DOCUMENT} />
}

export default Page
