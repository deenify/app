"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/clsx'

export type TabType = string

export interface TabItem {
    id: TabType
    label: string
    icon?: React.ElementType
    content?: React.ReactNode
}

interface TabsPropType {
    allTabs: Array<TabItem>
    activeTab: TabType
    onTabChange: (tabId: TabType) => void
    children?: React.ReactNode
    tabsContainerClassName?: string
    contentContainerClassName?: string
    showIndicator?: boolean
    variant?: "default" | "underline" | "pills"
    align?: "left" | "center" | "right"
    stretchTabs?: boolean
    animateContent?: boolean
    tabClassName?: string
    className?: string
    classNames?: {
        pillsIndicator?: string
        tabsWrapper?: string
        labelClassName?: string
    }
}

const Tabs = ({
    allTabs,
    activeTab,
    children,
    onTabChange,
    className,
    classNames,
    tabsContainerClassName,
    contentContainerClassName,
    showIndicator = true,
    variant = "underline",
    align = "center",
    stretchTabs = true,
    animateContent = true,
    tabClassName,
}: TabsPropType) => {

    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
    const tabsContainerRef = useRef<HTMLDivElement | null>(null)

    const updateIndicator = useCallback(() => {
        const activeTabElement = tabRefs.current[activeTab]
        const container = tabsContainerRef.current

        if (!activeTabElement) return

        // For pills, position the white pill directly under the active tab
        if (variant === "pills") {
            setIndicatorStyle({
                left: activeTabElement.offsetLeft,
                width: activeTabElement.offsetWidth,
            })
            return
        }

        // For underline, use container-relative measurements (with scroll)
        if (showIndicator && container) {
            const containerRect = container.getBoundingClientRect()
            const tabRect = activeTabElement.getBoundingClientRect()
            const scrollLeft = container.scrollLeft

            setIndicatorStyle({
                left: tabRect.left - containerRect.left + scrollLeft,
                width: tabRect.width,
            })
        }
    }, [activeTab, showIndicator, variant])

    useEffect(() => {
        updateIndicator()

        // Auto-scroll active tab into view
        const activeTabElement = tabRefs.current[activeTab]
        const container = tabsContainerRef.current
        if (activeTabElement && container) {
            const containerRect = container.getBoundingClientRect()
            const tabRect = activeTabElement.getBoundingClientRect()
            const scrollLeft = container.scrollLeft
            const tabLeft = tabRect.left - containerRect.left + scrollLeft
            const tabRight = tabLeft + tabRect.width

            if (tabLeft < scrollLeft) {
                container.scrollTo({ left: tabLeft - 8, behavior: 'smooth' })
            } else if (tabRight > scrollLeft + containerRect.width) {
                container.scrollTo({ left: tabRight - containerRect.width + 8, behavior: 'smooth' })
            }
        }
    }, [activeTab, updateIndicator])

    useEffect(() => {
        const container = tabsContainerRef.current
        if (container) {
            container.addEventListener('scroll', updateIndicator)
            window.addEventListener('resize', updateIndicator)
            return () => {
                container.removeEventListener('scroll', updateIndicator)
                window.removeEventListener('resize', updateIndicator)
            }
        }
    }, [updateIndicator])

    const activeTabContent = allTabs.find(tab => tab.id === activeTab)?.content

    return (
        <section className={cn("flex flex-col", className)}>
            {/* Tabs Header */}
            <div
                ref={tabsContainerRef}
                className={cn(
                    "relative overflow-x-auto scrollbar-hide w-full",
                    variant === "underline" && "border-b border-layout-separator",
                    tabsContainerClassName
                )}
            >
                <div
                    className={cn(
                        "flex relative",
                        stretchTabs ? "w-full" : "w-max",
                        stretchTabs && "min-w-full",

                        variant === "pills" &&
                        "w-max mx-auto rounded-full bg-gray-100 p-1 gap-1",

                        variant === "underline" &&

                        (align === "left"
                            ? "justify-start"
                            : align === "right"
                                ? "justify-end"
                                : "justify-center"),

                        classNames?.tabsWrapper
                    )}
                >

                    {variant === "pills" && (
                        <motion.div
                            className={cn(
                                "absolute top-[3px] bottom-[3px] rounded-full bg-white border border-gray-200 shadow-sm",
                                classNames?.pillsIndicator
                            )}
                            initial={false}
                            animate={{
                                left: indicatorStyle.left,
                                width: indicatorStyle.width,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                        />
                    )}

                    {allTabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id

                        if (variant === "pills") {
                            return (
                                <button
                                    ref={(el) => {
                                        tabRefs.current[tab.id] = el
                                    }}
                                    key={tab.id}
                                    onClick={() => onTabChange(tab.id)}
                                    className={cn(
                                        "py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                                        "flex items-center justify-center gap-2 flex-shrink-0 h-8 px-12",
                                        tabClassName
                                    )}
                                >
                                    {Icon && (
                                        <Icon
                                            size={15}
                                            className={cn(
                                                "inline text-center text-sm z-3 relative",
                                                isActive ? "text-gray-900" : "text-gray-600"
                                            )}
                                        />
                                    )}
                                    <span className={cn('inline w-max text-center text-sm z-3 relative', classNames?.labelClassName)}> {tab.label}</span>
                                </button>
                            )
                        }

                        return (
                            <button
                                key={tab.id}
                                ref={(el) => {
                                    tabRefs.current[tab.id] = el
                                }}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "py-3 px-4 sm:px-6 text-sm font-medium transition-colors relative whitespace-nowrap flex-shrink-0",
                                    "flex items-center justify-center gap-2",
                                    stretchTabs && "flex-1",
                                    isActive ? "text-emerald-600" : "text-gray-500 hover:text-gray-700",
                                    tabClassName
                                )}
                            >
                                {Icon && <Icon className="h-4 w-4" />}
                                <span className={cn("", classNames?.labelClassName)}>{tab.label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Animated Indicator */}
                {showIndicator && variant === "underline" && (
                    <motion.div
                        className="absolute bottom-0 h-0.5 bg-emerald-600"
                        initial={false}
                        animate={{
                            left: indicatorStyle.left,
                            width: indicatorStyle.width,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div className={cn("flex-1 relative overflow-hidden", contentContainerClassName)}>
                {animateContent ? (
                    <AnimatePresence mode="wait">
                        {children ? (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeInOut"
                                }}
                                className="h-full"
                            >
                                {children}
                            </motion.div>
                        ) : activeTabContent ? (
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{
                                    duration: 0.2,
                                    ease: "easeInOut"
                                }}
                                className="h-full"
                            >
                                {activeTabContent}
                            </motion.div>
                        ) : <>No content in the selected tab yet!</>}
                    </AnimatePresence>
                ) : (
                    <AnimatePresence mode="wait">
                        {children
                            ? children
                            : activeTabContent ?? <>No content in the selected tab yet!</>}
                    </AnimatePresence>
                )}
            </div>
        </section>
    )
}

export default Tabs
