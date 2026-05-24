"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Easing } from "framer-motion"
import { Modal } from "@/components/shared/Modal"
import { Badge } from "@/components/ui/badge"
import {
    Sparkles,
    Trophy,
    CheckCircle2,
    Zap,
} from "lucide-react"
import { DAILY_CHALLENGES, type ChallengeItem } from "./content"
import { ChallengeCard } from "./ChallengeCard"
import Image from "next/image"
import CloseButton from "@/components/shared/buttons/CloseButton"

interface DailyChallengeModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
}

export function DailyChallengeModal({
    isOpen,
    onOpenChange,
    title
}: DailyChallengeModalProps) {
    const [challenges, setChallenges] = useState<ChallengeItem[]>(DAILY_CHALLENGES)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [showCongrats, setShowCongrats] = useState(false)


    const handleComplete = (id: string) => {
        setChallenges(prev => prev.map(c =>
            c.id === id ? { ...c, status: "completed" } : c
        ))
        setSelectedId(null)
        setShowCongrats(true)
    }

    useEffect(() => {
        if (showCongrats) {
            const timer = setTimeout(() => setShowCongrats(false), 2600)
            return () => clearTimeout(timer)
        }
    }, [showCongrats])


    const totalPoints = challenges.reduce((acc, c) => c.status === "completed" ? acc + c.points : acc, 0)
    const maxPoints = challenges.reduce((acc, c) => acc + c.points, 0)
    const progressPercent = Math.min(100, (totalPoints / maxPoints) * 100)


    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="w-[min(calc(100vw-2rem),650px)] h-[85vh]"
            footer={
                <div className="flex flex-wrap items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"
                                    aria-hidden
                                />
                            ))}
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-[10px] font-semibold text-emerald-700">
                                +12
                            </div>
                        </div>
                        <span className="text-xs font-medium text-gray-500 hidden sm:block">Friends active</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-500 font-semibold text-xs 
                    uppercase tracking-widest">
                        <Trophy size={14} className="text-amber-400" />
                        <span>Global League</span>
                    </div>
                </div>
            }
            classNames={{
                content: "p-0 overflow-hidden flex flex-col bg-white",
                header: "hidden",
                footer: "sm:px-4 px-2.5 py-3 border-t border-layout-separator"
            }}
        >
            <div className="relative flex flex-col h-full overflow-hidden">
                {/* Minimal Header Refinement */}
                <header className="sm:px-6 px-3 py-5 flex-shrink-0 border-b border-layout-separator">
                    <div className="min-w-0 pb-6">
                        <div className="flex items-start justify-between">
                            <h2 className="sm:text-2xl text-xl font-bold text-gray-900 tracking-normal leading-none">
                                {title}
                            </h2>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="red"
                                    className="shadow-sm flex gap-1 flex-shrink-0"
                                >
                                    <Trophy size={12} className="text-red-400" />
                                    Rank 12
                                </Badge>
                                <CloseButton onOpenChange={onOpenChange} />
                            </div>
                        </div>

                        <p className="text-xs font-medium text-gray-500 pt-2.5 xs:max-w-xs">
                            Nurture your soul with consistent deeds to level up your rank and earn rewards.
                        </p>
                    </div>

                    {/* Intellectual Progress UI */}
                    <div className="space-y-4">
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1.5">
                                    <Zap size={18} className="text-amber-500 fill-amber-500" />
                                    <span className="text-xs font-medium text-gray-600 capitalize 
                                    ">Barakah Progress</span>
                                </div>
                                <div className="flex items-baseline gap-1.5 pt-1">
                                    <span className="text-2xl font-black text-gray-900 leading-none">{totalPoints}</span>
                                    <span className="text-xs font-semibold text-gray-500 tracking-normal">/ {maxPoints} XP</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant="emerald">{Math.round(progressPercent)}% DONE</Badge>
                            </div>
                        </div>

                        <div className="relative h-1.5 w-full bg-gray-200 rounded-sm overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 
                                to-emerald-500 rounded-full"
                            >
                                <motion.div
                                    animate={{ x: ["-100%", "200%"], opacity: [0, 0.4, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 w-32 bg-white skew-x-[-25deg]"
                                />
                            </motion.div>
                        </div>
                    </div>
                </header>

                {/* Challenge List */}
                <main className="sm:px-6 px-3 py-4 flex-1 overflow-y-auto scrollbar-thin bg-gray-50/30">
                    <div className="flex flex-col gap-1">
                        <AnimatePresence initial={false}>
                            {challenges.map((challenge, idx) => (
                                <ChallengeCard
                                    key={challenge.id}
                                    challenge={challenge}
                                    index={idx}
                                    isSelected={selectedId === challenge.id}
                                    onSelect={() => setSelectedId(selectedId === challenge.id ? null : challenge.id)}
                                    onComplete={handleComplete}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </main>
            </div>

            {/* Congrats Overlay */}
            <AnimatePresence>
                {showCongrats && (
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, pointerEvents: "none" }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 z-[1000] flex items-center justify-center backdrop-blur-[2px] px-4"
                    >
                        {/* Confetti Background */}
                        <motion.div
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 0.3, scale: 1 }}
                            exit={{ opacity: 0, pointerEvents: "none" }}
                            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <Image
                                fill
                                priority
                                alt="confetti"
                                src="/images/generic/confetti-serpentine-explosion-burst-background.png"
                                className="sm:object-contain object-cover w-full h-auto"
                            />
                        </motion.div>

                        {/* Success Card */}
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 24 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.05, opacity: 0, pointerEvents: "none", y: 10 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="
                                 relative bg-white backdrop-blur-md rounded-xl
                                 py-5 sm:py-8
                                 px-12 sm:px-20
                                 shadow-[1px_1px_20px_4px_rgba(0,0,0,0.12)]
                                 flex flex-col items-center border border-emerald-400
                                 w-fit max-w-[90vw]
                             "
                        >
                            <div className="relative mb-4 sm:mb-6">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-4 text-emerald-200"
                                >
                                    <Sparkles className="w-12 h-12 sm:w-[80px] sm:h-[80px]" strokeWidth={1} />
                                </motion.div>

                                <div className="
                                      h-12 w-12 sm:h-16 sm:w-16
                                      bg-emerald-500 rounded-2xl
                                      flex items-center justify-center
                                    text-white shadow-lg shadow-emerald-200 rotate-12
                                  ">
                                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                                Mabrūk!
                            </h3>

                            <p className="text-xs sm:text-sm font-medium text-emerald-500 tracking-wide">
                                Deed Recorded
                            </p>

                            <div className="flex items-center gap-1 pt-2">
                                <span className="text-xs sm:text-sm font-black text-gray-900">
                                    +12
                                </span>
                                <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Modal>
    )
}
