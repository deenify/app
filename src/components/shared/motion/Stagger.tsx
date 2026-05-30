"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type StaggerProps = {
    children: ReactNode
    /** Index within the current reveal batch (0 for first item in batch). */
    index: number
    className?: string
    /** When false, skips entrance animation (already-visible items). Default true. */
    animate?: boolean
    /** Seconds added per index step. Default 0.02. */
    delayStep?: number
    /** Entrance duration in seconds. Default 0.2. */
    duration?: number
}

const Stagger = ({
    children,
    index,
    className,
    animate = true,
    delayStep = 0.05,
    duration = 0.3,
}: StaggerProps) => {
    return (
        <motion.div
            initial={animate ? { opacity: 0, y: 8, scale: 0.99 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration,
                delay: animate ? index * delayStep : 0,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default Stagger
