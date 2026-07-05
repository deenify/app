"use client"

import { motion, ViewportOptions } from "framer-motion"
import { type ReactNode } from "react"
import { useScrollContainer } from "@/hooks/useViewportFix"
import { motionEase, resolveInViewViewport } from "@/components/shared/motion/inViewViewport"

type StaggerProps = {
    children: ReactNode
    index: number
    className?: string
    animate?: boolean
    animation?: "on_mount" | "while_in_view"
    /** Delay before the first item; each next item adds `delay`. */
    baseDelay?: number
    delay?: number
    duration?: number
    variant?: "in" | "up"
    viewport?: ViewportOptions
}

const VARIANT_INITIAL = {
    up: { opacity: 0, y: 8, scale: 0.99 },
    in: { opacity: 0, y: 0, scale: 1 },
} as const

const Stagger = ({
    children,
    index,
    className,
    animate = true,
    animation = "on_mount",
    baseDelay = 0,
    delay = 0.05,
    duration = 0.3,
    variant = "up",
    viewport,
}: StaggerProps) => {
    const scrollRoot = useScrollContainer()
    const resolvedViewport = resolveInViewViewport(viewport, scrollRoot)

    return (
        <motion.div
            initial={animate ? VARIANT_INITIAL[variant] : false}
            {...(
                animation === "while_in_view"
                    ? { whileInView: { opacity: 1, y: 0, scale: 1 } }
                    : { animate: { opacity: 1, y: 0, scale: 1 } }
            )}
            transition={{
                duration,
                delay: animate ? baseDelay + index * delay : 0,
                ease: motionEase,
            }}
            viewport={
                animation === "while_in_view"
                    ? resolvedViewport
                    : undefined
            }
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default Stagger
