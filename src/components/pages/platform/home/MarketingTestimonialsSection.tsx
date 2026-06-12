"use client"

import Image from "next/image"
import { useRef } from "react"
import type { Swiper as SwiperInstance } from "swiper"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { TESTIMONIALS } from "./content"

import "swiper/css"
import "swiper/css/pagination"
import FadeEdge from "@/components/shared/FadeEdge"


const MarketingTestimonialsSection = () => {
    const paginationRef = useRef<HTMLDivElement>(null)

    const bindPagination = (swiper: SwiperInstance) => {
        const pag = swiper.params.pagination
        if (pag && typeof pag !== "boolean") {
            pag.el = paginationRef.current
            swiper.pagination.init()
            swiper.pagination.render()
            swiper.pagination.update()
        }
    }

    return (
        <section className="overflow-hidden bg-marketing-light py-16 sm:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead="Trusted by users across the"
                        accent="world"
                        subtitle="Voices from designers, chaplains, and everyday Muslims who wanted 
                        software that matched the seriousness of their practice."
                    />
                </div>
            </div>

            <div className="container-marketing-wide mt-12 sm:mt-14">
                <div className="relative overflow-hidden py-2 sm:py-4">
                    <FadeEdge fadeDirection="both" />

                    <Swiper
                        className="marketing-testimonials-swiper !overflow-visible"
                        modules={[Pagination, Autoplay]}
                        watchSlidesProgress
                        speed={950}
                        loop
                        centeredSlides
                        slideToClickedSlide
                        slidesPerView={1.75}
                        spaceBetween={12}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2.15, spaceBetween: 12 },
                            1024: { slidesPerView: 2.4, spaceBetween: 14 },
                            1280: { slidesPerView: 2.55, spaceBetween: 14 },
                        }}
                        pagination={{
                            el: paginationRef.current,
                            clickable: true,
                            bulletClass: "marketing-testimonial-bullet",
                            bulletActiveClass: "marketing-testimonial-bullet-active",
                        }}
                        onBeforeInit={bindPagination}
                        onInit={bindPagination}
                    >
                        {TESTIMONIALS.map((item) => (
                            <SwiperSlide key={item.name}>
                                <blockquote className="testimonial-card h-full w-full rounded-md border 
                                border-gray-200 bg-marketing-card p-5 sm:p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="relative shrink-0 overflow-hidden rounded-md 
                                        h-[4.5rem] w-[4.5rem]">
                                            <Image
                                                src={item.avatar}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span
                                            className="font-accent -mt-0.5 shrink-0 text-7xl leading-none 
                                            text-emerald-600"
                                            aria-hidden
                                        >
                                            &ldquo;
                                        </span>
                                    </div>

                                    <p className="mt-5 min-h-[5.25rem] text-sm leading-[1.7] text-gray-700 
                                    sm:min-h-[5.75rem] sm:text-[0.9375rem]">
                                        {item.quote}
                                    </p>

                                    <footer className="mt-5 border-t border-gray-200 pt-4">
                                        <p className="text-sm font-semibold text-emerald-700">
                                            {item.name}
                                        </p>
                                        <p className="mt-0.5 text-xs text-gray-500">{item.role}</p>
                                    </footer>
                                </blockquote>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mt-8 flex justify-center sm:mt-9">
                    <div
                        ref={paginationRef}
                        className="marketing-testimonial-pagination flex items-center justify-center gap-2"
                    />
                </div>
            </div>
        </section>
    )
}

export default MarketingTestimonialsSection
