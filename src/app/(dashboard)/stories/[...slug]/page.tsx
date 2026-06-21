import { Metadata } from "next"
import { notFound } from "next/navigation"
import StoryDetailPage from "@/components/pages/dashboard/stories/StoryDetailPage"
import { getStoryById } from "@/components/pages/dashboard/stories/content"
import { serverEnv } from "@/env/server"

type PageProps = { params: { slug?: string[] } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const id = params?.slug?.[0]
    if (!id) return { title: { absolute: `${serverEnv.APP_NAME} - Prophetic Stories` } }
    const story = getStoryById(id)
    return {
        title: { absolute: `${story?.title ?? id} - Prophetic Stories` },
        description: story?.excerpt,
    }
}

export default function Page({ params }: PageProps) {
    const id = params?.slug?.[0]
    if (!id || !getStoryById(id)) return notFound()
    return <StoryDetailPage storyId={id} />
}
