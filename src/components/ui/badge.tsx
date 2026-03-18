import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/clsx"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                emerald: "bg-emerald-100 border-emerald-200 text-emerald-700",
                purple: "bg-purple-100 border-purple-200 text-purple-700",
                blue: "bg-blue-100 border-blue-200 text-blue-700",
                red: "bg-red-100 border-red-200 text-red-700",
                pink: "bg-pink-50 text-pink-700 border-pink-200",
                amber: "bg-amber-100 border-amber-200 text-amber-700",
                solid: "bg-emerald-600 border-emerald-600 text-white",
            },
            severity: {
                low: "bg-emerald-50 border-emerald-200 text-emerald-600",
                medium: "bg-blue-50 border-blue-200 text-blue-600",
                high: "bg-red-50 border-red-200 text-red-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    variant?: "default" | "secondary" | "destructive" | "outline" | "emerald" | "purple" | "blue" | "amber" | "solid" | "red" | "pink"
    severity?: "low" | "medium" | "high"
}

function Badge({ className, variant, severity, ...props }: BadgeProps) {
    return (
        <div
            className={cn(
                badgeVariants({ variant, severity }),
                "text-xs font-medium",
                className
            )}
            {...props}
        />
    )
}

export { Badge, badgeVariants }

