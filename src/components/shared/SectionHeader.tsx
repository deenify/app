"use client"

import { motion } from 'framer-motion'
import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Badge, BadgeProps } from '../ui/badge'
import { cn } from '@/lib/utils/clsx'

type SectionHeaderProps = {
    variant: BadgeProps["variant"]
    icon: LucideIcon
    label: string
    heading: string
    descriptions: string[]
    children?: React.ReactNode
    className?: string
    classNames?: {
        badge?: string
        iconWrapper?: string
        icon?: string
        heading?: string
        description?: string
        descriptionsWrapper?: string
    }
}

const SectionHeader = ({
    icon: Icon,
    label,
    heading,
    descriptions,
    variant,
    children,
    className,
    classNames,
}: SectionHeaderProps) => {
    return (
        <section className={cn("border-b border-layout-separator", className)}>
            <div className="flex flex-col gap-5 pb-6 pt-1 lg:flex-row lg:items-end lg:justify-between lg:pb-7">
                <div className="min-w-0">
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2.5"
                    >
                        <div className={cn(
                            "flex items-center justify-center rounded-lg bg-emerald-50 p-2.5 text-emerald-700",
                            classNames?.iconWrapper
                        )}>
                            <Icon className={cn("h-4.5 w-4.5", classNames?.icon)} strokeWidth={2} />
                        </div>
                        <Badge
                            variant={variant == "default" ? "emerald" : variant}
                            className={cn("text-xs font-medium", classNames?.badge)}
                        >
                            {label}
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 }}
                        className={cn(
                            "max-w-md text-4xl font-medium tracking-tight text-gray-900 pt-4",
                            classNames?.heading
                        )}
                    >
                        {heading}
                    </motion.h1>

                    <div className={cn("flex flex-col gap-2 pt-4 flex-1", classNames?.descriptionsWrapper)}>
                        {descriptions.map((description, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 }}
                                className={cn(
                                    "max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base",
                                    classNames?.description
                                )}
                            >
                                {description}
                            </motion.p>
                        ))}
                    </div>
                </div>

                {children ?? null}
            </div>
        </section>
    )
}

export default SectionHeader