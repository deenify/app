"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, ChevronDown, Filter, Flame } from "lucide-react"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
import SectionHeader from "@/components/shared/SectionHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import {
    REVERT_EDITORIAL,
    REVERT_STEPS,
    REVERT_TRACKS,
    WHY_ISLAM_SECTIONS,
    type RevertTrackId,
} from "./content"

export default function RevertPage() {
    const [track, setTrack] = useState<RevertTrackId>("become-muslim")
    const [search, setSearch] = useState("")
    const [openSectionId, setOpenSectionId] = useState<string | null>("creator")

    const trackOptions = useMemo(
        () => REVERT_TRACKS.map((t) => ({ value: t.id, label: t.label })),
        []
    )

    const steps = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return REVERT_STEPS
        return REVERT_STEPS.filter(
            (s) =>
                s.title.toLowerCase().includes(q) ||
                s.summary.toLowerCase().includes(q) ||
                s.tips.some((t) => t.toLowerCase().includes(q))
        )
    }, [search])

    const whySections = useMemo(() => {
        const q = search.trim().toLowerCase()
        if (!q) return WHY_ISLAM_SECTIONS
        return WHY_ISLAM_SECTIONS.filter(
            (s) =>
                s.title.toLowerCase().includes(q) ||
                s.summary.toLowerCase().includes(q) ||
                s.points.some((p) => p.toLowerCase().includes(q))
        )
    }, [search])

    return (
        <div className="bg-gray-50">
            <SectionHeader
                layoutScope="center"
                className="bg-white"
                variant="amber"
                icon={Flame}
                label={REVERT_EDITORIAL.badge}
                heading={REVERT_EDITORIAL.title}
                descriptions={[REVERT_EDITORIAL.lead]}
            />

            <section className="border-t border-layout-separator">
                <div className="container py-8 sm:py-10">
                    <div className="mx-auto mb-6 flex w-full min-w-0 max-w-2xl flex-col gap-3 sm:flex-row sm:items-center">
                        <Input
                            search
                            type="input"
                            placeholder={
                                track === "become-muslim"
                                    ? "Search steps..."
                                    : "Search why Islam..."
                            }
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full min-w-0 sm:flex-1"
                            classNames={{
                                inputWrapper: "w-full min-w-0",
                                input: "h-10 w-full min-w-0 rounded-md border-gray-200 bg-white",
                            }}
                        />
                        <div className="w-full sm:max-w-[220px] sm:shrink-0">
                            <FilterDropdown
                                options={trackOptions}
                                value={track}
                                onChange={(v) => {
                                    setTrack(v as RevertTrackId)
                                    setSearch("")
                                }}
                                placeholder="Topic"
                                triggerIcon={Filter}
                                theme="amber"
                                className="w-full"
                                classNames={{ triggerButton: "w-full max-w-full" }}
                            />
                        </div>
                    </div>

                    {track === "become-muslim" ? (
                        <ol className="mx-auto max-w-2xl space-y-0">
                            {steps.length === 0 ? (
                                <p className="py-8 text-center text-sm text-gray-500">No steps found.</p>
                            ) : (
                                steps.map((step, index) => (
                                    <li key={step.id} className="relative flex gap-4 pb-10 last:pb-0">
                                        {index < steps.length - 1 && (
                                            <span
                                                className="absolute left-4 top-10 bottom-0 w-px bg-amber-200"
                                                aria-hidden
                                            />
                                        )}
                                        <motion.div
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.06 }}
                                            className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-900 ring-4 ring-gray-50"
                                        >
                                            {index + 1}
                                        </motion.div>
                                        <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                                            <h2 className="text-sm font-medium text-gray-900">{step.title}</h2>
                                            <p className="mt-1 text-sm text-gray-600">{step.summary}</p>
                                            <ul className="mt-3 space-y-2">
                                                {step.tips.map((tip) => (
                                                    <li key={tip} className="flex gap-2 text-sm text-gray-600">
                                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                                                        <span>{tip}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ol>
                    ) : (
                        <div className="mx-auto max-w-2xl space-y-4">
                            {whySections.length === 0 ? (
                                <p className="py-8 text-center text-sm text-gray-500">No sections found.</p>
                            ) : (
                                whySections.map((section, index) => {
                                    const isOpen = openSectionId === section.id
                                    return (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.04 }}
                                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenSectionId(isOpen ? null : section.id)
                                                }
                                                className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
                                            >
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-sm font-semibold text-amber-800">
                                                    {index + 1}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {section.title}
                                                    </p>
                                                    <p className="mt-2 text-sm text-gray-500">{section.summary}</p>
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
                                                        <ul className="space-y-3 border-t border-gray-100 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                                                            {section.points.map((point) => (
                                                                <li
                                                                    key={point}
                                                                    className="text-sm leading-relaxed text-gray-600"
                                                                >
                                                                    <span className="mr-2 text-amber-600">·</span>
                                                                    {point}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )
                                })
                            )}
                        </div>
                    )}

                    <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button href="/guides" variant="default" shouldScale size="sm">
                            Start with guides
                        </Button>
                        <Button href="/support" variant="outline" shouldScale size="sm">
                            Get help
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
