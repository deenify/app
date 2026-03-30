import { notFound } from "next/navigation"
import HadithDetailPage from "@/components/pages/hadith/HadithDetailPage"

interface PageProps {
    params: { slug?: string[] }
}

export default function Page({ params }: PageProps) {
    const slug = params?.slug ?? []
    const collectionId = slug[0]

    if (!collectionId) {
        return notFound()
    }

    return <HadithDetailPage collectionId={collectionId} />
}
