"use client"

import { ShieldCheck } from "lucide-react"
import MarketingSectionHead from "../home/MarketingSectionHead"
import Stagger from "@/components/shared/motion/Stagger"
import { PRICING_NOTES } from "./content"

const CONTENT_BASE_DELAY = 0.4
const STAGGER_STEP = 0.1

const PricingNotesSection = () => {
    return (
        <section className="bg-white py-14 sm:py-20">
            <div className="container">
                <MarketingSectionHead
                    lead="Billing with"
                    accent="transparency"
                    subtitle="We treat pricing the way we treat typography — deliberate, readable, and free of noise."
                />

                <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
                    {PRICING_NOTES.map((note, index) => (
                        <Stagger
                            key={note.title}
                            index={index}
                            animation="while_in_view"
                            variant="up"
                            baseDelay={CONTENT_BASE_DELAY}
                            delay={STAGGER_STEP}
                            duration={0.85}
                        >
                            <article className="h-full rounded-md border border-gray-100 bg-marketing-card p-5 
                            sm:rounded-2xl sm:p-6">
                                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                <h3 className="mt-3 font-heading text-base font-semibold text-gray-900 sm:text-lg">
                                    {note.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">{note.description}</p>
                            </article>
                        </Stagger>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PricingNotesSection
