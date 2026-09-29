"use client"

import { Button } from "@/components/ui/button"
import { HeartHandshake, Target, Users, Sparkles } from "lucide-react"
import { DHIKR_COMPANION_LINKS, DHIKR_TEACHING_NOTE, type DhikrPreset } from "./content"
import { Badge } from "@/components/ui/badge"
import ContributorAvatar from "./ContributorAvatar"

type DhikrSidebarProps = {
    preset: DhikrPreset
    progress: number
}

// Dummy contributors
const DUMMY_CONTRIBUTORS = [
    { id: "1", name: "Ahmed", username: "@ahmed_d", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" },
    { id: "2", name: "Omar", username: "@omar_f", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar" },
    { id: "3", name: "Zainab", username: "@zainab_z", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab" },
    { id: "4", name: "Sara", username: "@sara_k", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
]

export default function DhikrSidebar({ preset, progress }: DhikrSidebarProps) {
    return (
        <aside className="min-w-0 space-y-7 lg:sticky lg:top-20 lg:self-start lg:border-l lg:border-layout-separator lg:pl-5 xl:pl-8">
            <section>
                <div className="mb-4 flex items-center gap-2">
                    <Target className="h-4 w-4 shrink-0 text-purple-600" />
                    <p className="text-sm font-semibold text-gray-900">Session intelligence</p>
                </div>

                {/* Reverted Purple Box UI */}
                <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Active Adkar</span>
                        <span className="font-semibold text-gray-900">{preset.title}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-purple-100 pt-4 text-sm">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-semibold tabular-nums text-purple-800">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-gray-500">
                        Wire this panel to streaks, weekly aggregates, and export when you add a backend.
                    </p>
                </div>

                {/* Top Contributors outside the box */}
                <div className="pt-6">
                    <div className="mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 shrink-0 text-purple-600" />
                        <p className="text-sm font-semibold text-gray-900">Global leaderboard</p>
                    </div>
                    <div className="flex items-center justify-between bg-white">
                        <div className="flex -space-x-2">
                            {DUMMY_CONTRIBUTORS.map((user) => (
                                <ContributorAvatar key={user.id} user={user} />
                            ))}
                        </div>
                        <Badge
                            variant="secondary"
                            className="text-gray-600 gap-1.5"
                        >
                            <Users className="h-3.5 w-3.5 text-gray-600" />
                            <span className="text-gray-600">1.2k active</span>
                        </Badge>
                    </div>
                </div>
            </section>

            <section className="pt-6">
                <div className="mb-4 flex items-center gap-2">
                    <HeartHandshake className="h-4 w-4 shrink-0 text-emerald-600" />
                    <p className="text-sm font-semibold text-gray-900">Companion surfaces</p>
                </div>
                <div className="space-y-2">
                    {DHIKR_COMPANION_LINKS.map((link) => (
                        <Button
                            key={link.href}
                            href={link.href}
                            variant="outline"
                            size="lg"
                            className="h-auto w-full justify-between border-gray-300 px-3 py-2.5 text-left 
                            transition-all hover:border-emerald-300 hover:bg-emerald-50/30 rounded-md"
                        >
                            <span className="font-semibold text-gray-700 text-sm tracking-tight">{link.label}</span>
                            <span className="text-[11px] font-medium text-gray-400">{link.hint}</span>
                        </Button>
                    ))}
                </div>
            </section>

            <section className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-900/70">
                    Teaching note
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-amber-950/80 font-medium italic">
                    &quot;{DHIKR_TEACHING_NOTE}&quot;
                </p>
            </section>
        </aside>
    )
}
