"use client"

import React, { useState } from "react"
import { Modal } from "@/components/shared/Modal"
import { usePagination } from "@/hooks/usePagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
    Search, 
    Plus, 
    ArrowRight,
    Globe,
    Users,
    MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { Pagination } from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"

interface WorldwideAdkarModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (adkhar: any) => void
    existingIds?: string[]
}

const WORLDWIDE_ADKHAR = Array.from({ length: 50 }, (_, i) => ({
    id: `world-${i}`,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    title: "Subhanallah wa bihamdihi",
    translation: "Glory be to Allah and His is the praise, Glory be to Allah the Great.",
    author: {
        id: `${i}`,
        name: `Contributor ${i}`,
        username: `@user_${i}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`
    }
}))

export function WorldwideAdkarModal({ isOpen, onOpenChange, onSelect, existingIds = [] }: WorldwideAdkarModalProps) {
    const [search, setSearch] = useState("")
    
    const filteredItems = WORLDWIDE_ADKHAR.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) || 
        item.translation.toLowerCase().includes(search.toLowerCase()) ||
        item.author.name.toLowerCase().includes(search.toLowerCase())
    )

    const { paginatedItems, page, setPage, totalPages } = usePagination(filteredItems, 6)

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 shrink-0">
                        <Globe className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">Worldwide Adkar</p>
                        <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 truncate">Explore community shared formulas</p>
                    </div>
                </div>
            }
            className="w-[min(calc(100vw-2rem),700px)]"
            classNames={{
                body: "p-0",
                content: "p-0 overflow-hidden flex flex-col h-[500px] sm:h-[600px]",
                footer: "border-t border-gray-100 bg-gray-50/50 py-3"
            }}
            footer={
                totalPages > 1 && (
                    <Pagination 
                        page={page} 
                        totalPages={totalPages} 
                        onPageChange={setPage} 
                        align="center"
                        isMobile={typeof window !== 'undefined' && window.innerWidth < 640}
                    />
                )
            }
        >
            <div className="p-4 sm:p-6 space-y-6 flex flex-col h-full overflow-hidden">
                <div className="relative shrink-0">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
                    <Input
                        placeholder="Search worldwide adkar or contributors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                        classNames={{
                            input: "pl-9 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-emerald-300 h-11"
                        }}
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 flex-1 overflow-y-auto pr-1 scrollbar-thin">
                    {paginatedItems.map((item) => {
                        const isAdded = existingIds.includes(item.id)
                        
                        return (
                            <button
                                key={item.id}
                                disabled={isAdded}
                                onClick={() => onSelect(item)}
                                className={cn(
                                    "group flex flex-col rounded-2xl border p-4 sm:p-5 text-left transition-all bg-white",
                                    isAdded 
                                        ? "opacity-60 grayscale-[0.5] border-emerald-100 cursor-default" 
                                        : "border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-lg hover:shadow-emerald-50/50"
                                )}
                            >
                                <div className="mb-4 space-y-2 min-w-0">
                                    <p className="font-arabic text-xl text-gray-900 truncate" dir="rtl">{item.arabic}</p>
                                    <p className="text-sm font-bold text-gray-900 truncate">{item.title}</p>
                                    <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">{item.translation}</p>
                                </div>
                                
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                                    <ContributorHover user={item.author} />
                                    <div className={cn(
                                        "h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg flex items-center justify-center transition-all",
                                        isAdded 
                                            ? "bg-emerald-100 text-emerald-600" 
                                            : "bg-gray-50 text-gray-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-12"
                                    )}>
                                        {isAdded ? (
                                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth={3}>
                                                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ) : (
                                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                                        )}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                    
                    {paginatedItems.length === 0 && (
                        <div className="col-span-full py-16 text-center">
                            <p className="text-sm text-gray-400 font-medium">No results found for "{search}"</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    )
}

function ContributorHover({ user }: { user: any }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Popover open={isHovered} onOpenChange={setIsHovered}>
            <PopoverTrigger asChild>
                <div 
                    className="flex items-center gap-2 cursor-pointer group/author min-w-0"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Avatar className="h-6 w-6 sm:h-7 sm:w-7 border border-gray-100 group-hover/author:border-emerald-200 transition-colors shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[10px]">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <p className="text-[11px] font-bold text-gray-700 truncate group-hover/author:text-emerald-700 transition-colors">
                            {user.name}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">{user.username}</p>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent 
                className="w-48 p-3 z-[110]" 
                side="top" 
                align="start"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.username}</p>
                    </div>
                </div>
                <Link 
                    href={`/profile/${user.id}`}
                    className="mt-3 flex w-full items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                >
                    View profile
                    <MoreHorizontal className="h-3 w-3" />
                </Link>
            </PopoverContent>
        </Popover>
    )
}
