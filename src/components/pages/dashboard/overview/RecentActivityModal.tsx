"use client"

import { useState, useMemo } from "react"
import { Modal } from "@/components/shared/Modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/hooks/usePagination"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import FilterDropdown from "@/components/shared/FilterDropdown"
import {
    Calendar,
    Filter,
    Trash2,
    BookOpen,
    Sparkles,
    Clock,
    Heart,
    GraduationCap,
    CheckCircle2,
    RotateCcw
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils/clsx"
import type { DashboardActivityRow } from "./content"
import AnimateUp from "@/components/shared/motion/AnimateUp"

type RecentActivityModalProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    initialItems: DashboardActivityRow[]
}

const CATEGORIES = [
    { value: "All", label: "All Categories", icon: Filter },
    { value: "Qurʾān", label: "Qurʾān", icon: BookOpen },
    { value: "Dhikr", label: "Dhikr", icon: Sparkles },
    { value: "Salah", label: "Salah", icon: Clock },
    { value: "Sadaqah", label: "Sadaqah", icon: Heart },
    { value: "Learning", label: "Learning", icon: GraduationCap },
]

const TIME_RANGES = [
    { value: "All", label: "All Time", icon: Calendar },
    { value: "Today", label: "Today" },
    { value: "Yesterday", label: "Yesterday" },
    { value: "Last 7 Days", label: "Last 7 Days" },
    { value: "Last 30 Days", label: "Last 30 Days" },
    { value: "This Year", label: "This Year" },
]

const CATEGORY_STYLES: Record<string, { icon: any; color: string; bg: string }> = {
    "Qurʾān": { icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    "Dhikr": { icon: Sparkles, color: "text-amber-600", bg: "bg-amber-50" },
    "Salah": { icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
    "Sadaqah": { icon: Heart, color: "text-purple-600", bg: "bg-purple-50" },
    "Learning": { icon: GraduationCap, color: "text-slate-600", bg: "bg-slate-50" },
    "Default": { icon: CheckCircle2, color: "text-gray-600", bg: "bg-gray-50" },
}


export function RecentActivityModal({ isOpen, onOpenChange, initialItems }: RecentActivityModalProps) {

    const isMobile = useBreakpoint("sm", "down")
    const [categoryFilter, setCategoryFilter] = useState<string | number>("All")
    const [timeFilter, setTimeFilter] = useState<string | number>("All")

    const generateItems = useMemo(() => {
        return (baseItems: DashboardActivityRow[]) => {
            const initialWithDates = baseItems.map((item, i) => ({
                ...item,
                id: `initial-${i}`,
                date: new Date(new Date().getTime() - i * 3600000)
            }))

            const mocks = Array.from({ length: 45 }).map((_, i) => {
                const date = new Date()
                date.setDate(date.getDate() - Math.floor(i / 1.5))
                const catOptions = ["Qurʾān", "Dhikr", "Salah", "Sadaqah", "Learning"]
                const cat = catOptions[Math.floor(Math.random() * catOptions.length)]
                return {
                    id: `mock-${i}`,
                    activity: i % 3 === 0 ? `Memorized ${10 + i} verses` : i % 2 === 0 ? `Completed ${cat} session` : `Daily ${cat} goal reached`,
                    category: cat,
                    time: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                    points: `+${Math.floor(Math.random() * 50) + 10}`,
                    date,
                }
            })

            return [...initialWithDates, ...mocks]
        }
    }, [])

    // Manage items in state to allow deletion
    const [items, setItems] = useState(() => generateItems(initialItems))

    const filteredItems = useMemo(() => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const last7Days = new Date(today)
        last7Days.setDate(last7Days.getDate() - 7)
        const last30Days = new Date(today)
        last30Days.setDate(last30Days.getDate() - 30)
        const thisYear = new Date(now.getFullYear(), 0, 1)

        return items.filter((item) => {
            const matchesCategory = categoryFilter === "All" || item.category === categoryFilter

            let matchesTime = true
            if (timeFilter === "Today") {
                matchesTime = item.date >= today
            } else if (timeFilter === "Yesterday") {
                matchesTime = item.date >= yesterday && item.date < today
            } else if (timeFilter === "Last 7 Days") {
                matchesTime = item.date >= last7Days
            } else if (timeFilter === "Last 30 Days") {
                matchesTime = item.date >= last30Days
            } else if (timeFilter === "This Year") {
                matchesTime = item.date >= thisYear
            }

            return matchesCategory && matchesTime
        })
    }, [items, categoryFilter, timeFilter])

    const { paginatedItems, page, setPage, totalPages } = usePagination(filteredItems, 5)

    const handleDeleteItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const handleClearAll = () => {
        setItems([])
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Activity History"
            footer={totalPages > 1 ? (
                <Pagination
                    page={page}
                    isMobile={isMobile}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    align="center"
                    scrollContainerId="activity-modal-list"
                />
            ) : null}
            className="w-[min(calc(100vw-2rem),600px)] h-[85vh]"
            classNames={{
                content: "py-0 px-0 overflow-hidden flex flex-col",
                footer: "border-t border-layout-separator"
            }}
        >
            {/* Filters Sticky Header */}
            <div className="sticky top-0 z-20 bg-white px-4 py-2 flex flex-col gap-3 border-b border-layout-separator">
                <div className="flex flex-col sm:gap-3 gap-1 sm:flex-row">
                    <div className="flex-1">
                        <FilterDropdown
                            options={CATEGORIES}
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            placeholder="Category"
                            theme="emerald"
                        />
                    </div>
                    <div className="flex-1">
                        <FilterDropdown
                            options={TIME_RANGES}
                            value={timeFilter}
                            onChange={setTimeFilter}
                            placeholder="Time Range"
                            triggerIcon={Calendar}
                            theme="slate"
                        />
                    </div>
                </div>
                {filteredItems.length > 0 && (
                    <motion.div
                        initial={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ ease: "linear" }}
                        className="overflow-hidden"
                    >
                        <Button
                            variant="link-red"
                            size="max"
                            className="text-sm"
                            onClick={handleClearAll}
                        >
                            Delete all
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* List Content */}
            <div id="activity-modal-list" className="px-4 py-4 overflow-y-auto scrollbar-thin flex-1">
                <div className="flex flex-col gap-1 min-h-full">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {paginatedItems.length > 0 ? paginatedItems.map((item) => {
                            const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.Default
                            const Icon = style.icon

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.1 }}
                                    className="group relative flex items-start sm:gap-4 gap-2 sm:p-4 p-2 py-3 rounded-lg
                                     border border-layout-separator bg-white hover:border-emerald-200 
                                     duration-300 hover:bg-emerald-50/30"
                                >
                                    <div className={cn(
                                        "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl",
                                        style.bg, style.color
                                    )}>
                                        <Icon size={18} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <h4 className="sm:text-base text-sm sm:font-semibold text-gray-900 
                                            break-words tracking-tight font-medium">
                                                {item.activity}
                                            </h4>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <Badge
                                                    variant="emerald"
                                                    className=""
                                                >
                                                    {item.points}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 mt-1.5">
                                            <div className="flex items-center gap-2">
                                                <Badge
                                                    variant="secondary"
                                                    className="uppercase tracking-wide text-[10px]">
                                                    {item.category}
                                                </Badge>
                                                <span className="text-xs font-medium text-gray-400">
                                                    {item.time}
                                                </span>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <Button
                                                    variant="ghost-red"
                                                    size="icon"
                                                    className="w-8 h-8 rounded-full sm:opacity-0 group-hover:opacity-100
                                                  hover:text-black text-black"
                                                    onClick={() => handleDeleteItem(item.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }) : (
                            <div className="flex items-center justify-center flex-1 text-center py-10">
                                <AnimateUp
                                    className="flex flex-col items-center justify-center flex-1 text-center py-10"
                                >
                                    <div className="h-20 w-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 rotate-12 transition-transform hover:rotate-0">
                                        <RotateCcw className="h-10 w-10 text-gray-200" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                                        No activities found
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2 max-w-[240px]">
                                        Your history is clean or the current filters are too specific.
                                    </p>
                                    <Button
                                        variant="outline-emerald"
                                        className="mt-6 px-5 border-emerald-200 rounded-full"
                                        size="sm"
                                        onClick={() => {
                                            setCategoryFilter("All")
                                            setTimeFilter("All")
                                            setItems(generateItems(initialItems))
                                        }}
                                    >
                                        Reset all filters
                                    </Button>
                                </AnimateUp>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Modal>
    )
}
