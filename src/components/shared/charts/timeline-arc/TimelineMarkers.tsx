"use client";

import React from 'react'
import { PrayerEntry } from '@/components/pages/dashboard/prayer/content'
import { motion, AnimatePresence } from "framer-motion"
import { cn } from '@/lib/utils/clsx';

type TimelinePoint = { x: number; y: number }
interface TimelineMarkersProps {
    prayers: PrayerEntry[]
    currentId: string
    positions: TimelinePoint[]
    glowGradientId: string
    labelOffset: { active: number; idle: number }
}

const TimelineMarkers = ({
    prayers,
    currentId,
    positions,
    glowGradientId,
    labelOffset,
}: TimelineMarkersProps) => {
    return (
        <>
            {prayers.map((prayer, i) => {
                const pos = positions[i]
                if (!pos) return null
                const isCurrent = prayer.id === currentId

                return (
                    <g key={prayer.id} className="cursor-default">
                        <motion.circle
                            initial={false}
                            animate={{
                                r: isCurrent ? 4.5 : 2.5,
                                fill: isCurrent ? "#ffffff" : "rgba(255,255,255,0.35)",
                            }}
                            cx={pos.x}
                            cy={pos.y}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <AnimatePresence mode="wait">
                            {isCurrent && (
                                <g key="current-marker-aura">
                                    <motion.circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={4.5}
                                        fill="#ffffff"
                                        initial={{ scale: 1, opacity: 0.4 }}
                                        animate={{ scale: 4, opacity: 0 }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                    />
                                    <motion.circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={20}
                                        fill={`url(#${glowGradientId})`}
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={4.5}
                                        fill="#ffffff"
                                        animate={{ scale: [1, 1.25, 1] }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            transformOrigin: `${pos.x}px ${pos.y}px`,
                                        }}
                                    />
                                </g>
                            )}
                        </AnimatePresence>

                        <text
                            x={pos.x}
                            y={pos.y + (labelOffset.idle)}
                            textAnchor="middle"
                            fontSize={12}
                            className={cn(
                                "select-none transition-colors duration-500",
                                isCurrent
                                    ? "fill-white font-medium"
                                    : "fill-white/60 font-normal"
                            )}
                        >
                            {prayer.name}
                        </text>
                    </g>
                )
            })}
        </>
    )
}

export default TimelineMarkers

