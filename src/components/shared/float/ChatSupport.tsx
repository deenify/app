"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Inbox, MessageCircleMore, SendHorizonal, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import useSupportStore from "@/store/support"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils/clsx"

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
    // const resetConversation = useSupportStore((state) => state.resetConversation)

    const [draft, setDraft] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)


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
        const messagesWrapper = document.getElementById("chat-support-messages-wrapper")
        if (messagesWrapper) messagesWrapper.scrollTop = messagesWrapper.scrollHeight
    }, [messages.length])


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
                        "pointer-events-auto relative h-[50px] w-[50px] rounded-full ease duration-500",
                        "border border-slate-200 bg-white shadow-[0_14px_40px_-18px_rgba(15,23,42,0.2)]",
                        "text-slate-900 hover:bg-slate-50",
                        isVisible ? "opacity-100" : "opacity-0",
                    )}
                    aria-label="Open support chat"
                >
                    <MessageCircleMore className="h-5 w-5" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                side="top"
                sideOffset={16}
                align="end"
                className="w-[min(92vw,24rem)] max-w-[24rem] rounded-[1.5rem] border overflow-hidden
                 border-slate-200 bg-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.12)] p-0"
            >
                <div className="flex min-h-[24rem] max-h-[78vh] flex-col overflow-hidden">
                    <header className="flex items-center justify-between gap-3 border-b
                     border-slate-200 bg-white px-4 py-4">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-11 w-11 items-center justify-center
                             rounded-2xl bg-slate-100 text-slate-700">
                                <Inbox className="h-5 w-5" />
                            </span>
                            <p className="text-sm font-semibold text-slate-900">Your Application Messages</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            onClick={onClose}
                            aria-label="Close message panel"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </header>

                    <div
                        id="chat-support-messages-wrapper"
                        className="flex-1 overflow-y-auto bg-slate-50 px-3 py-3 scrollbar-thin scroll-smooth 
                        scrollbar-track-transparent scrollbar-thumb-slate-300 scrollbar-thumb-rounded-md"
                    >
                        <div className="flex flex-col gap-3">
                            {messages.map((message) => {
                                const isAssistant = message.role === "assistant"
                                return (
                                    <div
                                        key={message.id}
                                        className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                                    >
                                        <div className={cn(
                                            "flex max-w-[88%] items-start gap-2",
                                            isAssistant ? "justify-start" : "justify-end flex-row-reverse"
                                        )}>
                                            <Avatar className="h-8 w-8 bg-slate-200">
                                                <AvatarImage
                                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                                                    alt="Assistant"
                                                    width={32}
                                                    height={32}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="bg-slate-900 text-2xl font-medium
                                                         text-white sm:text-3xl">
                                                    D
                                                </AvatarFallback>
                                            </Avatar>
                                            <section>
                                                <div
                                                    className={cn(
                                                        "rounded-lg px-3 py-2.5 text-[13px] leading-6 shadow-sm w-max min-w-[180px] max-w-[270px]",
                                                        isAssistant
                                                            ? "border border-slate-200 bg-white text-slate-900"
                                                            : "bg-slate-900 text-white"
                                                    )}
                                                >
                                                    <p className="break-words">{message.text}</p>
                                                </div>
                                                <div className={cn(
                                                    "mt-1 flex items-center justify-end gap-1 text-[11px] text-slate-600",
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
                                <div className="flex justify-start">
                                    <div className="flex max-w-[88%] items-end gap-2">
                                        <Avatar className="h-8 w-8 bg-slate-200">
                                            <AvatarImage
                                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
                                                alt="Assistant"
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="bg-slate-900 text-2xl font-medium
                                             text-white sm:text-3xl">
                                                D
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-2.5 py-2">
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

                    <div className="border-t border-slate-200 bg-white px-3 py-3">
                        <div className="flex items-end gap-2">
                            <textarea
                                ref={textareaRef}
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                onKeyDown={handleKeyDown}
                                rows={1}
                                placeholder="Enter your response..."
                                className="min-h-10 h-10 max-h-[120px] flex-1 resize-none overflow-hidden
                                rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2
                                text-base placeholder:text-sm text-slate-900 outline-none transition scrollbar-thin  
                                focus:border-emerald-500"
                            />
                            <Button
                                type="button"
                                variant="default"
                                className="w-10 h-10 flex items-center justify-center 
                                rounded-full"
                                onClick={() => {
                                    void handleSend()
                                }}
                                aria-label="Send message"
                            >
                                <SendHorizonal
                                    size={14}
                                    className=" text-white flex-shrink-0"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ChatSupport
