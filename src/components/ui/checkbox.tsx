"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { motion } from "framer-motion"
import { tv, type VariantProps } from "tailwind-variants"
import { cn } from "@/lib/utils/clsx"

const checkboxVariants = tv({
    base: [
        "peer grid shrink-0 place-content-center rounded-sm border bg-white",
        "transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-out",
        "ring-offset-background focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "enabled:active:scale-[0.96]",
    ],
    variants: {
        variant: {
            default: [
                "border-gray-300 text-gray-900",
                "hover:border-emerald-400/90 hover:bg-emerald-50/40",
                "data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white",
                "focus-visible:ring-emerald-500",
            ],
            "default-red": [
                "border-gray-300 text-gray-900",
                "hover:border-red-400/90 hover:bg-red-50/40",
                "data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white",
                "focus-visible:ring-red-500",
            ],
            "default-blue": [
                "border-gray-300 text-gray-900",
                "hover:border-blue-400/90 hover:bg-blue-50/40",
                "data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white",
                "focus-visible:ring-blue-500",
            ],
            "default-purple": [
                "border-gray-300 text-gray-900",
                "hover:border-purple-400/90 hover:bg-purple-50/40",
                "data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white",
                "focus-visible:ring-purple-500",
            ],
            "default-amber": [
                "border-gray-300 text-gray-900",
                "hover:border-amber-400/90 hover:bg-amber-50/40",
                "data-[state=checked]:border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-white",
                "focus-visible:ring-amber-500",
            ],

            outline: [
                "border-gray-300 bg-white text-gray-900",
                "hover:bg-gray-50",
                "data-[state=checked]:border-gray-500 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900",
                "focus-visible:ring-gray-400",
            ],
            "outline-emerald": [
                "border-emerald-200 bg-white text-emerald-800",
                "hover:border-emerald-300 hover:bg-emerald-50/60",
                "data-[state=checked]:border-emerald-600 data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-700",
                "focus-visible:ring-emerald-500",
            ],
            "outline-red": [
                "border-red-200 bg-white text-red-800",
                "hover:border-red-300 hover:bg-red-50/60",
                "data-[state=checked]:border-red-600 data-[state=checked]:bg-red-50 data-[state=checked]:text-red-700",
                "focus-visible:ring-red-500",
            ],
            "outline-blue": [
                "border-blue-200 bg-white text-blue-800",
                "hover:border-blue-300 hover:bg-blue-50/60",
                "data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700",
                "focus-visible:ring-blue-500",
            ],
            "outline-purple": [
                "border-purple-200 bg-white text-purple-800",
                "hover:border-purple-300 hover:bg-purple-50/60",
                "data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-50 data-[state=checked]:text-purple-700",
                "focus-visible:ring-purple-500",
            ],
            "outline-amber": [
                "border-amber-200 bg-white text-amber-900",
                "hover:border-amber-300 hover:bg-amber-50/60",
                "data-[state=checked]:border-amber-600 data-[state=checked]:bg-amber-50 data-[state=checked]:text-amber-800",
                "focus-visible:ring-amber-500",
            ],

            ghost: [
                "border-transparent bg-transparent text-gray-800",
                "hover:bg-gray-200/50",
                "data-[state=checked]:border-gray-300 data-[state=checked]:bg-gray-100 data-[state=checked]:text-gray-900",
                "focus-visible:ring-gray-400",
            ],
            "ghost-emerald": [
                "border-transparent bg-transparent text-emerald-800",
                "hover:bg-emerald-50",
                "data-[state=checked]:border-emerald-200 data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-700",
                "focus-visible:ring-emerald-500",
            ],
            "ghost-red": [
                "border-transparent bg-transparent text-red-800",
                "hover:bg-red-50",
                "data-[state=checked]:border-red-200 data-[state=checked]:bg-red-50 data-[state=checked]:text-red-700",
                "focus-visible:ring-red-500",
            ],
            "ghost-blue": [
                "border-transparent bg-transparent text-blue-800",
                "hover:bg-blue-50",
                "data-[state=checked]:border-blue-200 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700",
                "focus-visible:ring-blue-500",
            ],
            "ghost-purple": [
                "border-transparent bg-transparent text-purple-800",
                "hover:bg-purple-50",
                "data-[state=checked]:border-purple-200 data-[state=checked]:bg-purple-50 data-[state=checked]:text-purple-700",
                "focus-visible:ring-purple-500",
            ],
            "ghost-amber": [
                "border-transparent bg-transparent text-amber-900",
                "hover:bg-amber-50",
                "data-[state=checked]:border-amber-200 data-[state=checked]:bg-amber-50 data-[state=checked]:text-amber-800",
                "focus-visible:ring-amber-500",
            ],

            destructive: [
                "border-gray-300 text-gray-900",
                "hover:border-red-400/90 hover:bg-red-50/40",
                "data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white",
                "focus-visible:ring-red-500",
            ],
            secondary: [
                "border-gray-300 text-gray-900",
                "hover:bg-gray-50",
                "data-[state=checked]:border-gray-400 data-[state=checked]:bg-gray-200 data-[state=checked]:text-gray-900",
                "focus-visible:ring-gray-500",
            ],
        },
        size: {
            sm: "w-[17px] h-[17px]",
            default: "w-[17px] h-[17px]",
            md: "h-5 w-5",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})


const CHECK_PATH = "M6 12.5 L10.25 16.75 L18.25 7"

const checkDrawTransition = {
    pathLength: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
    opacity: { duration: 0.18, ease: "easeOut" as const },
}


const checkSvgVariants = tv({
    base: "block shrink-0 overflow-visible text-current",
    variants: {
        size: {
            sm: "w-[17px] h-[17px]",
            default: "w-[17px] h-[17px]",
            md: "w-[18px] h-[18px]",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>

const strokeWidthForSize: Record<CheckboxSize, number> = {
    sm: 2.25,
    default: 2.5,
    md: 2.75,
}

function CheckboxAnimatedCheck({ size }: { size: CheckboxSize }) {
    return (
        <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={checkSvgVariants({ size })}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={checkDrawTransition.opacity}
        >
            <motion.path
                d={CHECK_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidthForSize[size]}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={checkDrawTransition.pathLength}
            />
        </motion.svg>
    )
}

const checkboxIndicatorClass = "grid place-content-center text-current"

export interface CheckboxProps
    extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> { }

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "user-select-none select-none [&_*]:select-none",
            checkboxVariants({ variant, size }),
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator className={checkboxIndicatorClass}>
            <CheckboxAnimatedCheck size={size ?? "default"} />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
