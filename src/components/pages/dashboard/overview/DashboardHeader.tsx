"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DailyChallengeModal } from "./DailyChallengeModal"

type DashboardHeaderProps = {
    badge: string
    title: string
    lead: string
}

export function DashboardHeader({ badge, title, lead }: DashboardHeaderProps) {
    const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false)

    return (
        <section className="border-b border-layout-separator">
            <div className="flex flex-col gap-5 pb-6 pt-1 sm:flex-row sm:items-end sm:justify-between sm:pb-7">
                <div className="min-w-0">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 flex items-center gap-2.5"
                    >
                        <div className="flex items-center justify-center rounded-lg bg-emerald-50 p-2.5 text-emerald-700">
                            <LayoutDashboard className="h-4.5 w-4.5" strokeWidth={2} />
                        </div>
                        <Badge variant="emerald" className="text-xs font-medium">
                            {badge}
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 }}
                        className="max-w-xl text-2xl font-medium tracking-tight text-gray-900 sm:text-3xl"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600"
                    >
                        {lead}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:shrink-0"
                >
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
                        <span className="text-xs font-medium text-gray-500">Friends active</span>
                    </div>
                    <Button
                        type="button"
                        size="md"
                        shouldScale
                        className="w-full gap-2 sm:w-auto"
                        onClick={() => setIsChallengeModalOpen(true)}
                    >
                        <Sparkles className="h-4 w-4" />
                        Daily challenge
                    </Button>
                </motion.div>
            </div>

            <DailyChallengeModal
                isOpen={isChallengeModalOpen}
                onOpenChange={setIsChallengeModalOpen}
                title="Daily Quest"
            />
        </section>
    )
}
