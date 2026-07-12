"use client"

import { useCallback, useMemo, useState } from "react"
import {
    Accordion as AccordionRoot,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Stagger from "@/components/shared/motion/Stagger"
import { cn } from "@/lib/utils/clsx"

export type AccordionEntry = {
    id?: string
    question: React.ReactNode
    answer: React.ReactNode
}

type AccordionSize = "sm" | "md" | "lg"
type AccordionVariant = "default" | "marketing" | "ghost"
type AccordionShape = "default" | "rounded" | "soft"

type AccordionClassNames = {
    root?: string
    item?: string
    trigger?: string
    triggerLabel?: string
    icon?: string
    iconOpen?: string
    iconClosed?: string
    content?: string
    contentInner?: string
    stagger?: string
}

type AccordionStaggerProps = {
    baseDelay?: number
    delay?: number
    duration?: number
}

type AccordionBaseProps = {
    items: AccordionEntry[]
    size?: AccordionSize
    variant?: AccordionVariant
    shape?: AccordionShape
    iconVariant?: "chevron" | "plus-minus" | "none"
    isDisabled?: boolean
    disabledIndexes?: number[]
    alwaysExpandedIndexes?: number[]
    className?: string
    classNames?: AccordionClassNames
    stagger?: boolean
    staggerProps?: AccordionStaggerProps
}

type AccordionSingleProps = AccordionBaseProps & {
    type?: "single"
    collapsible?: boolean
    defaultOpenIndex?: number | null
    value?: string
    onValueChange?: (value: string) => void
}

type AccordionMultipleProps = AccordionBaseProps & {
    type: "multiple"
    defaultOpenIndexes?: number[]
    value?: string[]
    onValueChange?: (value: string[]) => void
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps

const SHAPE_CLASSES: Record<AccordionShape, string> = {
    default: "",
    rounded: "rounded-3xl",
    soft: "rounded-md sm:rounded-2xl",
}

const DEFAULT_STAGGER: Required<AccordionStaggerProps> = {
    baseDelay: 0.5,
    delay: 0.08,
    duration: 0.85,
}

const getItemValue = (items: AccordionEntry[], index: number) => items[index]?.id ?? `item-${index}`

const indexesToValues = (items: AccordionEntry[], indexes: number[] = []) =>
    indexes.map((index) => getItemValue(items, index))

const Accordion = (props: AccordionProps) => {
    const {
        items,
        size = "md",
        variant = "marketing",
        shape = "default",
        iconVariant = "plus-minus",
        isDisabled = false,
        disabledIndexes = [],
        alwaysExpandedIndexes = [],
        className,
        classNames,
        stagger = false,
        staggerProps,
    } = props

    const type = props.type ?? "single"
    const collapsible = type === "single" ? (props.collapsible ?? true) : true
    const defaultOpenIndex = type === "single" ? props.defaultOpenIndex : undefined
    const defaultOpenIndexes = type === "multiple" ? props.defaultOpenIndexes : undefined
    const isControlled = props.value !== undefined

    const resolvedStagger = { ...DEFAULT_STAGGER, ...staggerProps }

    const disabledSet = useMemo(() => new Set(disabledIndexes), [disabledIndexes])
    const alwaysExpandedSet = useMemo(
        () => new Set(alwaysExpandedIndexes),
        [alwaysExpandedIndexes]
    )
    const alwaysExpandedValues = useMemo(
        () => indexesToValues(items, alwaysExpandedIndexes),
        [items, alwaysExpandedIndexes]
    )

    const usesManagedValue = isControlled || alwaysExpandedIndexes.length > 0
    const resolvedType = alwaysExpandedIndexes.length > 0 ? "multiple" : type

    const initialOpenValues = useMemo(() => {
        if (resolvedType === "multiple") {
            const mergedIndexes = [
                ...new Set([...alwaysExpandedIndexes, ...(defaultOpenIndexes ?? [])]),
            ]
            return indexesToValues(items, mergedIndexes)
        }

        if (defaultOpenIndex === null || defaultOpenIndex === undefined) {
            return alwaysExpandedValues[0]
        }

        return getItemValue(items, defaultOpenIndex)
    }, [
        items,
        resolvedType,
        alwaysExpandedIndexes,
        defaultOpenIndexes,
        defaultOpenIndex,
        alwaysExpandedValues,
    ])

    const [managedValue, setManagedValue] = useState<string | string[]>(initialOpenValues)

    const mergeMultipleValue = useCallback(
        (next: string[]) => [...new Set([...alwaysExpandedValues, ...next])],
        [alwaysExpandedValues]
    )

    const multipleValue = useMemo(() => {
        const raw = (isControlled ? props.value : managedValue) as string[] | undefined
        return mergeMultipleValue(Array.isArray(raw) ? raw : alwaysExpandedValues)
    }, [isControlled, props.value, managedValue, alwaysExpandedValues, mergeMultipleValue])

    const singleValue = isControlled ? (props.value as string | undefined) : (managedValue as string | undefined)

    const handleMultipleChange = (next: string[]) => {
        const merged = mergeMultipleValue(next)

        if (!isControlled) {
            setManagedValue(merged)
        }

        if (type === "multiple") {
            ;(props as AccordionMultipleProps).onValueChange?.(merged)
        }
    }

    const handleSingleChange = (next: string) => {
        if (alwaysExpandedSet.size > 0) {
            handleMultipleChange(
                next ? mergeMultipleValue([...alwaysExpandedValues, next]) : [...alwaysExpandedValues]
            )
            return
        }

        if (!isControlled) {
            setManagedValue(next)
        }

        if (type === "single") {
            ;(props as AccordionSingleProps).onValueChange?.(next)
        }
    }

    const rootClassName = cn(
        "divide-y divide-layout-separator overflow-hidden border border-layout-separator",
        variant === "marketing" && "bg-transparent",
        SHAPE_CLASSES[shape],
        isDisabled && "pointer-events-none opacity-60",
        className,
        classNames?.root
    )

    const accordionRootProps =
        resolvedType === "multiple"
            ? usesManagedValue
                ? {
                      type: "multiple" as const,
                      value: multipleValue,
                      onValueChange: handleMultipleChange,
                  }
                : {
                      type: "multiple" as const,
                      defaultValue: initialOpenValues as string[],
                      onValueChange: (next: string[]) => {
                          if (type === "multiple") {
                              ;(props as AccordionMultipleProps).onValueChange?.(next)
                          }
                      },
                  }
            : usesManagedValue
              ? {
                    type: "single" as const,
                    collapsible,
                    value: singleValue,
                    onValueChange: handleSingleChange,
                }
              : {
                    type: "single" as const,
                    collapsible,
                    defaultValue: initialOpenValues as string | undefined,
                    onValueChange: (next: string) => {
                        if (type === "single") {
                            ;(props as AccordionSingleProps).onValueChange?.(next)
                        }
                    },
                }

    return (
        <AccordionRoot className={rootClassName} disabled={isDisabled} {...accordionRootProps}>
            {items.map((item, index) => {
                const value = getItemValue(items, index)
                const isItemDisabled = isDisabled || disabledSet.has(index)
                const isAlwaysExpanded = alwaysExpandedSet.has(index)

                const itemNode = (
                    <AccordionItem
                        key={value}
                        value={value}
                        disabled={isItemDisabled || isAlwaysExpanded}
                        variant={variant}
                        className={classNames?.item}
                        data-always-expanded={isAlwaysExpanded ? "true" : undefined}
                    >
                        <AccordionTrigger
                            variant={variant}
                            size={size}
                            iconVariant={iconVariant}
                            className={cn("group", classNames?.trigger)}
                            classNames={{
                                icon: classNames?.icon,
                                iconOpen: classNames?.iconOpen,
                                iconClosed: classNames?.iconClosed,
                            }}
                        >
                            <span className={cn("flex-1", classNames?.triggerLabel)}>
                                {item.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent
                            variant={variant}
                            size={size}
                            className={classNames?.content}
                            classNames={{ inner: classNames?.contentInner }}
                        >
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                )

                if (!stagger) {
                    return itemNode
                }

                return (
                    <Stagger
                        key={value}
                        index={index}
                        animation="while_in_view"
                        variant="up"
                        baseDelay={resolvedStagger.baseDelay}
                        delay={resolvedStagger.delay}
                        duration={resolvedStagger.duration}
                        className={classNames?.stagger}
                    >
                        {itemNode}
                    </Stagger>
                )
            })}
        </AccordionRoot>
    )
}

export default Accordion
