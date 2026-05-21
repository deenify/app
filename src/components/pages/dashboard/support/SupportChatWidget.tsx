"use client"

import { useState } from "react"
import { MessageCircle, Send, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils/clsx"
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

type ChatMessage = { id: string; role: "user" | "team" | "system"; text: string }

const WELCOME: ChatMessage = {
    id: "welcome",
    role: "system",
    text: "Assalamu alaikum. Chat with our team here. Soon we may add AI help for app questions, Quran lookup, and source checks.",
}

const TEAM_REPLY = "Thanks for your message. A team member will reply within 2 business days. For urgent issues, email help@deenify.app."

export default function SupportChatWidget() {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME])

    const send = () => {
        const text = input.trim()
        if (!text) return
        setMessages((prev) => [
            ...prev,
            { id: `u-${Date.now()}`, role: "user", text },
            { id: `t-${Date.now()}`, role: "team", text: TEAM_REPLY },
        ])
        setInput("")
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    type="button"
                    variant="default"
                    shouldScale
                    className="fixed bottom-20 right-4 z-50 gap-2 rounded-full shadow-lg lg:bottom-8 lg:right-8"
                    size="sm"
                >
                    <MessageCircle className="h-4 w-4" />
                    Chat with us
                </Button>
            </DrawerTrigger>
            <DrawerContent className="mx-auto max-h-[85dvh] max-w-lg rounded-t-2xl">
                <div className="border-b border-gray-100 px-4 pb-3 pt-4 text-left">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-base font-medium">Support chat</DrawerTitle>
                        <DrawerClose asChild>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" aria-label="Close chat">
                                <X className="h-4 w-4" />
                            </Button>
                        </DrawerClose>
                    </div>
                    <p className="text-xs text-gray-500">Live team chat · AI assistant planned</p>
                </div>

                <div className="flex min-h-[280px] flex-col px-4 pb-4">
                    <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto py-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "max-w-[85%] rounded-xl px-3 py-2 text-sm",
                                    msg.role === "user" && "ml-auto bg-emerald-600 text-white",
                                    msg.role === "team" && "mr-auto border border-gray-200 bg-white text-gray-700",
                                    msg.role === "system" &&
                                        "mx-auto max-w-full border border-sky-100 bg-sky-50/80 text-center text-xs text-sky-900"
                                )}
                            >
                                {msg.role === "system" && (
                                    <Sparkles className="mx-auto mb-1 h-3.5 w-3.5 text-sky-600" />
                                )}
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                        <Input
                            type="input"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && send()}
                            classNames={{ input: "h-10 flex-1 rounded-md border-gray-200" }}
                        />
                        <Button type="button" variant="default" size="icon" shouldScale onClick={send} aria-label="Send">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
