"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Star } from "lucide-react"
import { HORIZON_EVENTS, MOON_PHASE_SAMPLE, SACRED_MONTH_NAMES } from "./content"

export default function CalendarSidebar() {
    return (
        <aside className="min-w-0 space-y-7 lg:sticky lg:top-20 lg:self-start lg:border-l lg:border-layout-separator lg:pl-5 xl:pl-8">
            <section>
                <div className="mb-4 flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900">On the horizon</p>
                    <Moon className="h-4 w-4 shrink-0 text-purple-600" strokeWidth={1.5} />
                </div>

                <ul className="space-y-2.5">
                    {HORIZON_EVENTS.map((ev) => (
                        <li
                            key={ev.id}
                            className="grid grid-cols-[10px_minmax(0,1fr)] items-center gap-2.5"
                        >
                            <span
                                className="mx-auto h-2.5 w-2.5 rounded-full border-2 border-white bg-purple-500 shadow-sm"
                                aria-hidden
                            />
                            <div className="min-w-0 rounded-md border border-gray-200/90 bg-white p-3 shadow-sm">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm font-medium leading-snug text-gray-900">
                                        {ev.name}
                                    </p>
                                    <Badge variant="outline" className="shrink-0 text-[10px]">
                                        {ev.horizon}
                                    </Badge>
                                </div>
                                <p className="mt-0.5 text-xs text-gray-500">{ev.when}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <Card className="border-amber-100/90 bg-gradient-to-br from-amber-50/80 to-white">
                <CardContent className="space-y-3 p-5">
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-gray-900">Moon phase</p>
                        <Moon className="h-4 w-4 shrink-0 text-amber-700" strokeWidth={1.5} />
                    </div>
                    <div className="flex items-center gap-4 rounded-xl border border-amber-100 bg-white p-3.5">
                        <div
                            className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-slate-200 via-slate-50 to-slate-300 shadow-inner ring-1 ring-amber-200/90"
                            aria-hidden
                        >
                            <div className="absolute inset-y-0 right-0 w-[38%] bg-gradient-to-l from-slate-600/90 to-slate-500/40" />
                            <div className="absolute inset-[18%] rounded-full bg-slate-400/15 blur-[2px]" />
                        </div>
                        <div className="min-w-0">
                            <p className="font-medium text-gray-900">{MOON_PHASE_SAMPLE.label}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-gray-600">
                                {MOON_PHASE_SAMPLE.note}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <section>
                <div className="mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 shrink-0 fill-amber-500 text-amber-600" />
                    <p className="text-sm font-semibold text-gray-900">Sacred months (ḥurūm)</p>
                </div>
                <div className="grid gap-2">
                    {SACRED_MONTH_NAMES.map((name) => (
                        <div
                            key={name}
                            className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50/60 px-3 py-2 text-sm text-gray-800"
                        >
                            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-500 text-amber-600" />
                            {name}
                        </div>
                    ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-gray-500">
                    Sacredness calls for heightened awareness—not automatic prohibition of every act.
                    Follow qualified guidance for rulings.
                </p>
            </section>
        </aside>
    )
}
