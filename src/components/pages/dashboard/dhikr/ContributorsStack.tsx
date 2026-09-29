"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronRight } from "lucide-react"
import ContributorAvatar from "./ContributorAvatar"
import { Button } from "@/components/ui/button"

export type Contributor = {
    id: string
    name: string
    username: string
    avatar: string
    owner?: boolean
}

const MAX_VISIBLE_AVATARS = 3

type ContributorsStackProps = {
    contributors: Contributor[]
    onClick?: (e: React.MouseEvent) => void
}

export default function ContributorsStack({ contributors, onClick }: ContributorsStackProps) {
    const [overflowOpen, setOverflowOpen] = useState(false)
    const overflowCount = Math.max(0, contributors.length - MAX_VISIBLE_AVATARS)
    const visibleContributors = overflowCount > 0
        ? contributors.slice(0, MAX_VISIBLE_AVATARS)
        : contributors

    return (
        <div
            className="flex -space-x-2 shrink-0"
            onClick={onClick}
        >
            {visibleContributors.map((user) => (
                <ContributorAvatar
                    key={user.id}
                    user={user}
                    onClick={(e) => e.stopPropagation()}
                />
            ))}

            {overflowCount > 0 && (
                <Popover open={overflowOpen} onOpenChange={setOverflowOpen}>
                    <PopoverTrigger >
                        <Button
                            asChild
                            type="button"
                            variant="ghost"
                            className="relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center 
                            justify-center rounded-full border-2 border-white bg-gray-100 
                            text-xs font-bold text-gray-600 transition-colors hover:bg-emerald-50 
                            hover:text-emerald-700 p-0"
                            onClick={(e) => {
                                e.stopPropagation()
                                setOverflowOpen(true)
                            }}
                            onMouseEnter={() => setOverflowOpen(true)}
                        >
                            +{overflowCount}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-60 py-2 pl-1 pr-0 z-[110] rounded-md border-gray-200 shadow-lg"
                        side="top"
                        align="start"
                        onClick={(e) => e.stopPropagation()}
                        onMouseLeave={() => setOverflowOpen(false)}
                    >
                        <div className="max-h-48 space-y-0.5 overflow-y-auto scrollbar-thin">
                            {contributors.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-gray-50"
                                >
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="text-[10px]">{user.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-1">
                                            <p className="truncate text-xs font-semibold text-gray-900">{user.name}</p>
                                            {user.owner && (
                                                <Badge variant="emerald" className="h-4 px-1.5 text-[9px] font-bold uppercase">
                                                    Owner
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="truncate text-[10px] text-gray-400">{user.username}</p>
                                    </div>
                                    <Link
                                        href={`/profile/${user.id}`}
                                        className="shrink-0 rounded-full p-0.5 text-gray-400 ease duration-200 
                                        hover:bg-emerald-50 hover:text-emerald-600 border border-transparent
                                        hover:border-emerald-300"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ChevronRight size={18} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}
