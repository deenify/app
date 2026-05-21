"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { cardStagger } from "@/lib/utils/card-motion"
import type { HistoryTopic } from "./content"

type HistoryCardProps = {
    topic: HistoryTopic
    index: number
    categoryLabel: string
}

export default function HistoryCard({ topic, index, categoryLabel }: HistoryCardProps) {
    return (
        <motion.div {...cardStagger(index)}>
            <Link
                href={`/history/${topic.id}`}
                className={cn(
                    "group flex h-full flex-col rounded-2xl border border-gray-100 bg-[#fafafa]",
                    "p-5 transition-[border-color,box-shadow,transform] duration-300",
                    "hover:border-gray-200 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                )}
            >
                <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-400">
                        {categoryLabel}
                    </span>
                    <span className="text-[10px] tabular-nums text-gray-400">{topic.era}</span>
                </div>

                <h3 className="mt-4 text-[15px] font-medium leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-emerald-800">
                    {topic.title}
                </h3>

                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
                    {topic.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100/80 pt-4">
                    <span className="text-xs text-gray-400">{topic.readMinutes} min read</span>
                    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-gray-500 transition-colors group-hover:text-emerald-700">
                        Read
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}
