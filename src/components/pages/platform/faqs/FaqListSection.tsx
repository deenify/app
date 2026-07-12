"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils/clsx"
import Accordion from "@/components/shared/Accordion"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { FAQ_CATEGORIES, FAQ_PAGE_ITEMS } from "./content"

const CONTENT_BASE_DELAY = 0.45
const STAGGER_STEP = 0.07

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
                        <Accordion
                            key={activeCategory}
                            items={filteredItems}
                            defaultOpenIndex={0}
                            size="sm"
                            shape="soft"
                            stagger
                            staggerProps={{
                                baseDelay: CONTENT_BASE_DELAY,
                                delay: STAGGER_STEP,
                                duration: 0.85,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqListSection
