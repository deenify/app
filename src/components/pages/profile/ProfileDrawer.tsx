"use client"

import React from 'react'
import {
    Drawer, DrawerContent, DrawerDescription,
    DrawerThumb, DrawerTitle, DrawerTrigger
} from "@/components/ui/drawer"
import { ChevronRight } from "lucide-react"
import { profileSidebarContent } from "./content"
import { cn } from "@/lib/utils/clsx"
import { useRouter } from 'next/navigation'
import type { profileSidebarContentType } from './content'
import MenuIcon from "@/assets/svg/MenuIcon"
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

type ProfileDrawerProps = {
    mobileNavOpen: boolean;
    setMobileNavOpen: (v: boolean) => void;
    ActivePageContent: profileSidebarContentType
}

const ProfileDrawer = ({
    mobileNavOpen,
    setMobileNavOpen,
    ActivePageContent
}: ProfileDrawerProps) => {

    const router = useRouter()
    const ActivePageIcon = ActivePageContent.icon

    return (
        <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <div className="mt-5 flex items-center justify-between 2xl:hidden">
                <motion.div
                    className="min-w-0 flex items-center gap-2 text-gray-900"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    key={ActivePageContent.label}
                >
                    <ActivePageIcon
                        className="shrink-0 text-emerald-700"
                        strokeWidth={2}
                        size={20}
                    />
                    <p className="truncate text-sm font-medium">{ActivePageContent.label}</p>
                </motion.div>
                <DrawerTrigger>
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileNavOpen(true)}
                            shouldScale
                            className={cn(
                                "lg:hidden flex-shrink-0",
                                "h-10 w-10 p-0",
                                "hover:bg-gray-100/80 active:bg-gray-200/60",
                                "text-gray-600 hover:text-gray-900",
                                "rounded-lg",
                                "transition-colors duration-150",
                                "!focus-visible:ring-0 !focus-visible:ring-offset-0 focus-visible:outline-none",
                                "focus:outline-none !ring-0 !ring-offset-0",
                                "active:ring-0 active:ring-offset-0"
                            )}
                        >
                            <MenuIcon />
                        </Button>
                    </motion.div>
                </DrawerTrigger>
            </div>

            <DrawerContent className="rounded-t-2xl">
                <DrawerThumb thumbSize="sm" />
                <div className="mx-auto w-full max-w-2xl px-4 pb-6">
                    <DrawerTitle className="text-base font-medium text-gray-900">Profile sections</DrawerTitle>
                    <DrawerDescription className="mt-1 text-sm text-gray-600">
                        Choose where you want to go in your profile.
                    </DrawerDescription>

                    <div className="mt-4 space-y-2">
                        {profileSidebarContent.map(({ href, label, icon: Icon }) => {
                            const active = href === ActivePageContent.href
                            return (
                                <button
                                    key={href}
                                    type="button"
                                    onClick={() => {
                                        setMobileNavOpen(false)
                                        if (href !== ActivePageContent.href) router.push(href)
                                    }}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-lg border px-3 py-3 text-left transition-colors",
                                        active
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                            : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                                    )}
                                >
                                    <span className="flex items-center gap-2.5">
                                        <Icon className={cn("h-4 w-4", active ? "text-emerald-700" : "text-gray-600")} strokeWidth={2} />
                                        <span className="text-sm font-medium">{label}</span>
                                    </span>
                                    <ChevronRight className={cn("h-4 w-4", active ? "text-emerald-700" : "text-gray-400")} />
                                </button>
                            )
                        })}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ProfileDrawer