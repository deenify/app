import QuranDetailPage from "../../../../components/pages/quran/QuranDetailPage"

interface PageProps {
  params: { slug?: string[] }
}

export default function Page({ params }: PageProps) {
  const slug = params?.slug ?? []
  const surahNumber = Number(slug[0] ?? "1")
  const verseNumber = slug[1] ? Number(slug[1]) : undefined

  return <QuranDetailPage surahNumber={surahNumber} verseNumber={verseNumber} />
}