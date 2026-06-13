import { cn } from "@/lib/utils/clsx"

type FadeEdgeProps = {
    fadeDirection?: "left" | "right" | "both"
    className?: string
    /** Hide fades on narrow viewports — avoids clipping content on ~300px screens */
    hideBelow?: "sm" | "md" | "lg"
    classNames?: {
        left?: string
        right?: string
    }
}

const HIDE_BELOW = {
    sm: "hidden sm:block",
    md: "hidden md:block",
    lg: "hidden lg:block",
} as const

const FadeEdge = ({
    fadeDirection = "both",
    className,
    hideBelow,
    classNames,
}: FadeEdgeProps) => {
    const isLeft = fadeDirection === "left"
    const isRight = fadeDirection === "right"
    const isBoth = fadeDirection === "both"
    const visibility = hideBelow ? HIDE_BELOW[hideBelow] : ""

    const edgeBase = cn(
        "pointer-events-none absolute inset-y-0 z-10",
        "w-6 xs:w-10 sm:w-16 md:w-24 lg:w-32",
        visibility
    )

    const leftEdge = (
        <div
            className={cn(
                edgeBase,
                "left-0 bg-gradient-to-r from-marketing-light via-marketing-light/90 to-transparent",
                classNames?.left
            )}
        />
    )

    const rightEdge = (
        <div
            className={cn(
                edgeBase,
                "right-0 bg-gradient-to-l from-marketing-light via-marketing-light/90 to-transparent",
                classNames?.right
            )}
        />
    )

    return (
        <div className={cn(className)}>
            {isBoth ? (
                <>
                    {leftEdge}
                    {rightEdge}
                </>
            ) : (
                <>
                    {isLeft && leftEdge}
                    {isRight && rightEdge}
                </>
            )}
        </div>
    )
}

export default FadeEdge
