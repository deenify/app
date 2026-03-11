"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from "lucide-react"
import { QuranSurahType, surahNameMeaning } from "./content"
import { cn } from "@/lib/utils/clsx"
import { Button } from "@/components/ui/button"

interface SurahListSectionProps {
  SURAHS: QuranSurahType[]
}

const SurahListSection = ({ SURAHS }: SurahListSectionProps) => {
  const router = useRouter()
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set())

  const toggleBookmark = (e: React.MouseEvent, number: number) => {
    e.preventDefault()
    e.stopPropagation()
    setBookmarked((prev) => {
      const next = new Set(prev)
      if (next.has(number)) next.delete(number)
      else next.add(number)
      return next
    })
  }

  return (
    <section className="pt-5 pb-20 sm:pt-8 sm:pb-20">
      <div className="container px-4 sm:px-6 md:px-6">
        <div className="mb-4 sm:mb-5 flex items-baseline justify-between gap-3">
          <h2 className="text-base font-semibold tracking-tight text-gray-800 sm:text-sm sm:uppercase sm:tracking-wide sm:text-gray-500">
            All Surahs
          </h2>
          <span className="text-sm text-gray-500 tabular-nums sm:text-xs sm:text-gray-400">
            {SURAHS.length} surahs
          </span>
        </div>

        {/* Mobile: list layout — one column, clean rows */}
        <div className="sm:hidden divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white overflow-hidden">
          {SURAHS.map((surah) => (
            <main
              key={surah.number}
              className="flex w-full items-center gap-2.5 px-3 py-3 min-h-[52px] text-left hover:bg-gray-50 active:bg-gray-50/80 
              transition-colors min-[400px]:gap-3 min-[400px]:px-4 min-[400px]:py-3.5 cursor-pointer"
              onClick={() => router.push(`/quran/${surah.number}`)}
            >
              <div className="flex h-9 w-9 min-[400px]:h-10 min-[400px]:w-10 shrink-0 items-center justify-center 
              rounded-full bg-emerald-50 text-emerald-700">
                <span className="text-xs min-[400px]:text-sm font-bold tabular-nums">{surah.number}</span>
              </div>

              <div className="min-w-0 flex-1 overflow-hidden pr-1 min-[380px]:pr-2">
                <div className="flex flex-wrap items-center justify-start gap-1.5 min-[380px]:gap-2">
                  <span className="font-semibold text-gray-900 text-[15px] min-w-0 truncate">
                    {surah.nameEnglish}
                  </span>
                  <span>—</span>
                  <span
                    className="text-[15px] font-medium font-arabic text-emerald-800/90"
                    dir="rtl"
                  >
                    ({surah.nameArabic})
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 min-[380px]:text-[13px]">
                  <span>{surah.verses} verses</span>
                  <span
                    aria-hidden
                    className="inline-block w-1 h-1 shrink-0 rounded-full bg-gray-400"
                  />
                  <span>{surah.revelation}</span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                shouldScale
                aria-label={bookmarked.has(surah.number) ? "Remove bookmark" : "Bookmark surah"}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleBookmark(e, surah.number)}
                className={cn(
                  "flex w-7 h-7 shrink-0 items-center justify-center rounded-full transition-colors",
                  "hover:bg-emerald-50 active:bg-emerald-100",
                  bookmarked.has(surah.number)
                    ? "text-emerald-600 fill-emerald-600"
                    : "text-gray-400 group-hover:text-emerald-500"
                )}
              >
                <Bookmark
                  className={cn("h-4 w-4 text-black/80",
                    bookmarked.has(surah.number) && "fill-current text-emerald-600")}
                  size={16}
                  strokeWidth={1.5}
                />
              </Button>
            </main>
          ))}
        </div>

        {/* Desktop: card grid — 2 cols sm, 3 cols lg */}
        <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {SURAHS.map((surah) => {
            return (
              <Card
                key={surah.number}
                className="group cursor-pointer border border-gray-100 bg-white shadow-sm transition-[border-color,box-shadow] 
                hover:border-emerald-300 hover:shadow-sm overflow-hidden"
                onClick={() => router.push(`/quran/${surah.number}`)}
              >
                <CardContent className="flex items-start justify-between gap-3 sm:gap-4 p-4">
                  {/* Left: number pill */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100 sm:h-14 sm:w-14">
                    <span className="text-base font-bold tabular-nums sm:text-lg">{surah.number}</span>
                  </div>

                  {/* Right: info-contente */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="truncate font-semibold text-gray-900 leading-tight text-sm sm:text-base">
                        {surah.nameEnglish}
                      </h3>
                      <p
                        className="min-w-0 truncate text-base font-medium text-emerald-800/90 leading-tight font-arabic"
                        dir="rtl"
                      >
                        {surah.nameArabic}
                      </p>
                    </div>

                    <div>
                      <p className="truncate text-xs text-gray-600 leading-snug mt-0.5">
                        {surahNameMeaning[surah.number] ?? surah.nameEnglish}
                      </p>
                    </div>

                    {/* Row 2: chips */}
                    <div className="flex flex-1 flex-wrap items-center justify-between gap-1.5 pt-0.5 sm:gap-2 sm:pt-1">
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5 sm:gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-md border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-700 sm:px-2 sm:text-[11px]"
                        >
                          {surah.verses} verses
                        </Badge>
                        <Badge
                          variant={surah.revelation === "Meccan" ? "blue" : "purple"}
                          className="rounded-md px-1.5 py-0.5 text-[10px] font-medium sm:px-2 sm:text-[11px]"
                        >
                          {surah.revelation}
                        </Badge>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        shouldScale
                        aria-label={bookmarked.has(surah.number) ? "Remove bookmark" : "Bookmark surah"}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleBookmark(e, surah.number)}
                        className={cn(
                          "flex w-7 h-7 shrink-0 items-center justify-center rounded-full transition-colors",
                          "hover:bg-emerald-50 active:bg-emerald-100",
                          bookmarked.has(surah.number)
                            ? "text-emerald-600 fill-emerald-600"
                            : "text-gray-400 group-hover:text-emerald-500"
                        )}
                      >
                        <Bookmark
                          className={cn("h-4 w-4 text-black",
                            bookmarked.has(surah.number) && "fill-current text-emerald-600")}
                          size={16}
                          strokeWidth={1.5}
                        />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SurahListSection
