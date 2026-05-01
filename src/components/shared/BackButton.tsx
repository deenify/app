"use client";

import React from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { cn } from '@/lib/utils/clsx'
import { ChevronLeft } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'
import { Button, ButtonPropsType } from '@/components/ui/button';

type BackButtonParentalProps = Omit<ButtonPropsType<"button">, "children">

interface BackButtonProps {
    label?: string
    labelMbl?: string
    icon?: React.ReactNode
    renderMobileVariant?: boolean
    className?: string
    classNames?: {
        buttonIcon?: string
        buttonIconMobile?: string
        buttonIconWrapperMobile?: string
        buttonLabel?: string
        buttonLabelMobile?: string
    }
    buttonProps: BackButtonParentalProps
}

const BackButton = ({
    label = "Go Back",
    labelMbl = "Go Back",
    icon,
    className,
    renderMobileVariant = false,
    classNames,
    buttonProps
}: BackButtonProps) => {
    const isLgDown = useBreakpoint("lg", "down")

    if (renderMobileVariant && isLgDown) {
        return (
            <Button
                {...buttonProps}
                className={cn("mb-5 sm:mb-6 items-center gap-2", className)}
            >
                <span
                    className={cn(
                        "w-6 h-6 border rounded-full flex items-center justify-center",
                        "bg-emerald-50 border-emerald-300 transition-all duration-200 z-[60] shadow-md leading-none",
                        classNames?.buttonIconWrapperMobile
                    )}>
                    <ChevronLeft
                        size={16}
                        strokeWidth={1.5}
                        className={cn(
                            "h-4 w-4 text-gray-600 transition-transform duration-300",
                            classNames?.buttonIconMobile
                        )}
                    />
                </span>
                <span className={cn("translate-y-px", classNames?.buttonLabelMobile)}>{labelMbl ?? "Go Back"}</span>
            </Button>
        )
    }


    return (
        <Button
            {...buttonProps}
            className={cn("mb-5 sm:mb-6", className)}
        >
            {icon ?? <ArrowLeft className={cn("mr-2 h-4 w-4", classNames?.buttonIcon)} />}
            <span className={cn("", classNames?.buttonLabel)}>{label ?? "Go Back"}</span>
        </Button>
    )
}

export default BackButton