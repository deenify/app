import { motion } from 'framer-motion'
import React from 'react'

type StaggerProps = {
    children: React.ReactNode,
    isNew: boolean,
    index: number,
    key: string | number,
    className?: string
}


const Stagger = ({ children, isNew, index, key, className }: StaggerProps) => {
    return (
        <motion.div
            key={key}
            initial={isNew ? { opacity: 0, y: 8, scale: 0.99 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.2,
                delay: isNew ? index * 0.02 : 0,
                ease: "easeOut"
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default Stagger