"use client";
import { cn } from "@/lib/utils/clsx";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const Drawer = ({
    shouldScaleBackground = true,
    ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root
        shouldScaleBackground={shouldScaleBackground}
        {...props}
    />
);

const DrawerOverlay = ({
    overlayStyle,
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
    overlayStyle?: string;
}) => (
    <DrawerPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm",
            overlayStyle
        )}
    />
)

const DrawerContent = ({
    className,
    overlayStyle,
    shouldShowOverlay = true,
    children,
    ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    overlayStyle?: string;
    shouldShowOverlay?: boolean;
}) => (
    <DrawerPortal>
        {shouldShowOverlay && <DrawerOverlay overlayStyle={overlayStyle} />}
        <DrawerPrimitive.Content
            className={cn(
                "fixed inset-x-0 bottom-0 z-[81] h-auto rounded-t-xl rounded-b-none border border-b-0 bg-white overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
);

const DrawerThumb = ({
    className,
    wrapperStyle,
    thumbSize = "md",
}: React.HTMLAttributes<HTMLDivElement> & {
    thumbSize?: "xs" | "sm" | "md" | "lg";
    wrapperStyle?: string;
}) => (
    <div className={cn("w-max h-max m-auto cursor-grab pb-2 mt-3", wrapperStyle)}>
        <div
            className={cn(
                "bg-gray-400 rounded-full",
                { "h-[2.5px] w-8": thumbSize === "xs" },
                { "h-1 w-12": thumbSize === "sm" },
                { "h-1 w-20": thumbSize === "md" },
                { "h-1 w-28": thumbSize === "lg" },
                className
            )}
        />
    </div>
);

const DrawerTitle = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>) => (
    <DrawerPrimitive.Title
        className={cn("text-lg font-semibold tracking-tight", className)}
        {...props}
    />
);

const DrawerDescription = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>) => {
    return (
        <DrawerPrimitive.Description
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
};

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
};