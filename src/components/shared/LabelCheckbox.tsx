import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { cn } from '@/lib/utils/clsx'

interface LabelCheckboxProps {
    id: string
    name: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    required: boolean
    variant: 'outline-emerald' | 'outline-red' | 'outline-blue'
    | 'default' | 'default-red' | 'default-blue'
    | 'ghost-emerald' | 'ghost-red' | 'ghost-blue'
    | 'ghost-purple' | 'ghost-amber'
    | 'destructive' | 'secondary'
    className?: string
    children: React.ReactNode
    classNames?: {
        label: string
        checkbox: string
    }
    size: 'sm' | 'md'
}

const LabelCheckbox = ({
    id, name, checked,
    onCheckedChange, required,
    variant, className,
    children,
    classNames,
    size
}: LabelCheckboxProps) => {

    return (
        <div className={cn(
            "flex items-start gap-2",
            className
        )}>
            <Checkbox
                id={id}
                name={name}
                checked={checked}
                size={size}
                onCheckedChange={onCheckedChange}
                required={required}
                variant={variant}
                className={cn("mt-[1px]", classNames?.checkbox)}
            />
            <label
                htmlFor={id}
                className={cn(
                    "cursor-pointer text-sm leading-snug text-gray-600 select-none",
                    classNames?.label
                )}
            >
                {children}
            </label>
        </div>
    )
}

export default LabelCheckbox