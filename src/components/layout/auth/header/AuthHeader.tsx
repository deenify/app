"use client"

import React from "react"
import { type UserPreferences } from "@/components/shared/UserProfileDropdown"
import { cn } from "@/lib/utils/clsx"
import Logo from "@/components/shared/Logo"

interface PlatformHeaderProps {
    userPreferences?: UserPreferences
    className?: string
}


const PlatformHeader: React.FC<PlatformHeaderProps> = ({ className }) => {

    return (
        <header className={cn(
            "z-50 border-b border-layout-separator bg-white backdrop-blur-md ease-out duration-300",
            className
        )}>
            <section className="container-header-footer flex h-[72px] items-center justify-between gap-4 sm:h-[76px]">
                <main className="w-full max-w-[150px]">
                    <Logo />
                </main>
            </section>
        </header >
    )
}

export default PlatformHeader
