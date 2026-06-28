"use client"

import Image from "next/image"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import FadeEdge from "@/components/shared/FadeEdge"
import Animate from "@/components/shared/motion/Animate"
import MarketingSectionHeading from "./MarketingSectionHeading"
import { TESTIMONIALS } from "./content"

import "swiper/css"
import "swiper/css/pagination"

const CONTENT_BASE_DELAY = 0.55
const PAGINATION_CONTAINER_CLASS = "marketing-testimonial-pagination"

const MarketingTestimonialsSection = () => {

    return (
        <section className="overflow-hidden bg-marketing-light py-14 sm:py-20 lg:py-24">
            <div className="container">
                <div className="mx-auto max-w-2xl text-center">
                    <MarketingSectionHeading
                        lead={<>Trusted by users <br className='block xs:hidden' /> across the</>}
                        accent="world"
                        subtitle="Voices from designers, chaplains, and everyday Muslims
                         who wanted software that matched the seriousness of their practice."
                    />
                </div>
            </div>

            <Animate
                animate="while_in_view"
                variant="in"
                delay={CONTENT_BASE_DELAY}
                duration={1.1}
                className="container mt-10 sm:mt-12"
            >
                <div className="relative overflow-hidden py-2 md:overflow-visible md:py-4">
                    <FadeEdge fadeDirection="both" hideBelow="md" />

                    <Swiper
                        className="marketing-testimonials-swiper overflow-hidden"
                        modules={[Pagination, Autoplay]}
                        watchSlidesProgress
                        speed={900}
                        loop
                        centeredSlides
                        slidesPerView={1}
                        spaceBetween={12}
                        observer
                        observeParents
                        resizeObserver
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1.75, spaceBetween: 12 },
                            1024: { slidesPerView: 2.15, spaceBetween: 14 },
                            1170: { slidesPerView: 2.4, spaceBetween: 14 },
                            1280: { slidesPerView: 2.55, spaceBetween: 16 },
                        }}
                        pagination={{
                            el: `.${PAGINATION_CONTAINER_CLASS}`,
                            clickable: true,
                            bulletClass: "marketing-testimonial-bullet",
                            bulletActiveClass: "marketing-testimonial-bullet-active",
                        }}
                    >
                        {TESTIMONIALS.map((item) => (
                            <SwiperSlide key={item.name}>
                                <blockquote className="testimonial-card h-full w-full rounded-md border 
                                border-gray-200 bg-marketing-card p-4 sm:p-6">
                                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                                        <div className="relative hrink-0 overflow-hidden rounded-md 
                                        h-[4.5rem] w-[4.5rem]">
                                            <Image
                                                fill
                                                priority
                                                src={item.avatar}
                                                alt={item.name}
                                                fetchPriority="high"
                                                className="object-cover"
                                            />
                                        </div>
                                        <span
                                            className="font-accent -mt-0.5 shrink-0 text-5xl 
                                            leading-none text-emerald-600 sm:text-7xl"
                                            aria-hidden
                                        >
                                            &ldquo;
                                        </span>
                                    </div>

                                    <p className="mt-4 text-sm leading-[1.65] text-gray-700 sm:mt-5 
                                    sm:min-h-[5.25rem] sm:text-[0.9375rem] sm:leading-[1.7]">
                                        {item.quote}
                                    </p>

                                    <footer className="mt-4 border-t border-gray-200 pt-3 sm:mt-5 sm:pt-4">
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

                <div className="mt-6 flex justify-center sm:mt-8 w-full h-max">
                    <div
                        className={`${PAGINATION_CONTAINER_CLASS} flex items-center justify-center gap-2 mt-4 w-full h-max`}
                    />
                </div>
            </Animate>
        </section>
    )
}

export default MarketingTestimonialsSection
