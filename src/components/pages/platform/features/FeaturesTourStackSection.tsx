"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import type { Swiper as SwiperInstance } from "swiper"
import { EffectCards } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import Animate from "@/components/shared/motion/Animate"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { FEATURE_TOUR_PANELS } from "./content"

import "swiper/css"
import "swiper/css/effect-cards"

const FeaturesTourStackSection = () => {
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const goTo = useCallback(
        (index: number) => {
            if (!swiper || isAnimating) return
            swiper.slideTo(index)
        },
        [swiper, isAnimating]
    )

    return (
        <section id="tour" className="overflow-hidden bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHead
                        lead="Three layers,"
                        accent="one workflow"
                        subtitle="Swipe through how worship, reading, and learning connect inside the dashboard."
                    />
                </div>

                <Animate
                    variant="up"
                    animate="while_in_view"
                    delay={0.35}
                    duration={1}
                    className="relative mx-auto mt-10 w-full max-w-[min(100%,300px)] xs:max-w-[340px] sm:mt-14 
                    sm:max-w-[380px] lg:max-w-[420px]"
                >
                    <Swiper
                        className="features-tour-stack-swiper"
                        modules={[EffectCards]}
                        effect="cards"
                        grabCursor
                        speed={780}
                        resistanceRatio={0.85}
                        threshold={8}
                        cardsEffect={{
                            slideShadows: false,
                            rotate: false,
                            perSlideOffset: 7,
                        }}
                        onSwiper={setSwiper}
                        onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
                        onTransitionStart={() => setIsAnimating(true)}
                        onTransitionEnd={() => setIsAnimating(false)}
                    >
                        {FEATURE_TOUR_PANELS.map((panel, index) => (
                            <SwiperSlide key={panel.id}>
                                <article
                                    className="features-tour-stack-card flex h-full flex-col overflow-hidden 
                                    rounded-2xl border border-gray-200/80 bg-white 
                                    shadow-[0_24px_60px_rgba(16,185,129,0.12)]"
                                >
                                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                                        <Image
                                            src={panel.image}
                                            alt={panel.label}
                                            fill
                                            className="object-cover"
                                            sizes="420px"
                                            priority={index === 0}
                                            draggable={false}
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-gray-900/75 
                                            via-gray-900/15 to-transparent"
                                            aria-hidden
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-5">
                                            <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                                                {panel.title}{" "}
                                                <span className="font-accent italic text-emerald-300">
                                                    {panel.accent}
                                                </span>
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                                        <p className="text-sm leading-relaxed text-gray-600">{panel.description}</p>

                                        <ul className="mt-4 space-y-2">
                                            {panel.highlights.slice(0, 3).map((item) => {
                                                const Icon = item.icon

                                                return (
                                                    <li
                                                        key={item.text}
                                                        className="flex items-center gap-2 text-xs text-gray-700 sm:text-sm"
                                                    >
                                                        <span
                                                            className="flex h-6 w-6 shrink-0 items-center justify-center 
                                                            rounded-full bg-emerald-50 text-emerald-600"
                                                        >
                                                            <Icon className="h-3 w-3" strokeWidth={2} />
                                                        </span>
                                                        {item.text}
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                        <div className="mt-auto pt-5">
                                            <Button
                                                variant="default"
                                                href={panel.href}
                                                className="flex h-10 w-full items-center justify-center rounded-full 
                                                text-sm font-medium"
                                            >
                                                {panel.cta}
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mt-8 flex items-center justify-center gap-2">
                        {FEATURE_TOUR_PANELS.map((panel, index) => (
                            <button
                                key={panel.id}
                                type="button"
                                aria-label={`Go to ${panel.label}`}
                                aria-current={activeIndex === index}
                                onClick={() => goTo(index)}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    activeIndex === index
                                        ? "w-6 bg-emerald-600"
                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                )}
                            />
                        ))}
                    </div>
                </Animate>

                <p className="mx-auto mt-6 max-w-sm text-center text-xs text-gray-500 sm:text-sm">
                    Swipe the stack or tap a tip — each card opens the live module in your dashboard.
                </p>
            </div>
        </section>
    )
}

export default FeaturesTourStackSection
