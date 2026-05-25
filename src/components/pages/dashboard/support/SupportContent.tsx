"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, ChevronDown, HelpCircle, Mail, Sparkles } from "lucide-react"
import SectionHeader from "@/components/shared/SectionHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils/clsx"
import { SUPPORT_CHANNELS, SUPPORT_EDITORIAL, SUPPORT_FAQS } from "./content"
import SupportChatWidget from "./SupportChatWidget"

export default function SupportContent() {
    const [openId, setOpenId] = useState<string | null>(SUPPORT_FAQS[0]?.id ?? null)
    const [faqSearch, setFaqSearch] = useState("")

    const filteredFaqs = useMemo(() => {
        const q = faqSearch.trim().toLowerCase()
        if (!q) return SUPPORT_FAQS
        return SUPPORT_FAQS.filter(
            (f) =>
                f.question.toLowerCase().includes(q) ||
                f.answer.toLowerCase().includes(q)
        )
    }, [faqSearch])

    return (
        <div className="bg-gray-50">
            <SectionHeader
                layoutScope="center"
                className="bg-white"
                variant="blue"
                icon={HelpCircle}
                label={SUPPORT_EDITORIAL.badge}
                heading={SUPPORT_EDITORIAL.title}
                descriptions={[SUPPORT_EDITORIAL.lead]}
            />

            <section className="border-t border-layout-separator">
                <div className="container py-8 sm:py-10">
                    <div className="mx-auto mb-6 max-w-4xl rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50/80 to-sky-50/80 p-4 sm:flex sm:items-center sm:gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">AI assistant (coming)</p>
                            <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                                We plan smart help inside the app — find verses, check sources, and learn how features work.
                                For now, use chat or email below.
                            </p>
                        </div>
                        <Badge variant="purple" className="mt-3 w-fit sm:mt-0">
                            <Sparkles className="mr-1 h-3 w-3" />
                            Soon
                        </Badge>
                    </div>

                    <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_280px]">
                        <div className="space-y-4">
                            <Input
                                search
                                type="input"
                                placeholder="Search FAQs..."
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                                className="w-full min-w-0 max-w-full"
                                classNames={{
                                    inputWrapper: "w-full min-w-0",
                                    input: "h-10 w-full min-w-0 rounded-md border-gray-200 bg-white",
                                }}
                            />
                            <h2 className="text-sm font-medium text-gray-900">Common questions</h2>
                            {filteredFaqs.length === 0 ? (
                                <p className="text-sm text-gray-500">No FAQs match your search.</p>
                            ) : (
                                filteredFaqs.map((faq, index) => {
                                    const isOpen = openId === faq.id
                                    return (
                                        <motion.div
                                            key={faq.id}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.04 }}
                                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                                                className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-5"
                                            >
                                                <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200",
                                                        isOpen && "rotate-180"
                                                    )}
                                                />
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="border-t border-gray-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600 sm:px-5 sm:pb-5">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )
                                })
                            )}
                        </div>

                        <aside className="space-y-4">
                            <h2 className="text-sm font-medium text-gray-900">Contact</h2>
                            {SUPPORT_CHANNELS.map((ch) => (
                                <div
                                    key={ch.label}
                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                        {ch.label}
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{ch.value}</p>
                                    <p className="mt-1 text-xs text-gray-500">{ch.hint}</p>
                                </div>
                            ))}
                            <Button
                                href="mailto:help@deenify.app"
                                variant="outline-emerald"
                                className="w-full gap-2"
                                shouldScale
                                size="sm"
                            >
                                <Mail className="h-4 w-4" />
                                Send email
                            </Button>
                        </aside>
                    </div>
                </div>
            </section>

            <SupportChatWidget />
        </div>
    )
}
