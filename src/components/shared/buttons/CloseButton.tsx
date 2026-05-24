"use client"

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils/clsx'

type CloseButtonProps = {
    onOpenChange: (open: boolean) => void
    className?: string;
    classNames?: {
        iconWrapper?: string;
        icon?: string;
    }
}

const CloseButton = ({ onOpenChange, className, classNames }: CloseButtonProps) => {
    return (
        <Button
            asChild
            variant="secondary"
            size="icon"
            shouldScale
            className={cn("w-6 h-6 rounded-[5px] group", className)}
            onClick={() => onOpenChange(false)}
            aria-label="Close modal"
        >
            <div className={cn("flex items-center justify-center bg-teal-50 p-2.5 text-teal-700",
                "group-hover:bg-emerald-100 ease duration-200", classNames?.iconWrapper)}>
                <X size={16} strokeWidth={2} className={cn("text-teal-700", classNames?.icon)} />
            </div>
        </Button>
    )
}

export default CloseButton