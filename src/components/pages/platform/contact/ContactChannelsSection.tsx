"use client"

import Stagger from "@/components/shared/motion/Stagger"
import { Button } from "@/components/ui/button"
import { CONTACT_CHANNELS } from "./content"

const CONTENT_BASE_DELAY = 0.4
const STAGGER_STEP = 0.1

const ContactChannelsSection = () => {
    return (
        <section className="bg-white py-14 sm:py-20">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-heading text-2xl font-semibold text-gray-900 sm:text-3xl">
                        Other ways to{" "}
                        <span className="font-accent italic text-emerald-600">reach us</span>
                    </h2>
                    <p className="mt-3 text-sm text-gray-600 sm:text-base">
                        Pick the channel that fits — we route every message to the right team.
                    </p>
                </div>

                <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
                    {CONTACT_CHANNELS.map((channel, index) => {
                        const Icon = channel.icon

                        return (
                            <Stagger
                                key={channel.title}
                                index={index}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={CONTENT_BASE_DELAY}
                                delay={STAGGER_STEP}
                                duration={0.85}
                            >
                                <article className="flex h-full flex-col rounded-md border border-gray-100 bg-marketing-card p-5 sm:rounded-2xl sm:p-6">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900">
                                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                                    </span>
                                    <h3 className="mt-4 font-heading text-base font-semibold text-gray-900">
                                        {channel.title}
                                    </h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                                        {channel.description}
                                    </p>
                                    <Button
                                        variant="link"
                                        href={channel.href}
                                        className="mt-4 h-auto justify-start p-0 text-sm font-medium"
                                    >
                                        {channel.action}
                                    </Button>
                                </article>
                            </Stagger>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ContactChannelsSection
