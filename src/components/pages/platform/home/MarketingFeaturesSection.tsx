import Image from "next/image"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { FEATURE_CARDS } from "./content"

const MarketingFeaturesSection = () => {
    return (
        <section id="features" className="bg-white py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead="Smart features for a composed"
                        accent="deen"
                        subtitle="Each module is built like a product in its own right — prayer, 
                        Quran, catalogs, and remembrance — then unified under one calm dashboard."
                    />
                </div>

                <div className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 
                sm:gap-4 text-center">
                    {FEATURE_CARDS.map((card) => (
                        <article
                            key={card.title}
                            className="flex flex-col rounded-md border border-gray-200 
                            bg-marketing-card p-6 sm:p-8 lg:p-10"
                        >
                            <div className="relative aspect-[16/11] overflow-hidden rounded-md bg-white">
                                <Image
                                    src={card.image}
                                    alt=""
                                    fill
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
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MarketingFeaturesSection
