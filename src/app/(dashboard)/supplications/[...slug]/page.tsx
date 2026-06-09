import { Metadata } from "next"
import { notFound } from "next/navigation"
import SupplicationDetailPage from "@/components/pages/dashboard/supplications/SupplicationDetailPage"
import { getSupplicationById } from "@/components/pages/dashboard/supplications/content"

interface PageProps {
    params: {
        slug?: string[]
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const supplicationId = params?.slug?.[0]
    const item = supplicationId ? getSupplicationById(supplicationId) : undefined

    if (!item) {
        return { title: { absolute: "Deenify - Supplications" } }
    }

    return {
        title: { absolute: `${item.title} - Supplications` },
        description: item.excerpt,
    }
}

export default function Page({ params }: PageProps) {
    const supplicationId = params?.slug?.[0]
    if (!supplicationId) return notFound()

    return <SupplicationDetailPage supplicationId={supplicationId} />
}
