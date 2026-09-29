"use client"

import Animate from "@/components/shared/motion/Animate"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { PRICING_PAYMENT_STATS } from "./content"

const PaymentCardVisual = () => {
    return (
        <div className="relative mx-auto w-full max-w-[300px]">
            <div
                className="absolute -right-3 top-4 h-[168px] w-[260px] rotate-6 rounded-2xl border border-gray-200/60 
                bg-gradient-to-br from-gray-100 to-gray-200/80 opacity-60 sm:-right-4 sm:h-[180px] sm:w-[280px]"
                aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-emerald-200/60 
            bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 p-5 shadow-[0_20px_50px_rgba(16,185,129,0.25)] sm:p-6">
                <div className="flex items-start justify-between">
                    <div className="h-8 w-11 rounded-md bg-amber-300/90" />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-100/80">
                        Deenify
                    </span>
                </div>
                <div className="mt-8 space-y-2">
                    <div className="h-2 w-full rounded-full bg-white/15" />
                    <div className="h-2 w-3/4 rounded-full bg-white/10" />
                </div>
                <div className="mt-6 flex items-end justify-between">
                    <div>
                        <p className="text-[9px] uppercase tracking-wider text-emerald-200/70">Card holder</p>
                        <p className="font-heading text-sm font-medium text-white">Your Name</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] uppercase tracking-wider text-emerald-200/70">Expires</p>
                        <p className="font-heading text-sm font-medium text-white">12/28</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PricingPaymentTrustSection = () => {
    return (
        <section className="bg-marketing-light py-14 sm:py-20">
            <div className="container">
                <MarketingSectionHead
                    lead="Pay with"
                    accent="confidence"
                    subtitle="Secure checkout, transparent billing, and the freedom to cancel anytime — worship essentials stay free regardless."
                />

                <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
                    {PRICING_PAYMENT_STATS.map((stat) => (
                        <Animate
                            key={stat.label}
                            variant="up"
                            animate="while_in_view"
                            delay={0.35}
                            duration={0.8}
                        >
                            <div className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-center shadow-sm">
                                <p className="font-heading text-sm font-semibold text-emerald-700">{stat.value}</p>
                                <p className="text-[11px] text-gray-500">{stat.label}</p>
                            </div>
                        </Animate>
                    ))}
                </div>

                <Animate variant="up" animate="while_in_view" delay={0.45} duration={0.95}>
                    <div className="mx-auto mt-10 max-w-md sm:mt-12">
                        <PaymentCardVisual />
                    </div>
                </Animate>

                <Animate variant="up" animate="while_in_view" delay={0.55} duration={0.9}>
                    <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-3">
                        {["Visa", "Mastercard", "Amex", "Apple Pay"].map((brand) => (
                            <span
                                key={brand}
                                className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-semibold 
                                tracking-wide text-gray-600 shadow-sm sm:px-5 sm:text-sm"
                            >
                                {brand}
                            </span>
                        ))}
                    </div>
                    <p className="mx-auto mt-4 max-w-md text-center text-xs text-gray-500 sm:text-sm">
                        Payments are processed through encrypted, PCI-compliant providers. We never store full card details.
                    </p>
                </Animate>
            </div>
        </section>
    )
}

export default PricingPaymentTrustSection
