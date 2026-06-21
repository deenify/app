import { Metadata } from "next"
import { notFound } from "next/navigation"
import MiracleDetailPage from "@/components/pages/dashboard/miracles/MiracleDetailPage"
import { getMiracleById } from "@/components/pages/dashboard/miracles/content"
import { serverEnv } from "@/env/server"

type PageProps = { params: { slug?: string[] } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const id = params?.slug?.[0]
    if (!id) return { title: { absolute: `${serverEnv.APP_NAME} - Islamic Miracles` } }
    const topic = getMiracleById(id)
    return {
        title: { absolute: `${topic?.title ?? id} - Islamic Miracles` },
        description: topic?.excerpt,
    }
}

export default function Page({ params }: PageProps) {
    const id = params?.slug?.[0]
    if (!id || !getMiracleById(id)) return notFound()
    return <MiracleDetailPage topicId={id} />
}
