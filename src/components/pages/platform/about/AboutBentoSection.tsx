"use client"

import Stagger from "@/components/shared/motion/Stagger"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { ABOUT_VALUE_TILES } from "./content"

const STAGGER_STEP = 0.1
const CONTENT_BASE_DELAY = 0.4

const AboutBentoSection = () => {
    return (
        <section className="bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHead
                        lead="Built on"
                        accent="four commitments"
                        subtitle="The same standards we would expect from any tool sitting next to our own practice."
                    />
                </div>

                <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-2 sm:mt-12 sm:gap-4 lg:grid-cols-4">
                    {ABOUT_VALUE_TILES.map((tile, index) => {
                        const Icon = tile.icon

                        return (
                            <Stagger
                                key={tile.title}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={CONTENT_BASE_DELAY}
                                delay={STAGGER_STEP}
                                duration={0.85}
                            >
                                <article
                                    className="flex aspect-square flex-col gap-3 rounded-md border 
                                    border-gray-100 bg-white p-3.5 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-5"
                                >
                                    <span
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full 
                                        bg-emerald-50 text-emerald-600"
                                    >
                                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                                    </span>
                                    <div className="min-w-0">
                                        <h3 className="font-heading text-sm font-semibold text-gray-900 sm:text-base">
                                            {tile.title}
                                        </h3>
                                        <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            {tile.description}
                                        </p>
                                    </div>
                                </article>
                            </Stagger>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default AboutBentoSection
