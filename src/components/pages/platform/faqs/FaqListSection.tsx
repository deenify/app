"use client"

import { useMemo, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import Stagger from "@/components/shared/motion/Stagger"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { FAQ_CATEGORIES, FAQ_PAGE_ITEMS, type FaqEntry } from "./content"

const CONTENT_BASE_DELAY = 0.45
const STAGGER_STEP = 0.07

type FaqAccordionProps = {
    items: FaqEntry[]
    defaultOpenIndex?: number | null
}

const FaqAccordion = ({ items, defaultOpenIndex = 0 }: FaqAccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

    return (
        <div className="divide-y divide-layout-separator overflow-hidden rounded-md border border-layout-separator 
        sm:rounded-2xl">
            {items.map((item, index) => {
                const open = openIndex === index

                return (
                    <Stagger
                        key={item.question}
                        index={index}
                        animation="while_in_view"
                        variant="up"
                        baseDelay={CONTENT_BASE_DELAY}
                        delay={STAGGER_STEP}
                        duration={0.85}
                    >
                        <div>
                            <button
                                type="button"
                                className="flex w-full items-center justify-between gap-4 bg-marketing-card px-5 
                                py-4 text-left sm:px-6 sm:py-5"
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
                                    "overflow-hidden bg-marketing-card px-5 transition-all duration-300 sm:px-6",
                                    open ? "max-h-56 pb-5" : "max-h-0"
                                )}
                            >
                                <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
                            </div>
                        </div>
                    </Stagger>
                )
            })}
        </div>
    )
}

const FaqListSection = () => {
    const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id)

    const filteredItems = useMemo(
        () => FAQ_PAGE_ITEMS.filter((item) => item.categoryId === activeCategory),
        [activeCategory]
    )

    const activeMeta = FAQ_CATEGORIES.find((category) => category.id === activeCategory)

    return (
        <section className="bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <MarketingSectionHead
                    lead="Browse by"
                    accent="topic"
                    subtitle="Questions grouped the way you would ask them — from first login to billing and privacy."
                />

                <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:pb-0">
                        {FAQ_CATEGORIES.map((category) => {
                            const active = category.id === activeCategory

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors sm:text-sm",
                                        active
                                            ? "border-emerald-600 bg-emerald-600 text-white"
                                            : "border-gray-200 bg-white text-gray-700 hover:border-emerald-200 hover:text-emerald-800"
                                    )}
                                >
                                    {category.label}
                                </button>
                            )
                        })}
                    </div>

                    {activeMeta && (
                        <p className="mt-4 text-center text-sm text-gray-600 sm:mt-5">{activeMeta.description}</p>
                    )}

                    <div className="mt-6 sm:mt-8">
                        <FaqAccordion key={activeCategory} items={filteredItems} defaultOpenIndex={0} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqListSection
