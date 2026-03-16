"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/clsx"

export type QuranFilterOption = {
    value: string | number
    label: string
}

interface QuranFilterDropdownProps {
    options: QuranFilterOption[]
    value: string | number
    onChange: (value: string | number) => void
    placeholder?: string
}

export default function QuranFilterDropdown({
    options,
    value,
    onChange,
    placeholder = "Filter",
}: QuranFilterDropdownProps) {
    const [open, setOpen] = useState(false)
    const selected = options.find((o) => o.value === value)
    const label = selected?.label ?? placeholder

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="h-full w-full min-w-0 outline-none focus:outline-none focus-visible:outline-none">
                <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    shouldScale={false}
                    className="h-10 sm:h-11 w-full min-w-0 justify-between rounded-lg border border-gray-200 bg-gray-50/80 px-2.5 sm:px-3 text-[11px] sm:text-sm font-medium text-gray-700 hover:bg-gray-100/80"
                >
                    <span className="truncate">{label}</span>
                    <ChevronDown
                        className={cn(
                            "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-gray-400 transition-transform duration-200",
                            open ? "rotate-180" : ""
                        )}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-full min-w-0 border border-gray-200 bg-white p-1 sm:p-1.5 shadow-md text-xs sm:text-sm sm:min-w-[200px]"
            >
                {options.map((opt) => (
                    <DropdownMenuItem
                        key={String(opt.value)}
                        onClick={() => {
                            onChange(opt.value)
                            setOpen(false)
                        }}
                        className={cn(
                            "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 sm:px-2.5 sm:py-2 mb-0.5 last:mb-0 transition-colors focus:bg-transparent focus:outline-none",
                            value === opt.value
                                ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 data-[highlighted]:bg-emerald-100"
                                : "text-gray-700 hover:bg-gray-50 data-[highlighted]:bg-gray-50"
                        )}
                    >
                        <span className="text-[11px] sm:text-sm font-medium truncate">{opt.label}</span>
                        {value === opt.value && <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" strokeWidth={2} />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
