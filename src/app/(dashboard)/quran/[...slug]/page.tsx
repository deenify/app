// app/(pages)/quran/[...slug]/page.tsx

import { Metadata } from "next"
import { notFound } from "next/navigation"
import QuranDetailPage from "@/components/pages/dashboard/quran/QuranDetailPage"
import { serverEnv } from "@/env/server"

interface PageProps {
    params: {
        slug?: string[]
    }
}



export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const slug = params?.slug ?? []
    const surahNumber = slug[0] ? Number(slug[0]) : undefined

    if (!surahNumber) {
        return { title: { absolute: `${serverEnv.APP_NAME} - Quran - Surah` } }
    }

    try {
        // EXAMPLE API
        const res = await fetch(
            `https://api.alquran.cloud/v1/surah/${surahNumber}`,
            { next: { revalidate: 86400 } }
        )

        if (!res.ok) {
            throw new Error("Failed")
        }

        const json = await res.json()
        const surah = json?.data

        return {
            title: { absolute: `${surah.englishName} (${surah.name})` },
            description: surah.englishNameTranslation ?? "Read and explore the Quran.",
        }
    } catch {
        return { title: { absolute: `${serverEnv.APP_NAME} - Quran - Surah` } }
    }
}



export default function Page({ params }: PageProps) {

    const slug = params?.slug ?? []

    const surahNumber = slug[0]
        ? Number(slug[0])
        : undefined

    const verseNumber = slug[1]
        ? Number(slug[1])
        : undefined

    if (!surahNumber) {
        return notFound()
    }

    return (
        <QuranDetailPage
            surahNumber={surahNumber}
            verseNumber={verseNumber}
        />
    )
}