import { motion } from "framer-motion"
import React from "react"

type AnimateUpProps = {
    children: React.ReactNode
    className?: string
    delay?: number
}

const AnimateUp = ({ children, className, delay = 0 }: AnimateUpProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: 16 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: delay,
            }}
            style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default AnimateUp