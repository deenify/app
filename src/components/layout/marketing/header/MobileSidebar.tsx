"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MARKETING_NAV } from "./content"
import { cn } from "@/lib/utils/clsx"
import Logo from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { useScrollLock } from "@/hooks/useScrollLock"

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
                "absolute inset-0 z-[9998] lg:hidden",
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
                    "absolute inset-0 bg-transparent",
                    isOpen ? "opointer-events-auto" : "pointer-events-none",
                )}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Mobile menu"
                aria-hidden={!isOpen}
                className={cn(
                    "fixed right-0 top-0 z-[9999] flex h-dvh w-[min(88vw,340px)] flex-col",
                    "border-l border-layout-separator bg-gradient-to-br from-white to-white/85 backdrop-blur-md outline-none xs:w-[min(86vw,340px)]",
                    "transform-gpu will-change-transform",
                    "duration-500 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto scrollbar-content">
                        <div className="container-header-footer flex h-[72px] items-center justify-between gap-4 sm:h-[76px]">
                            <Logo />

                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={onClose}
                                tabIndex={isOpen ? 0 : -1}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg 
                                bg-gray-100/80 text-gray-500 transition-colors 
                                hover:bg-gray-100 hover:text-gray-700"
                            >
                                <X size={20} strokeWidth={2.25} />
                            </button>
                        </div>

                        <nav
                            aria-label="Mobile"
                            className="px-4 py-4"
                        >
                            <h4 className="text-xs font-semibold text-gray-500 uppercase 
                            tracking-wider mb-3 px-2">
                                Menu
                            </h4>
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
                                                "group relative flex items-center gap-3 rounded-lg px-3",
                                                "py-2.5 duration-200",
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
                                                    "flex-shrink-0",
                                                    active
                                                        ? "text-emerald-600"
                                                        : "text-gray-400 group-hover:text-emerald-600",
                                                )}
                                                size={20}
                                                strokeWidth={2}
                                            />
                                            <span className="min-w-0 flex-1 break-words text-base 
                                            font-medium leading-none">
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

                    <div className="border-t border-layout-separator py-3 px-4">
                        <div className="flex flex-row items-center gap-1.5">
                            <Button
                                variant="ghost"
                                href="/login"
                                onClick={onClose}
                                className="h-11 w-full rounded-lg text-base font-medium"
                            >
                                Log In
                            </Button>
                            <Button
                                variant="default"
                                href="/register"
                                onClick={onClose}
                                className="h-11 w-full rounded-lg text-base font-medium"
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
