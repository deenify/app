"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    /** Optional icon shown in trigger (when selected) and in each menu row */
    icon?: LucideIcon
}

interface FilterDropdownProps {
    options: FilterOption[]
    value: string | number
    onChange: (value: string | number) => void
    placeholder?: string
    /** Shown in trigger when no option defines an icon */
    triggerIcon?: LucideIcon
}

const FilterDropdown = ({
    options,
    value,
    onChange,
    placeholder = "Filter",
    triggerIcon: TriggerIconFallback,
}: FilterDropdownProps) => {
    const [open, setOpen] = useState(false)
    const selected = options.find((o) => o.value === value)
    const label = selected?.label ?? placeholder
    const TriggerIcon = selected?.icon ?? TriggerIconFallback

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="h-full w-full min-w-0 outline-none focus:outline-none focus-visible:outline-none">
                <Button
                    asChild
                    type="button"
                    variant="ghost"
                    size="md"
                    shouldScale={false}
                    className="h-10 sm:h-11 w-full min-w-0 justify-between rounded-lg border border-gray-200 bg-gray-50/80 px-2.5 sm:px-3 text-[11px] sm:text-sm font-medium text-gray-700 hover:bg-gray-100/80"
                >
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                        {TriggerIcon ? (
                            <TriggerIcon
                                className="h-3.5 w-3.5 shrink-0 text-emerald-600 sm:h-4 sm:w-4"
                                aria-hidden
                            />
                        ) : null}
                        <span className="truncate text-left">{label}</span>
                    </span>
                    <ChevronDown
                        className={cn(
                            "h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform duration-200 sm:h-4 sm:w-4",
                            open ? "rotate-180" : ""
                        )}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)]
                 border border-gray-200 bg-white p-1 sm:p-1.5 shadow-md text-xs sm:text-sm"
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
                                "flex cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-1.5 sm:px-2.5 sm:py-2 mb-0.5 last:mb-0 transition-colors focus:bg-transparent focus:outline-none",
                                value === opt.value
                                    ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 data-[highlighted]:bg-emerald-100"
                                    : "text-gray-700 hover:bg-gray-50 data-[highlighted]:bg-gray-50"
                            )}
                        >
                            <span className="flex min-w-0 flex-1 items-center gap-2">
                                {RowIcon ? (
                                    <RowIcon
                                        className={cn(
                                            "h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4",
                                            value === opt.value ? "text-emerald-700" : "text-gray-500"
                                        )}
                                        aria-hidden
                                    />
                                ) : null}
                                <span className="text-[11px] sm:text-sm font-medium truncate">{opt.label}</span>
                            </span>
                            {value === opt.value && (
                                <Check className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} />
                            )}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default FilterDropdown