// app/(pages)/hadith/[...slug]/page.tsx

import { Metadata } from "next"
import { notFound } from "next/navigation"
import HadithDetailPage from "@/components/pages/dashboard/hadith/HadithDetailPage"
import { serverEnv } from "@/env/server"

interface PageProps {
    params: Promise<{
        slug?: string[]
    }>
}

const HADITH_COLLECTIONS: Record<string, { english: string; arabic?: string }> = {
    "sunan-tirmidhi": { english: "Jami` at-Tirmidhi", arabic: "جامع الترمذي", },
    "sahih-bukhari": { english: "Sahih al-Bukhari", arabic: "صحيح البخاري", },
    "sahih-muslim": { english: "Sahih Muslim", arabic: "صحيح مسلم", },
    "sunan-abu-dawud": { english: "Sunan Abi Dawud", arabic: "سنن أبي داود" },
    "sunan-nasai": { english: "Sunan an-Nasa'i", arabic: "سنن النسائي" },
    "sunan-ibn-majah": { english: "Sunan Ibn Majah", arabic: "سنن ابن ماجه" },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug = [] } = await params
    const collectionSlug = slug[0]

    if (!collectionSlug) {
        return { title: { absolute: `${serverEnv.APP_NAME} - Hadith`, } }
    }

    const collection = HADITH_COLLECTIONS[collectionSlug]
    const englishName =
        collection?.english ??
        collectionSlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    const arabicName = collection?.arabic

    return {
        title: { absolute: arabicName ? `${englishName} | ${arabicName}` : englishName },
        description: `Read and explore the ${englishName} hadith collection with 
        translations and authentic references.`,
    }
}

export default async function Page({ params }: PageProps) {
    const { slug = [] } = await params

    const collectionSlug = slug[0]

    if (!collectionSlug) {
        return notFound()
    }

    return <HadithDetailPage collectionId={collectionSlug} />
}