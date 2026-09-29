"use client"

import { useEffect, useRef } from "react"
import type { Swiper as SwiperInstance } from "swiper"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FreeMode, Mousewheel } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import { HIJRI_MONTH_COUNT, HIJRI_MONTHS } from "./content"

import "swiper/css"
import "swiper/css/free-mode"

type HijriMonthSwiperProps = {
    monthIndex: number
    onSelect: (index: number) => void
    onAfterSelect?: () => void
}

export default function HijriMonthSwiper({
    monthIndex,
    onSelect,
    onAfterSelect,
}: HijriMonthSwiperProps) {
    const swiperRef = useRef<SwiperInstance | null>(null)

    useEffect(() => {
        const swiper = swiperRef.current
        if (!swiper || swiper.destroyed) return
        if (swiper.activeIndex !== monthIndex) {
            swiper.slideTo(monthIndex, 400)
        }
    }, [monthIndex])

    const selectMonth = (index: number, scrollToCalendar: boolean) => {
        onSelect(index)
        if (scrollToCalendar) onAfterSelect?.()
    }

    const slideBy = (delta: number, e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const next = Math.min(HIJRI_MONTH_COUNT - 1, Math.max(0, monthIndex + delta))
        swiperRef.current?.slideTo(next, 400)
        onSelect(next)
    }

    return (
        <section className="min-w-0 overflow-hidden">
            <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
                        {HIJRI_MONTH_COUNT} lunar gates
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-gray-900">
                        {HIJRI_MONTH_COUNT} months · one hijrī year
                    </h3>
                </div>
                <p className="hidden max-w-[200px] text-right text-[11px] leading-snug text-gray-500 sm:block">
                    Scroll the gates · tap to open that month in the calendar above
                </p>
            </div>

            <div className="flex min-w-0 items-center gap-2">
                <Button
                    type="button"
                    variant="ghost-purple"
                    size="sm"
                    className="h-9 w-9 bg-gray-100/70 p-0 hover:border hover:border-purple-300 hover:bg-purple-50"
                    shouldScale
                    aria-label="Previous lunar gate"
                    onClick={(e) => slideBy(-1, e)}
                    onPointerDown={(e) => e.stopPropagation()}
                    disabled={monthIndex === 0}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="min-w-0 flex-1 overflow-hidden select-none">
                    <Swiper
                        modules={[FreeMode, Mousewheel]}
                        freeMode={{
                            enabled: true,
                            momentum: true,
                            momentumRatio: 0.85,
                            momentumVelocityRatio: 0.85,
                        }}
                        mousewheel={{
                            forceToAxis: true,
                            sensitivity: 0.85,
                            releaseOnEdges: true,
                        }}
                        slidesPerView="auto"
                        spaceBetween={8}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                            if (monthIndex > 0) swiper.slideTo(monthIndex, 0)
                        }}
                        className="!overflow-hidden py-0.5"
                    >
                        {HIJRI_MONTHS.map((month) => {
                            const isActive = month.index === monthIndex
                            return (
                                <SwiperSlide key={month.id} className="!w-[140px] sm:!w-[148px]">
                                    <button
                                        type="button"
                                        onClick={() => selectMonth(month.index, true)}
                                        className={cn(
                                            "flex h-full w-full flex-col rounded-md border px-3 py-2.5 text-left transition-all duration-300",
                                            isActive
                                                ? "border-purple-400 bg-purple-600 text-white shadow-md shadow-purple-500/20"
                                                : "border-purple-200 bg-purple-50/60 text-gray-800 hover:shadow-sm hover:bg-purple-50 hover:border-purple-400"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "text-[10px] font-medium uppercase tracking-wider",
                                                isActive ? "text-purple-100" : "text-gray-400"
                                            )}
                                        >
                                            Gate {month.index + 1}
                                        </span>
                                        <span className="mt-0.5 line-clamp-1 text-sm font-semibold">
                                            {month.nameEnglish}
                                        </span>
                                        <span
                                            className={cn(
                                                "font-arabic mt-0.5 line-clamp-1 text-[11px]",
                                                isActive ? "text-purple-100/90" : "text-purple-800/75"
                                            )}
                                            dir="rtl"
                                        >
                                            {month.nameArabic}
                                        </span>
                                    </button>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>

                <Button
                    type="button"
                    variant="ghost-purple"
                    size="sm"
                    className="h-9 w-9 bg-gray-100/70 p-0 hover:border hover:border-purple-300 hover:bg-purple-50"
                    shouldScale
                    aria-label="Next lunar gate"
                    onClick={(e) => slideBy(1, e)}
                    onPointerDown={(e) => e.stopPropagation()}
                    disabled={monthIndex === HIJRI_MONTH_COUNT - 1}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </section>
    )
}
