"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
import { Modal } from "@/components/shared/Modal"
import { cn } from "@/lib/utils/clsx"

import type { LearnCategory, LearnEditorial, LearnTopic } from "./types"

export type { LearnCategory, LearnEditorial, LearnTopic } from "./types"

type LearnAccent = "emerald" | "amber" | "purple" | "sky" | "rose"

const accentStyles: Record<
    LearnAccent,
    { icon: string; badge: "emerald" | "amber" | "purple"; ring: string; cardHover: string; pill: string }
> = {
    emerald: {
        icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
        badge: "emerald",
        ring: "border-emerald-200 bg-emerald-50/80 text-emerald-800",
        cardHover: "hover:border-emerald-300",
        pill: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    },
    amber: {
        icon: "bg-amber-50 text-amber-800 ring-amber-100",
        badge: "amber",
        ring: "border-amber-200 bg-amber-50/80 text-amber-900",
        cardHover: "hover:border-amber-300",
        pill: "bg-amber-50 text-amber-800 ring-amber-100",
    },
    purple: {
        icon: "bg-purple-50 text-purple-700 ring-purple-100",
        badge: "purple",
        ring: "border-purple-200 bg-purple-50/80 text-purple-800",
        cardHover: "hover:border-purple-300",
        pill: "bg-purple-50 text-purple-700 ring-purple-100",
    },
    sky: {
        icon: "bg-sky-50 text-sky-800 ring-sky-100",
        badge: "emerald",
        ring: "border-sky-200 bg-sky-50/80 text-sky-900",
        cardHover: "hover:border-sky-300",
        pill: "bg-sky-50 text-sky-800 ring-sky-100",
    },
    rose: {
        icon: "bg-rose-50 text-rose-700 ring-rose-100",
        badge: "emerald",
        ring: "border-rose-200 bg-rose-50/80 text-rose-900",
        cardHover: "hover:border-rose-300",
        pill: "bg-rose-50 text-rose-700 ring-rose-100",
    },
}

type LearnExplorePageProps = {
    editorial: LearnEditorial
    icon: LucideIcon
    accent?: LearnAccent
    topics: LearnTopic[]
    categories: LearnCategory[]
    countLabel?: string
    filterTheme?: "emerald" | "purple" | "amber"
}

export function LearnExplorePage({
    editorial,
    icon: Icon,
    accent = "emerald",
    topics,
    categories,
    countLabel,
    filterTheme = "purple",
}: LearnExplorePageProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState("all")
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const styles = accentStyles[accent]

    const categoryOptions = useMemo(
        () =>
            categories.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel:
                    c.id === "all"
                        ? String(topics.length)
                        : String(topics.filter((t) => t.category === c.id).length),
            })),
        [categories, topics]
    )

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return topics.filter((t) => {
            const catOk = category === "all" || t.category === category
            const searchOk =
                !q ||
                t.title.toLowerCase().includes(q) ||
                t.excerpt.toLowerCase().includes(q) ||
                t.body.toLowerCase().includes(q)
            return catOk && searchOk
        })
    }, [category, searchQuery, topics])

    const selected = useMemo(
        () => topics.find((t) => t.id === selectedId) ?? null,
        [selectedId, topics]
    )

    const categoryLabel = (id: string) =>
        categories.find((c) => c.id === id)?.label ?? id.replace(/-/g, " ")

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6">
                    <div className="mx-auto py-10 sm:py-12">
                        <header className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-5 flex justify-center sm:mb-6"
                            >
                                <div
                                    className={cn(
                                        "flex h-16 w-16 items-center justify-center rounded-2xl ring-1 sm:h-[4.5rem] sm:w-[4.5rem]",
                                        styles.icon
                                    )}
                                >
                                    <Icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                                </div>
                            </motion.div>
                            <Badge variant={styles.badge} className="mb-3 text-xs font-medium">
                                {editorial.badge}
                            </Badge>
                            <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl">
                                {editorial.title}
                            </h1>
                            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
                                {editorial.lead}
                            </p>
                        </header>
                    </div>
                </div>
            </section>

            <main className="bg-[linear-gradient(180deg,#f8faf8_0%,#f0f7f4_100%)]">
                <section className="border-t border-layout-separator">
                    <div className="container py-6 sm:py-8">
                        <div className="mx-auto max-w-6xl space-y-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <Input
                                    search
                                    type="input"
                                    placeholder="Search topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    classNames={{
                                        input: "h-10 min-w-0 flex-1 rounded-md border-gray-200 bg-white text-base placeholder:text-gray-400 focus:bg-white",
                                    }}
                                />
                                <FilterDropdown
                                    options={categoryOptions}
                                    value={category}
                                    onChange={(v) => setCategory(String(v))}
                                    placeholder="All topics"
                                    triggerIcon={Filter}
                                    theme={filterTheme}
                                    classNames={{ content: "scrollbar-thin" }}
                                />
                                <div
                                    className={cn(
                                        "hidden h-9 shrink-0 items-center justify-center rounded-md border px-3 text-xs font-medium shadow-sm sm:inline-flex",
                                        styles.ring
                                    )}
                                >
                                    <span className="tabular-nums font-semibold">{filtered.length}</span>
                                    <span className="ml-1">{countLabel ?? "topics"}</span>
                                </div>
                            </div>

                            {filtered.length === 0 ? (
                                <p className="py-12 text-center text-sm text-gray-500">
                                    No topics match your search. Try another word or category.
                                </p>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {filtered.map((topic, index) => (
                                        <motion.button
                                            key={topic.id}
                                            type="button"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25, delay: index * 0.03 }}
                                            onClick={() => setSelectedId(topic.id)}
                                            className={cn(
                                                "flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm",
                                                "transition-[border-color,box-shadow] hover:shadow-md",
                                                styles.cardHover
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "mb-3 inline-flex w-fit rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ring-1",
                                                    styles.pill
                                                )}
                                            >
                                                {categoryLabel(topic.category)}
                                            </span>
                                            <span className="text-sm font-medium text-gray-900">{topic.title}</span>
                                            <span className="mt-2 line-clamp-2 text-sm text-gray-500">{topic.excerpt}</span>
                                            <span className="mt-3 text-xs tabular-nums text-gray-400">
                                                {topic.readMinutes} min read
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Modal
                isOpen={!!selected}
                onOpenChange={(open) => !open && setSelectedId(null)}
                title={selected?.title}
                classNames={{ content: "max-w-lg" }}
            >
                {selected && (
                    <div className="space-y-3 text-sm leading-relaxed text-gray-600">
                        <Badge variant="outline" className="capitalize">
                            {categoryLabel(selected.category)}
                        </Badge>
                        <p>{selected.body}</p>
                        <p className="text-xs text-gray-400">About {selected.readMinutes} min read</p>
                    </div>
                )}
            </Modal>
        </div>
    )
}
