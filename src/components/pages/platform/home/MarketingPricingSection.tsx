import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { PRICING_PLANS } from "./content"

const MarketingPricingSection = () => {
    return (
        <section id="pricing" className="bg-white py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead="Transparent"
                        accent="pricing"
                        subtitle="Begin without friction. Upgrade when you want deeper libraries and a direct hand in what we build next."
                    />
                </div>

                <div className="mx-auto mt-12 grid max-w-5xl gap-3 sm:gap-4 lg:grid-cols-3">
                    {PRICING_PLANS.map((plan) => (
                        <article
                            key={plan.name}
                            className="relative flex flex-col rounded-md border border-gray-200 bg-marketing-card p-6 sm:p-7"
                        >
                            {plan.highlighted && (
                                <span className="absolute right-4 top-4 rounded-md bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                    Most popular
                                </span>
                            )}

                            <h3 className="font-heading text-lg font-semibold text-emerald-700">
                                {plan.name}
                            </h3>

                            <p className="mt-3 min-h-[2.75rem] text-sm leading-relaxed text-gray-600">
                                {plan.description}
                            </p>

                            <p className="mt-5 font-heading text-[2.35rem] font-semibold leading-none text-emerald-700">
                                {plan.price}
                                <span className="text-sm font-normal text-gray-500">{plan.period}</span>
                            </p>

                            <Button
                                variant={plan.highlighted ? "default" : "secondary"}
                                href={plan.href}
                                className={cn(
                                    "mt-6 w-full rounded-md py-5 text-sm font-medium",
                                    !plan.highlighted && "bg-gray-900 text-white hover:bg-gray-800"
                                )}
                            >
                                {plan.cta}
                            </Button>

                            <ul className="mt-7 flex-1 space-y-3 border-t border-gray-200 pt-6">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-start gap-2.5 text-sm text-gray-700"
                                    >
                                        <span
                                            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900"
                                            aria-hidden
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MarketingPricingSection
