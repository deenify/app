"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Stagger from "@/components/shared/motion/Stagger"
import { cn } from "@/lib/utils/clsx"

export type AccordionListEntry = {
    id?: string
    question: React.ReactNode
    answer: React.ReactNode
}

type AccordionListProps = {
    items: AccordionListEntry[]
    defaultOpenIndex?: number | null
    collapsible?: boolean
    size?: "sm" | "md" | "lg"
    variant?: "default" | "marketing" | "ghost"
    shape?: "default" | "rounded" | "soft"
    iconVariant?: "chevron" | "plus-minus" | "none"
    className?: string
    stagger?: boolean
    staggerProps?: {
        baseDelay?: number
        delay?: number
        duration?: number
    }
}

const SHAPE = {
    default: "",
    rounded: "rounded-3xl",
    soft: "rounded-md sm:rounded-2xl",
} as const

const AccordionList = ({
    items,
    defaultOpenIndex = null,
    collapsible = true,
    size = "md",
    variant = "marketing",
    shape = "default",
    iconVariant = "plus-minus",
    className,
    stagger = false,
    staggerProps,
}: AccordionListProps) => {
    const defaultValue =
        defaultOpenIndex == null ? undefined : (items[defaultOpenIndex]?.id ?? `item-${defaultOpenIndex}`)

    return (
        <Accordion
            type="single"
            collapsible={collapsible}
            defaultValue={defaultValue}
            className={cn(
                "divide-y divide-layout-separator overflow-hidden border border-layout-separator",
                variant === "marketing" && "bg-transparent",
                SHAPE[shape],
                className
            )}
        >
            {items.map((item, index) => {
                const value = item.id ?? `item-${index}`

                const node = (
                    <AccordionItem key={value} value={value} variant={variant}>
                        <AccordionTrigger variant={variant} size={size} iconVariant={iconVariant}>
                            <span className="flex-1">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent variant={variant} size={size}>
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                )

                if (!stagger) return node

                return (
                    <Stagger
                        key={value}
                        index={index}
                        animation="while_in_view"
                        variant="up"
                        baseDelay={staggerProps?.baseDelay ?? 0.5}
                        delay={staggerProps?.delay ?? 0.08}
                        duration={staggerProps?.duration ?? 0.85}
                    >
                        {node}
                    </Stagger>
                )
            })}
        </Accordion>
    )
}

export default AccordionList
