"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import {
    FOOTER_COMPANY,
    FOOTER_LEARN,
    FOOTER_LEGAL,
    FOOTER_PRODUCT,
} from "./content"
import { Input } from "@/components/ui/input"

const MarketingFooter = () => {
    const [email, setEmail] = useState("")
    const year = new Date().getFullYear()

    return (
        <footer id="contact" className="border-t border-gray-200 bg-[#f8faf9]">
            <div className="container py-12 sm:py-16">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="flex font-heading text-2xl font-semibold tracking-tight text-emerald-950"
                        >
                            Deenify<span className="text-emerald-600">.</span>
                        </Link>
                        <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                            A disciplined digital companion for prayer, Quran, remembrance, and
                            curated Islamic learning — composed for clarity, not clutter.
                        </p>
                    </div>

                    <div className="grid gap-8 xs:grid-cols-2 sm:grid-cols-3">
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-gray-900">Product</h4>
                            <ul className="space-y-2">
                                {FOOTER_PRODUCT.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 transition-colors hover:text-emerald-700"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-gray-900">Learn</h4>
                            <ul className="space-y-2">
                                {FOOTER_LEARN.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 transition-colors hover:text-emerald-700"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-gray-900">Company</h4>
                            <ul className="space-y-2">
                                {FOOTER_COMPANY.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 transition-colors hover:text-emerald-700"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900">Newsletter</h4>
                        <p className="text-sm text-gray-600">
                            Occasional notes on releases, guides, and thoughtful product craft.
                        </p>
                        <form
                            className="flex flex-col gap-2 sm:flex-row"
                            onSubmit={(e) => {
                                e.preventDefault()
                                setEmail("")
                            }}
                        >
                            {/* <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@email.com"
                                className="h-10 flex-1 rounded-full border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none ring-emerald-600/20 transition focus:border-emerald-400 focus:ring-2"
                                required
                            /> */}
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@email.com"
                                className="h-10"
                                classNames={{
                                    input: "h-10 min-w-52 rounded-full",
                                }}
                                required
                            />
                            <button
                                type="submit"
                                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-4 text-sm font-medium text-white transition hover:bg-emerald-700"
                            >
                                Subscribe
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {year} Deenify. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4">
                        {FOOTER_LEGAL.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="transition-colors hover:text-emerald-700"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default MarketingFooter
