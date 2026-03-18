"use client"

import * as React from "react"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils/clsx"

const switchVariants = tv({
    base: [
        "relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    variants: {
        size: {
            sm: "w-9 h-[calc(12px+6px)]",
            md: "w-11 h-[calc(16px+6px)]",
            lg: "w-14 h-[calc(20px+6px)]",
        },
        // Extend variant with color options similar to Badge/Button
        variant: {
            // Back-compat
            default: ["bg-gray-300", "data-[checked=true]:bg-emerald-600", "focus-visible:ring-emerald-500"],
            faded: ["bg-gray-200", "data-[checked=true]:bg-emerald-500/70", "focus-visible:ring-emerald-500"],
            // Color variants
            emerald: ["bg-gray-300", "data-[checked=true]:bg-emerald-600", "focus-visible:ring-emerald-500"],
            blue: ["bg-gray-300", "data-[checked=true]:bg-blue-600", "focus-visible:ring-blue-500"],
            purple: ["bg-gray-300", "data-[checked=true]:bg-purple-600", "focus-visible:ring-purple-500"],
            pink: ["bg-gray-300", "data-[checked=true]:bg-pink-600", "focus-visible:ring-pink-500"],
            amber: ["bg-gray-300", "data-[checked=true]:bg-amber-500", "focus-visible:ring-amber-500"],
            red: ["bg-gray-300", "data-[checked=true]:bg-red-600", "focus-visible:ring-red-500"],
            gray: ["bg-gray-300", "data-[checked=true]:bg-gray-600", "focus-visible:ring-gray-500"],
        },
    },
    defaultVariants: {
        size: "md",
        variant: "default",
    },
})

const switchThumbVariants = tv({
    base: [
        "absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-300 ease-in-out",
        "shadow-[0_2px_6px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.1)]",
        "border border-gray-100/50",
    ],
    variants: {
        size: {
            // 100% - thumb width - right padding
            sm: [
                "w-3 h-3 left-[3px]",
                "data-[checked=true]:left-[calc(100%-12px-3px)]",
            ],
            md: [
                "h-4 w-4 left-[3px]",
                "data-[checked=true]:left-[calc(100%-16px-3px)]",
            ],
            lg: [
                "h-5 w-5 left-[3px]",
                "data-[checked=true]:left-[calc(100%-20px-3px)]",
            ],
        },
    },
    defaultVariants: {
        size: "md",
    },
})

export interface SwitchProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchVariants> {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
    ({ className, size, variant, checked = false, onCheckedChange, disabled, ...props }, ref) => {
        const handleClick = () => {
            if (!disabled && onCheckedChange) {
                onCheckedChange(!checked)
            }
        }

        return (
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                data-checked={checked}
                onClick={handleClick}
                disabled={disabled}
                className={cn(switchVariants({ size, variant }), className)}
                ref={ref}
                {...props}
            >
                <span
                    data-checked={checked}
                    className={cn(switchThumbVariants({ size }))}
                />
            </button>
        )
    }
)

Switch.displayName = "Switch"
export { Switch, switchVariants }
