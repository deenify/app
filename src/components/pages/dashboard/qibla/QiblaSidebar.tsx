"use client"

import { MapPin } from "lucide-react"
import {
    QIBLA_DEMO_BEARING_DEG,
    QIBLA_DEMO_DISTANCE_KM,
    QIBLA_ORIENTATION_NOTE,
    QIBLA_PROTOCOL_STEPS,
} from "./content"

export default function QiblaSidebar() {
    return (
        <aside className="min-w-0 space-y-7 lg:sticky lg:top-20 lg:self-start lg:border-l lg:border-layout-separator lg:pl-5 xl:pl-8">
            <section>
                <div className="mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                    <p className="text-sm font-semibold text-gray-900">Locale snapshot</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-900/80">
                            Bearing
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-emerald-950">
                            {QIBLA_DEMO_BEARING_DEG}°
                        </p>
                        <p className="text-xs text-emerald-800/90">Clockwise from true north (demo)</p>
                    </div>
                    <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/80">
                            Great-circle km
                        </p>
                        <p className="mt-2 text-3xl font-semibold text-blue-950">
                            {QIBLA_DEMO_DISTANCE_KM.toLocaleString()}
                        </p>
                        <p className="text-xs text-blue-800/90">Approximate distance to Makkah</p>
                    </div>
                </div>
            </section>

            <section className="border-t border-gray-100 pt-6">
                <p className="text-sm font-semibold text-gray-900">Calibration protocol</p>
                <p className="mt-1 text-xs text-gray-500">
                    Treat this like a checklist—small physical habits improve bearing stability.
                </p>
                <ol className="mt-5 space-y-4">
                    {QIBLA_PROTOCOL_STEPS.map((step, i) => (
                        <li key={step} className="relative pl-9">
                            <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
                                {i + 1}
                            </span>
                            <p className="text-sm leading-relaxed text-gray-700">{step}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                <p className="text-sm font-semibold text-gray-900">Why direction matters</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{QIBLA_ORIENTATION_NOTE}</p>
            </section>
        </aside>
    )
}
