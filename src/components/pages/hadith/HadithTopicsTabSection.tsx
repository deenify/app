"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { HadithTopicType } from "./content"
import { Hash } from "lucide-react"

interface HadithTopicsTabSectionProps {
    topics: HadithTopicType[]
}

// const chipVariants = ["outline", "emerald", "blue", "purple"] as const

const HadithTopicsTabSection = ({ topics }: HadithTopicsTabSectionProps) => {
    return (
        <section className="relative py-8 sm:py-10">
            <div className="container px-4 sm:px-6 md:px-6">
                {/* Header section  */}
                <header className="mb-4 sm:mb-5 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
                            Topics
                        </p>
                        <h2 className="mt-1 text-lg font-medium tracking-tight text-gray-900 sm:text-xl">
                            Browse by theme
                        </h2>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="tabular-nums">{topics.length}</span>
                        <span>topics</span>
                    </div>
                </header>

                {/* Content section  */}
                <section className="h-max min-h-[45dvh]">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                        {topics.map((t, index) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.03, ease: "easeOut" }}
                            >
                                <Card className="h-full border border-gray-100 bg-white shadow-sm transition-[border-color,box-shadow] hover:border-emerald-200 hover:shadow-sm">
                                    <CardContent className="flex flex-col gap-3 p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                                                <Hash className="h-5 w-5" strokeWidth={1.5} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-medium text-gray-900">{t.label}</h3>
                                                <p className="mt-1 text-xs leading-relaxed text-gray-600">{t.blurb}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    )
}

export default HadithTopicsTabSection
