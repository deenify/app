"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Settings, Globe, } from "lucide-react"
import { Drawer, DrawerContent, DrawerThumb } from "@/components/ui/drawer"
import { cn } from "@/lib/utils/clsx"
import { DrawerTabs } from "./content"
import Tabs from "@/components/shared/Tabs"
import MenuList from "./MenuList"
import LanguageList from "./LanguageList"
import SettingsList from "./SettingsList"


type DrawerTabsType = "menu" | "language" | "settings"

interface DashboardBottombarProps {
    isVisible: boolean
    activeDrawerTab?: DrawerTabsType | null
    onDrawerTabChange?: (tab: DrawerTabsType | null) => void
}


const DashboardBottombar = ({
    isVisible,
    activeDrawerTab: externalActiveTab,
    onDrawerTabChange
}: DashboardBottombarProps) => {

    const [selectedLanguage, setSelectedLanguage] = useState("en")
    const [, setSearchOpen] = useState(false)
    const pathname = usePathname()

    // Use external state as single source of truth - no internal state conflicts
    const isDrawerOpen = externalActiveTab !== null && externalActiveTab !== undefined
    const activeDrawerTab = externalActiveTab || "menu"

    // Handle drawer close - reset parental state
    const handleDrawerClose = (open: boolean) => {
        if (!open) {
            onDrawerTabChange?.(null)
        }
    }

    if (!isVisible) return null

    return (
        <>
            {/* Bottom-Bar Actions */}
            <nav className="lg:hidden  z-[60] border-t border-layout-separator bg-white shadow-lg">
                <div className="grid grid-cols-4 h-16">
                    <Link
                        href="/"
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 transition-colors",
                            pathname === "/"
                                ? "text-emerald-600"
                                : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        <div className={cn(
                            "h-8 w-9 rounded-md flex items-center justify-center transition-colors",
                            pathname === "/"
                                ? "bg-emerald-50"
                                : "hover:bg-gray-50"
                        )}>
                            <Home className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>

                    <button
                        type="button"
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 transition-colors",
                            "text-gray-500 hover:text-gray-700"
                        )}
                        onClick={() => setSearchOpen(true)}
                    >
                        <div className={cn(
                            "h-8 w-9 rounded-md flex items-center justify-center transition-colors",
                            "hover:bg-gray-50"
                        )}>
                            <Search className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-medium">Search</span>
                    </button>

                    <button
                        type="button"
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 transition-colors",
                            "text-gray-500 hover:text-gray-700"
                        )}
                        onClick={() => onDrawerTabChange?.("language")}
                    >
                        <div className={cn(
                            "h-8 w-9 rounded-md flex items-center justify-center transition-colors",
                            "hover:bg-gray-50"
                        )}>
                            <Globe className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-medium">Language</span>
                    </button>

                    <button
                        type="button"
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 transition-colors",
                            "text-gray-500 hover:text-gray-700"
                        )}
                        onClick={() => onDrawerTabChange?.("settings")}
                    >
                        <div className={cn(
                            "h-8 w-9 rounded-md flex items-center justify-center transition-colors",
                            "hover:bg-gray-50"
                        )}>
                            <Settings className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-medium">Settings</span>
                    </button>
                </div>
            </nav>


            {/* Bottom-Bar Drawer*/}
            <Drawer
                open={isDrawerOpen}
                onOpenChange={handleDrawerClose}
            >
                <DrawerContent className="h-[85dvh] flex flex-col">
                    <DrawerThumb />
                    <Tabs
                        allTabs={DrawerTabs}
                        activeTab={activeDrawerTab}
                        variant="underline"
                        onTabChange={(tabId) => {
                            onDrawerTabChange?.(tabId as DrawerTabsType)
                        }}
                        showIndicator
                        className="flex-1 flex flex-col overflow-hidden"
                        contentContainerClassName="overflow-y-auto scrollbar-content"
                    >
                        {
                            activeDrawerTab === "menu"
                                ? <MenuList onDrawerTabChange={onDrawerTabChange} />
                                : activeDrawerTab === "language"
                                    ? <LanguageList selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
                                    : activeDrawerTab === "settings"
                                        ? <SettingsList />
                                        : <p className="text-center text-gray-500">No content</p>
                        }
                    </Tabs>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default DashboardBottombar
