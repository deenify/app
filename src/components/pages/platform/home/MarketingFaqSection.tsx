"use client"

import AccordionList from "@/components/shared/AccordionList"
import MarketingSectionHead from "./MarketingSectionHead"
import { FAQ_ITEMS } from "./content"

const CONTENT_BASE_DELAY = 0.5
const STAGGER_STEP = 0.08

const MarketingFaqSection = () => {
    return (
        <section id="faq" className="bg-marketing-light py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHead
                        lead="Frequently asked"
                        accent="questions"
                        subtitle="Straight answers — the kind you would expect before 
                        committing your daily routine to a new platform."
                    />
                </div>

                <AccordionList
                    items={FAQ_ITEMS}
                    defaultOpenIndex={0}
                    shape="rounded"
                    stagger
                    staggerProps={{
                        baseDelay: CONTENT_BASE_DELAY,
                        delay: STAGGER_STEP,
                        duration: 0.85,
                    }}
                    className="mx-auto mt-12 max-w-3xl"
                />
            </div>
        </section>
    )
}

export default MarketingFaqSection
