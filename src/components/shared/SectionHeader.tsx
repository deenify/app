"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"

const ICON_BY_VARIANT: Partial<Record<NonNullable<BadgeProps["variant"]>, string>> = {
    default: "bg-emerald-50 text-emerald-700",
    emerald: "bg-emerald-50 text-emerald-700",
    purple: "bg-purple-50 text-purple-700",
    amber: "bg-amber-50 text-amber-800",
    blue: "bg-blue-50 text-blue-700",
    pink: "bg-rose-50 text-rose-700",
    red: "bg-red-100 text-red-700",
}

type SectionHeaderProps = {
    variant: BadgeProps["variant"]
    icon: LucideIcon
    label: string
    heading: React.ReactNode
    descriptions: string[]
    /** left = default page header; center = explore / donate style */
    layoutScope?: "left" | "center"
    children?: React.ReactNode
    className?: string
    classNames?: {
        content?: string
        copy?: string
        badge?: string
        iconWrapper?: string
        icon?: string
        heading?: string
        description?: string
        descriptionsWrapper?: string
        children?: string
    }
}

export default function SectionHeader({
    icon: Icon,
    label,
    heading,
    descriptions,
    variant,
    layoutScope = "left",
    children,
    className,
    classNames,
}: SectionHeaderProps) {
    const badgeVariant = variant === "default" ? "emerald" : variant
    const iconColors = ICON_BY_VARIANT[badgeVariant ?? "emerald"] ?? ICON_BY_VARIANT.emerald
    const isCenter = layoutScope === "center"
    const childrenAside = Boolean(classNames?.content)

    return (
        <section className={cn("border-b border-layout-separator", className)}>
            <div className="container pb-8 pt-6 sm:pt-8 md:pt-10">
                <div className={cn(
                    isCenter && "mx-auto max-w-2xl text-center",
                    classNames?.content
                )}>
                    <div className={cn("min-w-0", classNames?.copy)}>
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "mb-4 flex items-center gap-2.5",
                                isCenter && "justify-center flex-col"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex items-center justify-center rounded-lg",
                                    iconColors,
                                    classNames?.iconWrapper,
                                    layoutScope === "center" ? "p-3" : "p-2.5"
                                )}
                            >
                                <Icon
                                    size={layoutScope === "center" ? 26 : 24}
                                    className={cn(classNames?.icon)}
                                    strokeWidth={2}
                                />
                            </div>
                            <Badge
                                variant={badgeVariant}
                                className={cn(
                                    "text-xs font-medium",
                                    classNames?.badge
                                )}
                            >
                                {label}
                            </Badge>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className={cn("space-y-4", classNames?.descriptionsWrapper)}
                        >
                            <h1
                                className={cn(
                                    "font-medium tracking-tight text-gray-900",
                                    "max-w-3xl text-2xl xs:text-3xl sm:text-4xl capitalize",
                                    classNames?.heading
                                )}
                            >
                                {heading}
                            </h1>
                            {descriptions.map((text, index) => (
                                <p
                                    key={index}
                                    className={cn(
                                        "text-sm leading-relaxed text-gray-600 sm:text-base",
                                        isCenter ? "mx-auto max-w-2xl" : "max-w-3xl",
                                        classNames?.description
                                    )}
                                >
                                    {text}
                                </p>
                            ))}
                            {!childrenAside && children}
                        </motion.div>
                    </div>

                    {childrenAside && children ? (
                        <div className={cn(classNames?.children)}>{children}</div>
                    ) : null}
                </div>
            </div>
        </section>
    )
}
