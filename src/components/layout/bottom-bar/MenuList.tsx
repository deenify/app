"use client"

import Link from 'next/link'
import React from 'react'
import { sidebarSections } from '../side-bar/content'
import { cn } from '@/lib/utils/clsx'
import { Moon } from 'lucide-react'
import { usePathname } from 'next/navigation'

type DrawerTabsType = "menu" | "language" | "settings"

interface MenuListProps {
    onDrawerTabChange?: (tab: DrawerTabsType | null) => void
}

const MenuList = ({ onDrawerTabChange }: MenuListProps) => {
    const pathname = usePathname()

    return (
        <div className="sm:p-4 py-4 px-3">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-layout-separator">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 sm:rounded-xl flex 
                items-center justify-center flex-shrink-0 rounded-lg">
                    <Moon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <h2 className="text-emerald-900 font-medium text-base">Deenify</h2>
                    <p className="text-xs text-gray-500">Islamic Companion</p>
                </div>
            </div>

            {/* Navigation Sections */}
            {sidebarSections.map((section: typeof sidebarSections[0], idx: number) => (
                <div key={idx} className={cn("mb-6", idx !== sidebarSections.length - 1 && "pb-6 border-b border-layout-separator")}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                        {section.title}
                    </h3>
                    <div className="space-y-1">
                        {section.items.map((item: typeof section.items[0]) => {
                            const Icon = item.icon
                            // const isActive = pathname === item.href
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => onDrawerTabChange?.(null)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                                        isActive
                                            ? "bg-emerald-50 text-emerald-900"
                                            : "text-gray-700 hover:bg-gray-50"
                                    )}
                                >
                                    <Icon className={cn(
                                        "h-5 w-5 flex-shrink-0",
                                        isActive ? "text-emerald-600" : "text-gray-500"
                                    )} />
                                    <span className="text-sm font-medium flex-1 min-w-0 break-words">{item.label}</span>
                                    {isActive && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0 inline-block" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MenuList