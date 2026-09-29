"use client";

import ShareInvitePopover from "./ShareInvitePopover";
import ContributorsStack, { type Contributor } from "./ContributorsStack";
import { DhikrPreset } from "./content";
import { cn } from "@/lib/utils/clsx";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

function formatCompactCount(value: number) {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k`
    return String(value)
}

const DUMMY_CONTRIBUTORS: Contributor[] = [
    { id: "1", name: "Ahmed", username: "@ahmed_d", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed", owner: true },
    { id: "2", name: "Sara", username: "@sara_k", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
    { id: "3", name: "Omar", username: "@omar_f", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar" },
    { id: "4", name: "Zainab", username: "@zainab_z", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab" },
    { id: "5", name: "Yusuf", username: "@yusuf_y", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf" },
]

function getPresetStats(presetId: string) {
    const hash = presetId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return {
        contributors: DUMMY_CONTRIBUTORS,
        totalDhikrCount: 280_000 + (hash % 120) * 1_000,
    }
}

interface AdkharCardProps {
    preset: DhikrPreset;
    isActive: boolean;
    onSelect: () => void;
    isCustom?: boolean;
    onDelete?: () => void;
    hasContributions?: boolean;
}

const AdkharCard = ({
    preset,
    isActive,
    onSelect,
    isCustom,
    onDelete,
    hasContributions = true
}: AdkharCardProps) => {
    const stats = hasContributions ? getPresetStats(preset.id) : null

    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "group relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border-2 transition-all duration-300 p-4 text-left sm:p-5",
                isActive
                    ? "border-emerald-500 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500/10"
                    : "border-gray-200 bg-white hover:border-emerald-200 hover:shadow-lg hover:shadow-gray-200/50"
            )}
        >
            <div className="min-w-0 w-full">
                <p
                    className="font-arabic text-lg leading-snug text-gray-600 line-clamp-2 xs:text-xl sm:line-clamp-1 sm:text-2xl"
                    dir="rtl"
                >
                    {preset.arabic}
                </p>

                <div className="mt-2 space-y-1 min-w-0">
                    <p className={cn(
                        "text-sm font-bold transition-colors truncate xs:text-base",
                        isActive ? "text-emerald-800" : "text-gray-900"
                    )}>
                        {preset.title}
                    </p>
                    <p className="text-[11px] text-gray-500 font-medium line-clamp-2 xs:text-xs">
                        {preset.insight}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex min-w-0 flex-col gap-3 pt-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                {stats ? (
                    <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden xs:gap-3">
                        <ContributorsStack
                            contributors={stats.contributors}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="min-w-0 flex-1 space-y-0.5">
                            <p className="truncate text-[11px] font-bold tabular-nums text-gray-900 xs:text-xs">
                                {formatCompactCount(stats.totalDhikrCount)} counts
                            </p>
                            <p className="truncate text-[10px] font-medium text-gray-400">
                                {stats.contributors.length} contributors
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-bold text-gray-400 leading-tight">No contributions</span>
                        <span className="text-[9px] text-gray-300 font-medium">Start the wave</span>
                    </div>
                )}

                <div
                    className="flex shrink-0 items-center justify-end gap-1 self-end sm:self-auto"
                    onClick={(e) => { e.stopPropagation(); }}
                >
                    {isCustom && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
                            className="h-8 w-8 rounded-full bg-white text-gray-500 
                            hover:bg-red-50 hover:text-red-600 border border-gray-200 
                            shadow-sm transition-all hover:border-red-200"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    <ShareInvitePopover preset={preset} />
                </div>
            </div>
        </button>
    )
}

export default AdkharCard
