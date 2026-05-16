"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, X } from "lucide-react"
import { cn } from "@/lib/utils/clsx"
import type { LineageChartNode } from "@/components/shared/lineage-chart"
import type { PropheticNodeData } from "./prophetic-data"
import { getProphetScripture } from "./scripture"

type PropheticDetailModalProps = {
    node: LineageChartNode<PropheticNodeData> | null
    open: boolean
    onClose: () => void
}

export function PropheticDetailModal({ node, open, onClose }: PropheticDetailModalProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKey)
        return () => {
            document.body.style.overflow = ""
            window.removeEventListener("keydown", onKey)
        }
    }, [open, onClose])

    if (!mounted) return null

    const d = node?.data
    const scripture = node ? getProphetScripture(node.id) : null

    return createPortal(
        <AnimatePresence>
            {open && node && d ? (
                <>
                    <motion.button
                        type="button"
                        aria-label="Close dialog"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="prophet-modal-title"
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed z-[101] flex max-h-[min(90vh,720px)] w-[min(calc(100vw-2rem),32rem)] flex-col",
                            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                            "overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-2xl"
                        )}
                    >
                        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-emerald-100 bg-gradient-to-b from-emerald-50/80 to-white px-5 py-4">
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                                    Reference {node.ref}
                                </p>
                                <h2
                                    id="prophet-modal-title"
                                    className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl"
                                >
                                    {node.label}
                                </h2>
                                <p className="text-sm text-gray-600">{d.nameEnglish}</p>
                                {node.subtitle ? (
                                    <p
                                        className="font-arabic mt-2 text-right text-3xl leading-tight text-emerald-900 sm:text-4xl"
                                        dir="rtl"
                                    >
                                        {node.subtitle}
                                    </p>
                                ) : null}
                                <p className="mt-1 text-sm text-emerald-800">{d.honorific}</p>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
                            <dl className="grid gap-3 sm:grid-cols-2">
                                <DetailItem label="Relation" value={d.relation} />
                                <DetailItem label="Era" value={d.era} />
                                <DetailItem label="Lifespan" value={d.lifespan} />
                                <DetailItem label="Passing" value={d.passing} />
                            </dl>

                            <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50/80 p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                    Laqab / epithet
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-900">{d.epithet}</p>
                            </div>

                            <div
                                className={cn(
                                    "mt-3 flex items-start gap-2.5 rounded-lg border p-3",
                                    scripture
                                        ? "border-emerald-200 bg-emerald-50/60"
                                        : "border-gray-200 bg-gray-50/60"
                                )}
                            >
                                <BookOpen
                                    className={cn(
                                        "mt-0.5 h-4 w-4 shrink-0",
                                        scripture ? "text-emerald-700" : "text-gray-400"
                                    )}
                                />
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                        Revealed book
                                    </p>
                                    <p className="mt-0.5 text-sm text-gray-800">
                                        {scripture ?? "No separate scripture is named for this prophet in the usual lists."}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-relaxed text-gray-600">{d.gloss}</p>
                        </div>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>,
        document.body
    )
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-gray-100 bg-white px-3 py-2.5">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{label}</dt>
            <dd className="mt-0.5 text-sm text-gray-800">{value}</dd>
        </div>
    )
}
