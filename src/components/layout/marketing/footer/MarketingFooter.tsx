"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { Input } from "@/components/ui/input"
import {
    FOOTER_LEGAL,
    FOOTER_LINK_SECTIONS,
    FOOTER_SOCIAL_LINKS,
    handleFocusIn,
} from "./content"
import { AppleIcon } from "@/assets/svg/AppleIcon"
import { PlayStoreIcon } from "@/assets/svg/PlayStoreIcon"
import { useBreakpoint } from "@/hooks/useBreakpoint"


const MarketingFooter = () => {
    const isMobile = useBreakpoint('md', 'down')

    const [email, setEmail] = useState("")
    const year = new Date().getFullYear()


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setEmail("")
    }


    // Generic Styles
    const Title_Class = "text-base sm:text-lg font-semibold tracking-tight text-gray-900"
    const Description_Class = "text-sm leading-relaxed text-gray-600"
    const Link_Class = "text-sm w-max text-gray-600 transition-colors hover:text-emerald-700"

    return (
        <footer id="contact" className="border-t border-layout-separator bg-marketing-light">
            <main className="container-header-footer">
                <section className="flex flex-wrap justify-between sm:gap-16 gap-10 py-12 sm:py-16 lg:py-20">
                    {/* Logo section  */}
                    <div className="w-full 2xl:w-max">
                        <div className="space-y-6 max-w-sm">
                            <div className="space-y-4">
                                <Link
                                    href="/"
                                    className="inline-flex font-heading text-2xl font-semibold 
                                tracking-tight text-emerald-900"
                                >
                                    Deenify<span className="font-accent italic text-emerald-600">.</span>
                                </Link>
                                <p className={Description_Class}>
                                    A disciplined digital companion for prayer, Quran, remembrance,
                                    and curated Islamic learning — composed for clarity, not clutter.
                                </p>
                            </div>

                            {/* Social Media Links */}
                            <div className="flex items-center gap-4">
                                {FOOTER_SOCIAL_LINKS.map((social) => {
                                    const Icon = social.icon
                                    return (
                                        <Link
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-emerald-600 
                                            transition-colors"
                                        >
                                            <span className="sr-only">{social.label}</span>
                                            <Icon className="h-5 w-5" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Links section  */}
                    {FOOTER_LINK_SECTIONS.map((section, idx) => (
                        <div key={idx} className="flex-1">
                            <h4 className={cn(Title_Class, "pb-4")}>
                                {section.title}
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                                {section.links.map((link, idxx) => {
                                    return (
                                        <li key={idxx}>
                                            <Link
                                                href={link.href}
                                                className={Link_Class}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter section  */}
                    <div className="w-full 2xl:max-w-sm flex justify-between items-end flex-wrap gap-x-20">
                        <div className="min-w-0 space-y-4 w-full max-w-sm">
                            <h4 className={Title_Class}>
                                Newsletter
                            </h4>
                            <p className={Description_Class}>
                                Occasional notes on releases, guides, and thoughtful product craft.
                            </p>
                            <form
                                onSubmit={handleSubmit}
                                className="flex w-full flex-row items-stretch gap-2"
                            >
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => handleFocusIn(isMobile)}
                                    onBlur={() => setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 100)}
                                    placeholder="you@email.com"
                                    classNames={{ input: "h-11 w-full min-w-0 rounded-full" }}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 
                                    rounded-full whitespace-nowrap bg-emerald-600 px-6 text-sm font-medium 
                                    text-white transition hover:bg-emerald-700"
                                >
                                    Subscribe
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            </form>
                        </div>

                        {/* App Store Links */}
                        <div className="flex flex-wrap items-center gap-3 pt-10">
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 
                                py-2 sm:py-2.5 text-white transition hover:bg-emerald-700"
                            >
                                <AppleIcon className="w-6 h-6" />
                                <div className="flex flex-col gap-0.5 sm:gap-0">
                                    <span className="text-[9px] sm:text-[10px] leading-none opacity-80 uppercase">
                                        Download on
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold leading-none">App Store</span>
                                </div>
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex items-center gap-2 rounded-md bg-gray-900 
                                px-4 py-2 sm:py-2.5 text-white transition hover:bg-emerald-700"
                            >
                                <PlayStoreIcon className="w-5 h-5" />
                                <div className="flex flex-col gap-0.5 sm:gap-0">
                                    <span className="text-[9px] sm:text-[10px] leading-none opacity-80 uppercase">
                                        Get it on
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold leading-none">Google Play</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Copyright  */}
                <section className="py-10 border-t border-gray-300/90 flex items-center 
                justify-between flex-wrap gap-x-10 gap-y-4">
                    <p className={Description_Class}>
                        © {year} Deenify. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {FOOTER_LEGAL.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className={Link_Class}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </footer >
    )
}

export default MarketingFooter
