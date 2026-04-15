"use client"

import React from 'react'
import {
    Drawer, DrawerContent, DrawerDescription,
    DrawerThumb, DrawerTitle, DrawerTrigger
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { PanelRightOpen, ChevronRight } from "lucide-react"
import { profileSidebarContent } from "./content"
import { cn } from "@/lib/utils/clsx"
import { useRouter } from 'next/navigation'

type ProfileDrawerProps = {
    mobileNavOpen: boolean;
    setMobileNavOpen: (v: boolean) => void;
    CurrentPageHref: string;
}

const ProfileDrawer = ({ mobileNavOpen, setMobileNavOpen, CurrentPageHref }: ProfileDrawerProps) => {
    const router = useRouter()

    return (
        <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <DrawerTrigger asChild>
                <Button type="button" variant="outline-emerald" size="sm" shouldScale>
                    <PanelRightOpen className="h-4 w-4" strokeWidth={2} />
                    Browse
                </Button>
            </DrawerTrigger>
            <DrawerContent className="rounded-t-2xl">
                <DrawerThumb thumbSize="sm" />
                <div className="mx-auto w-full max-w-2xl px-4 pb-6">
                    <DrawerTitle className="text-base font-medium text-gray-900">Profile sections</DrawerTitle>
                    <DrawerDescription className="mt-1 text-sm text-gray-600">
                        Choose where you want to go in your profile.
                    </DrawerDescription>

                    <div className="mt-4 space-y-2">
                        {profileSidebarContent.map(({ href, label, icon: Icon }) => {
                            const active = href === CurrentPageHref
                            return (
                                <button
                                    key={href}
                                    type="button"
                                    onClick={() => {
                                        setMobileNavOpen(false)
                                        if (href !== CurrentPageHref) router.push(href)
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