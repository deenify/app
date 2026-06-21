"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { MARKETING_NAV } from "./content"
import { cn } from "@/lib/utils/clsx"
import Logo from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { createPortal } from "react-dom"
import { clientEnv } from "@/env/client"

const SIDEBAR_EASE = [0.22, 1, 0.36, 1] as const

const OVERLAY_TRANSITION = {
    duration: 0.55,
    ease: SIDEBAR_EASE,
} as const

const PANEL_TRANSITION = {
    duration: 0.72,
    ease: SIDEBAR_EASE,
} as const

interface MobileSidebarProps {
    isOpen: boolean
    onClose: () => void
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
    const pathName = usePathname()

    useEffect(() => {
        if (!isOpen) return

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [isOpen, onClose])


    if (typeof document === "undefined") return null

    return (
        createPortal(
            <AnimatePresence>
                {isOpen && (
                    <motion.button
                        key="marketing-sidebar-overlay"
                        type="button"
                        aria-label="Close menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={OVERLAY_TRANSITION}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm lg:hidden"
                    />
                )}

                {isOpen && (
                    <motion.aside
                        key="marketing-sidebar-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile menu"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={PANEL_TRANSITION}
                        style={{ willChange: "transform" }}
                        className="fixed right-0 top-0 z-[9999] flex h-dvh w-[min(85vw,300px)] flex-col border-l border-layout-separator bg-white outline-none lg:hidden"
                    >
                        <div className="flex flex-1 flex-col overflow-hidden">
                            <div className="flex-1 overflow-y-auto px-3 py-3.5 scrollbar-content sm:px-3.5">
                                <div className="mb-5 flex items-center justify-between gap-2.5 border-b border-layout-separator pb-3.5">
                                    <div className="min-w-0 flex-1">
                                        <Logo
                                            title={clientEnv.APP_NAME}
                                            href="/"
                                            isContentAncored
                                            className="h-full w-full"
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        aria-label="Close menu"
                                        onClick={onClose}
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100/80 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <X className="h-3.5 w-3.5" strokeWidth={2.25} />
                                    </button>
                                </div>

                                <nav aria-label="Mobile">
                                    <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700/70">
                                        Menu
                                    </h3>
                                    <div className="space-y-0.5">
                                        {MARKETING_NAV.map((item) => {
                                            const active = pathName === item.href || pathName.startsWith(`${item.href}/`)
                                            const Icon = item.icon

                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className={cn(
                                                        "group relative flex items-center gap-2 rounded-lg px-2.5 py-2 transition-colors duration-150",
                                                        active
                                                            ? "bg-emerald-50 text-emerald-900"
                                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    )}
                                                >
                                                    {active && (
                                                        <span
                                                            aria-hidden
                                                            className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-emerald-600"
                                                        />
                                                    )}
                                                    <Icon
                                                        className={cn(
                                                            "h-4 w-4 shrink-0",
                                                            active
                                                                ? "text-emerald-600"
                                                                : "text-gray-400 group-hover:text-emerald-600"
                                                        )}
                                                    />
                                                    <span className="min-w-0 flex-1 break-words text-[13px] font-medium leading-tight">
                                                        {item.label}
                                                    </span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </nav>
                            </div>

                            <div className="shrink-0 border-t border-layout-separator p-3.5">
                                <div className="flex items-center gap-1.5">
                                    <Button
                                        variant="outline"
                                        href="/login"
                                        onClick={onClose}
                                        className="h-9 flex-1 rounded-md text-xs font-medium"
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        variant="default"
                                        href="/register"
                                        onClick={onClose}
                                        className="h-9 flex-1 rounded-md text-xs font-medium"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>, document.body
        )
    )
}

export default MobileSidebar
