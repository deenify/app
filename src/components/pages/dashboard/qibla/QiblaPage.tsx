"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import SectionHeader from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Compass, Info, Sparkles } from "lucide-react"
import { QIBLA_EDITORIAL } from "./content"
import QiblaCompass from "./QiblaCompass"
import QiblaSidebar from "./QiblaSidebar"

export default function QiblaPage() {
    return (
        <div>
            <SectionHeader
                variant="emerald"
                icon={Compass}
                label="Qibla & direction"
                heading="Face the House with clarity"
                descriptions={[QIBLA_EDITORIAL.lead]}
                classNames={{ heading: "max-w-[520px]" }}
            >
                <div className="flex flex-wrap gap-2 pt-2">
                    <Badge
                        variant="outline"
                        className="border-emerald-200 bg-emerald-50/50 text-sm font-medium text-emerald-800"
                    >
                        <Sparkles className="mr-1 h-3.5 w-3.5" />
                        Unified axis · Kaʿbah
                    </Badge>
                    <Badge variant="outline" className="!border-0 bg-gray-100 text-sm text-gray-700">
                        Demo bearing · connect GPS later
                    </Badge>
                </div>
            </SectionHeader>

            <section className="container relative py-8 sm:py-10">
                <div className="relative overflow-hidden">
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute left-[-60px] top-24 h-52 w-52 rounded-full bg-emerald-200/35 blur-3xl"
                        animate={{ opacity: [0.25, 0.42, 0.25], scale: [1, 1.06, 1] }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        aria-hidden
                        className="pointer-events-none absolute right-[-20px] top-48 h-44 w-44 rounded-full bg-teal-200/30 blur-3xl"
                        animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    />
                </div>

                <main className="relative mx-auto grid max-w-6xl items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-8">
                    <section className="min-w-0 space-y-8">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Field bearing</p>
                            <p className="mt-1 text-sm text-gray-600">
                                Visual reference only—pair with real location services for your city.
                            </p>
                        </div>

                        <QiblaCompass />

                        <Card className="border-amber-200 bg-gradient-to-br from-amber-50/90 to-white">
                            <CardContent className="p-5 sm:p-6">
                                <div className="flex gap-4">
                                    <Info className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
                                    <div>
                                        <p className="font-semibold text-amber-950">Accuracy & humility</p>
                                        <p className="mt-2 text-sm leading-relaxed text-amber-950/90">
                                            {QIBLA_EDITORIAL.accuracy}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    <QiblaSidebar />
                </main>
            </section>
        </div>
    )
}
