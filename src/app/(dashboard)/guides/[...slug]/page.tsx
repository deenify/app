import { Metadata } from "next"
import { notFound } from "next/navigation"
import GuidesDetailPage from "@/components/pages/dashboard/guides/GuidesDetailPage"
import { serverEnv } from "@/env/server"

interface PageProps {
    params: {
        slug?: string[]
    }
}

const formatTitle = (slug: string) =>
    slug
        .split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const guideId = params?.slug?.[0]

    if (!guideId) {
        return { title: { absolute: `${serverEnv.APP_NAME} - Guides` } }
    }

    const english = formatTitle(guideId)
    return {
        title: { absolute: `${english} - Guides` },
        description: `Learn ${english} in structured Islamic guidance format.`,
    }
}


export default function Page({ params }: PageProps) {
    const guideId = params?.slug?.[0]
    if (!guideId) return notFound()

    return <GuidesDetailPage guideId={guideId} />
}