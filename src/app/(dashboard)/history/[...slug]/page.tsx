import { Metadata } from "next"
import { notFound } from "next/navigation"
import HistoryDetailPage from "@/components/pages/dashboard/history/HistoryDetailPage"
import { getHistoryById } from "@/components/pages/dashboard/history/content"

type PageProps = { params: { slug?: string[] } }

const formatTitle = (slug: string) =>
    slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const id = params?.slug?.[0]
    if (!id) return { title: { absolute: "Deenify - Islamic History" } }
    const topic = getHistoryById(id)
    const title = topic?.title ?? formatTitle(id)
    return {
        title: { absolute: `${title} - Islamic History` },
        description: topic?.excerpt ?? `Learn about ${title} in Islamic history.`,
    }
}

export default function Page({ params }: PageProps) {
    const id = params?.slug?.[0]
    if (!id || !getHistoryById(id)) return notFound()
    return <HistoryDetailPage topicId={id} />
}
