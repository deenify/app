"use client";

import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils/clsx'
import { LucideIcon } from 'lucide-react'
import { Button, ButtonPropsType } from '@/components/ui/button'


type ButtonParentalProps = Omit<ButtonPropsType<"button">, "children">
type ButtonConfig = {
    label: string
    onClick?: () => void
    buttonProps?: ButtonParentalProps
}

type SwitchWrapperProps = {
    variant: "red" | "purple" | "gray" | "amber" | "blue" | "pink" | "emerald"
    children: React.ReactNode

    cardHeader: {
        title: string
        description: string
        icon: LucideIcon
    }

    buttonSection?: {
        visible?: boolean
        primaryButton: ButtonConfig
        secondaryButton?: ButtonConfig
    }

    classNames?: {
        card?: string
        cardHeader?: string
        cardTitle?: string
        cardDescription?: string
        cardContent?: string
        buttonsWrapper?: string
    }
}


const SwitchWrapper = ({
    variant,
    children,
    cardHeader: { title, description, icon: CardHeaderIcon },
    buttonSection,
    classNames
}: SwitchWrapperProps) => {

    return (
        <Card className={cn("border-layout-separator", classNames?.card)}>
            <CardHeader className={classNames?.cardHeader}>
                <CardTitle className={cn("flex items-center gap-2 text-base font-medium", classNames?.cardTitle)}>
                    <span
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-lg ring-1",
                            variant === "purple" && "bg-purple-50 text-purple-700 ring-purple-100",
                            variant === "gray" && "bg-gray-50 text-gray-700 ring-gray-100",
                            variant === "amber" && "bg-amber-50 text-amber-700 ring-amber-100",
                            variant === "blue" && "bg-blue-50 text-blue-700 ring-blue-100",
                            variant === "pink" && "bg-pink-50 text-pink-700 ring-pink-100",
                            variant === "emerald" && "bg-emerald-50 text-emerald-700 ring-emerald-100",
                            variant === "red" && "bg-red-50 text-red-700 ring-red-100",
                        )}
                    >
                        <CardHeaderIcon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span>{title}</span>
                </CardTitle>

                <CardDescription className={classNames?.cardDescription}>
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent className={cn("space-y-6", classNames?.cardContent)}>
                {children}

                {buttonSection?.visible && (
                    <div className={cn(
                        "flex flex-wrap justify-end gap-2 border-t border-gray-100",
                        classNames?.buttonsWrapper,
                    )}>

                        {buttonSection.secondaryButton && (
                            <Button
                                type="button"
                                shouldScale
                                onClick={buttonSection.secondaryButton.onClick}
                                {...buttonSection.secondaryButton.buttonProps}
                                className={cn(
                                    "w-full sm:w-auto",
                                    buttonSection.secondaryButton.buttonProps?.className,
                                )}
                            >
                                {buttonSection.secondaryButton.label}
                            </Button>
                        )}

                        <Button
                            type="button"
                            shouldScale
                            onClick={buttonSection.primaryButton.onClick}
                            {...buttonSection.primaryButton.buttonProps}
                            className={cn(
                                "w-full sm:w-auto",
                                buttonSection.primaryButton.buttonProps?.className,
                            )}
                        >
                            {buttonSection.primaryButton.label}
                        </Button>

                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default SwitchWrapper