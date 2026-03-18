"use client"

import * as React from "react"
import { cn } from "@/lib/utils/clsx"

export type RangeSliderColor = "emerald" | "blue" | "purple"

const colorClasses: Record<RangeSliderColor, string> = {
    emerald:
        "[&::-webkit-slider-runnable-track]:bg-emerald-200 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-moz-range-track]:bg-emerald-200 [&::-moz-range-thumb]:bg-emerald-500",
    blue:
        "[&::-webkit-slider-runnable-track]:bg-blue-200 [&::-webkit-slider-thumb]:bg-blue-500 [&::-moz-range-track]:bg-blue-200 [&::-moz-range-thumb]:bg-blue-500",
    purple:
        "[&::-webkit-slider-runnable-track]:bg-purple-200 [&::-webkit-slider-thumb]:bg-purple-500 [&::-moz-range-track]:bg-purple-200 [&::-moz-range-thumb]:bg-purple-500",
}

export interface RangeSliderProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    color?: RangeSliderColor
}

export function RangeSlider({ className, color = "emerald", ...props }: RangeSliderProps) {
    return (
        <input
            type="range"
            className={cn(
                "w-full appearance-none cursor-pointer bg-transparent accent-transparent",
                `[&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-runnable-track]:rounded-full`,
                `[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5`,
                "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white",
                colorClasses[color],
                "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:-mt-2",
                "[&::-moz-range-track]:h-0.5 [&::-moz-range-track]:rounded-full",
                "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full",
                "[&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white",
                "[&::-moz-range-thumb]:shadow-lg",
                className
            )}
            {...props}
        />
    )
}

