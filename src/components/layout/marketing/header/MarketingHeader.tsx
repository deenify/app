"use client"

import { Button } from "@/components/ui/button"
import MarketingDesktopNav from "./MarketingDesktopNav"
import { cn } from "@/lib/utils/clsx"
import MarketingHamburger from "@/assets/svg/menu/MarketingHamburger"
import Logo from "@/components/shared/Logo"

interface MarketingHeaderProps {
    className?: string
    onMenuOpen: () => void
    isMenuOpen: boolean
}

const MarketingHeader = ({ className, onMenuOpen, isMenuOpen }: MarketingHeaderProps) => {
    return (
        <header className={cn(
            "z-50 border-b border-layout-separator bg-white/95 md:bg-white/90",
            "backdrop-blur-md ease-out duration-300",
            className
        )}>
            <section className="container-header-footer flex h-[72px] items-center justify-between gap-4 sm:h-[76px]">
                <main className="w-full max-w-[150px]">
                    <Logo />
                </main>

                <div className="flex-1 flex items-center justify-center">
                    <MarketingDesktopNav />
                </div>

                <div className="flex items-center gap-2 max-w-[150px] w-full justify-end">
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
                        aria-expanded={isMenuOpen}
                        variant="ghost"
                        size="icon"
                        onClick={onMenuOpen}
                        shouldScale
                        className={cn(
                            "lg:hidden flex-shrink-0 h-10 w-10 p-0 hover:bg-gray-100/80",
                            "text-gray-600 rounded-lg !focus-visible:ring-0 !focus-visible:ring-offset-0",
                        )}
                    >
                        <MarketingHamburger />
                    </Button>
                </div>
            </section>
        </header >
    )
}

export default MarketingHeader
