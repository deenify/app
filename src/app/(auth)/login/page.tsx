// app/login/page.tsx 

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SIGNIN_HIGHLIGHTS } from "@/components/pages/auth/content"
import LoginForm from "@/components/pages/auth/login/LoginForm"
import { Metadata } from "next"
import { serverEnv } from "@/env/server"

export const metadata: Metadata = {
    title: { absolute: `${serverEnv.APP_NAME} - Sign in` },
    description: `Sign in to your ${serverEnv.APP_NAME} account to continue your Quran, Hadith, guides and learning journey.`,
}

const Page = () => {
    return (
        <section className="relative flex w-full flex-1 flex-col items-center justify-center py-5 xs:py-6 sm:py-8 lg:py-10">
            {/* Animations  */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-8 top-4 h-48 w-48 rounded-full bg-emerald-100/80 blur-3xl xs:left-4 xs:h-56 xs:w-56 sm:left-10 sm:top-8 sm:h-72 sm:w-72" />
                <div className="absolute -right-16 top-1/4 h-64 w-64 rounded-full bg-teal-100/80 blur-3xl xs:-right-8 sm:right-0 sm:top-1/3 sm:h-96 sm:w-96" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/70" />
            </div>

            {/* Content  */}
            <div className="container">
                <main className="relative mx-auto w-full max-w-xl lg:max-w-5xl">
                    <Card
                        className="flex w-full flex-col gap-5 overflow-hidden rounded-lg border-emerald-100 bg-white/90 shadow-sm 
                        xs:gap-6 xs:rounded-xl sm:gap-8 lg:flex-row lg:items-stretch lg:gap-8 px-5 py-6 sm:px-6 sm:py-7 lg:p-8"
                    >
                        {/* col 1  */}
                        <section className="hidden w-full max-w-[420px] shrink-0 border-b border-layout-separator pb-6 lg:block lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                            <div className="flex flex-col gap-6 sm:gap-8">
                                <div>
                                    <Badge
                                        variant="emerald"
                                        className="mb-2 sm:mb-3"
                                    >
                                        {serverEnv.APP_NAME}
                                    </Badge>
                                    <h1 className="font-semibold capitalize tracking-tighter text-gray-900 text-[22px] sm:text-2xl">
                                        Keep your daily deen journey consistent
                                    </h1>
                                    <p className="pt-2 text-sm leading-relaxed text-gray-600 sm:pt-3">
                                        Log in to continue Quran reading, Hadith learning, and your personal growth tracking.
                                    </p>
                                </div>

                                <ul className="space-y-3 sm:space-y-4">
                                    {SIGNIN_HIGHLIGHTS.map(({ icon: Icon, text }) => (
                                        <li
                                            key={text}
                                            className="flex items-start gap-3 rounded-md border border-emerald-100 bg-emerald-50/70 p-3"
                                        >
                                            <Icon
                                                className="mt-0.5 shrink-0 text-emerald-700"
                                                aria-hidden
                                                size={18}
                                            />
                                            <p className="text-sm text-emerald-800">{text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* col 2  */}
                        <section className="flex min-h-0 min-w-0 w-full flex-1 flex-col lg:justify-center">
                            <h2 className="pb-2 font-semibold tracking-tight text-gray-900 text-[26px] sm:text-3xl">
                                Sign in
                            </h2>
                            <p className="max-w-md text-pretty text-sm leading-normal text-gray-600 sm:max-w-lg sm:text-[15px] hidden sm:block">
                                Sign in to continue your Quran, Hadith, guides and learning with personalized tracking and synced progress.
                            </p>
                            <p className="max-w-md text-pretty text-sm leading-normal text-gray-600 sm:max-w-lg sm:text-[15px] block sm:hidden">
                                Continue Quran, Hadith, and learning with synced personalized progress.
                            </p>

                            <LoginForm className="mt-6 space-y-4 sm:mt-7" />

                            <p className="px-1 pt-4 text-center text-sm leading-snug text-gray-600 sm:px-0">
                                Don&apos;t have an account?{" "}
                                <Button
                                    href="/register"
                                    variant="link"
                                    size="max"
                                    className="inline-flex text-sm font-semibold text-emerald-700"
                                >
                                    Sign up
                                </Button>
                            </p>
                        </section>
                    </Card>
                </main>
            </div>
        </section>
    )
}

export default Page


