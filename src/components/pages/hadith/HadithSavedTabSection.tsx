"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { HadithSavedItemType } from "./content"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"

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
        <section className="relative min-h-[320px] py-8 sm:py-10">
            <div className="container px-4 sm:px-6">
                {/* Header section  */}
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

                {/* Content section  */}
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
                        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {items.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    type="button"
                                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.2,
                                        delay: Math.min(i * 0.012, 0.32),
                                        ease: "easeOut",
                                    }}
                                    onClick={() => router.push(`/hadith/${item.collectionId}`)}
                                    className="group flex flex-col rounded-xl border border-gray-100 bg-white p-4 
                                    text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] 
                                    hover:border-emerald-300 hover:shadow-md justify-between gap-2"
                                >
                                    <div className="h-max min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            {/* Book name - (english/arabic) + Hadith-number  */}
                                            <div className="flex min-w-0 flex-1 flex-wrap gap-2">
                                                {/* number  */}
                                                <span
                                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 
                                                    text-sm font-bold tabular-nums text-emerald-800"
                                                >
                                                    {item.bookNumber}
                                                </span>

                                                <div>
                                                    {/* name and hadith-number  */}
                                                    <h3 className="flex items-center gap-2">
                                                        {/* name english  */}
                                                        <span className="min-w-0 truncate font-semibold text-gray-900">
                                                            {item.collectionName}
                                                        </span>
                                                        {/* number  */}
                                                        <Badge variant="emerald" className="shrink-0 font-medium tabular-nums">
                                                            #{item.hadithInBook}
                                                        </Badge>
                                                    </h3>
                                                    {/* name arabic  */}
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

                                        {/* chapter-name  */}
                                        <div className="py-2 pt-4">
                                            <Badge variant="purple" className="shrink-0 font-medium tabular-nums">
                                                #{item.chapterNumber}
                                            </Badge>
                                            <h4
                                                className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-gray-900"
                                            >
                                                {item.titleEnglish}
                                            </h4>
                                            <p
                                                className="mt-1 line-clamp-2 font-arabic text-sm font-medium leading-snug text-emerald-900"
                                                dir="rtl"
                                            >
                                                {item.titleArabic}
                                            </p>
                                        </div>

                                        {/* Snippets  */}
                                        <div className="mt-2 pl-2 border-l-[3px] border-layout-separator leading-none">
                                            <p className="text-xs font-medium text-gray-700 tracking-wide uppercase line-clamp-2">
                                                {item.snippet}
                                            </p>
                                        </div>
                                        <div className="mt-4 pr-2 border-r-[3px] border-layout-separator leading-none text-right flex justify-end">
                                            <p
                                                className="line-clamp-2 font-arabic text-sm font-medium leading-snug text-emerald-800"
                                                dir="rtl"
                                            >
                                                {item.snippetArabic}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Date and button   */}
                                    <div className="pt-4 flex items-center justify-between gap-2">
                                        <p className="text-xs font-medium text-gray-700 tracking-wide uppercase">
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
                                </motion.button>
                            ))}
                        </div>
                    )}
                </section>
            </div >
        </section >
    )
}

export default HadithSavedTabSection
