"use client"

import { cn } from "@/lib/utils/clsx"
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

/** Shared GPU paint layer for Android / low-end devices */
const GPU_LAYER =
    "transform-gpu will-change-transform backface-hidden translate-z-0 [contain:paint]"

const Drawer = ({
    shouldScaleBackground = false,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        {...props}
    />
)

const DrawerOverlay = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
        overlayStyle?: string
    }
>(({ className, overlayStyle, ...props }, ref) => (
    <DrawerPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-[80] bg-black/70",
            /* no backdrop-blur — major FPS cost on Android */
            "transform-gpu will-change-[opacity] backface-hidden translate-z-0",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "duration-300",
            className,
            overlayStyle
        )}
        {...props}
    />
))
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = ({
    className,
    overlayStyle,
    shouldShowOverlay = true,
    children,
    ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    overlayStyle?: string
    shouldShowOverlay?: boolean
}) => (
    <DrawerPortal>
        {shouldShowOverlay && <DrawerOverlay overlayStyle={overlayStyle} />}
        <DrawerPrimitive.Content
            className={cn(
                "fixed inset-x-0 bottom-0 z-[81] flex h-auto flex-col overflow-hidden",
                "rounded-t-xl rounded-b-none border border-b-0 bg-white",
                GPU_LAYER,
                className
            )}
            {...props}
        >
            <div className={cn("flex min-h-0 flex-1 flex-col", GPU_LAYER)}>
                {children}
            </div>
        </DrawerPrimitive.Content>
    </DrawerPortal>
)

const DrawerThumb = ({
    className,
    wrapperStyle,
    thumbSize = "md",
}: React.HTMLAttributes<HTMLDivElement> & {
    thumbSize?: "xs" | "sm" | "md" | "lg"
    wrapperStyle?: string
}) => (
    <div
        className={cn(
            "m-auto mt-3 h-max w-max cursor-grab pb-2",
            "transform-gpu translate-z-0",
            wrapperStyle
        )}
    >
        <div
            className={cn(
                "rounded-full bg-gray-400",
                { "h-[2.5px] w-8": thumbSize === "xs" },
                { "h-1 w-12": thumbSize === "sm" },
                { "h-1 w-20": thumbSize === "md" },
                { "h-1 w-28": thumbSize === "lg" },
                className
            )}
        />
    </div>
)

const DrawerTitle = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>) => (
    <DrawerPrimitive.Title
        className={cn(
            "text-lg font-semibold tracking-tight transform-gpu translate-z-0",
            className
        )}
        {...props}
    />
)

const DrawerDescription = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>) => (
    <DrawerPrimitive.Description
        className={cn(
            "text-sm text-muted-foreground transform-gpu translate-z-0",
            className
        )}
        {...props}
    />
)

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerThumb,
    DrawerDescription,
}
