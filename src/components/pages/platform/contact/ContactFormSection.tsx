"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils/clsx"
import { CONTACT_RESPONSE_NOTE, CONTACT_TOPICS } from "./content"

const ContactFormSection = () => {
    const [submitted, setSubmitted] = useState(false)
    const [topic, setTopic] = useState(CONTACT_TOPICS[0])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSubmitted(true)
    }

    const ResponseIcon = CONTACT_RESPONSE_NOTE.icon

    return (
        <section className="bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
                    <Animate variant="up" animate="while_in_view" delay={0.3} duration={0.9}>
                        <div className="rounded-md border border-gray-200/80 bg-white p-5 shadow-[0_16px_48px_rgba(16,185,129,0.06)] sm:rounded-2xl sm:p-8">
                            {submitted ? (
                                <div className="flex min-h-[320px] flex-col items-center justify-center text-center sm:min-h-[400px]">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                        <CheckCircle2 className="h-7 w-7" />
                                    </span>
                                    <h2 className="mt-5 font-heading text-xl font-semibold text-gray-900 sm:text-2xl">
                                        Message received
                                    </h2>
                                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
                                        Thank you for reaching out. We typically respond within one business day.
                                    </p>
                                    <Button
                                        variant="outline-emerald"
                                        className="mt-6 rounded-full"
                                        onClick={() => setSubmitted(false)}
                                    >
                                        Send another message
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 sm:mb-8">
                                        <h2 className="font-heading text-xl font-semibold text-gray-900 sm:text-2xl">
                                            Send us a{" "}
                                            <span className="font-accent italic text-emerald-600">message</span>
                                        </h2>
                                        <p className="mt-2 text-sm text-gray-600 sm:text-base">
                                            Fill in the form and we will route your inquiry to the right person.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <Input
                                                id="contact-name"
                                                name="name"
                                                label="Full name"
                                                labelVariant="auth"
                                                placeholder="Your name"
                                                required
                                            />
                                            <Input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                label="Email"
                                                labelVariant="auth"
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="contact-topic"
                                                className="flex w-max gap-1 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-700"
                                            >
                                                Topic
                                            </label>
                                            <select
                                                id="contact-topic"
                                                name="topic"
                                                value={topic}
                                                onChange={(event) => setTopic(event.target.value)}
                                                className={cn(
                                                    "flex h-10 w-full rounded-md border border-gray-300 bg-gray-50/50 px-3",
                                                    "text-sm text-gray-800 outline-none transition-colors",
                                                    "focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-200"
                                                )}
                                            >
                                                {CONTACT_TOPICS.map((item) => (
                                                    <option key={item} value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <Input
                                            id="contact-subject"
                                            name="subject"
                                            label="Subject"
                                            labelVariant="auth"
                                            placeholder="Brief summary of your inquiry"
                                            required
                                        />

                                        <Input
                                            id="contact-message"
                                            name="message"
                                            label="Message"
                                            labelVariant="auth"
                                            placeholder="Tell us how we can help..."
                                            textarea
                                            required
                                        />

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                className="group h-11 w-full rounded-md text-sm font-medium sm:rounded-full"
                                                size="lg"
                                            >
                                                <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                                Send message
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </Animate>

                    <div className="flex flex-col gap-4">
                        <Animate variant="up" animate="while_in_view" delay={0.4} duration={0.9}>
                            <div className="rounded-md border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-5 sm:rounded-2xl sm:p-6">
                                <ResponseIcon className="h-5 w-5 text-emerald-600" />
                                <h3 className="mt-3 font-heading text-base font-semibold text-gray-900 sm:text-lg">
                                    {CONTACT_RESPONSE_NOTE.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                                    {CONTACT_RESPONSE_NOTE.description}
                                </p>
                            </div>
                        </Animate>

                        <Animate variant="up" animate="while_in_view" delay={0.5} duration={0.9}>
                            <div className="rounded-md border border-gray-100 bg-white p-5 sm:rounded-2xl sm:p-6">
                                <h3 className="font-heading text-base font-semibold text-gray-900">Before you write</h3>
                                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                        Check our <a href="/faqs" className="font-medium text-emerald-700 hover:underline">FAQs</a> for quick answers
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                        Active users can open <a href="/support" className="font-medium text-emerald-700 hover:underline">in-app support</a>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                        Billing questions? See <a href="/pricing" className="font-medium text-emerald-700 hover:underline">pricing</a> first
                                    </li>
                                </ul>
                            </div>
                        </Animate>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactFormSection
