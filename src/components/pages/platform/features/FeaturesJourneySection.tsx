"use client"

import { useBreakpoint } from "@/hooks/useBreakpoint"
import Stagger from "@/components/shared/motion/Stagger"
import { cn } from "@/lib/utils/clsx"
import { clientEnv } from "@/env/client"
import { FEATURE_JOURNEY } from "./content"

const STAGGER_STEP = 0.1
const CONTENT_BASE_DELAY = 0.4

const FeaturesJourneySection = () => {
    const isLgUp = useBreakpoint("lg", "up")

    return (
        <section className="overflow-hidden bg-marketing-light py-14 sm:py-20">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="font-heading text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                        One day,{" "}
                        <span className="font-accent italic text-emerald-600">one app</span>
                    </h2>
                    <p className="mt-3 text-sm text-gray-600 sm:text-base">
                        How most members move through {clientEnv.APP_NAME} from Fajr to evening.
                    </p>
                </div>

                <div className="mt-10 flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:mt-12 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0">
                    {FEATURE_JOURNEY.map((moment, index) => {
                        const Icon = moment.icon

                        return (
                            <Stagger
                                key={moment.time}
                                index={index}
                                animate={isLgUp}
                                animation="while_in_view"
                                variant="up"
                                baseDelay={CONTENT_BASE_DELAY}
                                delay={STAGGER_STEP}
                                duration={0.85}
                            >
                                <article
                                    className={cn(
                                        "relative flex w-[220px] shrink-0 flex-col justify-between overflow-hidden",
                                        "rounded-2xl p-5 text-white shadow-lg sm:w-[240px] lg:w-auto lg:min-h-[200px]",
                                        `bg-gradient-to-br ${moment.tint}`
                                    )}
                                >
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                                            {moment.time}
                                        </p>
                                        <h3 className="mt-3 font-heading text-xl font-semibold">{moment.module}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-white/80">{moment.detail}</p>
                                    </div>
                                    <span className="mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                                        <Icon className="h-4 w-4" strokeWidth={1.9} />
                                    </span>

                                    {index < FEATURE_JOURNEY.length - 1 && (
                                        <span
                                            className="absolute -right-2 top-1/2 hidden h-px w-4 bg-emerald-300/50 lg:block"
                                            aria-hidden
                                        />
                                    )}
                                </article>
                            </Stagger>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default FeaturesJourneySection
