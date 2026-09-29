import { create } from "zustand"
import type { SupportMessage, SupportState } from "./support.types"

const initialMessages: SupportMessage[] = [
    {
        id: 1,
        role: "assistant",
        text: "Assalamu alaikum 👋 We’re here to help with Deenify. Tell us your first question and we’ll guide you from there.",
        time: "now",
        status: "seen",
    },
]

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

const useSupportStore = create<SupportState>((set) => ({
    messages: initialMessages,
    isTyping: false,
    sendMessage: async (text: string) => {
        if (!text.trim()) return

        const userMessage: SupportMessage = {
            id: Date.now(),
            role: "user",
            text: text.trim(),
            time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            status: "sent",
        }

        set((state) => ({ messages: [...state.messages, userMessage] }))
        set({ isTyping: true })

        await wait(2000)

        const assistantMessage: SupportMessage = {
            id: Date.now() + 1,
            role: "assistant",
            text: `Thanks for reaching out. We’ve noted: “${text.trim()}”. Our team will help you with the right context and next steps.`,
            time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            status: "seen",
        }

        set((state) => ({
            messages: [...state.messages, assistantMessage],
            isTyping: false,
        }))
    },
    resetConversation: () => {
        set({ messages: initialMessages, isTyping: false })
    },
}))

export default useSupportStore
