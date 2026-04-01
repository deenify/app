"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Bookmark, Filter, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
import Tabs from "@/components/shared/Tabs"
import { cn } from "@/lib/utils/clsx"
import {
    GuideCategories,
    GuidesMock,
} from "./content"
import GuidesCard from "./GuidesCard"


const guideTabs = [
    { id: "all", label: "All Guides", icon: BookOpen },
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark }
]

const GuidesExplorePage = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [category, setCategory] = useState<string>("all")
    const [activeTab, setActiveTab] = useState<"all" | "bookmarks">("all")
    const [bookmarkedGuideIds, setBookmarkedGuideIds] = useState<Set<string>>(() => new Set(["wudu", "salah", "ramadan"]))

    const categoryOptions = useMemo(
        () =>
            GuideCategories.map((c) => ({
                value: c.id,
                label: c.label,
                metaLabel:
                    c.id === "all"
                        ? String(GuidesMock.length + 20)
                        : String(GuidesMock.filter((g) => g.category === c.id).length),
            })),
        []
    )

    const filteredGuides = useMemo(() => {
        const q = searchQuery.trim().toLowerCase()
        return GuidesMock.filter((g) => {
            const matchCategory = category === "all" || g.category === category
            const matchSearch = !q || g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q)
            return matchCategory && matchSearch
        })
    }, [category, searchQuery])

    const guides = useMemo(
        () =>
            activeTab === "bookmarks"
                ? filteredGuides.filter((g) => bookmarkedGuideIds.has(g.id))
                : filteredGuides,
        [activeTab, bookmarkedGuideIds, filteredGuides]
    )


    return (
        <div className="bg-gray-50">
            <section className="border-b border-gray-100 bg-white">
                <div className="container px-4 sm:px-6 md:px-6">
                    <div className="mx-auto py-10 sm:py-12">
                        <header className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className="mb-5 flex justify-center sm:mb-6"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 sm:h-[4.5rem] sm:w-[4.5rem]">
                                    <GraduationCap className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={1.5} />
                                </div>
                            </motion.div>

                            <Badge variant="emerald" className="mb-3 text-xs font-medium">
                                Guides & learning
                            </Badge>

                            <h1 className="text-balance text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl md:text-[1.75rem] md:leading-snug">
                                Study, practice, and grow
                            </h1>
                            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
                                Curated learning paths for everyday worship, character, and foundational knowledge —
                                structured for clarity and consistency.
                            </p>
                        </header>
                    </div>
                </div>
            </section>

            <section className={cn("relative w-full border-t border-layout-separator", "bg-gray-50")}>
                <div className="container py-6 sm:py-8">
                    <div className="mx-auto max-w-6xl space-y-4 sm:space-y-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                            <Input
                                search
                                type="input"
                                placeholder="Search guides..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                containerClassName="min-w-0 flex-1"
                                className="h-10 rounded-lg border-gray-200 bg-white text-sm 
                                placeholder:text-gray-400 focus:bg-white sm:h-11"
                            />
                            <div className="flex-1 sm:max-w-[260px] sm:shrink-0 flex items-center justify-between gap-2 xs:gap-4">
                                <FilterDropdown
                                    options={categoryOptions}
                                    value={category}
                                    onChange={(v) => setCategory(String(v))}
                                    placeholder="All topics"
                                    triggerIcon={Filter}
                                    theme="purple"
                                    contentClassName="scrollbar-thin"
                                />
                                <div className="sm:hidden inline-flex h-9 w-[100px] xs:w-[120px] shrink-0 items-center justify-center 
                                rounded-md border border-emerald-200 bg-emerald-50 px-3 text-xs font-medium text-gray-700 shadow-sm">
                                    <span className="tabular-nums font-semibold text-gray-900">100+</span>
                                    <span className="ml-1">guides</span>
                                </div>
                            </div>
                        </div>

                        <main className="pt-6 flex items-center justify-between">
                            <Tabs
                                allTabs={guideTabs}
                                activeTab={activeTab}
                                onTabChange={(tabId) => setActiveTab(tabId as "all" | "bookmarks")}
                                variant="pills"
                                showIndicator
                                align="left"
                                stretchTabs={false}

                                className="pt-0"
                                contentContainerClassName="hidden"

                                tabsContainerClassName="flex justify-center border-none h-max"
                                tabClassName="px-5 xs:px-7 sm:px-8 md:px-10 lg:px-12"

                                classNames={{
                                    pillsIndicator: "bg-white border border-layout-separator",
                                    tabsWrapper: "border border-layout-separator",
                                    labelClassName: "text-xs xs:text-sm"
                                }}
                            />

                            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-medium text-emerald-800 shadow-[0_1px_2px_rgba(16,185,129,0.18)] sm:text-xs">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="tabular-nums">{GuidesMock.length - 1}+</span>
                                <span>Guides</span>
                            </div>
                        </main>


                        <main>
                            {guides.length === 0 ? (
                                <div className="rounded-xl bg-white p-8 text-center">
                                    <p className="text-sm font-medium text-gray-900">No guides found</p>
                                    <p className="mt-1 text-sm text-gray-500">Try another keyword or topic.</p>
                                </div>
                            ) : (
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                                    {guides.map((g, index) => (
                                        <GuidesCard
                                            key={g.id}
                                            guide={g}
                                            index={index}
                                            isBookmarked={bookmarkedGuideIds.has(g.id)}
                                            onToggleBookmark={() =>
                                                setBookmarkedGuideIds((prev) => {
                                                    const next = new Set(prev)
                                                    if (next.has(g.id)) next.delete(g.id)
                                                    else next.add(g.id)
                                                    return next
                                                })
                                            }
                                            onOpen={() => router.push(`/guides/${g.id}`)}
                                        />
                                    ))}
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GuidesExplorePage

