"use client"

import Link from "next/link"
import { LayoutGroup, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/clsx"
import { MARKETING_NAV } from "./content"

const isNavActive = (pathname: string, href: string) =>
    href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`)

const MarketingDesktopNav = () => {
    const pathname = usePathname()

    return (
        <nav
            aria-label="Main"
            className="hidden lg:flex items-center rounded-full bg-emerald-600 p-1 shadow-sm w-max"
        >
            <LayoutGroup id="marketing-nav">
                <div className="relative flex items-center">
                    {MARKETING_NAV.map((item) => {
                        const isActive = isNavActive(pathname, item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "ease duration-200",
                                    "relative rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap",
                                    isActive ? "text-gray-950  ease duration-500" : "text-white"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="marketing-nav-pill"
                                        className="absolute inset-0 rounded-full bg-white shadow-sm"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </LayoutGroup>
        </nav>
    )
}

export default MarketingDesktopNav
