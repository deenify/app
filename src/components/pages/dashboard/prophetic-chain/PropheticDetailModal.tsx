"use client"

import { BookOpen, Clock, MapPin, ScrollText, User } from "lucide-react"
import { Modal } from "@/components/shared/Modal"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/clsx"
import type { LineageChartNode } from "@/components/shared/charts/lineage-chart"
import type { PropheticNodeData } from "./prophetic-data"
import { getProphetScripture } from "./scripture"

type PropheticDetailModalProps = {
    selected: LineageChartNode<PropheticNodeData>
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function PropheticDetailModal({
    selected,
    isOpen,
    onOpenChange,
}: PropheticDetailModalProps) {
    const d = selected?.data
    const scripture = getProphetScripture(selected?.id)

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            showClose
            title={
                <span className="block min-w-0 truncate pr-2 font-medium tracking-tight text-base">
                    Prophet {selected?.data?.nameEnglish ?? "details"}
                </span>
            }
            className={cn(
                "max-w-[42rem]",
                "max-h-[85dvh] sm:max-h-[min(92dvh,720px)]"
            )}
            classNames={{
                body: "p-0 pb-3",
                header: "px-3 py-2.5 sm:px-4 sm:py-3",
                title: "min-w-0 flex-1",
            }}
        >
            <article className="flex flex-col bg-white">
                {/* Hero */}
                <section className="shrink-0 bg-gradient-to-b from-emerald-50 to-white px-4 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                        {/* Avatar */}
                        <div
                            className={cn(
                                "relative mx-auto flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden",
                                "rounded-xl border border-emerald-200 bg-gradient-to-br sm:mx-0 sm:h-20 sm:w-20 sm:rounded-2xl",
                                "from-emerald-100 to-emerald-50 shadow-sm"
                            )}
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_70%)]" />
                            <span className="relative text-2xl font-semibold text-emerald-700 sm:text-3xl">
                                {selected?.data?.nameEnglish?.charAt(0)}
                            </span>
                        </div>

                        {/* Identity */}
                        <div className="min-w-0 flex-1 text-center sm:text-left">
                            <div className="flex flex-wrap items-center justify-center gap-1.5 
                            sm:justify-start sm:gap-2 max-w-[180px]. mx-auto sm:mx-0 sm:max-w-none">
                                <Badge variant="emerald" className="text-[10px] sm:text-xs">
                                    Prophet
                                </Badge>
                                {selected?.data?.era ? (
                                    <Badge variant="outline" className="max-w-[9rem] truncate text-[10px] sm:max-w-none sm:text-xs">
                                        {selected.data.era}
                                    </Badge>
                                ) : null}
                                {selected?.ref ? (
                                    <Badge variant="blue" className="text-[10px] sm:text-xs">
                                        Ref {selected.ref}
                                    </Badge>
                                ) : null}
                            </div>

                            <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:mt-4 sm:text-3xl">
                                {selected?.label}
                            </h2>

                            <p className="mt-0.5 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
                                {selected?.data?.nameEnglish}
                            </p>

                            {selected?.subtitle ? (
                                <p
                                    dir="rtl"
                                    className="font-arabic mt-2 text-2xl leading-tight tracking-wide text-emerald-900 sm:mt-3 sm:text-right sm:text-4xl"
                                >
                                    {selected.subtitle}
                                </p>
                            ) : null}

                            {selected?.data?.honorific ? (
                                <p className="mt-2 text-xs font-medium text-emerald-700 sm:mt-4 sm:text-sm">
                                    {selected.data.honorific}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </section>

                {/* Body */}
                <div className="px-4 py-4 sm:px-6 sm:py-6">
                    <div className="grid grid-cols-1 gap-2.5 border-t border-layout-separator pt-4 min-[420px]:grid-cols-2 sm:gap-3 sm:pt-5">
                        <MetaTile
                            icon={<User className="h-4 w-4" />}
                            label="Relation"
                            value={d?.relation ?? ""}
                        />
                        <MetaTile
                            icon={<MapPin className="h-4 w-4" />}
                            label="Era"
                            value={d?.era ?? ""}
                        />
                        <MetaTile
                            icon={<Clock className="h-4 w-4" />}
                            label="Lifespan"
                            value={d?.lifespan ?? ""}
                        />
                        <MetaTile
                            icon={<ScrollText className="h-4 w-4" />}
                            label="Passing"
                            value={d?.passing ?? ""}
                        />
                    </div>

                    <section
                        className={cn(
                            "mt-3 flex flex-col sm:flex-row gap-2.5 rounded-lg border p-3 sm:mt-4 sm:gap-3 sm:p-4",
                            scripture
                                ? "border-emerald-200 bg-emerald-50/60"
                                : "border-gray-200 bg-gray-50/80"
                        )}
                    >
                        <span
                            className={cn(
                                "flex shrink-0 items-center justify-center rounded-lg h-9 w-9",
                                scripture ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                            )}
                        >
                            <BookOpen size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 sm:tracking-[0.16em]">
                                Revealed book
                            </p>
                            <p className="break-words text-base font-medium leading-snug text-gray-900">
                                {scripture ?? "No separate scripture is named in the usual prophetic lists."}
                            </p>
                        </div>
                    </section>

                    <section className="mt-4 sm:mt-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 sm:tracking-[0.18em]">
                            Laqab · epithet
                        </p>
                        <p className="break-words font-medium leading-snug text-gray-900 text-base">
                            {d?.epithet ?? ""}
                        </p>
                    </section>
                    <section className="mt-4 sm:mt-5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400 sm:tracking-[0.18em]">
                            Historical gloss
                        </p>
                        <p className="break-words font-medium leading-snug text-gray-900 text-base">
                            {d?.gloss ?? ""}
                        </p>
                    </section>

                    <p className="mt-4 pb-1 leading-relaxed text-gray-400 sm:mt-5 text-xs">
                        Figures and lifespans follow common scholarly summaries unless the Qurʾān names an
                        event explicitly. This entry is for reference within the prophetic chain schema.
                    </p>
                </div>
            </article>
        </Modal>
    )
}

function MetaTile({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode
    label: string
    value: string
}) {
    return (
        <div className="rounded-lg border border-layout-separator bg-white p-2.5 shadow-sm sm:p-3">
            <div className="flex items-center gap-1.5 text-emerald-700 sm:gap-2">
                {icon}
                <span className="font-semibold uppercase tracking-[0.12em] text-gray-400 text-[11px] sm:tracking-[0.14em]">
                    {label}
                </span>
            </div>
            <p className="mt-1.5 break-words leading-snug text-gray-800 sm:mt-2 text-sm">
                {value || "—"}
            </p>
        </div>
    )
}
