"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/clsx"

export type FilterOption = {
    value: string | number
    label: string
    icon?: LucideIcon
    metaLabel?: string
}

interface FilterDropdownProps {
    label?: string
    labelVariant?: "default" | "profile" | "auth"
    id?: string
    options: FilterOption[]
    value: string | number
    onChange: (value: string | number) => void
    placeholder?: string
    triggerIcon?: LucideIcon
    theme?: "emerald" | "amber" | "blue" | "purple" | "slate"
    className?: string
    contentClassName?: string
    classNames?: {
        trigger?: string;
        triggerButton?: string;
        content?: string;
        label?: string;
    }
}

const THEME_CLASS = {
    emerald: {
        triggerIcon: "text-emerald-600",
        selectedItem: "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 data-[highlighted]:bg-emerald-100",
        selectedIcon: "text-emerald-700",
    },
    amber: {
        triggerIcon: "text-amber-600",
        selectedItem: "bg-amber-50 text-amber-950 hover:bg-amber-100 data-[highlighted]:bg-amber-100",
        selectedIcon: "text-amber-700",
    },
    blue: {
        triggerIcon: "text-blue-600",
        selectedItem: "bg-blue-50 text-blue-900 hover:bg-blue-100 data-[highlighted]:bg-blue-100",
        selectedIcon: "text-blue-700",
    },
    purple: {
        triggerIcon: "text-purple-600",
        selectedItem: "bg-purple-50 text-purple-900 hover:bg-purple-100 data-[highlighted]:bg-purple-100",
        selectedIcon: "text-purple-700",
    },
    slate: {
        triggerIcon: "text-gray-600",
        selectedItem: "bg-gray-100 text-gray-900 hover:bg-gray-200 data-[highlighted]:bg-gray-200",
        selectedIcon: "text-gray-700",
    },
} as const

const FilterDropdown = ({
    label,
    id,
    options,
    value,
    onChange,
    labelVariant = "default",
    placeholder = "Filter",
    triggerIcon: TriggerIconFallback,
    theme = "emerald",
    className,
    classNames,
}: FilterDropdownProps) => {
    const [open, setOpen] = useState(false)
    const selected = options.find((o) => o.value === value)
    const SelectedLabel = selected?.label ?? placeholder
    const TriggerIcon = selected?.icon ?? TriggerIconFallback

    const t = THEME_CLASS[theme]

    return (
        <div>
            {label && label?.length > 0 && (
                <label
                    htmlFor={id}
                    className={cn(
                        "w-max pb-2 flex gap-1",
                        // Variants 
                        labelVariant === "default" && "text-sm font-medium text-gray-700",
                        labelVariant === "profile" && "text-sm font-medium text-gray-700",
                        labelVariant === "auth" && "text-xs font-semibold uppercase tracking-wide text-gray-700 pb-2",

                        classNames?.label
                    )}
                >
                    {label}
                </label>
            )}

            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    asChild
                    className={cn(
                        "block w-full min-w-0 max-w-full outline-none focus:outline-none focus-visible:outline-none select-none",
                        className,
                        classNames?.trigger
                    )}
                >
                    <span
                        className={cn(
                            "flex w-full min-w-0 items-center justify-between gap-2",
                            "rounded-md border border-gray-200 bg-white px-3",
                            "text-sm font-medium text-gray-700 transition-[color,box-shadow,border-color]",
                            "outline-none hover:bg-gray-50",
                            "focus-visible:border-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-100",
                            "h-10",
                            classNames?.triggerButton
                        )}
                        aria-expanded={open}
                    >
                        <span className="flex min-w-0 flex-1 items-center gap-2 text-left">
                            {TriggerIcon ? (
                                <TriggerIcon
                                    className={cn("h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4", t.triggerIcon)}
                                    aria-hidden
                                />
                            ) : null}
                            <span className="truncate text-left">{SelectedLabel}</span>
                        </span>
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
                                open ? "rotate-180" : ""
                            )}
                        />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    sideOffset={6}
                    className={cn(
                        "w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)] scrollbar-thin",
                        "max-h-80 overflow-y-auto border border-gray-200 bg-white p-1 text-sm shadow-md select-none",
                        classNames?.content
                    )}
                >
                    {options.map((opt) => {
                        const RowIcon = opt.icon
                        return (
                            <DropdownMenuItem
                                key={String(opt.value)}
                                onClick={() => {
                                    onChange(opt.value)
                                    setOpen(false)
                                }}
                                className={cn(
                                    "relative flex cursor-pointer items-center justify-between gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none",
                                    "mb-0.5 last:mb-0 transition-colors",
                                    value === opt.value
                                        ? t.selectedItem
                                        : "text-gray-700 hover:bg-gray-50 data-[highlighted]:bg-gray-50"
                                )}
                            >
                                <p className="flex min-w-0 flex-1 items-center gap-2 truncate">
                                    {RowIcon ? (
                                        <RowIcon
                                            className={cn(
                                                "h-4 w-4 shrink-0",
                                                value === opt.value ? t.selectedIcon : "text-gray-500"
                                            )}
                                            aria-hidden
                                        />
                                    ) : null}
                                    <span className="truncate text-sm font-medium">{opt.label}</span>
                                    {opt.metaLabel ? (
                                        <span className="ml-1 rounded-full border border-gray-200 bg-gray-50 text-[10px] leading-none py-1
                                    font-medium tabular-nums text-gray-600 flex items-center justify-center w-max h-max px-1.5 truncate">
                                            {opt.metaLabel}
                                        </span>
                                    ) : null}
                                </p>

                                {value === opt.value && (
                                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                                        <Check className="h-4 w-4 shrink-0" strokeWidth={2} />
                                    </span>
                                )}
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


export default FilterDropdown