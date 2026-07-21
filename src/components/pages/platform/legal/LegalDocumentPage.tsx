"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Scale } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import Stagger from "@/components/shared/motion/Stagger"
import MarketingSectionHead from "../home/MarketingSectionHead"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/clsx"
import type { LegalDocument } from "./content"
import { MARKETING_HEADER_HEIGHT } from "@/components/layout/marketing/header/content"
import { useBreakpoint } from "@/hooks/useBreakpoint"

type LegalDocumentPageProps = {
    document: LegalDocument
}

const MARKETING_SCROLL_ID = "marketing-layout-wrapper-scroll-container"
const NAV_UNLOCK_SETTLE_MS = 160
const NAV_UNLOCK_FALLBACK_MS = 1100
const HEADER_OFFSET_PX = 80 // matches layout pt-20 / sticky top-20
const DESKTOP_SCROLL_OFFSET_PX = 112
const MOBILE_SCROLL_EXTRA_PX = 16

const LegalDocumentPage = ({ document: doc }: LegalDocumentPageProps) => {
    const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? "")

    const jumpLockRef = useRef(false)
    const jumpTargetRef = useRef<string | null>(null)
    const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const chipsTrackRef = useRef<HTMLDivElement>(null)
    const stickyNavRef = useRef<HTMLDivElement>(null)
    const chipButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    const isMobile = useBreakpoint("sm", "up")

    const clearUnlockTimers = useCallback(() => {
        if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current)
        if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
        unlockTimerRef.current = null
        fallbackTimerRef.current = null
    }, [])

    const unlockNav = useCallback((finalId?: string | null) => {
        clearUnlockTimers()
        jumpLockRef.current = false
        if (finalId) {
            jumpTargetRef.current = null
            setActiveId(finalId)
        } else {
            jumpTargetRef.current = null
        }
    }, [clearUnlockTimers])

    const getScrollOffset = useCallback(() => {
        const isLg = window.matchMedia("(min-width: 1024px)").matches
        if (isLg) return DESKTOP_SCROLL_OFFSET_PX

        const stickyH = stickyNavRef.current?.offsetHeight ?? 96
        return HEADER_OFFSET_PX + stickyH + MOBILE_SCROLL_EXTRA_PX
    }, [])

    const scrollToSection = useCallback(
        (el: HTMLElement) => {
            const container = document.getElementById(MARKETING_SCROLL_ID)
            const offset = getScrollOffset()

            if (!container) {
                el.scrollIntoView({ behavior: "smooth", block: "start" })
                return
            }

            const elTop = el.getBoundingClientRect().top
            const containerTop = container.getBoundingClientRect().top
            const nextTop = container.scrollTop + (elTop - containerTop) - offset
            container.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" })
        },
        [getScrollOffset]
    )

    useEffect(() => {
        const scrollRoot = document.getElementById(MARKETING_SCROLL_ID) ?? undefined

        const nodes = doc.sections
            .map((section) => document.getElementById(section.id))
            .filter(Boolean) as HTMLElement[]

        if (!nodes.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (jumpLockRef.current) return

                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

                if (visible[0]?.target.id) setActiveId(visible[0].target.id)
            },
            {
                root: scrollRoot ?? null,
                rootMargin: "-18% 0px -62% 0px",
                threshold: [0.08, 0.25, 0.5],
            }
        )

        nodes.forEach((node) => observer.observe(node))
        return () => observer.disconnect()
    }, [doc.sections])

    // Keep active mobile chip in horizontal view
    useEffect(() => {
        const track = chipsTrackRef.current
        const chip = chipButtonRefs.current[activeId]
        if (!track || !chip) return

        const trackRect = track.getBoundingClientRect()
        const chipRect = chip.getBoundingClientRect()
        const nextLeft =
            track.scrollLeft +
            (chipRect.left - trackRect.left) -
            trackRect.width / 2 +
            chipRect.width / 2

        track.scrollTo({ left: Math.max(0, nextLeft), behavior: "smooth" })
    }, [activeId])

    useEffect(() => () => clearUnlockTimers(), [clearUnlockTimers])

    const jumpTo = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return

        clearUnlockTimers()
        jumpLockRef.current = true
        jumpTargetRef.current = id
        setActiveId(id)
        scrollToSection(el)

        const container = document.getElementById(MARKETING_SCROLL_ID)

        const scheduleUnlock = () => {
            if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current)
            unlockTimerRef.current = setTimeout(() => {
                unlockNav(jumpTargetRef.current)
                container?.removeEventListener("scroll", onScroll)
            }, NAV_UNLOCK_SETTLE_MS)
        }

        const onScroll = () => scheduleUnlock()

        if (container) {
            container.addEventListener("scroll", onScroll, { passive: true })
        }

        // Unlock after scroll settles; fallback covers no-scroll / instant cases
        fallbackTimerRef.current = setTimeout(() => {
            container?.removeEventListener("scroll", onScroll)
            unlockNav(id)
        }, NAV_UNLOCK_FALLBACK_MS)
    }

    return (
        <div className="bg-white">
            <header className="relative overflow-hidden border-b border-gray-100 bg-marketing-light">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(ellipse at 12% 0%, rgba(16,185,129,0.14), transparent 45%), radial-gradient(ellipse at 88% 20%, rgba(16,185,129,0.08), transparent 40%)",
                    }}
                    aria-hidden
                />
                <div className="relative container py-10 xs:py-12 sm:py-16 lg:py-20">
                    <Animate variant="up" delay={0.12} duration={0.65}>
                        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-800/80 sm:text-xs">
                            <Scale className="h-3.5 w-3.5" strokeWidth={1.9} />
                            {doc.eyebrow}
                        </div>
                    </Animate>

                    <Animate variant="up" delay={0.22} duration={0.75}>
                        <h1 className="mt-4 font-heading text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-gray-900 xs:mt-5 xs:text-4xl sm:text-[2.65rem] lg:text-[2.85rem]">
                            {doc.title}{" "}
                            <span className="font-accent italic text-emerald-600">{doc.accent}</span>
                        </h1>
                    </Animate>

                    <Animate variant="up" delay={0.34} duration={0.8}>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base">
                            <span className="sm:hidden">{doc.summaryMobile}</span>
                            <span className="hidden sm:inline">{doc.summary}</span>
                        </p>
                    </Animate>

                    <Animate variant="up" delay={0.44} duration={0.75}>
                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200/80 pt-4 text-xs text-gray-500 sm:mt-8 sm:gap-x-5 sm:pt-5 sm:text-sm">
                            <span className="hidden xs:inline">{doc.updatedLabel}</span>
                            <span className="xs:hidden">Updated Jul 2026</span>
                            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:inline-block" aria-hidden />
                            <span className="hidden sm:inline">{doc.readingNote}</span>
                            <span className="sm:hidden">{doc.readingNoteMobile}</span>
                            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:inline-block" aria-hidden />
                            <Link
                                href={doc.relatedHref}
                                className="inline-flex items-center gap-1 font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                            >
                                <span className="sm:hidden">Related policy</span>
                                <span className="hidden sm:inline">{doc.relatedLabel}</span>
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </Animate>
                </div>
            </header>

            <div
                ref={stickyNavRef}
                style={{ top: MARKETING_HEADER_HEIGHT(isMobile) }}
                className="sticky z-30 lg:hidden"
            >
                <div className="border-b border-layout-separator bg-white 
                shadow-[0_12px_40px_rgba(16,185,129,0.12)]...">
                    <div className="container py-3.5">
                        <div
                            ref={chipsTrackRef}
                            className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-hide"
                        >
                            {doc.sections.map((section, index) => (
                                <button
                                    key={section.id}
                                    ref={(node) => {
                                        chipButtonRefs.current[section.id] = node
                                    }}
                                    type="button"
                                    onClick={() => jumpTo(section.id)}
                                    className={cn(
                                        "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
                                        activeId === section.id
                                            ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
                                            : "border-emerald-100 bg-white text-gray-700 hover:border-emerald-200 hover:text-emerald-900"
                                    )}
                                >
                                    {String(index + 1).padStart(2, "0")} · {section.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-10 sm:py-16 lg:py-20">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
                    <aside className="hidden w-[220px] shrink-0 lg:sticky lg:top-24 lg:block xl:w-[240px]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                            Contents
                        </p>
                        <nav className="mt-4 space-y-0.5" aria-label="Document sections">
                            {doc.sections.map((section, index) => {
                                const active = activeId === section.id

                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => jumpTo(section.id)}
                                        className={cn(
                                            "group flex w-full items-baseline gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors",
                                            active
                                                ? "bg-emerald-50/80 text-emerald-900"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "font-mono text-[11px] tabular-nums",
                                                active ? "text-emerald-600" : "text-gray-300 group-hover:text-gray-400"
                                            )}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="leading-snug">{section.title}</span>
                                    </button>
                                )
                            })}
                        </nav>
                    </aside>

                    <article className="min-w-0 flex-1">
                        <div className="space-y-12 sm:space-y-14">
                            {doc.sections.map((section, index) => (
                                <Stagger
                                    key={section.id}
                                    index={index}
                                    animation="while_in_view"
                                    variant="up"
                                    baseDelay={0.1}
                                    delay={0.04}
                                    duration={0.7}
                                >
                                    <section id={section.id} className="scroll-mt-[11.5rem] lg:scroll-mt-28">
                                        <div className="flex items-baseline gap-4 border-b border-gray-100 pb-3">
                                            <span className="font-mono text-xs tabular-nums text-emerald-600/80 sm:text-sm">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <h2 className="font-heading text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                                                {section.title}
                                            </h2>
                                        </div>

                                        <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-[15px] sm:leading-7">
                                            {section.paragraphs.map((paragraph) => (
                                                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                                            ))}

                                            {section.bullets && section.bullets.length > 0 && (
                                                <ul className="space-y-2.5 pt-1">
                                                    {section.bullets.map((item) => (
                                                        <li key={item} className="flex gap-3">
                                                            <span
                                                                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500"
                                                                aria-hidden
                                                            />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </section>
                                </Stagger>
                            ))}
                        </div>

                        <Animate variant="up" animate="while_in_view" delay={0.15} duration={0.75}>
                            <div
                                className="relative mt-12 overflow-hidden rounded-2xl border border-emerald-100 
                                bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 px-5 py-12 text-center 
                                sm:mt-16 sm:rounded-[2rem] sm:px-10 sm:py-14"
                            >
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-[0.35]"
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.1), transparent 35%)",
                                    }}
                                    aria-hidden
                                />
                                <div className="relative mx-auto max-w-lg">
                                    <MarketingSectionHead
                                        lead="Still"
                                        accent="unclear?"
                                        subtitle="Ask us — we would rather explain than leave ambiguity."
                                    />
                                    <div className="mt-6 flex w-full flex-col gap-3 xs:mt-8 xs:flex-row justify-center items-center">
                                        <Button
                                            href="/contact"
                                            className="h-11 rounded-full px-8 text-sm font-medium w-max sm:h-12 sm:px-10 sm:text-base"
                                        >
                                            Contact us
                                        </Button>
                                        <Button
                                            href={doc.relatedHref}
                                            variant="outline-emerald"
                                            className="h-11 rounded-full px-8 text-sm font-medium w-max sm:h-12 sm:px-10 sm:text-base"
                                        >
                                            {doc.relatedLabel}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Animate>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default LegalDocumentPage
