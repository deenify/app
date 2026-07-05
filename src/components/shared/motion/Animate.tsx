"use client"

import { motion } from "framer-motion"
import React from "react"
import { useScrollContainer } from "@/hooks/useViewportFix"
import { motionEase, resolveInViewViewport } from "@/components/shared/motion/inViewViewport"

type ViewportOptions = {
    once?: boolean
    margin?: string
    amount?: "some" | "all" | number
}

type AnimateProps = {
    children: React.ReactNode
    className?: string
    delay?: number
    duration?: number
    animate?: "on_mount" | "while_in_view"
    viewport?: ViewportOptions
    variant?: "in" | "up"
}

const Animate = ({ children,
    className,
    delay = 0,
    duration = 0.6,
    animate = "on_mount",
    viewport,
    variant = "in"
}: AnimateProps) => {
    const scrollRoot = useScrollContainer()
    const resolvedViewport = resolveInViewViewport(viewport, scrollRoot)

    return (
        <motion.div
            initial={
                variant === "in"
                    ? { opacity: 0, scale: 1, y: 0 }
                    : { opacity: 0, scale: 1, y: 12 }
            }
            {...(
                animate === "while_in_view"
                    ? { whileInView: { opacity: 1, scale: 1, y: 0 } }
                    : { animate: { opacity: 1, scale: 1, y: 0 } }
            )}
            viewport={
                animate === "while_in_view"
                    ? resolvedViewport
                    : undefined}
            exit={
                variant === "in"
                    ? { opacity: 0, scale: 1, y: 0 }
                    : { opacity: 0, scale: 1, y: 12 }
            }
            transition={{
                duration,
                ease: motionEase,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default Animate
