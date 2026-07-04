"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Heart } from "lucide-react"
import DashboardHead from "../generic/DashboardHead"
import { getDashboardHeadMeta } from "../generic/dashboardHeaderMeta"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils/clsx"
import { DONATE_NOTE, DONATE_TIERS } from "./content"

export default function DonatePage() {
    const pageContent = getDashboardHeadMeta("/donate")
    const [search, setSearch] = useState("")

    const tiers = DONATE_TIERS.filter(
        (t) =>
            !search.trim() ||
            t.label.toLowerCase().includes(search.toLowerCase()) ||
            t.impact.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="bg-gray-50">
            <DashboardHead
                lead={pageContent?.lead}
                accent={pageContent?.accent}
                subtitle={pageContent?.subtitle}
                mobileSubtitle={pageContent?.mobileSubtitle}
                centered
                className="bg-white"
            />

            <section className="border-t border-layout-separator bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)]">
                <div className="container py-8 sm:py-10">
                    <div className="mx-auto mb-6 flex max-w-4xl justify-center px-4">
                        <Input
                            search
                            type="input"
                            placeholder="Search plans..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full min-w-0 max-w-md"
                            classNames={{
                                inputWrapper: "w-full min-w-0 max-w-md",
                                input: "h-10 w-full min-w-0 rounded-md border-gray-200 bg-white",
                            }}
                        />
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
                        {tiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={cn(
                                    "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                                    tier.popular
                                        ? "border-emerald-300 ring-2 ring-emerald-200/80"
                                        : "border-gray-200"
                                )}
                            >
                                {tier.popular && (
                                    <Badge
                                        variant="emerald"
                                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px]"
                                    >
                                        Most popular
                                    </Badge>
                                )}
                                <p className="text-sm font-medium text-gray-500">{tier.label}</p>
                                <p className="mt-1 flex items-baseline gap-0.5">
                                    <span className="text-3xl font-medium tabular-nums text-emerald-700">
                                        {tier.amount}
                                    </span>
                                    <span className="text-sm text-gray-500">{tier.period}</span>
                                </p>
                                <p className="mt-3 text-sm text-gray-600">{tier.impact}</p>
                                <ul className="mt-5 flex-1 space-y-2">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex gap-2 text-sm text-gray-700">
                                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    href={`/donate/payment?plan=${tier.id}`}
                                    variant={tier.popular ? "default" : "outline-emerald"}
                                    className="mt-6 w-full"
                                    shouldScale
                                    size="sm"
                                >
                                    Support now
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <p className="mx-auto mt-8 max-w-xl text-center text-sm text-gray-500">{DONATE_NOTE}</p>

                    <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-gray-700">
                        <Heart className="h-4 w-4 text-emerald-600" />
                        <span>Every amount helps — barakah in your wealth and ours.</span>
                    </div>
                </div>
            </section>
        </div>
    )
}
