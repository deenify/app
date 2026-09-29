"use client"

import { useState } from "react"
import { Modal } from "@/components/shared/Modal"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FilterDropdown from "@/components/shared/FilterDropdown"
import { Lock, Globe, Plus } from "lucide-react"

interface DhikrAddModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onAdd: (dhikr: {
        id: string
        title: string
        arabic: string
        transliteration: string
        translation: string
        visibility: "private" | "public"
    }) => void
}

const VISIBILITY_OPTIONS = [
    { value: "private", label: "Private", icon: Lock },
    { value: "public", label: "Publish", icon: Globe },
]

export function DhikrAddModal({ isOpen, onOpenChange, onAdd }: DhikrAddModalProps) {
    const [english, setEnglish] = useState("")
    const [description, setDescription] = useState("")
    const [arabic, setArabic] = useState("")
    const [visibility, setVisibility] = useState<"private" | "public">("private")

    const resetForm = () => {
        setEnglish("")
        setDescription("")
        setArabic("")
        setVisibility("private")
    }

    const handleSubmit = () => {
        if (!arabic.trim() || !english.trim()) return

        onAdd({
            id: `custom-${Date.now()}`,
            title: english.trim(),
            arabic: arabic.trim(),
            transliteration: english.trim(),
            translation: description.trim(),
            visibility,
        })
        resetForm()
        onOpenChange(false)
    }

    const canSubmit = Boolean(arabic.trim() && english.trim())

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => {
                onOpenChange(open)
                if (!open) resetForm()
            }}
            title={
                <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg 
                      bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">Add Adkar</p>
                        <p className="truncate text-[11px] font-medium text-gray-500">
                            Compose a personal remembrance for your library
                        </p>
                    </div>
                </div>
            }
            className="w-[min(calc(100vw-2rem),600px)] max-h-[90dvh]"
            classNames={{
                body: "min-h-0 p-0",
                content: "overflow-y-auto px-5 py-5 scrollbar-thin sm:px-6",
                footer: "border-t border-layout-separator bg-white px-5 py-4 sm:px-6",
            }}
            footer={
                <div className="flex w-full justify-end gap-2">
                    <Button
                        variant="secondary"
                        className="h-10 rounded-md px-5"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        className="h-10 rounded-md px-6 font-semibold"
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        shouldScale
                    >
                        Save Adkar
                    </Button>
                </div>
            }
        >
            <form
                className="space-y-5"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}
            >
                <Input
                    id="adhkar-arabic"
                    label="Dhikr Title"
                    labelVariant="default"
                    textarea
                    placeholder="سُبْحَانَ اللَّهِ..."
                    className="w-full min-h-[96px] resize-none rounded-md border-gray-200 bg-gray-50/40 text-right font-arabic text-xl leading-relaxed focus:border-emerald-300 focus:bg-white"
                    dir="rtl"
                    value={arabic}
                    onChange={(e) => setArabic(e.target.value)}
                />
                <Input
                    id="adhkar-english"
                    textarea
                    label="Transliteration"
                    labelVariant="default"
                    placeholder="e.g. Subhan Allah"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    className="w-full min-h-[96px] resize-none"
                    classNames={{ input: "h-10 rounded-md border-gray-200 bg-gray-50/40 focus:border-emerald-300 focus:bg-white" }}
                />
                <Input
                    id="adhkar-description"
                    label="Description"
                    labelVariant="default"
                    textarea
                    placeholder="Brief meaning or when to recite..."
                    className="w-full min-h-[72px] resize-none rounded-md border-gray-200 bg-gray-50/40 text-sm leading-relaxed focus:border-emerald-300 focus:bg-white"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 160))}
                    rows={2}
                />
                <p className="text-right text-[11px] tabular-nums text-gray-400">{description.length}/160</p>

                <FilterDropdown
                    id="adhkar-visibility"
                    options={VISIBILITY_OPTIONS}
                    value={visibility}
                    onChange={(value) => setVisibility(value as "private" | "public")}
                    placeholder="Private"
                    triggerIcon={Lock}
                    theme="emerald"
                    label="Visibility"
                    labelVariant="default"
                />
            </form>
        </Modal >
    )
}
