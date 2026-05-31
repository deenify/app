"use client"

import { cn } from "@/lib/utils/clsx"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plus,
    Users,
    Share2,
    MoreHorizontal,
    Edit2,
    Trash2,
    CheckCircle2,
    UserPlus,
    Link2,
    Copy,
    Check
} from "lucide-react"
import { type DhikrPreset } from "./content"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { useState } from "react"
import Tabs, { TabItem } from "@/components/shared/Tabs"
import { Button } from "@/components/ui/button"
import ContributorAvatar from "./ContributorAvatar"
import { Input } from "@/components/ui/input"

type DhikrPresetGridProps = {
    activeId: string
    onSelect: (preset: DhikrPreset) => void
    presets: DhikrPreset[]
    customPresets: DhikrPreset[]
    onAddAdkhar: () => void
    onViewAllWorldwide: () => void
    onDeleteCustom?: (id: string) => void
    onEditCustom?: (preset: DhikrPreset) => void
}

const DUMMY_CONTRIBUTORS = [
    { id: "1", name: "Ahmed", username: "@ahmed_d", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" },
    { id: "2", name: "Sara", username: "@sara_k", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
    { id: "3", name: "Omar", username: "@omar_f", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar" },
    { id: "4", name: "Zainab", username: "@zainab_z", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab" },
]

export default function DhikrPresetGrid({
    activeId,
    onSelect,
    presets,
    customPresets,
    onAddAdkhar,
    onViewAllWorldwide,
    onDeleteCustom,
    onEditCustom,
    activeTab,
    onTabChange
}: DhikrPresetGridProps & { activeTab: string, onTabChange: (id: string) => void }) {
    const tabs: TabItem[] = [
        { id: "featured", label: "Featured" },
        { id: "custom", label: "Your Adkar" },
    ]

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 text-center items-center" >
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">Adkar library</h3>
                    <p className="text-sm text-gray-500">Select a lane or contribute to worldwide remembrance</p>
                </div>
                <Tabs
                    allTabs={tabs}
                    activeTab={activeTab}
                    onTabChange={(id) => onTabChange(id as string)}
                    variant="pills"
                    align="center"
                    stretchTabs={false}
                    tabClassName="px-6 h-8 text-[11px] sm:text-xs"
                    tabsContainerClassName="bg-transparent justify-start"
                    contentContainerClassName="hidden"
                />
            </div>

            <div>
                <AnimatePresence mode="wait">
                    {activeTab === "featured" ? (
                        <motion.div
                            key="featured"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid gap-4 sm:grid-cols-2"
                        >
                            {presets.map((preset, idx) => (
                                <AdkharCard
                                    key={preset.id}
                                    preset={preset}
                                    isActive={activeId === preset.id}
                                    onSelect={() => onSelect(preset)}
                                    // Mock 0 contribution state for first 2 featured cards
                                    hasContributions={idx > 1}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="custom"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="h-full"
                        >
                            {customPresets.length > 0 ? (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {customPresets.map((preset) => (
                                        <AdkharCard
                                            key={preset.id}
                                            preset={preset}
                                            isActive={activeId === preset.id}
                                            onSelect={() => onSelect(preset)}
                                            isCustom
                                            onDelete={() => onDeleteCustom?.(preset.id)}
                                            onEdit={() => onEditCustom?.(preset)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                                        <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-gray-900 font-bold text-lg mb-2">
                                        No custom Adkar yet
                                    </h4>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-[280px]">
                                        Start building your personal library by adding custom formulas or verses.
                                    </p>
                                    <Button
                                        variant="outline-emerald"
                                        onClick={onAddAdkhar}
                                        className="rounded-xl font-bold h-10 px-6"
                                    >
                                        Add your first Adkar
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="space-y-4 pt-6">
                <Button
                    variant="default"
                    className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-emerald-100 sm:text-lg"
                    onClick={onAddAdkhar}
                    shouldScale
                >
                    <Plus className="h-6 w-6 mr-1" />
                    Add Adkar
                </Button>

                <div className="flex justify-center">
                    <Button
                        variant="transparent"
                        size="max"
                        className="text-[13px] font-bold text-gray-400 hover:text-emerald-600 transition-colors"
                        onClick={onViewAllWorldwide}
                    >
                        View all Adkar worldwide
                    </Button>
                </div>
            </div>
        </section>
    )
}

function AdkharCard({
    preset,
    isActive,
    onSelect,
    isCustom,
    onDelete,
    onEdit,
    hasContributions = true
}: {
    preset: DhikrPreset;
    isActive: boolean;
    onSelect: () => void;
    isCustom?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    hasContributions?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-md border p-5 text-left transition-all duration-300",
                isActive
                    ? "border-emerald-500 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500"
                    : "border-gray-100 bg-white hover:border-emerald-200 hover:shadow-lg hover:shadow-gray-100"
            )}
        >
            <div className="absolute right-4 top-4 flex items-center gap-2">
                {isCustom && (
                    <div className="flex items-center gap-1.5 z-10">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
                            className="h-8 w-8 rounded-full bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-100 shadow-sm transition-all"
                        >
                            <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                            className="h-8 w-8 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 border border-gray-100 shadow-sm transition-all"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                )}
                {!isCustom && (
                    <div
                        className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300",
                            isActive
                                ? "border-emerald-600 bg-emerald-600"
                                : "border-gray-200 group-hover:border-emerald-300"
                        )}
                    >
                        <motion.svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4 overflow-visible"
                            aria-hidden
                        >
                            <motion.path
                                d="M5 13l4 4L19 7"
                                fill="none"
                                stroke={isActive ? "#fff" : "transparent"}
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={false}
                                animate={{
                                    pathLength: isActive ? 1 : 0,
                                    opacity: isActive ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.svg>
                    </div>
                )}
            </div>

            <div className="mb-4 min-w-0">
                <p className="font-arabic text-2xl text-gray-900 truncate" dir="rtl">
                    {preset.arabic}
                </p>
                <p className={cn(
                    "mt-2 text-base font-bold transition-colors truncate",
                    isActive ? "text-emerald-900" : "text-gray-900"
                )}>
                    {preset.title}
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500">
                    {preset.insight}
                </p>
            </div>

            <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                    {hasContributions ? (
                        <>
                            <div className="flex -space-x-2 shrink-0">
                                {DUMMY_CONTRIBUTORS.map((user) => (
                                    <ContributorAvatar key={user.id} user={user} />
                                ))}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 truncate">
                                <Users className="h-3 w-3 shrink-0" />
                                <span className="truncate">306k+ contributed</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2 shrink-0">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center">
                                        <Users className="h-3 w-3 text-gray-300" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">No contributions yet</span>
                        </div>
                    )}
                </div>

                <ShareInvitePopover preset={preset} />
            </div>
        </button>
    )
}

function ShareInvitePopover({ preset }: { preset: DhikrPreset }) {
    const [copied, setCopied] = useState(false)
    const [inviteId, setInviteId] = useState("")

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation()
        navigator.clipboard.writeText(`https://deenify.com/adhkar/${preset.id}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-emerald-50 hover:text-emerald-600 shrink-0 border border-transparent hover:border-emerald-100 shadow-sm"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Share2 className="h-3.5 w-3.5" />
                </button>
            </PopoverTrigger>
            <PopoverContent
                className="w-72 p-4 z-[110] rounded-2xl shadow-xl border-gray-100"
                side="top"
                align="end"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-900">Share & Invite</h4>
                        <p className="text-[11px] text-gray-500 leading-relaxed">Copy link to share or invite someone by their Deenify ID to count with you.</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                <Input
                                    readOnly
                                    value={`deenify.com/adhkar/${preset.id}`}
                                    className="h-9 pl-8 pr-2 text-[11px] bg-gray-50 border-gray-100 rounded-xl"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCopy}
                                className="h-9 w-9 shrink-0 rounded-xl bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:text-emerald-600"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                                <span className="bg-white px-2 text-gray-400">Or Invite</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Enter Deenify ID..."
                                value={inviteId}
                                onChange={(e) => setInviteId(e.target.value)}
                                className="h-10 text-xs bg-gray-50 border-gray-100 rounded-xl focus:bg-white"
                            />
                            <Button
                                variant="default"
                                size="icon"
                                className="h-10 w-10 shrink-0 rounded-xl shadow-md shadow-emerald-100"
                                disabled={!inviteId}
                            >
                                <UserPlus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
