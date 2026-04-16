"use client"

import React, { ReactElement, ReactNode } from 'react'
import {
    Drawer, DrawerContent, DrawerDescription,
    DrawerThumb, DrawerTitle, DrawerTrigger
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { PanelRightOpen, ChevronRight } from "lucide-react"
import { profileSidebarContent } from "./content"
import { cn } from "@/lib/utils/clsx"
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'

type ProfileDrawerProps = {
    mobileNavOpen: boolean;
    setMobileNavOpen: (v: boolean) => void;
    ActivePageContent: any
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
            <Card className="mt-5 border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-transparent to-teal-50/60 p-3 shadow-sm 2xl:hidden">
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">Current Browsing</p>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-emerald-200 bg-white text-emerald-700">
                                <ActivePageIcon className="h-4 w-4" strokeWidth={2} />
                            </span>
                            <p className="truncate text-sm font-medium text-gray-900">
                                {ActivePageIcon.label}
                            </p>
                        </div>
                    </div>

                    <DrawerTrigger asChild>
                        <Button type="button" variant="outline-emerald" size="sm" shouldScale>
                            <PanelRightOpen className="h-4 w-4" strokeWidth={2} />
                            Browse
                        </Button>
                    </DrawerTrigger>
                </div>
            </Card>

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
                                        if (href !== ActivePageContent.hrefzzzzzzzzzzzzzzzzzzz) router.push(href)
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