// app/(pages)/guides/[...slug]/page.tsx

import { notFound } from "next/navigation"
import GuideDetailPage from "../../../../components/pages/guides/GuideDetailPage"

interface PageProps {
    params: { slug?: string[] }
}

export default function Page({ params }: PageProps) {
    const slug = params?.slug ?? []
    const guideId = slug[0]

    if (!guideId) {
        return notFound()
    }

    return <GuideDetailPage guideId={guideId} />
}

