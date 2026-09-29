"use client"

import { useState } from "react"
import { motion, AnimatePresence, Easing } from "framer-motion"
import {
    CheckCircle2, BookOpen, Search,
    Zap, ExternalLink, Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils/clsx"
import type { ChallengeItem } from "./content"
import Link from "next/link"

interface ChallengeCardProps {
    challenge: ChallengeItem
    isSelected: boolean
    onSelect: () => void
    onComplete: (id: string) => void
    index: number
}

export function ChallengeCard({
    challenge,
    isSelected,
    onSelect,
    onComplete,
    index
}: ChallengeCardProps) {
    const [inputValue, setInputValue] = useState("")

    const TransitionConfig = {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as Easing
    }
    const isCompleted = challenge.status === "completed"
    const isLocked = challenge.status === "locked"

    const getIcon = () => {
        if (isCompleted) return <CheckCircle2 size={20} />
        if (isLocked) return <Lock size={20} />

        switch (challenge.type) {
            case "reading": return <BookOpen size={20} />
            case "exploration": return <Search size={20} />
            case "action": return <Zap size={20} />
            default: return <Zap size={20} />
        }
    }


    const handleAction = () => {
        if (challenge.type === "exploration") {
            if (inputValue.toLowerCase().trim() ===
                challenge.metadata?.correctReference?.toLowerCase().trim()) {
                onComplete(challenge.id)
            }
        } else {
            onComplete(challenge.id)
        }
    }


    // Challenge Type UI Variants
    const variantStyles = {
        reading: {
            bg: "bg-blue-50/50",
            border: "border-blue-100",
            iconBg: "bg-blue-100 text-blue-600",
            accent: "blue"
        },
        exploration: {
            bg: "bg-amber-50/50",
            border: "border-amber-100",
            iconBg: "bg-amber-100 text-amber-600",
            accent: "amber"
        },
        action: {
            bg: "bg-emerald-50/50",
            border: "border-emerald-100",
            iconBg: "bg-emerald-100 text-emerald-600",
            accent: "emerald"
        }
    }[challenge.type]


    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, ...TransitionConfig }}
            layout
        >
            <div
                className={cn(
                    "w-full overflow-hidden rounded-lg border transition-all duration-300",
                    isSelected
                        ? "bg-white border-emerald-500 ring-1 ring-emerald-500/10"
                        : "bg-white border-layout-separator hover:border-emerald-300 hover:bg-emerald-50/50",
                    isLocked && "opacity-60 grayscale cursor-not-allowed border-dashed bg-gray-50/30"
                )}
            >
                <button
                    type="button"
                    onClick={() => !isLocked && onSelect()}
                    disabled={isLocked}
                    className="w-full sm:p-4 py-4 px-2.5 flex flex-wrap sm:items-center sm:gap-4 gap-2 text-left"
                >
                    {/* Icon Holder */}
                    <div className={cn(
                        "h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all duration-500",
                        isCompleted
                            ? "bg-emerald-500 text-white shadow-md"
                            : (isSelected
                                ? variantStyles.iconBg
                                : "bg-gray-100 text-gray-500"
                            ))}
                    >
                        {getIcon()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <h4 className={cn(
                                "font-semibold text-gray-900 truncate tracking-tight transition-colors",
                                isSelected && "text-emerald-900"
                            )}>
                                {challenge.title}
                            </h4>
                            {isCompleted && (
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Done</span>
                            )}
                        </div>
                        <p className={cn(
                            "text-xs leading-snug transition-all",
                            isSelected ? "text-gray-600" : "text-gray-400 line-clamp-1"
                        )}>
                            {challenge.description}
                        </p>
                    </div>

                    {/* Reward Badge */}
                    <div className="flex flex-col items-end shrink-0 ml-auto w-full sm:w-auto">
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-black text-gray-900">+{challenge.points}</span>
                            <Zap size={14} className="fill-amber-400 text-amber-400" />
                        </div>
                        <span className="text-xs font-semibold text-gray-400 capitalize">
                            Barakah
                        </span>
                    </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                    {isSelected && !isCompleted && (
                        <motion.div
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: {
                                    gridTemplateRows: "1fr",
                                    opacity: 1,
                                },
                                collapsed: {
                                    gridTemplateRows: "0fr",
                                    opacity: 0,
                                },
                            }}
                            transition={{
                                duration: 0.32,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="grid overflow-hidden"
                        >
                            <div className="overflow-hidden">
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{
                                        duration: 0.22,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="m:p-4 py-4 px-2.5 pt-0 border-t border-gray-50 mt-1"
                                >

                                    {challenge.type === "exploration" && (
                                        <div className="mb-4 space-y-3">
                                            <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                                                <p className="text-[11px] text-amber-800 font-medium">
                                                    <span className="font-bold">
                                                        Challenge Hint:
                                                    </span>{" "}
                                                    Reference {challenge.metadata?.verseHint}. Identify the name of this Surah.
                                                </p>
                                            </div>

                                            <Input
                                                placeholder="Type Surah Name..."
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                classNames={{
                                                    input:
                                                        "h-11 text-sm border-gray-200 focus:border-amber-400 focus:ring-amber-50",
                                                }}
                                            />
                                        </div>
                                    )}

                                    {challenge.type === "reading" &&
                                        challenge.metadata?.link && (
                                            <div className="mb-4">
                                                <Link
                                                    href={challenge.metadata.link}
                                                    className="flex sm:items-center justify-between sm:p-3.5 
                                                    p-2.5 sm:rounded-xl bg-blue-50/50 border border-blue-100 
                                                    group/link transition-colors hover:bg-blue-50 rounded-md"
                                                >
                                                    <div className="flex sm:items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                            {challenge.metadata.chapter}
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-bold text-blue-900">
                                                                Read Chapter {challenge.metadata.chapter}
                                                            </span>

                                                            <span className="text-[10px] text-blue-600 font-medium">
                                                                Auto-navigates to Quran section
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <ExternalLink
                                                        size={16}
                                                        className="text-blue-400 group-hover/link:text-blue-600 transition-all"
                                                    />
                                                </Link>
                                            </div>
                                        )}

                                    {challenge.type === "action" && (
                                        <div className="mb-4 p-4 bg-emerald-50/30 border border-emerald-100/50 rounded-xl border-dashed">
                                            <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                                                This is a physical act of worship. Once you have completed the prayer or deed, confirm it below to claim your reward.
                                            </p>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleAction}
                                        variant={
                                            challenge.type === "exploration"
                                                ? "default-amber"
                                                : "default"
                                        }
                                        className="w-full"
                                    >
                                        <span className="flex items-center gap-2 text-xs sm:text-sm">
                                            {challenge.type === "exploration"
                                                ? "Verify Reference"
                                                : "Mark as Completed"}
                                        </span>
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
