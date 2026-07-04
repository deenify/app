"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils/clsx"

type DashboardHeadProps = {
    separator?: boolean
    centered?: boolean
    heading?: React.ReactNode
    lead?: React.ReactNode
    accent?: React.ReactNode
    subtitle?: React.ReactNode
    mobileSubtitle?: React.ReactNode
    descriptions?: React.ReactNode[]
    children?: React.ReactNode
    className?: string
    classNames?: {
        heading?: string
        accent?: string
        subtitle?: string
        descriptions?: string
        children?: string
    }
}

const DashboardHead = ({
    separator,
    centered,
    heading,
    lead,
    accent,
    subtitle,
    mobileSubtitle,
    descriptions = [],
    children,
    className,
    classNames,
}: DashboardHeadProps) => {
    return (
        <section className={cn("bg-transparent",
            separator && "border-b border-layout-separator mb-8 sm:mb-12",
            className
        )}>
            <div className={cn(
                "container py-8 sm:py-12",
                centered && "flex items-center justify-center text-center"
            )}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="min-w-0"
                >
                    {heading ? (
                        <h1
                            className={cn(
                                "font-heading marketing-section-heading max-w-4xl text-gray-900",
                                classNames?.heading
                            )}
                        >
                            {heading}
                        </h1>
                    ) : (
                        <h2
                            className="font-heading marketing-section-heading leading-[1.2]"
                        >
                            {lead}{" "}
                            <span className="font-accent text-[1.05em] italic text-emerald-600 lowercase tracking-wide">
                                {accent}
                            </span>
                        </h2>
                    )}

                    {mobileSubtitle ? (
                        <p
                            className={cn(
                                "mt-2 max-w-sm text-sm leading-relaxed text-gray-600 sm:hidden",
                                classNames?.subtitle
                            )}
                        >
                            {mobileSubtitle}
                        </p>
                    ) : null}

                    {subtitle ? (
                        <p
                            className={cn(
                                "mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 sm:mt-3 md:text-base",
                                mobileSubtitle && "hidden sm:block",
                                classNames?.subtitle
                            )}
                        >
                            {subtitle}
                        </p>
                    ) : null}

                    {descriptions.length > 0 ? (
                        <div className={cn("mt-3 space-y-2", classNames?.descriptions)}>
                            {descriptions.map((text, index) => (
                                <p
                                    key={index}
                                    className="max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base"
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    ) : null}

                    {children ? (
                        <div className={cn("mt-5", classNames?.children)}>
                            {children}
                        </div>
                    ) : null}
                </motion.div>
            </div>
        </section >
    )
}

export default DashboardHead
