export type SupportMessageRole = "assistant" | "user"

export type SupportMessage = {
    id: number
    role: SupportMessageRole
    text: string
    time: string
    status?: "sent" | "seen"
}

export type SupportState = {
    messages: SupportMessage[]
    isTyping: boolean
    sendMessage: (text: string) => void
    resetConversation: () => void
}
