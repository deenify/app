"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { FAQ_ITEMS } from "./content"

const MarketingFaqSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="bg-marketing-light py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead="Frequently asked"
                        accent="questions"
                        subtitle="Straight answers — the kind you would expect before committing your daily routine to a new platform."
                    />
                </div>

                <div className="mx-auto mt-12 max-w-3xl divide-y divide-layout-separator rounded-3xl border border-layout-separator bg-white">
                    {FAQ_ITEMS.map((item, index) => {
                        const open = openIndex === index

                        return (
                            <div key={item.question}>
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between gap-4 
                                    bg-marketing-card px-6 py-5 text-left"
                                    onClick={() => setOpenIndex(open ? null : index)}
                                    aria-expanded={open}
                                >
                                    <span className="text-sm font-medium text-gray-900 sm:text-base">
                                        {item.question}
                                    </span>
                                    {open ? (
                                        <Minus className="h-4 w-4 shrink-0 text-emerald-600" />
                                    ) : (
                                        <Plus className="h-4 w-4 shrink-0 text-gray-500" />
                                    )}
                                </button>
                                <div
                                    className={cn(
                                        "overflow-hidden bg-marketing-card px-6 transition-all duration-300",
                                        open ? "max-h-48 pb-5" : "max-h-0"
                                    )}
                                >
                                    <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default MarketingFaqSection
