"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Bookmark, Filter, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import FilterDropdown from "@/components/shared/FilterDropdown"
import Tabs, { type TabItem } from "@/components/shared/Tabs"
import { cn } from "@/lib/utils/clsx"
import {
    GuideCategories,
    GuidesMock,
} from "./content"
import GuidesCard from "./GuidesCard"

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
    const bookmarkedCount = useMemo(
        () => filteredGuides.filter((g) => bookmarkedGuideIds.has(g.id)).length,
        [filteredGuides, bookmarkedGuideIds]
    )
    const guideTabs = useMemo<TabItem[]>(
        () => [
            { id: "all", label: `All Guides (${filteredGuides.length})`, icon: BookOpen },
            { id: "bookmarks", label: `Bookmarks (${bookmarkedCount})`, icon: Bookmark },
        ],
        [bookmarkedCount, filteredGuides.length]
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
                                className="h-10 min-h-[42px] rounded-lg border-gray-200 bg-white text-sm 
                                placeholder:text-gray-400 focus:bg-white sm:h-11"
                            />
                            <div className="w-full sm:w-[260px] sm:shrink-0">
                                <FilterDropdown
                                    options={categoryOptions}
                                    value={category}
                                    onChange={(v) => setCategory(String(v))}
                                    placeholder="All topics"
                                    triggerIcon={Filter}
                                    theme="purple"
                                    contentClassName="scrollbar-thin"
                                />
                            </div>
                        </div>

                        <Tabs
                            allTabs={guideTabs}
                            activeTab={activeTab}
                            onTabChange={(tabId) => setActiveTab(tabId as "all" | "bookmarks")}
                            variant="pills"
                            showIndicator
                            align="left"
                            stretchTabs={false}
                            className="pt-0"
                            tabsContainerClassName="w-full border-none"
                            contentContainerClassName="hidden"
                            tabClassName="h-9 px-4 sm:px-5 text-sm"
                            classNames={{
                                pillsIndicator: "bg-white border border-layout-separator",
                                tabsWrapper: "border border-layout-separator"
                            }}
                        />

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
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GuidesExplorePage

