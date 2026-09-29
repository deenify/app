"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import Animate from "@/components/shared/motion/Animate"
import Stagger from "@/components/shared/motion/Stagger"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { clientEnv } from "@/env/client"
import { cn } from "@/lib/utils/clsx"

type AuthHighlight = {
    icon: LucideIcon
    text: string
}

type AuthSplitCardProps = {
    sideTitle: string
    sideDescription: string
    highlights: AuthHighlight[]
    children: ReactNode
    sideTitleClassName?: string
}

const AuthSplitCard = ({
    sideTitle,
    sideDescription,
    highlights,
    children,
    sideTitleClassName,
}: AuthSplitCardProps) => {
    return (
        <Animate variant="up" delay={0.06} duration={0.72}>
            <Card
                className="flex w-full flex-col gap-5 overflow-hidden rounded-lg border-emerald-100 bg-white/90 shadow-sm 
                xs:gap-6 xs:rounded-xl sm:gap-8 lg:flex-row lg:items-stretch lg:gap-8 px-5 py-6 sm:px-6 sm:py-7 lg:p-8"
            >
                <section className="hidden w-full max-w-[420px] shrink-0 border-b border-layout-separator pb-6 lg:block lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
                    <div className="flex flex-col gap-6 sm:gap-8">
                        <div>
                            <Animate variant="up" delay={0.16} duration={0.6}>
                                <Badge variant="emerald" className="mb-2 sm:mb-3">
                                    {clientEnv.APP_NAME}
                                </Badge>
                            </Animate>
                            <Animate variant="up" delay={0.24} duration={0.68}>
                                <h1
                                    className={cn(
                                        "font-semibold capitalize tracking-tighter text-gray-900 text-[22px] sm:text-2xl",
                                        sideTitleClassName
                                    )}
                                >
                                    {sideTitle}
                                </h1>
                            </Animate>
                            <Animate variant="up" delay={0.32} duration={0.72}>
                                <p className="pt-2 text-sm leading-relaxed text-gray-600 sm:pt-3">
                                    {sideDescription}
                                </p>
                            </Animate>
                        </div>

                        <ul className="space-y-3 sm:space-y-4">
                            {highlights.map(({ icon: Icon, text }, index) => (
                                <Stagger
                                    key={text}
                                    index={index}
                                    animation="on_mount"
                                    variant="up"
                                    baseDelay={0.4}
                                    delay={0.09}
                                    duration={0.58}
                                >
                                    <li className="flex items-start gap-3 rounded-md border border-emerald-100 bg-emerald-50/70 p-3">
                                        <Icon
                                            className="mt-0.5 shrink-0 text-emerald-700"
                                            aria-hidden
                                            size={18}
                                        />
                                        <p className="text-sm text-emerald-800">{text}</p>
                                    </li>
                                </Stagger>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="flex min-h-0 min-w-0 w-full flex-1 flex-col lg:justify-center">
                    {children}
                </section>
            </Card>
        </Animate>
    )
}

export default AuthSplitCard
