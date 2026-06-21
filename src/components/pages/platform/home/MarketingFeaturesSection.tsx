import Image from "next/image"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { FEATURE_CARDS } from "./content"
import Stagger from "@/components/shared/motion/Stagger"

const MarketingFeaturesSection = () => {
    return (
        <section id="features" className="bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead={<>Smart features for <br className="block xs:hidden" /> a composed</>}
                        accent="deen"
                        subtitle="Each module is built like a product in its own right — prayer, 
                        Quran, catalogs, and remembrance — then unified under one calm dashboard."
                    />
                </div>

                <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 
                sm:gap-4 text-center">
                    {FEATURE_CARDS.map((card, index) => (
                        <Stagger
                            index={index}
                            animation="while_in_view"
                            key={card.title}
                            baseDelay={0.4}
                            delay={0.2}
                            duration={0.85}
                        >
                            <article className="flex flex-col rounded-md border border-gray-200 
                            bg-marketing-card p-6 sm:p-8 lg:p-10">
                                <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-white">
                                    <Image
                                        fill
                                        src={card.image}
                                        alt="Dashboard Feature Image"
                                        className="object-cover"
                                    />
                                </div>

                                <h3 className="mt-6 font-heading text-lg font-semibold text-emerald-700">
                                    {card.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {card.description}
                                </p>
                            </article>
                        </Stagger>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MarketingFeaturesSection
