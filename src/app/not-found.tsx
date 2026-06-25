"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Compass, LayoutDashboard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Logo from "@/components/shared/Logo"
import { clientEnv } from "@/env/client"

const quickLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Quran", href: "/quran", icon: BookOpen },
    { label: "Prayer", href: "/prayer", icon: Compass },
] as const

const Page = () => {
    const router = useRouter()

    return (
        <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-10">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-8 top-8 h-56 w-56 rounded-full bg-emerald-100/70 blur-3xl sm:left-10 sm:h-72 sm:w-72" />
                <div className="absolute -right-12 top-1/4 h-64 w-64 rounded-full bg-teal-100/70 blur-3xl sm:right-0 sm:h-96 sm:w-96" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40" />
            </div>

            <div className="relative w-full max-w-lg">
                <p
                    aria-hidden
                    className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 
                    select-none font-heading text-[7.5rem] font-semibold leading-none 
                    tracking-tighter text-gray-100 sm:-top-20 sm:text-[9rem]"
                >
                    404
                </p>

                <Card className="relative z-10 border-emerald-100/80 bg-white/90 px-6 py-8 text-center shadow-sm backdrop-blur-sm sm:px-8 sm:py-10">
                    <div className="mb-6 flex justify-center">
                        <Logo href="/" />
                    </div>

                    <Badge variant="emerald" className="mb-4">
                        Page not found
                    </Badge>

                    <h1 className="font-heading text-2xl font-semibold tracking-tight text-gray-900 sm:text-[1.65rem]">
                        {/* This path isn&apos;t in {clientEnv.APP_NAME} */}
                        Oops! A Missed Turn
                    </h1>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
                        <span className="hidden sm:inline">
                            The page may have been moved, removed, or the URL might be mistyped.
                            Head back or pick a destination below.
                        </span>
                        <span className="sm:hidden">
                            The page may have moved or no longer exists. Go back or choose a link below.
                        </span>
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button
                            type="button"
                            onClick={() => router.back()}
                            variant="outline-emerald"
                            size="sm"
                            className="inline-flex rounded-full border-gray-300 px-5 text-gray-800 hover:border-emerald-300"
                        >
                            <ArrowLeft className="mr-1.5 h-4 w-4" />
                            Go back
                        </Button>
                        <Button
                            href="/"
                            variant="default"
                            size="sm"
                            className="inline-flex rounded-full px-5"
                        >
                            Home
                        </Button>
                    </div>

                    <nav
                        aria-label="Quick links"
                        className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-layout-separator pt-6"
                    >
                        {quickLinks.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-emerald-700"
                            >
                                <Icon className="h-3.5 w-3.5" />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </Card>
            </div>
        </section>
    )
}

export default Page
