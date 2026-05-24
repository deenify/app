"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import BookmarkButton from "@/components/shared/buttons/BookmarkButton"
import type { SupplicationItem } from "./content"
import { BookHeart } from "lucide-react"

const categoryTone: Record<string, string> = {
    "morning-evening": "border-violet-200 bg-violet-50 text-violet-800",
    salah: "border-emerald-200 bg-emerald-50 text-emerald-800",
    travel: "border-sky-200 bg-sky-50 text-sky-900",
    distress: "border-rose-200 bg-rose-50 text-rose-900",
    gratitude: "border-amber-200 bg-amber-50 text-amber-900",
    family: "border-orange-200 bg-orange-50 text-orange-900",
}

type SupplicationCardProps = {
    item: SupplicationItem
    index: number
    isBookmarked: boolean
    onToggleBookmark: () => void
}

export default function SupplicationCard({
    item,
    index,
    isBookmarked,
    onToggleBookmark,
}: SupplicationCardProps) {
    return (
        <motion.article
            id={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.04, ease: "easeOut" }}
            className={cn(
                "flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm",
                "transition-[border-color,box-shadow] hover:border-red-200 hover:shadow-md cursor-pointer"
            )}
        >
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-rose-50 text-rose-700 
                ring-1 ring-rose-100">
                        <BookHeart className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                </div>
                <BookmarkButton
                    isBookmarked={isBookmarked}
                    buttonProps={{
                        onClick: onToggleBookmark,
                        "aria-label": isBookmarked ? "Remove bookmark" : "Bookmark supplication",
                    }}
                />
            </div>

            <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">{item.excerpt}</p>
            </div>

            <div className="mt-4 rounded-md border border-gray-100 bg-gray-50/80 p-4">
                <p
                    className="font-arabic text-right text-lg leading-relaxed text-gray-900 line-clamp-2"
                    dir="rtl"
                >
                    {item.arabic}
                </p>
                <p className="mt-3 text-sm italic leading-relaxed text-gray-700 line-clamp-2">{item.translation}</p>
            </div>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
                <Badge
                    variant="outline"
                    className={cn("text-[11px] capitalize", categoryTone[item.category] ?? "border-gray-200 bg-gray-50")}
                >
                    {item.category.replace("-", " ")}
                </Badge>
                <span className="text-xs tabular-nums text-gray-500">~{item.readSeconds}s read</span>
            </div>

            {item.reference && (
                <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">{item.reference}</p>
            )}
        </motion.article>
    )
}
