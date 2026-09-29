"use client"

import { Headphones, Play } from "lucide-react"
import { MockReciters, SurahRecitersMap, type QuranSurahType, type ReciterType } from "./content"
import { useIncrementalReveal } from "@/hooks/useIncrementalReveal"
import Stagger from "@/components/shared/motion/Stagger"
import Link from "next/link"
import ReciterStack from "./ReciterStack"


interface ListenTabSectionProps {
    surahs: QuranSurahType[]
}

function getRecitersForSurah(surahNumber: number): ReciterType[] {
    const ids = SurahRecitersMap[surahNumber] ?? []
    return ids.map((id) => MockReciters.find((r) => r.id === id)!).filter(Boolean)
}


export default function ListenTabSection({ surahs }: ListenTabSectionProps) {

    const { items: visibleSurahs, sentinelRef, newFromIndex } = useIncrementalReveal({
        items: surahs,
        batchLength: 18,
        offsetTop: 480,
    })

    if (surahs.length === 0) {
        return (
            <section className="relative py-12 sm:py-16">
                <div className="container">
                    <div className="mx-auto max-w-lg text-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 text-emerald-700 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
                            <Headphones className="h-7 w-7" strokeWidth={1.5} />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
                            No surahs match your search
                        </h2>
                        <p className="mt-1.5 text-sm text-gray-500">
                            Try a different term or clear the search to see all surahs.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="relative py-8 sm:py-10">
            <div className="container">
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
                            Recitation
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Listen by surah
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        15+ reciters
                    </div>
                </header>

                <section className="h-max min-h-[60dvh]">
                    {surahs.length === 0 ? (
                        <p className="rounded-xl border border-gray-100 bg-white py-8 text-center text-sm text-gray-500">
                            No surahs match your search or reciter filter. Try a different search or select All reciters.
                        </p>
                    ) : (
                        <>
                            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {visibleSurahs.map((surah, index) => {
                                    const reciters = getRecitersForSurah(surah.number)

                                    return (
                                        <Stagger
                                            key={surah.number}
                                            index={index - newFromIndex}
                                            animate={index >= newFromIndex}
                                        >
                                            <Link href={`/quran/${surah.number}`}>
                                                <div
                                                    className="group flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left 
                                            shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[box-shadow,border-color] hover:border-emerald-300 
                                            hover:shadow-md"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold tabular-nums text-emerald-800">
                                                            {surah.number}
                                                        </span>
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="truncate font-semibold text-gray-900">
                                                                {surah.nameEnglish}
                                                            </h3>
                                                            <p
                                                                className="truncate text-base font-arabic font-medium text-emerald-800"
                                                                dir="rtl"
                                                            >
                                                                {surah.nameArabic}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-gray-500">
                                                                {surah.verses} verses
                                                            </p>
                                                        </div>
                                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-200">
                                                            <Play className="h-4 w-4 ml-0.5" strokeWidth={2.5} />
                                                        </span>
                                                    </div>
                                                    <div className="border-t border-gray-50 pt-2">
                                                        <ReciterStack reciters={reciters} />
                                                    </div>
                                                </div>
                                            </Link>
                                        </Stagger>
                                    )
                                })}

                                <div ref={sentinelRef} className="col-span-full h-px w-full" aria-hidden />
                            </div>
                        </>
                    )}
                </section>
            </div>
        </section>
    )
}
