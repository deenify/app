"use client";

import { Button, ButtonPropsType } from '@/components/ui/button'
import { cn } from '@/lib/utils/clsx';
import { Bookmark } from 'lucide-react';
import React from 'react'

type BookmarkButtonParentalProps = Omit<ButtonPropsType<"button">, "children">

interface BookmarkButtonProps {
    isBookmarked?: boolean
    className?: string
    classNames?: { icon?: string }
    iconSize?: number
    iconStroke?: number
    buttonProps?: BookmarkButtonParentalProps
}

const BookmarkButton = ({
    isBookmarked,
    className,
    classNames,
    buttonProps,
    iconSize = 16,
    iconStroke = 1.5
}: BookmarkButtonProps) => {
    return (
        <Button
            {...buttonProps}
            type='button'
            aria-label={buttonProps?.["aria-label"] ?? (isBookmarked ? "Remove bookmark" : "Bookmark")}
            size={buttonProps?.size ?? "icon"}
            variant={buttonProps?.variant ?? "ghost"}
            className={cn(
                "flex w-7 h-7 shrink-0 items-center justify-center rounded-full transition-colors",
                "hover:bg-emerald-50 active:bg-emerald-100",
                isBookmarked
                    ? "text-emerald-600 fill-emerald-600"
                    : "text-gray-400 group-hover:text-emerald-500",
                className
            )}
        >
            <Bookmark
                className={cn(
                    "h-4 w-4 text-black",
                    classNames?.icon,
                    isBookmarked && "fill-current text-emerald-600"
                )}
                size={iconSize}
                strokeWidth={iconStroke}
            />
        </Button>
    )
}

export default BookmarkButton