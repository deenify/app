"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import MarketingDesktopNav from "./MarketingDesktopNav"
import MobileSidebar from "./MobileSidebar"
import { cn } from "@/lib/utils/clsx"
import MarketingHamburger from "@/assets/svg/menu/MarketingHamburger"

const MarketingHeader = () => {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100/80 bg-white/95 backdrop-blur-md">
            <div className="container-header-footer flex h-[72px] items-center justify-between gap-4 sm:h-[76px]">
                <Link href="/" className="group flex items-center gap-2.5">
                    <span className="flex font-heading text-[1.22rem] font-semibold tracking-[-0.02em] text-gray-950 sm:text-[1.38rem]">
                        Deenify
                        <span className="font-accent text-[1.15em] italic text-emerald-600">.</span>
                    </span>
                </Link>

                <MarketingDesktopNav />

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline-emerald"
                        size="sm"
                        href="/register"
                        className="hidden rounded-full border-gray-300 px-5 text-gray-800 
                        hover:border-emerald-300 sm:inline-flex"
                    >
                        Sign Up
                    </Button>

                    <Button
                        aria-label="Open menu"
                        aria-expanded={open}
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(true)}
                        shouldScale
                        className={cn(
                            "lg:hidden flex-shrink-0 h-10 w-10 p-0 hover:bg-gray-100/80 active:bg-gray-200/60",
                            "text-gray-600 rounded-lg !focus-visible:ring-0 !focus-visible:ring-offset-0 focus-visible:outline-none",
                        )}
                    >
                        <MarketingHamburger />
                    </Button>
                </div>
            </div>

            <MobileSidebar isOpen={open} onClose={() => setOpen(false)} />
        </header>
    )
}

export default MarketingHeader
