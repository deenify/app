"use client"

import { useEffect, useState } from "react"
import { Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useIncrementalReveal } from "@/hooks/useIncrementalReveal"
import type { HadithSavedItemType } from "./content"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import Stagger from "@/components/shared/motion/Stagger"
import Link from "next/link"

interface HadithSavedTabSectionProps {
    items: HadithSavedItemType[]
}

const HadithSavedTabSection = ({ items: itemsProp }: HadithSavedTabSectionProps) => {
    const [items, setItems] = useState<HadithSavedItemType[]>(itemsProp)

    useEffect(() => {
        setItems(itemsProp)
    }, [itemsProp])

    const { items: visibleItems, sentinelRef, newFromIndex } = useIncrementalReveal({
        items,
        batchLength: 18,
        offsetTop: 480,
    })

    return (
        <section className="relative min-h-[320px] py-8 sm:py-10">
            <div className="container px-4 sm:px-6">
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
                            Saved Passages
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Your Bookmarks
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 
                    px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="tabular-nums">{items.length}</span>
                        <span>saved</span>
                    </div>
                </header>

                <section className="h-max min-h-[60dvh]">
                    {items.length === 0 ? (
                        <div className="mt-6 flex justify-center">
                            <div className="max-w-lg rounded-2xl border border-dashed border-gray-200 bg-white/80 px-6 py-8 text-center shadow-sm">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <Bookmark className="h-6 w-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="mt-4 text-base font-medium text-gray-900">No saved hadith yet</h3>
                                <p className="mt-1.5 text-sm text-gray-500">
                                    Save narrations while you read; they will appear here for quick return.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                            {visibleItems.map((item, index) => (
                                <Stagger
                                    key={item.id}
                                    index={index - newFromIndex}
                                    animate={index >= newFromIndex}
                                    className="flex flex-1"
                                >
                                    <Link href={`/hadith/${item.collectionId}`} className="flex flex-1">
                                        <button
                                            type="button"
                                            className="group flex w-full flex-col justify-between gap-2 rounded-xl border border-gray-100 bg-white p-4 
                                    text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] 
                                    hover:border-emerald-300 hover:shadow-md"
                                        >
                                            <div className="h-max min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex min-w-0 flex-1 flex-wrap gap-2">
                                                        <span
                                                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 
                                                    text-sm font-bold tabular-nums text-emerald-800"
                                                        >
                                                            {item.bookNumber}
                                                        </span>

                                                        <div>
                                                            <h3 className="flex items-center gap-2">
                                                                <span className="min-w-0 truncate font-semibold text-gray-900">
                                                                    {item.collectionName}
                                                                </span>
                                                                <Badge variant="emerald" className="shrink-0 font-medium tabular-nums">
                                                                    #{item.hadithInBook}
                                                                </Badge>
                                                            </h3>
                                                            <span
                                                                className="truncate font-arabic text-sm font-medium leading-snug text-emerald-800"
                                                                dir="rtl"
                                                            >
                                                                {item.collectionNameArabic}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <BookmarkButton
                                                        isBookmarked={true}
                                                        buttonProps={{
                                                            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                                                                e.preventDefault()
                                                                e.stopPropagation()
                                                                setItems((prev) => prev.filter((x) => x.id !== item.id))
                                                            },
                                                            className: "ml-auto shrink-0",
                                                            "aria-label": "Remove saved hadith",
                                                        }}
                                                    />
                                                </div>

                                                <div className="py-2 pt-4">
                                                    <Badge variant="purple" className="shrink-0 font-medium tabular-nums">
                                                        #{item.chapterNumber}
                                                    </Badge>
                                                    <h4 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
                                                        {item.titleEnglish}
                                                    </h4>
                                                    <p
                                                        className="mt-1 line-clamp-2 font-arabic text-sm font-medium leading-snug text-emerald-900"
                                                        dir="rtl"
                                                    >
                                                        {item.titleArabic}
                                                    </p>
                                                </div>

                                                <div className="mt-2 border-l-[3px] border-layout-separator pl-2 leading-none">
                                                    <p className="line-clamp-2 text-xs font-medium uppercase tracking-wide text-gray-700">
                                                        {item.snippet}
                                                    </p>
                                                </div>
                                                <div className="mt-4 flex justify-end border-r-[3px] border-layout-separator pr-2 text-right leading-none">
                                                    <p
                                                        className="line-clamp-2 font-arabic text-sm font-medium leading-snug text-emerald-800"
                                                        dir="rtl"
                                                    >
                                                        {item.snippetArabic}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-2 pt-4">
                                                <p className="text-xs font-medium uppercase tracking-wide text-gray-700">
                                                    {new Date(item.savedAt).toLocaleDateString("en-GB", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                                <p className="text-[11px] font-medium text-emerald-700/90 opacity-0 transition-opacity group-hover:opacity-100">
                                                    Open in Hadith →
                                                </p>
                                            </div>
                                        </button>
                                    </Link>
                                </Stagger>
                            ))}
                            <div ref={sentinelRef} className="col-span-full h-px w-full" aria-hidden />
                        </div>
                    )}
                </section>
            </div>
        </section>
    )
}

export default HadithSavedTabSection
