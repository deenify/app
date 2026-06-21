"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import MarketingDesktopNav from "./MarketingDesktopNav"
import MobileSidebar from "./MobileSidebar"
import { cn } from "@/lib/utils/clsx"
import MarketingHamburger from "@/assets/svg/menu/MarketingHamburger"
import { clientEnv } from "@/env/client"

interface MarketingHeaderProps {
    className?: string
}

const MarketingHeader = ({ className }: MarketingHeaderProps) => {
    const [open, setOpen] = useState(false)

    return (
        <header className={cn(
            "z-50 border-b border-layout-separator bg-white backdrop-blur-md ease-out duration-300",
            // !isMobile && scrollDirection === "forward"
            //     ? "-translate-y-full"
            //     : "translate-y-0",
            className
        )}>
            <div className="container-header-footer flex h-[72px] items-center justify-between gap-4 sm:h-[76px]">
                <Link
                    href="/"
                    className="inline-flex font-heading text-2xl font-semibold 
                                    tracking-tight text-emerald-900"
                >
                    {clientEnv.APP_NAME}<span className="font-accent italic text-emerald-600">.</span>
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
                            "lg:hidden flex-shrink-0 h-10 w-10 p-0 hover:bg-gray-100/80",
                            "text-gray-600 rounded-lg !focus-visible:ring-0 !focus-visible:ring-offset-0",
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
