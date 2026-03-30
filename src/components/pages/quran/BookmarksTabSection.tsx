"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { motion } from "framer-motion"
import type { BookmarkItemType } from "./content"

interface BookmarksTabSectionProps {
    bookmarks: BookmarkItemType[]
}

export default function BookmarksTabSection({ bookmarks }: BookmarksTabSectionProps) {
    const router = useRouter()
    const [items, setItems] = useState<BookmarkItemType[]>(bookmarks)

    useEffect(() => {
        setItems(bookmarks)
    }, [bookmarks])

    return (
        <section className="relative border-t border-gray-100 bg-[linear-gradient(180deg,#fafafa_0%,#f5f5f5_100%)] py-8 sm:py-10 min-h-[320px]">
            <div className="container px-4 sm:px-6">
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
                        {items.map((item, i) => (
                            <motion.button
                                key={`${item.surahNumber}-${item.verseNumber}-${i}`}
                                type="button"
                                onClick={() => router.push(`/quran/${item.surahNumber}`)}
                                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2, delay: i * 0.02, ease: "easeOut" }}
                                className="group flex flex-col rounded-xl border border-gray-100 bg-white p-4 text-left
                                shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] hover:border-emerald-300 
                                hover:shadow-md justify-between gap-2"
                            >
                                <div className="h-max">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold tabular-nums text-emerald-800">
                                            {item.surahNumber}
                                        </span>
                                        <h3 className="font-semibold text-gray-900">
                                            {item.surahNameEnglish}
                                        </h3>
                                        <Badge variant="emerald">
                                            Verse {item.verseNumber}
                                        </Badge>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            shouldScale
                                            aria-label="Remove bookmark"
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                setItems((prev) =>
                                                    prev.filter(
                                                        (b, idx) =>
                                                            !(
                                                                b.surahNumber === item.surahNumber &&
                                                                b.verseNumber === item.verseNumber &&
                                                                idx === i
                                                            )
                                                    )
                                                )
                                            }}
                                            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-emerald-600 hover:bg-emerald-50"
                                        >
                                            <Bookmark className="fill-current" strokeWidth={1.5} size={15} />
                                        </Button>
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
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
