"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { Button } from "@/components/ui/button"
import { MARKETING_NAV } from "./content"

const MarketingHeader = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const isHome = pathname === "/"

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/95 backdrop-blur-md">
            <div className="container flex h-[72px] items-center justify-between gap-4 sm:h-[76px]">
                <Link href="/" className="group flex items-center gap-2.5">
                    {/* <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[0.65rem] bg-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.35)] transition-all duration-300 group-hover:bg-emerald-700 group-hover:shadow-[0_6px_18px_rgba(16,185,129,0.4)] sm:h-10 sm:w-10">
                        <Moon
                            className="relative z-10 h-[1.125rem] w-[1.125rem] text-white transition-transform duration-300 group-hover:-rotate-12 sm:h-5 sm:w-5"
                            strokeWidth={2}
                        />
                        <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </span> */}
                    <span className="flex font-heading text-[1.22rem] font-semibold tracking-[-0.02em] text-gray-950 sm:text-[1.38rem]">
                        Deenify
                        <span className="font-accent text-[1.15em] italic text-emerald-600">.</span>
                    </span>
                </Link>

                <nav
                    aria-label="Main"
                    className="hidden items-center rounded-full border border-gray-200/90 bg-[#f3f5f4] p-1 lg:flex"
                >
                    {MARKETING_NAV.map((item) => {
                        const active = item.href === "/" ? isHome : false
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                                    active
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "text-gray-700 hover:text-emerald-800"
                                )}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline-emerald"
                        size="sm"
                        href="/register"
                        className="hidden rounded-full border-gray-300 px-5 text-gray-800 hover:border-emerald-300 sm:inline-flex"
                    >
                        Sign Up
                    </Button>
                    <button
                        type="button"
                        aria-label={open ? "Close menu" : "Open menu"}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 lg:hidden"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
                    <nav className="flex flex-col gap-1">
                        {MARKETING_NAV.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-emerald-50 hover:text-emerald-800"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Button
                            variant="default"
                            size="sm"
                            href="/register"
                            className="mt-3 w-full rounded-full"
                            onClick={() => setOpen(false)}
                        >
                            Sign Up
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

export default MarketingHeader
