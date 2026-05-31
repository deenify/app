"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronRight } from "lucide-react"
import { useState } from "react";

const ContributorAvatar = ({ user }: { user: any }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Popover open={isHovered} onOpenChange={setIsHovered}>
            <PopoverTrigger asChild>
                <div
                    className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full border-2 
                    border-white transition-transform bg-gray-200"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Avatar className="h-full w-full">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-[10px]">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-48 p-3 translate-y-2 border-none shadow-none bg-transparent pb-2"
                side="top"
                align="center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="rounded-md bg-white p-2 border border-gray-200 shadow-md">
                    <div className="flex gap-3 pb-3">
                        <Avatar className="h-10 w-10 bg-gray-100">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.username}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost-emerald"
                        href={`/profile/${user.id}`}
                        size="max"
                        className="px-3 py-2 rounded-sm justify-between bg-gray-50 text-xs w-full"
                    >
                        View profile
                        <ChevronRight className="h-3 w-3" />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ContributorAvatar