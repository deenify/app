"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { Input } from "@/components/ui/input"
import Animate from "@/components/shared/motion/Animate"
import Stagger from "@/components/shared/motion/Stagger"
import {
    FOOTER_LEGAL,
    FOOTER_LINK_SECTIONS,
    FOOTER_SOCIAL_LINKS,
    // handleFocusIn,
} from "./content"
import { AppleIcon } from "@/assets/svg/social/AppleIcon"
import { PlayStoreIcon } from "@/assets/svg/social/PlayStoreIcon"
import { clientEnv } from "@/env/client"
import Logo from "@/components/shared/Logo"

const COLUMN_BASE_DELAY = 0.1
const COLUMN_STEP = 0.12
const INNER_STEP = 0.08
const LINK_STEP = 0.06

const APP_STORE_LINKS = [
    { href: "#", icon: AppleIcon, store: "App Store", label: "Download on" },
    { href: "#", icon: PlayStoreIcon, store: "Google Play", label: "Get it on", iconClass: "w-5 h-5" },
] as const

const MarketingFooter = () => {
    const [email, setEmail] = useState("")
    const year = new Date().getFullYear()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setEmail("")
    }

    const Title_Class = "text-base sm:text-lg font-semibold tracking-tight text-gray-900"
    const Description_Class = "text-sm leading-relaxed text-gray-600"
    const Link_Class = "text-sm w-max text-gray-600 transition-colors hover:text-emerald-700"

    return (
        <footer id="contact" className="border-t border-layout-separator bg-marketing-light">
            <main className="container-header-footer">
                <section className="flex flex-wrap justify-between gap-10 py-12 sm:gap-16 sm:py-16 lg:py-20">
                    {/* Brand */}
                    <Stagger
                        index={0}
                        animation="while_in_view"
                        variant="up"
                        baseDelay={COLUMN_BASE_DELAY}
                        delay={COLUMN_STEP}
                        duration={0.85}
                        className="w-full 2xl:w-max"
                    >
                        <div className="max-w-sm space-y-6">
                            <div className="space-y-4">
                                <Logo />

                                <Animate
                                    variant="up"
                                    animate="while_in_view"
                                    delay={0.12}
                                    duration={0.85}
                                >
                                    <p className={Description_Class}>
                                        A disciplined digital companion for prayer, Quran, remembrance,
                                        and curated Islamic learning — composed for clarity, not clutter.
                                    </p>
                                </Animate>
                            </div>

                            <div className="flex items-center gap-4">
                                {FOOTER_SOCIAL_LINKS.map((social, index) => {
                                    const Icon = social.icon
                                    return (
                                        <Stagger
                                            key={social.label}
                                            index={index}
                                            animation="while_in_view"
                                            variant="in"
                                            baseDelay={0.28}
                                            delay={INNER_STEP}
                                            duration={0.7}
                                        >
                                            <Link
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 transition-colors 
                                                hover:text-emerald-600"
                                            >
                                                <span className="sr-only">{social.label}</span>
                                                <Icon className="h-5 w-5" />
                                            </Link>
                                        </Stagger>
                                    )
                                })}
                            </div>
                        </div>
                    </Stagger>

                    {/* Link columns */}
                    {FOOTER_LINK_SECTIONS.map((section, sectionIndex) => (
                        <Stagger
                            key={section.title}
                            index={sectionIndex + 1}
                            animation="while_in_view"
                            variant="up"
                            baseDelay={COLUMN_BASE_DELAY}
                            delay={COLUMN_STEP}
                            duration={0.85}
                            className="flex-1"
                        >
                            <div>
                                <h4 className={cn(Title_Class, "pb-4")}>{section.title}</h4>
                                <ul className="space-y-2 sm:space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <Stagger
                                            key={link.label}
                                            index={linkIndex}
                                            animation="while_in_view"
                                            variant="in"
                                            baseDelay={0.18}
                                            delay={LINK_STEP}
                                            duration={0.75}
                                        >
                                            <li>
                                                <Link href={link.href} className={Link_Class}>
                                                    {link.label}
                                                </Link>
                                            </li>
                                        </Stagger>
                                    ))}
                                </ul>
                            </div>
                        </Stagger>
                    ))}

                    {/* Newsletter */}
                    <Stagger
                        index={FOOTER_LINK_SECTIONS.length + 1}
                        animation="while_in_view"
                        variant="up"
                        baseDelay={COLUMN_BASE_DELAY}
                        delay={COLUMN_STEP}
                        duration={0.85}
                        className="flex w-full flex-wrap items-end justify-between 
                        gap-x-20 2xl:max-w-sm"
                    >
                        <div className="min-w-0 w-full max-w-sm space-y-4">
                            <h4 className={Title_Class}>Newsletter</h4>
                            <Animate
                                variant="up"
                                animate="while_in_view"
                                delay={0.12}
                                duration={0.85}
                            >
                                <p className={Description_Class}>
                                    Occasional notes on releases, guides, and thoughtful product craft.
                                </p>
                            </Animate>
                            <Animate
                                variant="in"
                                animate="while_in_view"
                                delay={0.28}
                                duration={0.9}
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex w-full flex-row items-stretch gap-2"
                                >
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        // onFocus={() => handleFocusIn(isMobile)}
                                        // onBlur={() =>
                                        //     setTimeout(() =>
                                        //         window.scrollTo({
                                        //             top: 0,
                                        //             left: 0,
                                        //             behavior: "instant"
                                        //         }), 100
                                        //     )
                                        // }
                                        placeholder="you@email.com"
                                        classNames={{ input: "h-11 w-full min-w-0 rounded-full" }}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="inline-flex h-11 shrink-0 items-center justify-center 
                                        gap-1.5 rounded-full whitespace-nowrap bg-emerald-600 px-6 text-sm 
                                        font-medium text-white transition hover:bg-emerald-700"
                                    >
                                        Subscribe
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                </form>
                            </Animate>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-10">
                            {APP_STORE_LINKS.map((store, index) => {
                                const Icon = store.icon
                                return (
                                    <Stagger
                                        key={store.store}
                                        index={index}
                                        animation="while_in_view"
                                        variant="in"
                                        baseDelay={0.42}
                                        delay={0.12}
                                        duration={0.85}
                                    >
                                        <Link
                                            href={store.href}
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-900 
                                            px-4 py-2 text-white transition hover:bg-emerald-700 sm:py-2.5"
                                        >
                                            <Icon className={"h-6 w-6"} />
                                            <div className="flex flex-col gap-0.5 sm:gap-0">
                                                <span className="text-[9px] uppercase leading-none opacity-80 sm:text-[10px]">
                                                    {store.label}
                                                </span>
                                                <span className="text-xs font-semibold leading-none sm:text-sm">
                                                    {store.store}
                                                </span>
                                            </div>
                                        </Link>
                                    </Stagger>
                                )
                            })}
                        </div>
                    </Stagger>
                </section>

                {/* Copyright */}
                <section className="flex flex-wrap items-center justify-between gap-x-10 
                gap-y-4 border-t border-gray-300/90 py-10">
                    <Animate
                        variant="in"
                        animate="while_in_view"
                        delay={0.65}
                        duration={0.85}
                    >
                        <p className={Description_Class}>
                            © {year} {clientEnv.APP_NAME}. All rights reserved.
                        </p>
                    </Animate>

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {FOOTER_LEGAL.map((link, index) => (
                            <Stagger
                                key={link.label}
                                index={index}
                                animation="while_in_view"
                                variant="in"
                                baseDelay={0.78}
                                delay={0.1}
                                duration={0.75}
                            >
                                <Link href={link.href} className={Link_Class}>
                                    {link.label}
                                </Link>
                            </Stagger>
                        ))}
                    </div>
                </section>
            </main>
        </footer>
    )
}

export default MarketingFooter
