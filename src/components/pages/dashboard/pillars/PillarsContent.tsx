"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Target } from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import { PILLARS, PILLARS_EDITORIAL } from "./content"

export default function PillarsContent() {
    const [openId, setOpenId] = useState<string | null>("shahada")
    const [search, setSearch] = useState("")

    const pillars = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return PILLARS
        return PILLARS.filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.summary.toLowerCase().includes(q) ||
                p.arabicLabel.includes(q)
        )
    }, [search])

    return (
        <div className="bg-gray-50">
            <SectionHeader
                layoutScope="center"
                className="bg-white"
                variant="emerald"
                icon={Target}
                label={PILLARS_EDITORIAL.badge}
                heading={PILLARS_EDITORIAL.title}
                descriptions={[PILLARS_EDITORIAL.lead]}
            />

            <section className="border-t border-layout-separator bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)]">
                <div className="container py-8 sm:py-10">
                    <div className="mx-auto max-w-2xl space-y-4">
                        <Input
                            search
                            type="input"
                            placeholder="Search pillars..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full min-w-0 max-w-2xl"
                            classNames={{
                                inputWrapper: "w-full min-w-0",
                                input: "h-10 w-full min-w-0 rounded-md border-gray-200 bg-white",
                            }}
                        />
                        {pillars.map((pillar, index) => {
                            const isOpen = openId === pillar.id
                            return (
                                <motion.div
                                    key={pillar.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenId(isOpen ? null : pillar.id)}
                                        className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-semibold text-emerald-700">
                                            {index + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">{pillar.title}</p>
                                            <p className="mt-0.5 font-arabic text-right text-sm text-emerald-800" dir="rtl">
                                                {pillar.arabicLabel}
                                            </p>
                                            <p className="mt-2 text-sm text-gray-500">{pillar.summary}</p>
                                        </div>
                                        <ChevronDown
                                            className={cn(
                                                "mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform",
                                                isOpen && "rotate-180"
                                            )}
                                        />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="border-t border-gray-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600 sm:px-5 sm:pb-5">
                                                    {pillar.detail}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-emerald-200 bg-emerald-50/60 p-5 text-center">
                        <p className="text-sm text-gray-700">
                            Want step-by-step guides for prayer, fasting, and more?
                        </p>
                        <Button href="/guides" variant="outline-emerald" className="mt-3" shouldScale size="sm">
                            Open guides
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
