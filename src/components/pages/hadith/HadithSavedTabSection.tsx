"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import type { HadithSavedItemType } from "./content"

interface HadithSavedTabSectionProps {
    items: HadithSavedItemType[]
}

const HadithSavedTabSection = ({ items: itemsProp }: HadithSavedTabSectionProps) => {
    const router = useRouter()
    const [items, setItems] = useState<HadithSavedItemType[]>(itemsProp)

    useEffect(() => {
        setItems(itemsProp)
    }, [itemsProp])

    return (
        <section className="relative min-h-[320px] border-t border-gray-100 bg-[linear-gradient(180deg,#fafafa_0%,#f5f5f5_100%)] py-8 sm:py-10">
            <div className="container px-4 sm:px-6 md:px-6">
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700">
                            Saved narrations
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Your bookmarks
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="tabular-nums">{items.length}</span>
                        <span>saved</span>
                    </div>
                </header>

                {items.length === 0 ? (
                    <div className="mt-6 flex justify-center">
                        <div className="max-w-lg rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-8 text-center shadow-sm">
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
                        {items.map((item, i) => (
                            <motion.button
                                key={item.id}
                                type="button"
                                initial={{ opacity: 0, y: 8, scale: 0.99 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.2, delay: i * 0.02, ease: "easeOut" }}
                                onClick={() => router.push(`/hadith/${item.collectionId}`)}
                                className="group flex flex-col rounded-xl border border-gray-100 bg-white p-4 text-left 
                                shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] 
                                hover:border-emerald-300 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1 space-y-0.5">
                                        <p
                                            className="truncate text-base font-medium leading-tight text-gray-900"
                                        >
                                            {item.collectionName}
                                        </p>
                                        <p
                                            className="truncate text-lg font-medium leading-tight text-emerald-800"
                                            dir="rtl"
                                        >
                                            {item.collectionNameArabic}
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        shouldScale
                                        aria-label="Remove saved hadith"
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setItems((prev) => prev.filter((x) => x.id !== item.id))
                                        }}
                                        className={cn(
                                            "mt-0.5 h-7 w-7 shrink-0 rounded-full",
                                            "!text-emerald-600 hover:!bg-emerald-50 hover:!text-emerald-700",
                                            "active:!bg-emerald-100 active:!text-emerald-800",
                                            "focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-1"
                                        )}
                                    >
                                        <Bookmark className="fill-current" strokeWidth={1.5} size={15} />
                                    </Button>
                                </div>

                                <div className="mt-3 min-w-0 border-t border-layout-separator pt-3">
                                    <h3
                                        className="line-clamp-2 text-sm font-medium leading-snug text-gray-900"
                                    >
                                        {item.titleEnglish}
                                    </h3>
                                    <p
                                        dir="rtl"
                                        className="line-clamp-2 mt-1 font-arabic text-lg font-medium leading-snug text-emerald-900"
                                    >
                                        {item.titleArabic}
                                    </p>
                                </div>

                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                    <Badge variant="outline" className="font-medium tabular-nums">
                                        Book {item.bookNumber}
                                    </Badge>
                                    <Badge variant="blue" className="font-medium tabular-nums">
                                        Ch. {item.chapterNumber}
                                    </Badge>
                                    <Badge variant="purple" className="font-medium tabular-nums">
                                        #{item.hadithInBook}
                                    </Badge>
                                    <Badge variant="emerald" className="font-medium tabular-nums">
                                        In ch. #{item.hadithInChapter}
                                    </Badge>
                                </div>

                                <p
                                    className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-gray-600"
                                    title={item.snippet}
                                >
                                    {item.snippet}
                                </p>

                                <div className="flex items-center justify-between gap-2 pt-3">
                                    <time
                                        className="text-[11px] font-medium tabular-nums text-gray-500"
                                        dateTime={item.savedAt}
                                    >
                                        {new Date(item.savedAt).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </time>
                                    <span className="text-[11px] font-medium text-emerald-700 opacity-0 transition-opacity group-hover:opacity-100">
                                        Open collection →
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default HadithSavedTabSection
