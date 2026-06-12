"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import { Input } from "@/components/ui/input"
import {
    FOOTER_COMPANY,
    FOOTER_LEARN,
    FOOTER_LEGAL,
    FOOTER_PRODUCT,
} from "./content"

const FooterBrand = () => (
    <div className="space-y-4">
        <Link
            href="/"
            className="inline-flex font-heading text-2xl font-semibold tracking-tight text-emerald-950"
        >
            Deenify<span className="font-accent italic text-emerald-600">.</span>
        </Link>
        <p className="max-w-md text-sm leading-relaxed text-gray-600 lg:max-w-sm">
            A disciplined digital companion for prayer, Quran, remembrance, and curated Islamic
            learning — composed for clarity, not clutter.
        </p>
    </div>
)

const FooterLinkGroup = ({
    title,
    links,
}: {
    title: string
    links: readonly { label: string; href: string }[]
}) => (
    <div>
        <h4 className="mb-3 text-sm font-semibold text-gray-900">{title}</h4>
        <ul className="space-y-2">
            {links.map((link) => (
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
)

const ProductLearnRow = () => (
    <div className="grid grid-cols-2 gap-6 sm:gap-8">
        <FooterLinkGroup title="Product" links={FOOTER_PRODUCT} />
        <FooterLinkGroup title="Learn" links={FOOTER_LEARN} />
    </div>
)

const AllLinksRow = () => (
    <div className="grid grid-cols-3 gap-6 sm:gap-8">
        <FooterLinkGroup title="Product" links={FOOTER_PRODUCT} />
        <FooterLinkGroup title="Learn" links={FOOTER_LEARN} />
        <FooterLinkGroup title="Company" links={FOOTER_COMPANY} />
    </div>
)

type FooterNewsletterProps = {
    email: string
    onEmailChange: (value: string) => void
    onSubmit: (e: FormEvent) => void
    /** inline = input + button in a row; stacked = full-width input, button below */
    layout?: "inline" | "stacked"
    showDescription?: boolean
}

const FooterNewsletter = ({
    email,
    onEmailChange,
    onSubmit,
    layout = "inline",
    showDescription = true,
}: FooterNewsletterProps) => (
    <div className="min-w-0 space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">Newsletter</h4>
        {showDescription && (
            <p className="text-sm text-gray-600">
                Occasional notes on releases, guides, and thoughtful product craft.
            </p>
        )}
        <form
            onSubmit={onSubmit}
            className={cn(
                "flex w-full gap-2",
                layout === "inline"
                    ? "flex-col xs:flex-row xs:items-stretch"
                    : "flex-col"
            )}
        >
            <Input
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="you@email.com"
                classNames={{
                    input: cn(
                        "h-11 w-full min-w-0 rounded-full",
                        layout === "inline" && "xs:min-w-[11rem] xs:flex-1"
                    ),
                }}
                required
            />
            <button
                type="submit"
                className={cn(
                    "inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-full",
                    "whitespace-nowrap bg-emerald-600 px-6 text-sm font-medium text-white transition hover:bg-emerald-700",
                    layout === "inline" ? "w-full xs:w-auto" : "w-full"
                )}
            >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
            </button>
        </form>
    </div>
)

const MarketingFooter = () => {
    const [email, setEmail] = useState("")
    const year = new Date().getFullYear()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setEmail("")
    }

    const newsletterProps = {
        email,
        onEmailChange: setEmail,
        onSubmit: handleSubmit,
    }

    return (
        <footer id="contact" className="border-t border-gray-200 bg-marketing-light">
            <div className="container-marketing-footer py-12 sm:py-16">
                {/* lg+: logo | 3 link cols | newsletter */}
                <div className="hidden gap-12 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)_minmax(0,1fr)]">
                    <FooterBrand />
                    <AllLinksRow />
                    <FooterNewsletter {...newsletterProps} layout="inline" showDescription />
                </div>

                {/* md–lg: logo → newsletter → links */}
                <div className="hidden flex-col gap-10 md:flex lg:hidden">
                    <FooterBrand />
                    <FooterNewsletter {...newsletterProps} layout="inline" />
                    <AllLinksRow />
                </div>

                {/* sm–md: product|learn → logo → company | newsletter */}
                <div className="hidden flex-col gap-10 sm:flex md:hidden">
                    <ProductLearnRow />
                    <FooterBrand />
                    <div className="grid grid-cols-1 gap-10 min-[520px]:grid-cols-2 min-[520px]:items-start">
                        <FooterLinkGroup title="Company" links={FOOTER_COMPANY} />
                        <FooterNewsletter
                            {...newsletterProps}
                            layout="stacked"
                            showDescription={false}
                        />
                    </div>
                </div>

                {/* xs–sm: product|learn → logo → company → newsletter */}
                <div className="hidden flex-col gap-10 xs:flex sm:hidden">
                    <ProductLearnRow />
                    <FooterBrand />
                    <FooterLinkGroup title="Company" links={FOOTER_COMPANY} />
                    <FooterNewsletter {...newsletterProps} layout="inline" />
                </div>

                {/* < xs: logo → stacked links → newsletter */}
                <div className="flex flex-col gap-10 xs:hidden">
                    <FooterBrand />
                    <FooterLinkGroup title="Product" links={FOOTER_PRODUCT} />
                    <FooterLinkGroup title="Learn" links={FOOTER_LEARN} />
                    <FooterLinkGroup title="Company" links={FOOTER_COMPANY} />
                    <FooterNewsletter {...newsletterProps} layout="inline" />
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {year} Deenify. All rights reserved.</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
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
