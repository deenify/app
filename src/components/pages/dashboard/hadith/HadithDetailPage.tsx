"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Hash, ListFilter, ScrollText, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FilterDropdown, { type FilterOption } from "@/components/shared/FilterDropdown"
import { cn } from "@/lib/utils/clsx"
import HadithCard from "./HadithCard"
import HadithSettingSidebar from "./HadithSettingSidebar"
import {
    HadithCollections,
    getMockHadithsForCollection,
    type HadithTopicType,
    type MockHadithNarrationType,
} from "./content"
import BackButton from "@/components/shared/BackButton"
import useHadithReaderSettingsStore from "@/store/hadith"

interface HadithCollectionPageProps {
    collectionId: string
}

function hadithMatchesSearch(h: MockHadithNarrationType, q: string): boolean {
    const s = q.trim().toLowerCase()
    if (!s) return true
    return (
        h.english.toLowerCase().includes(s) ||
        h.arabic.includes(s) ||
        h.narrator.toLowerCase().includes(s) ||
        h.topics.some((t) => t.toLowerCase().includes(s))
    )
}

function hadithMatchesTopicRow(h: MockHadithNarrationType, topic: HadithTopicType): boolean {
    const label = topic.label.toLowerCase()
    const words = label
        .replace(/&/g, " ")
        .split(/[^a-z]+/i)
        .map((w) => w.toLowerCase())
        .filter((w) => w.length > 2)
    const blob = h.topics.map((t) => t.toLowerCase()).join(" ")
    if (words.some((w) => blob.includes(w))) return true
    return h.topics.some((tag) => label.includes(tag.toLowerCase()))
}

export default function HadithDetailPage({ collectionId }: HadithCollectionPageProps) {
    const [showSettings, setShowSettings] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const selectedTopicId = useHadithReaderSettingsStore((s) => s.selectedTopicId)
    const setSelectedTopicId = useHadithReaderSettingsStore((s) => s.setSelectedTopicId)

    const collection = useMemo(
        () => HadithCollections.find((c) => c.id === collectionId),
        [collectionId]
    )
    const mockHadiths = useMemo(() => getMockHadithsForCollection(collectionId), [collectionId])

    useEffect(() => {
        const rows = collection?.topics
        if (!rows?.length) {
            setSelectedTopicId(null)
            return
        }
        if (selectedTopicId && !rows.some((t) => t.id === selectedTopicId)) {
            setSelectedTopicId(null)
        }
    }, [collection, collectionId, selectedTopicId, setSelectedTopicId])

    const selectedTopic = useMemo(() => {
        if (!selectedTopicId || !collection?.topics?.length) return null
        return collection.topics.find((t) => t.id === selectedTopicId) ?? null
    }, [collection, selectedTopicId])

    const filteredHadiths = useMemo(() => {
        return mockHadiths.filter((h) => {
            if (!hadithMatchesSearch(h, searchQuery)) return false
            if (!selectedTopic) return true
            return hadithMatchesTopicRow(h, selectedTopic)
        })
    }, [mockHadiths, searchQuery, selectedTopic])

    const topicFilterOptions: FilterOption[] = useMemo(() => {
        const rows = collection?.topics
        const base: FilterOption[] = [{ value: "all", label: "All topics", icon: ListFilter }]
        if (!rows?.length) return base
        return [
            ...base,
            ...rows.map((t) => ({
                value: t.id,
                label: t.label,
                icon: Hash,
                metaLabel: String(t.hadithCount),
            })),
        ]
    }, [collection])

    const topicDropdownValue = selectedTopicId ?? "all"

    const onTopicFilterChange = (v: string | number) => {
        const id = String(v)
        setSelectedTopicId(id === "all" ? null : id)
    }

    if (!collection) {
        return (
            <div className="container px-4 py-16 text-center sm:px-6">
                <p className="text-gray-600">Collection not found.</p>
                <Button variant="ghost-emerald" className="mt-4" href="/hadith">
                    Back to Hadith
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto pb-8 pt-6 sm:pb-10 sm:pt-8 md:pb-12 md:pt-10">
                        <BackButton
                            renderMobileVariant={false}
                            buttonProps={{
                                variant: "ghost-emerald",
                                shouldScale: false,
                                href: "/hadith",
                                size: "default",
                            }}
                            label="Back to Hadith"
                            labelMbl="Back"
                        />

                        <header className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className="mb-5 flex justify-center sm:mb-6"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 shadow-[0_1px_0_rgba(16,185,129,0.12)] ring-1 ring-emerald-100 sm:h-[4.5rem] sm:w-[4.5rem]">
                                    <ScrollText className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                            >
                                <Badge variant="emerald" className="mb-3 text-xs font-medium">
                                    Hadith collection
                                </Badge>

                                <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-[1.75rem] md:leading-snug">
                                    {collection.nameEnglish}
                                </h1>

                                <p
                                    className="mx-auto mt-3 max-w-xl text-xl font-medium leading-relaxed text-emerald-800 sm:text-2xl"
                                    dir="rtl"
                                >
                                    {collection.nameArabic}
                                </p>

                                <p className="mt-3 text-sm text-gray-600 sm:text-base">{collection.compiler}</p>

                                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="border-emerald-200 bg-emerald-50 text-xs text-emerald-800"
                                    >
                                        {collection.hadithCount.toLocaleString()} hadiths
                                    </Badge>
                                </div>
                            </motion.div>
                        </header>
                    </div>
                </div>
            </section>

            <section
                className={cn(
                    "relative w-full flex-1 border-t border-layout-separator",
                    "bg-gradient-to-br from-emerald-50 via-white to-teal-50"
                )}
            >
                <motion.div
                    className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-teal-100 blur-3xl"
                    aria-hidden
                />

                <div className="relative flex h-[calc(100vh-200px)]">
                    <main className="h-full min-w-0 flex-1 overflow-hidden">
                        <div className="container h-full py-4 sm:py-6">
                            <div className="mx-auto flex h-full min-h-0 max-w-4xl flex-col">

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 pb-5">
                                    <Input
                                        search
                                        type="input"
                                        placeholder="Search text, narrator, or tags…"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-10 rounded-md border-gray-200 bg-white text-base placeholder:text-gray-400
                                         focus:bg-white sm:h-11 min-w-0 flex-1"
                                    />
                                    <div className="w-full shrink-0 sm:max-w-[min(100%,240px)]">
                                        <FilterDropdown
                                            options={topicFilterOptions}
                                            value={topicDropdownValue}
                                            onChange={onTopicFilterChange}
                                            theme="amber"
                                            placeholder="Topic"
                                            triggerIcon={Hash}
                                            classNames={{ content: "scrollbar-thin" }}
                                        />
                                    </div>
                                </div>

                                <div className="min-h-0 flex-1 overflow-y-auto py-2 pr-1 scrollbar-thin sm:pr-2">
                                    <div className="flex flex-col gap-5 sm:gap-6">
                                        {filteredHadiths.length === 0 ? (
                                            <p className="rounded-xl border border-dashed border-gray-200 bg-white/80 px-4 py-8 text-center text-sm text-gray-600">
                                                No narrations match this topic or search. Try &ldquo;All topics&rdquo; or
                                                clear the search box.
                                            </p>
                                        ) : (
                                            filteredHadiths.map((h, i) => (
                                                <HadithCard
                                                    key={h.id}
                                                    hadith={h}
                                                    collectionNameEnglish={collection.nameEnglish}
                                                    initial={{ opacity: 0, y: 14 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <HadithSettingSidebar open={showSettings} onClose={() => setShowSettings(false)} />
                </div>

                {!showSettings ? (
                    <div className="fixed right-4 top-28 sm:right-6 sm:top-32 z-10">
                        <Button
                            type="button"
                            shouldScale
                            onClick={() => setShowSettings(true)}
                            className={cn(
                                "h-11 w-11 rounded-full border border-amber-300 bg-amber-400 px-0 shadow-lg",
                                "text-amber-50 hover:border-amber-400 hover:bg-amber-500 hover:text-white",
                                "sm:h-12 sm:w-12"
                            )}
                            aria-label="Open reader settings"
                        >
                            <Settings
                                className={cn(
                                    "h-5 w-5 sm:h-[22px] sm:w-[22px]",
                                    "drop-shadow-[0_1px_0_rgb(255_255_255_/_0.45),0_2px_4px_rgb(90_45_10_/_0.55),0_6px_18px_rgb(69_26_3_/_0.45)]"
                                )}
                                strokeWidth={2.25}
                            />
                        </Button>
                    </div>
                ) : null}
            </section>
        </div>
    )
}
