"use client"

import { Check, Minus } from "lucide-react"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { cn } from "@/lib/utils/clsx"
import { PRICING_COMPARISON, type PricingComparisonRow } from "./content"

const renderCell = (value: PricingComparisonRow["basic"]) => {
    if (value === true) {
        return <Check className="mx-auto h-4 w-4 text-emerald-600" aria-label="Included" />
    }

    if (value === false) {
        return <Minus className="mx-auto h-4 w-4 text-gray-300" aria-label="Not included" />
    }

    return <span className="text-xs text-gray-600 sm:text-sm">{value}</span>
}

const PricingComparisonSection = () => {
    return (
        <section className="bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <MarketingSectionHead
                    lead="Compare"
                    accent="what matters"
                    subtitle="A clear matrix — so you know exactly which depth each plan unlocks before you commit."
                />

                <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-md border border-layout-separator 
                bg-white sm:mt-12 sm:rounded-2xl">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full min-w-[540px] border-collapse text-left">
                            <thead>
                                <tr className="border-b border-layout-separator bg-marketing-card">
                                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 
                                    sm:px-6 sm:text-sm">
                                        Feature
                                    </th>
                                    {["Basic", "Professional", "Enterprise"].map((plan) => (
                                        <th
                                            key={plan}
                                            className={cn(
                                                "px-3 py-4 text-center text-xs font-semibold sm:px-4 sm:text-sm",
                                                plan === "Professional"
                                                    ? "text-emerald-700"
                                                    : "text-gray-800"
                                            )}
                                        >
                                            {plan}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {PRICING_COMPARISON.map((row) => (
                                    <tr key={row.feature} className="border-b border-layout-separator last:border-b-0">
                                        <td className="px-4 py-3.5 text-xs text-gray-800 sm:px-6 sm:py-4 sm:text-sm">
                                            {row.feature}
                                        </td>
                                        <td className="px-3 py-3.5 text-center sm:px-4 sm:py-4">
                                            {renderCell(row.basic)}
                                        </td>
                                        <td className="bg-emerald-50/40 px-3 py-3.5 text-center sm:px-4 sm:py-4">
                                            {renderCell(row.professional)}
                                        </td>
                                        <td className="px-3 py-3.5 text-center sm:px-4 sm:py-4">
                                            {renderCell(row.enterprise)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PricingComparisonSection
