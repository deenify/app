"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MARKETING_NAV } from "./content"
import { cn } from "@/lib/utils/clsx"
import Logo from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { useScrollLock } from "@/hooks/useScrollLock"
import { clientEnv } from "@/env/client"

interface MobileSidebarProps {
    isOpen: boolean
    onClose: () => void
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
    const pathName = usePathname()
    useScrollLock(isOpen)

    return (
        <div
            className={cn(
                "fixed inset-0 z-[9998] lg:hidden",
                isOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
            aria-hidden={!isOpen}
        >
            <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                tabIndex={isOpen ? 0 : -1}
                className={cn(
                    "absolute inset-0 bg-black/45 ease-[cubic-bezier(0.22,1,0.36,1)] duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                )}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
                aria-hidden={!isOpen}
                className={cn(
                    "fixed right-0 top-0 z-[9999] flex h-dvh w-[min(88vw,320px)] flex-col",
                    "border-l border-layout-separator bg-white outline-none xs:w-[min(86vw,340px)]",
                    "transform-gpu will-change-transform",
                    "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-content">
                        <div className="mb-6 flex items-center justify-between gap-3 border-b border-layout-separator pb-4">
                            <div
                                className={cn("min-w-0 flex-1 transition-all duration-500")}
                            >
                                <Logo />
                            </div>

                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={onClose}
                                tabIndex={isOpen ? 0 : -1}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg 
                                bg-gray-100/80 text-gray-500 transition-colors 
                                hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X className="h-4 w-4" strokeWidth={2.25} />
                            </button>
                        </div>

                        <nav aria-label="Mobile">
                            <h3 className="mb-2.5 px-1 text-[11px] font-semibold uppercase 
                            tracking-[0.14em] text-emerald-700/70">
                                Menu
                            </h3>
                            <div className="space-y-1">
                                {MARKETING_NAV.map((item) => {
                                    const active =
                                        pathName === item.href ||
                                        pathName.startsWith(`${item.href}/`)
                                    const Icon = item.icon

                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={onClose}
                                            tabIndex={isOpen ? 0 : -1}
                                            className={cn(
                                                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150",
                                                active
                                                    ? "bg-emerald-50 text-emerald-900"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                            )}
                                        >
                                            {active && (
                                                <span
                                                    aria-hidden
                                                    className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 
                                                    rounded-full bg-emerald-600"
                                                />
                                            )}
                                            <Icon
                                                className={cn(
                                                    "h-5 w-5 shrink-0",
                                                    active
                                                        ? "text-emerald-600"
                                                        : "text-gray-400 group-hover:text-emerald-600",
                                                )}
                                                strokeWidth={2}
                                            />
                                            <span className="min-w-0 flex-1 break-words text-sm 
                                            font-medium leading-snug">
                                                {item.label}
                                            </span>

                                            {active && (
                                                <span
                                                    aria-hidden
                                                    className="absolute right-5 top-1/2 w-1.5 h-1.5 -translate-y-1/2
                                                    rounded-full bg-emerald-600 block flex-shrink-0"
                                                />
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </nav>
                    </div>

                    <div className="shrink-0 border-t border-layout-separator p-4">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                href="/login"
                                onClick={onClose}
                                className="h-10 flex-1 rounded-lg text-sm font-medium"
                            >
                                Log In
                            </Button>
                            <Button
                                variant="default"
                                href="/register"
                                onClick={onClose}
                                className="h-10 flex-1 rounded-lg text-sm font-medium"
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default MobileSidebar
