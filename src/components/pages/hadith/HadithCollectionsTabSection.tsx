"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, ScrollText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils/clsx"
import type { HadithCollectionType } from "./content"
import Link from "next/link"

interface HadithCollectionsTabSectionProps {
    collections: HadithCollectionType[]
}

const HadithCollectionsTabSection = ({ collections }: HadithCollectionsTabSectionProps) => {
    const router = useRouter()
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

    const toggleLike = (e: React.MouseEvent, id: string) => {
        e.preventDefault()
        e.stopPropagation()
        setLikedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    return (
        <section className="py-8 sm:py-10">
            <div className="container px-4 sm:px-6 md:px-6">
                {/* Header section  */}
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
                            Collections
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Major hadith books
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="tabular-nums">{collections.length}</span>
                        <span>books</span>
                    </div>
                </header>

                {/* Content section  */}
                <section className="h-max min-h-[45dvh]">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                        {collections.map((c, index) => {
                            const liked = likedIds.has(c.id)

                            return (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.2, delay: index * 0.02, ease: "easeOut" }}
                                >
                                    <Link href={`/hadith/${c.id}`}>
                                        <Card
                                            className="group overflow-hidden border border-gray-100 bg-white shadow-sm 
                                            transition-[border-color,box-shadow] hover:border-emerald-300 hover:shadow-sm"
                                        >
                                            <CardContent className="flex items-start gap-3 p-4 sm:gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100 sm:h-14 sm:w-14">
                                                    <ScrollText className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="text-left font-semibold text-gray-900">{c.nameEnglish}</h3>
                                                    <p className="mt-1 text-left text-base font-medium leading-snug text-emerald-800 font-arabic">
                                                        {c.nameArabic}
                                                    </p>
                                                    <p className="mt-1 truncate text-left text-sm text-gray-600">{c.compiler}</p>

                                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                                        <Badge variant="outline">{c.hadithCount.toLocaleString()} hadiths</Badge>
                                                        <div className="ml-auto flex shrink-0 items-center gap-1.5">
                                                            <span className="text-xs font-medium tabular-nums text-gray-500">
                                                                {c.likesLabel}
                                                            </span>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                shouldScale
                                                                aria-label={liked ? "Unlike this collection" : "Like this collection"}
                                                                aria-pressed={liked}
                                                                onClick={(e) => toggleLike(e, c.id)}
                                                                className={cn(
                                                                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
                                                                    "hover:bg-emerald-50 active:bg-emerald-100",
                                                                    liked
                                                                        ? "text-rose-600 hover:text-rose-700"
                                                                        : "text-gray-400 group-hover:text-emerald-500 hover:text-rose-500"
                                                                )}
                                                            >
                                                                <Heart
                                                                    className={cn(
                                                                        "h-4 w-4",
                                                                        liked && "fill-current text-rose-600"
                                                                    )}
                                                                    strokeWidth={1.5}
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </section>
    )
}

export default HadithCollectionsTabSection
