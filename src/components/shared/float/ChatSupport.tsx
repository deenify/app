"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Inbox, MessageCircleMore, SendHorizonal, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { cn } from "@/lib/utils/clsx"
import useSupportStore from "@/store/support"

interface ChatSupportProps {
    isVisible: boolean
    isOpen: boolean
    onToggle: () => void
    onClose: () => void
}

const ChatSupport = ({ isVisible, isOpen, onToggle, onClose }: ChatSupportProps) => {

    const messages = useSupportStore((state) => state.messages)
    const isTyping = useSupportStore((state) => state.isTyping)
    const sendMessage = useSupportStore((state) => state.sendMessage)

    const isXsDown = useBreakpoint("xs", "down")
    const isMdDown = useBreakpoint("md", "down")
    const [draft, setDraft] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const messagesWrapperRef = useRef<HTMLDivElement>(null)

    // To handle the textarea height and overflow
    useEffect(() => {
        if (!textareaRef.current) return
        textareaRef.current.style.height = "0px"
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`

        if (textareaRef.current.scrollHeight > 120) {
            textareaRef.current.style.overflowY = "auto"
        } else {
            textareaRef.current.style.overflowY = "hidden"
        }
    }, [draft])


    // Scroll-end by new messages
    useEffect(() => {
        if (!isOpen) return

        const scrollToEnd = () => {
            const messagesWrapper = messagesWrapperRef.current
            if (!messagesWrapper) return
            messagesWrapper.scrollTop = messagesWrapper.scrollHeight
        }

        scrollToEnd()
        const frameId = window.requestAnimationFrame(scrollToEnd)
        const timeoutId = window.setTimeout(scrollToEnd, 220)

        return () => {
            window.cancelAnimationFrame(frameId)
            window.clearTimeout(timeoutId)
        }
    }, [messages.length, isOpen])


    // Send the message
    const handleSend = async () => {
        if (!draft.trim() || isTyping) return
        const value = draft.trim()
        setDraft("")
        await sendMessage(value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            void handleSend()
        }
    }


    return (
        <Popover
            open={isOpen}
            onOpenChange={(open) => (open ? onToggle() : onClose())}
        >
            <PopoverTrigger>
                <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    shouldScale
                    className={cn(
                        "pointer-events-auto relative h-11 w-11 rounded-full ease duration-500 xs:h-[50px] xs:w-[50px]",
                        "border border-gray-200 bg-white shadow-[0_14px_40px_-18px_rgba(15,23,42,0.2)]",
                        "text-gray-900 hover:bg-gray-50",
                        isVisible ? "opacity-100" : "opacity-0",
                    )}
                    aria-label="Open support chat"
                >
                    <MessageCircleMore className="h-[18px] w-[18px] xs:h-5 xs:w-5" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                side="top"
                sideOffset={isXsDown ? 10 : 16}
                align={isXsDown ? "center" : "end"}
                collisionPadding={isXsDown ? 20 : isMdDown ? 12 : 16}
                className={cn(
                    "flex w-[calc(100vw-1.5rem)] max-w-[24rem] flex-col overflow-hidden",
                    "xs:w-[min(92vw,24rem)] h-[70dvh]",
                    "rounded-md border border-gray-200 bg-white xs:rounded-xl",
                    "shadow-[0_28px_100px_-26px_rgba(16,185,129,0.32),0_18px_42px_-24px_rgba(15,23,42,0.18)] p-0"
                )}
            >
                <header className="flex shrink-0 items-center justify-between gap-2 border-b
                     border-gray-200 bg-white px-3 py-3 xs:gap-3 xs:px-4 xs:py-4">
                    <div className="flex min-w-0 items-center gap-2 xs:gap-3">
                        <span className="inline-flex w-9 h-9  shrink-0 items-center justify-center
                             rounded-md bg-emerald-50 text-emerald-700 xs:h-10 xs:w-10">
                            <Inbox className="h-5 w-5" />
                        </span>
                        <p className="truncate font-heading font-semibold text-gray-900 text-sm">
                            Your Application Messages
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="ghost-emerald"
                        size="icon"
                        shouldScale
                        className="h-6 w-6 shrink-0 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-800"
                        onClick={onClose}
                        aria-label="Close message panel"
                    >
                        <X size={14} strokeWidth={2} />
                    </Button>
                </header>

                <div
                    ref={messagesWrapperRef}
                    id="chat-support-messages-wrapper"
                    className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 scrollbar-thin scroll-smooth
                        px-3 py-3 scrollbar-track-transparent scrollbar-thumb-slate-300 scrollbar-thumb-rounded-md"
                >
                    <div className="flex flex-col gap-3">
                        {messages.map((message) => {
                            const isAssistant = message.role === "assistant"
                            return (
                                <div
                                    key={message.id}
                                    className={`flex min-w-0 ${isAssistant ? "justify-start" : "justify-end"}`}
                                >
                                    <div className={cn(
                                        "flex min-w-0 max-w-[92%] items-start gap-1.5 xs:max-w-[88%] xs:gap-2",
                                        isAssistant ? "justify-start" : "justify-end flex-row-reverse"
                                    )}>
                                        <Avatar className="shrink-0 bg-slate-200 h-8 w-8">
                                            <AvatarImage
                                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                                                alt="Assistant"
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="bg-slate-900 text-sm font-medium text-white xs:text-base">
                                                D
                                            </AvatarFallback>
                                        </Avatar>
                                        <section className="min-w-0">
                                            <div
                                                className={cn(
                                                    "w-fit max-w-full rounded-lg text-[13px] shadow-sm",
                                                    "xs:rounded-lg px-3 py-2 xs:py-2.5 leading-6",
                                                    isAssistant
                                                        ? "border border-slate-200 bg-white text-slate-900"
                                                        : "bg-slate-900 text-white",
                                                )}
                                            >
                                                <p className="break-words">{message.text}</p>
                                            </div>
                                            <div className={cn(
                                                "mt-0.5 flex items-center gap-1 text-slate-600 xs:mt-1 text-[11px]",
                                                isAssistant ? "justify-start" : "justify-end"
                                            )}>
                                                <span>{message.time}</span>
                                                <span className="-tracking-[3px]">{message.status === "seen"
                                                    ? "✓✓"
                                                    : "✓"}
                                                </span>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )
                        })}

                        {isTyping && (
                            <div className="flex min-w-0 justify-start">
                                <div className="flex min-w-0 max-w-[92%] items-end gap-1.5 xs:max-w-[88%] xs:gap-2">
                                    <Avatar className="h-7 w-7 shrink-0 bg-slate-200 xs:h-8 xs:w-8">
                                        <AvatarImage
                                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                                            alt="Assistant"
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="bg-slate-900 text-sm font-medium text-white xs:text-base">
                                            D
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-xl rounded-bl-md border border-slate-200 bg-white px-2 py-1.5 xs:rounded-2xl xs:px-2.5 xs:py-2">
                                        <div className="flex items-center gap-1">
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-700 [animation-delay:0ms]" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-700 [animation-delay:150ms]" />
                                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-700 [animation-delay:300ms]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="shrink-0 border-t border-gray-200 bg-white px-2.5 py-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] xs:px-3 xs:py-3 xs:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                    <div className="flex min-w-0 items-end gap-1.5 xs:gap-2">
                        <textarea
                            ref={textareaRef}
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            placeholder="Enter your response..."
                            className="max-h-[120px] min-w-0 flex-1 resize-none overflow-hidden
                                rounded-xl border border-slate-200 bg-slate-50 px-2.5
                                text-base text-slate-900 outline-none transition scrollbar-thin
                                h-11 xs:rounded-2xl xs:px-3 py-2.5
                                placeholder:text-sm focus:border-emerald-500"
                        />
                        <Button
                            type="button"
                            variant="default"
                            className="flex shrink-0 items-center justify-center rounded-full h-10 w-10"
                            onClick={() => {
                                void handleSend()
                            }}
                            aria-label="Send message"
                        >
                            <SendHorizonal
                                size={16}
                                className="text-white flex-shrink-0"
                            />
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ChatSupport
