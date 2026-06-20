"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils/clsx"
import CloseButton from "./buttons/CloseButton"
import Animate from "./motion/Animate"

type ModalProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title?: React.ReactNode
    children: React.ReactNode
    showClose?: boolean
    className?: string
    classNames?: {
        overlay?: string
        header?: string
        body?: string
        title?: string
        close?: string
        content?: string
        footer?: string
    },
    footer?: React.ReactNode
    footerVariant?: "default" | "float"
}

export function Modal({
    isOpen,
    onOpenChange,
    title,
    children,
    showClose = true,
    className,
    classNames,
    footer,
    footerVariant = "default",
}: ModalProps) {
    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, pointerEvents: "auto" }}
                                exit={{ opacity: 0, pointerEvents: "none" }}
                                transition={{ duration: 0.28 }}
                                className={cn(
                                    "fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm",
                                    classNames?.overlay
                                )}
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <div onClick={(e) => e.stopPropagation()}>
                                <Animate
                                    variant="up"
                                    className={cn(
                                        "fixed inset-0 z-[9999] m-auto",
                                        "flex flex-col overflow-hidden",
                                        "rounded-md border border-layout-separator",
                                        "bg-background shadow-2xl outline-none",
                                        "w-[min(calc(100vw-2rem),700px)] max-h-[90dvh]",
                                        className,
                                    )}
                                >
                                    {(title || showClose) && (
                                        <header
                                            className={cn(
                                                "flex shrink-0 items-center justify-between border-b border-layout-separator px-4 py-3",
                                                classNames?.header
                                            )}
                                        >
                                            <Dialog.Title
                                                className={cn(
                                                    "text-base font-medium tracking-tight",
                                                    classNames?.title
                                                )}
                                            >
                                                {title}
                                            </Dialog.Title>

                                            {showClose && (
                                                <Dialog.Close>
                                                    <CloseButton onOpenChange={onOpenChange} />
                                                </Dialog.Close>
                                            )}
                                        </header>
                                    )}

                                    <section
                                        className={cn(
                                            "flex-1 overflow-hidden flex flex-col relative",
                                            classNames?.body
                                        )}
                                    >
                                        <main className={cn(
                                            "overflow-y-auto scrollbar-thin flex-1 py-2 px-4 relative",
                                            classNames?.content
                                        )}>
                                            {children}
                                        </main>

                                        {footer && (
                                            <footer className={cn(
                                                footerVariant === "float"
                                                    ? "bg-transparent absolute bottom-0 left-0 right-0 p-4"
                                                    : "bg-white p-4",
                                                classNames?.footer
                                            )}>
                                                {footer}
                                            </footer>
                                        )}
                                    </section>
                                </Animate>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            )}
        </AnimatePresence>
    )
}