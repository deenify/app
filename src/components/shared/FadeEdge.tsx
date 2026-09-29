import { cn } from "@/lib/utils/clsx"

type FadeEdgeProps = {
    fadeDirection?: "left" | "right" | "both"
    className?: string
    /** Hide fades on narrow viewports — avoids clipping content on ~300px screens */
    hideBelow?: "sm" | "md" | "lg"
    /** When false, left fade hides. Default true. */
    showLeft?: boolean
    /** When false, right fade hides. Default true. */
    showRight?: boolean
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
    showLeft = true,
    showRight = true,
    classNames,
}: FadeEdgeProps) => {
    const isLeft = fadeDirection === "left"
    const isRight = fadeDirection === "right"
    const isBoth = fadeDirection === "both"
    const visibility = hideBelow ? HIDE_BELOW[hideBelow] : ""

    const edgeBase = cn(
        "pointer-events-none absolute inset-y-0 z-10",
        "w-10 xs:w-14 sm:w-20 md:w-28 lg:w-36",
        visibility
    )

    const leftEdge = (
        <div
            aria-hidden
            className={cn(
                edgeBase,
                "left-0 bg-gradient-to-r from-marketing-light from-0% via-marketing-light/55 via-45% to-transparent to-100%",
                showLeft ? "opacity-100" : "opacity-0",
                classNames?.left
            )}
        />
    )

    const rightEdge = (
        <div
            aria-hidden
            className={cn(
                edgeBase,
                "right-0 bg-gradient-to-l from-marketing-light from-0% via-marketing-light/55 via-45% to-transparent to-100%",
                showRight ? "opacity-100" : "opacity-0",
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
