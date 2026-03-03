"use client"

import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"
import { QuranSurahType } from "./content"

interface SurahListSectionProps {
  SURAHS: QuranSurahType[]
}

const SurahListSection = ({ SURAHS }: SurahListSectionProps) => {
  const router = useRouter()

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50/30">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="emerald" className="mb-4">
            All Surahs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">
            The 114 Surahs of the Quran
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read any surah by name. Each surah is listed with its Arabic name,
            English translation, verse count, and place of revelation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SURAHS.map((surah) => (
            <Card
              key={surah.number}
              className="cursor-pointer hover:shadow-md transition-shadow border-emerald-100"
              onClick={() => router.push(`/quran/${surah.number}`)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-emerald-700">
                    {surah.number}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">
                      {surah.nameEnglish}
                    </h3>
                    <Badge
                      variant={surah.revelation === "Meccan" ? "blue" : "purple"}
                      className="text-xs"
                    >
                      {surah.revelation}
                    </Badge>
                  </div>
                  <p className="text-emerald-700 mb-1" dir="rtl">
                    {surah.nameArabic}
                  </p>
                  <p className="text-sm text-gray-600">
                    {surah.verses} verses
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SurahListSection
