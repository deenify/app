"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Bookmark } from "lucide-react"
import type { BookmarkItemType } from "./content"
import { useIncrementalReveal } from "@/hooks/useIncrementalReveal"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import Stagger from "@/components/shared/motion/Stagger"
import Link from "next/link"

interface BookmarksTabSectionProps {
    bookmarks: BookmarkItemType[]
}

export default function BookmarksTabSection({ bookmarks }: BookmarksTabSectionProps) {
    const [items, setItems] = useState<BookmarkItemType[]>(bookmarks)
    const { items: visibleItems, sentinelRef, newFromIndex } = useIncrementalReveal({
        items,
        batchLength: 18,
        offsetTop: 480,
    })

    useEffect(() => {
        setItems(bookmarks)
    }, [bookmarks])

    return (
        <section className="relative py-8 sm:py-10">
            <div className="container">
                {/* Header section  */}
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
                            Saved passages
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Your bookmarks
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="tabular-nums">{items.length}</span>
                        <span>bookmarks</span>
                    </div>
                </header>


                {/* Content section  */}
                <section className="h-max min-h-[60dvh]">
                    {items.length === 0 ? (
                        <div className="mt-6 flex justify-center">
                            <div className="max-w-lg rounded-2xl border border-dashed border-gray-200 bg-white/80 px-6 py-8 text-center shadow-sm">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <Bookmark className="h-6 w-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="mt-4 text-base font-medium text-gray-900">
                                    No bookmarks yet
                                </h3>
                                <p className="mt-1.5 text-sm text-gray-500">
                                    Save verses from the Read tab as you study; they will appear here for quick access.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {visibleItems.map((item, index) => (
                                <Stagger
                                    key={`${item.surahNumber}-${item.verseNumber}-${item.savedAt}`}
                                    index={index - newFromIndex}
                                    animate={index >= newFromIndex}
                                    className="flex flex-1"
                                >
                                    <Link
                                        href={`/quran/${item.surahNumber}`}
                                        className="flex flex-1"
                                    >
                                        <button
                                            type="button"
                                            className="group flex flex-col rounded-xl border border-gray-100 bg-white p-4 text-left
                                        shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] hover:border-emerald-300 
                                        hover:shadow-md justify-between gap-2 w-full"
                                        >
                                            <div className="h-max">
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 
                                                    bg-emerald-50 text-sm font-bold tabular-nums text-emerald-800">
                                                            {item.surahNumber}
                                                        </span>
                                                        <h3 className="font-semibold text-gray-900 truncate">
                                                            {item.surahNameEnglish}
                                                        </h3>
                                                        <Badge variant="emerald">
                                                            Verse {item.verseNumber}
                                                        </Badge>
                                                    </div>

                                                    <BookmarkButton
                                                        isBookmarked={true}
                                                        buttonProps={{
                                                            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                                                                e.preventDefault()
                                                                e.stopPropagation()
                                                                setItems((prev) =>
                                                                    prev.filter(
                                                                        (b, idx) =>
                                                                            !(
                                                                                b.surahNumber === item.surahNumber &&
                                                                                b.verseNumber === item.verseNumber &&
                                                                                idx === index
                                                                            )
                                                                    )
                                                                )
                                                            },
                                                            className: "ml-auto",
                                                            "aria-label": "Remove bookmark",
                                                        }}
                                                    />
                                                </div>
                                                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-gray-700">
                                                    {item.translation}
                                                </p>
                                            </div>

                                            <div className="mt-2 flex items-center justify-between gap-2">
                                                <p className="text-xs font-medium text-gray-700 tracking-wide uppercase">
                                                    {new Date(item.savedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                                </p>
                                                <p className="text-[11px] font-medium text-emerald-700/90 opacity-0 transition-opacity group-hover:opacity-100">
                                                    Open in Quran →
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
