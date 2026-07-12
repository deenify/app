"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, Minus, Plus } from "lucide-react"
import { tv, type VariantProps } from "tailwind-variants"

import { cn } from "@/lib/utils/clsx"

const accordionItemVariants = tv({
    base: "",
    variants: {
        variant: {
            default: "border-b border-layout-separator",
            marketing: "border-0",
            ghost: "border-0",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const accordionTriggerVariants = tv({
    base: "group flex flex-1 items-center justify-between text-left transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
    variants: {
        variant: {
            default:
                "py-4 font-medium hover:underline [&[data-state=open]>svg]:rotate-180",
            marketing: "bg-marketing-card font-medium text-gray-900 hover:no-underline",
            ghost: "font-medium text-gray-900 hover:no-underline",
        },
        size: {
            sm: "gap-4 px-5 py-4 text-sm",
            md: "gap-4 px-6 py-5 text-sm sm:text-base",
            lg: "gap-4 px-6 py-6 text-base",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
})

const accordionContentVariants = tv({
    base: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    variants: {
        variant: {
            default: "",
            marketing: "bg-marketing-card",
            ghost: "",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const accordionContentInnerVariants = tv({
    base: "text-sm leading-relaxed text-gray-600",
    variants: {
        size: {
            sm: "px-5 pb-5 pt-0",
            md: "px-6 pb-5 pt-0",
            lg: "px-6 pb-6 pt-0",
        },
    },
    defaultVariants: {
        size: "md",
    },
})

type AccordionIconVariant = "chevron" | "plus-minus" | "none"

const Accordion = AccordionPrimitive.Root

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
    VariantProps<typeof accordionItemVariants>

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    AccordionItemProps
>(({ className, variant, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn(accordionItemVariants({ variant }), className)}
        {...props}
    />
))
AccordionItem.displayName = "AccordionItem"

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
    VariantProps<typeof accordionTriggerVariants> & {
        iconVariant?: AccordionIconVariant
        hideIcon?: boolean
        classNames?: {
            icon?: string
            iconOpen?: string
            iconClosed?: string
        }
    }

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
>(
    (
        {
            className,
            children,
            variant,
            size,
            iconVariant = "chevron",
            hideIcon = false,
            classNames,
            ...props
        },
        ref
    ) => (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(accordionTriggerVariants({ variant, size }), className)}
                {...props}
            >
                {children}
                {!hideIcon && iconVariant === "chevron" && (
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            classNames?.icon
                        )}
                    />
                )}
                {!hideIcon && iconVariant === "plus-minus" && (
                    <>
                        <Plus
                            className={cn(
                                "h-4 w-4 shrink-0 text-gray-500 group-data-[state=open]:hidden",
                                classNames?.icon,
                                classNames?.iconClosed
                            )}
                        />
                        <Minus
                            className={cn(
                                "hidden h-4 w-4 shrink-0 text-emerald-600 group-data-[state=open]:block",
                                classNames?.icon,
                                classNames?.iconOpen
                            )}
                        />
                    </>
                )}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
    VariantProps<typeof accordionContentVariants> &
    VariantProps<typeof accordionContentInnerVariants> & {
        classNames?: {
            inner?: string
        }
    }

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    AccordionContentProps
>(({ className, children, variant, size, classNames, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(accordionContentVariants({ variant }), className)}
        {...props}
    >
        <div className={cn(accordionContentInnerVariants({ size }), classNames?.inner)}>
            {children}
        </div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    accordionItemVariants,
    accordionTriggerVariants,
    accordionContentVariants,
    accordionContentInnerVariants,
}
