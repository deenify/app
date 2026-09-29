"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils/clsx"
import AccordionList from "@/components/shared/AccordionList"
import FadeEdge from "@/components/shared/FadeEdge"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { FAQ_CATEGORIES, FAQ_PAGE_ITEMS } from "./content"

const CONTENT_BASE_DELAY = 0.45
const STAGGER_STEP = 0.07
const SCROLL_EDGE_PX = 4

const FaqListSection = () => {
    const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id)
    const tabsRef = useRef<HTMLDivElement>(null)
    const [showLeftFade, setShowLeftFade] = useState(false)
    const [showRightFade, setShowRightFade] = useState(true)

    const filteredItems = useMemo(
        () => FAQ_PAGE_ITEMS.filter((item) => item.categoryId === activeCategory),
        [activeCategory]
    )

    const activeMeta = FAQ_CATEGORIES.find((category) => category.id === activeCategory)

    const updateTabFades = useCallback(() => {
        const el = tabsRef.current
        if (!el) return

        const { scrollLeft, scrollWidth, clientWidth } = el
        const maxScroll = scrollWidth - clientWidth
        const canScroll = maxScroll > SCROLL_EDGE_PX

        setShowLeftFade(canScroll && scrollLeft > SCROLL_EDGE_PX)
        setShowRightFade(canScroll && scrollLeft < maxScroll - SCROLL_EDGE_PX)
    }, [])

    useEffect(() => {
        const el = tabsRef.current
        if (!el) return

        updateTabFades()

        const resizeObserver = new ResizeObserver(() => updateTabFades())
        resizeObserver.observe(el)

        window.addEventListener("resize", updateTabFades)
        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", updateTabFades)
        }
    }, [updateTabFades])

    return (
        <section className="bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <MarketingSectionHead
                    lead="Browse by"
                    accent="topic"
                    subtitle="Questions grouped the way you would ask them — from first login to billing and privacy."
                />

                <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
                    <div className="relative">
                        <FadeEdge
                            className="sm:hidden"
                            showLeft={showLeftFade}
                            showRight={showRightFade}
                        />

                        <div
                            ref={tabsRef}
                            onScroll={updateTabFades}
                            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
                        >
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
                    </div>

                    {activeMeta && (
                        <p className="mt-4 text-center text-sm text-gray-600 sm:mt-5">{activeMeta.description}</p>
                    )}

                    <div className="mt-6 sm:mt-10 md:mt-12">
                        <AccordionList
                            key={activeCategory}
                            items={filteredItems}
                            defaultOpenIndex={0}
                            shape="rounded"
                            stagger
                            staggerProps={{
                                baseDelay: CONTENT_BASE_DELAY,
                                delay: STAGGER_STEP,
                                duration: 0.85,
                            }}
                            className="mx-auto max-w-3xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FaqListSection
