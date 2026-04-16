"use client"

import { LucideIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { cn } from '@/lib/utils/clsx'

type SwitchItemProps = {
    variant: "red" | "purple" | "gray" | "amber" | "blue" | "pink" | "emerald"
    title: string
    description: string
    icon: LucideIcon
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    classNames?: {
        container?: string
        iconWrapper?: string
        icon?: string
        title?: string
        description?: string
        switch?: string
        contentSwitchWrapper?: string
    }
    className?: string
}

const SwitchItem = ({
    variant,
    title,
    description,
    icon: Icon,
    checked,
    onCheckedChange,
    classNames,
    className
}: SwitchItemProps) => {
    return (
        <div
            className={cn(
                "rounded-md border border-gray-200/90 p-4",
                variant === "red" && "border-red-200/90 bg-red-50/60",
                variant === "purple" && "border-purple-200/90 bg-purple-50/60",
                variant === "gray" && "border-gray-200/90 bg-gray-50/60",
                variant === "amber" && "border-amber-200/90 bg-amber-50/60",
                variant === "blue" && "border-blue-200/90 bg-blue-50/60",
                variant === "pink" && "border-pink-200/90 bg-pink-50/60",
                variant === "emerald" && "border-emerald-200/90 bg-emerald-50/60",
                className
            )}
        >
            <div className={cn(
                "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
                classNames?.contentSwitchWrapper
            )}>

                <div className="flex gap-3">
                    {/* Icon + Wrapper */}
                    <div
                        className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white ring-1",
                            variant === "red" && "text-red-700 ring-red-100",
                            variant === "purple" && "text-purple-700 ring-purple-100",
                            variant === "gray" && "text-gray-700 ring-gray-100",
                            variant === "amber" && "text-amber-700 ring-amber-100",
                            variant === "blue" && "text-blue-700 ring-blue-100",
                            variant === "pink" && "text-pink-700 ring-pink-100",
                            variant === "emerald" && "text-emerald-700 ring-emerald-100",
                            classNames?.iconWrapper
                        )}
                    >
                        <Icon
                            className={cn("h-4 w-4", classNames?.icon)}
                            strokeWidth={2}
                        />
                    </div>

                    {/* Title + Description  */}
                    <div className="min-w-0 space-y-1">
                        <p
                            className={cn(
                                "text-sm font-medium",
                                variant === "red" && "text-red-950",
                                variant === "purple" && "text-purple-950",
                                variant === "gray" && "text-gray-900",
                                variant === "amber" && "text-amber-950",
                                variant === "blue" && "text-blue-950",
                                variant === "pink" && "text-pink-950",
                                variant === "emerald" && "text-emerald-950",
                                classNames?.title
                            )}
                        >
                            {title}
                        </p>
                        <p
                            className={cn(
                                "text-sm opacity-80",
                                variant === "red" && "text-red-900",
                                variant === "purple" && "text-purple-900",
                                variant === "gray" && "text-gray-600",
                                variant === "amber" && "text-amber-900",
                                variant === "blue" && "text-blue-900",
                                variant === "pink" && "text-pink-900",
                                variant === "emerald" && "text-emerald-900",
                                classNames?.description
                            )}
                        >
                            {description}
                        </p>
                    </div>
                </div>

                {/* Switch Item  */}
                <Switch
                    variant={variant}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    className={classNames?.switch}
                />
            </div>
        </div>
    )
}

export default SwitchItem