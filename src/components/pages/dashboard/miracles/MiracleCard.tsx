"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { cardStagger } from "@/lib/utils/card-motion"
import type { MiracleTopic } from "./content"

type MiracleCardProps = {
    topic: MiracleTopic
    index: number
    categoryLabel: string
}

export default function MiracleCard({ topic, index, categoryLabel }: MiracleCardProps) {
    return (
        <motion.div {...cardStagger(index)}>
            <Link
                href={`/miracles/${topic.id}`}
                className={cn(
                    "group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5",
                    "transition-[border-color,box-shadow] duration-300",
                    "hover:border-gray-200 hover:shadow-[0_6px_24px_rgba(0,0,0,0.05)]"
                )}
            >
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
                        {categoryLabel}
                    </span>
                    {topic.quranRef && (
                        <span className="truncate text-[10px] text-gray-400">{topic.quranRef}</span>
                    )}
                </div>

                <h3 className="mt-4 text-[15px] font-medium leading-snug tracking-tight text-gray-900 group-hover:text-emerald-800">
                    {topic.title}
                </h3>

                <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-[1.65] text-gray-500">
                    {topic.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                    <span>{topic.readMinutes} min</span>
                    <span className="inline-flex items-center gap-0.5 font-medium text-gray-500 group-hover:text-emerald-700">
                        Open
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                </div>
            </Link>
        </motion.div>
    )
}
