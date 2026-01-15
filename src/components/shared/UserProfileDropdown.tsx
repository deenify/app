"use client"

import React from "react"
import {
  LogOut,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { profileMenuItems } from "../layout/header/content"
import Link from "next/link"

export type UserStats = {
  daysStreak?: number
  points?: number
  globalRank?: number
}

export type UserPreferences = {
  name?: string
  email?: string
  avatar?: string
  stats?: UserStats
}

interface UserProfileDropdownProps {
  user?: UserPreferences
  onSignOut?: () => void
  className?: string
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onSignOut,
  className,
}) => {
  const initials = user?.name?.charAt(0)?.toUpperCase() || "U"
  const stats = user?.stats || {}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "!focus-visible:ring-0 !focus-visible:ring-offset-0 focus-visible:outline-none",
          "focus:outline-none !ring-0 !ring-offset-0",
          "active:ring-0 active:ring-offset-0",
        )}
      >
        <Button
          asChild
          variant="ghost"
          className={cn("h-10 px-2 gap-2 min-w-[60px] justify-start", className)}
        >
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarFallback className="bg-emerald-600 text-white text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-gray-600 hidden sm:inline flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[380px] border border-gray-200 shadow-none p-0">
        {/* Header Section */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-4 mb-5">
            <Avatar className="h-14 w-14 flex-shrink-0">
              <AvatarFallback className="bg-emerald-600 text-white text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-gray-900 font-semibold text-base truncate font-heading">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500 truncate mt-1">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="text-center p-3 bg-emerald-50 rounded-md border border-emerald-100">
              <p className="text-emerald-700 font-bold text-lg">
                {stats.daysStreak || 0}
              </p>
              <p className="text-xs text-gray-600 mt-1">Streak</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-blue-700 font-bold text-lg">
                {stats.points || 0}
              </p>
              <p className="text-xs text-gray-600 mt-1">Points</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-md border border-purple-100">
              <p className="text-purple-700 font-bold text-lg">
                #{stats.globalRank || 0}
              </p>
              <p className="text-xs text-gray-600 mt-1">Rank</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-2 py-2">
          {profileMenuItems.map((section, idx) => (
            <div key={idx} className="mb-3 last:mb-0">
              <div className="px-2 py-1.5 mb-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-heading">
                  {section.label}
                </p>
              </div>
              {section.sectionItems.map((item, idxx) => (
                <Link
                  key={idxx}
                  href={item.href}
                  className="block"
                >
                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer rounded-sm px-2.5 py-2 mb-0.5 last:mb-0 transition-colors duration-150",
                      "hover:bg-emerald-50 hover:text-emerald-900",
                      "focus:bg-emerald-50 focus:text-emerald-900"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Sign Out */}
        <div className="p-1.5 border-t border-gray-200">
          <DropdownMenuItem
            onClick={onSignOut}
            className={cn(
              "cursor-pointer rounded-sm px-2.5 py-2 transition-colors duration-150",
              "hover:bg-red-50 hover:text-red-600 text-red-600",
              "focus:bg-red-50 focus:text-red-600"
            )}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

