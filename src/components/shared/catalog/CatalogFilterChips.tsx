"use client"

import { X } from "lucide-react"

type FilterChip = {
    id: string
    label: string
}

type CatalogFilterChipsProps = {
    chips: FilterChip[]
    onRemove: (id: string) => void
}

export default function CatalogFilterChips({ chips, onRemove }: CatalogFilterChipsProps) {
    return (
        <div className="flex min-h-[68px] flex-wrap items-center gap-3 pb-6 pt-4">
            <span className="mr-2 text-xs font-black uppercase text-gray-600">Filters:</span>
            {chips.map((chip) => (
                <div
                    key={chip.id}
                    className="group flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-[3px] shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50/30"
                >
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" />
                    <span className="text-[11px] font-bold uppercase tracking-tighter text-gray-900">
                        {chip.label}
                    </span>
                    <button
                        type="button"
                        onClick={() => onRemove(chip.id)}
                        className="ml-1 rounded-lg p-1 text-gray-400 transition-colors hover:bg-emerald-100 hover:text-emerald-600"
                    >
                        <X size={12} />
                    </button>
                </div>
            ))}
        </div>
    )
}
