// app/(pages)/quran/[...slug]/page.tsx 

import { notFound } from "next/navigation"
import QuranDetailPage from "../../../../components/pages/quran/QuranDetailPage"

interface PageProps {
    params: { slug?: string[] }
}

export default function Page({ params }: PageProps) {
    const slug = params?.slug ?? []
    const surahNumber = slug[0] ? Number(slug[0]) : undefined
    const verseNumber = slug[1] ? Number(slug[1]) : undefined

    if (!surahNumber) {
        return notFound()
    }

    return (
        <>
            <QuranDetailPage
                surahNumber={surahNumber}
                verseNumber={verseNumber}
            />
        </>
    )
}