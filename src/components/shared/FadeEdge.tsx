import { cn } from '@/lib/utils/clsx'
import React from 'react'

type FadeEdgeProps = {
    fadeDirection?: "left" | "right" | "both"
    className?: string
    classNames?: {
        left?: string
        right?: string
    }
}

const FadeEdge = ({ fadeDirection = "both", className, classNames }: FadeEdgeProps) => {
    const isLeft = fadeDirection === "left"
    const isRight = fadeDirection === "right"
    const isBoth = fadeDirection === "both"

    return (
        <div className={cn(className)}>
            {isBoth ? (
                <>
                    <div
                        className={cn(
                            "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-32 lg:w-40",
                            "bg-gradient-to-r from-marketing-light via-marketing-light to-transparent",
                            classNames?.left
                        )}
                    />
                    <div
                        className={cn(
                            "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-32 lg:w-40",
                            "bg-gradient-to-l from-marketing-light via-marketing-light to-transparent",
                            classNames?.right
                        )}
                    />
                </>
            )
                : (
                    <>
                        {isLeft && (
                            <div
                                className={cn(
                                    "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-32 lg:w-40",
                                    "bg-gradient-to-r from-marketing-light via-marketing-light to-transparent",
                                    classNames?.left
                                )}
                            />
                        )}
                        {isRight && (
                            <div
                                className={cn(
                                    "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-32 lg:w-40",
                                    "bg-gradient-to-l from-marketing-light via-marketing-light to-transparent",
                                    classNames?.right
                                )}
                            />
                        )}
                    </>
                )}
        </div>
    )
}

export default FadeEdge