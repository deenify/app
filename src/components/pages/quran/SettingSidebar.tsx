import React, { useEffect, useRef, useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RangeSlider } from "@/components/ui/range-slider"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils/clsx"

interface SettingSidebarProps {
    open: boolean
    onClose: () => void
    surahNumber: number
}

const SettingSidebar: React.FC<SettingSidebarProps> = ({ open, onClose, surahNumber }) => {
    const [arabicFontSize, setArabicFontSize] = useState(28)
    const [transliterationSize, setTransliterationSize] = useState(14)
    const [translationSize, setTranslationSize] = useState(16)
    const [showArabic, setShowArabic] = useState(true)
    const [showTransliteration, setShowTransliteration] = useState(true)
    const [showTranslation, setShowTranslation] = useState(true)
    const [translationSource, setTranslationSource] = useState("english-sahih")
    const [translationLangSearch, setTranslationLangSearch] = useState("")
    const [translationLangMenuOpen, setTranslationLangMenuOpen] = useState(false)
    const translationLangSearchRef = useRef<HTMLInputElement | null>(null)
    const [reciter, setReciter] = useState("mishary")
    const [playbackSpeed, setPlaybackSpeed] = useState(1)
    const [autoScroll, setAutoScroll] = useState(true)

    const translationLanguages = [
        { value: "english-sahih", label: "English – Sahih International" },
        { value: "english-yusuf", label: "English – Yusuf Ali" },
        { value: "english-pickthall", label: "English – Pickthall" },
        { value: "urdu-maududi", label: "اردو – Maududi" },
        { value: "french-hamidullah", label: "Français – Hamidullah" },
        { value: "spanish-cortes", label: "Español – Cortes" },
        { value: "turkish-diyanet", label: "Türkçe – Diyanet" },
        { value: "indonesian-ministry", label: "Bahasa Indonesia – Ministry" },
        { value: "german-bubenheim", label: "Deutsch – Bubenheim" },
        { value: "russian-kuliev", label: "Русский – Кулиев" },
    ] as const

    const translationSelectedLabel =
        translationLanguages.find((l) => l.value === translationSource)?.label ?? "Select language"

    const translationLangFiltered = translationLanguages.filter((l) =>
        l.label.toLowerCase().includes(translationLangSearch.trim().toLowerCase()),
    )

    useEffect(() => {
        if (!translationLangMenuOpen) return
        // Small UX improvement: focus the search input when menu opens.
        const t = window.setTimeout(() => translationLangSearchRef.current?.focus(), 0)
        return () => window.clearTimeout(t)
    }, [translationLangMenuOpen])

    return (
        <aside
            className={cn(
                "transition-all duration-300 overflow-hidden",
                open ? "w-[360px]" : "w-0"
            )}
        >
            <div className="h-full bg-gradient-to-b from-emerald-50 via-white to-slate-50 border-l border-layout-separator flex flex-col w-[360px]">
                {/* Header */}
                <div className="bg-white">
                    <div className="px-5 py-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-emerald-500 to-teal-600" />
                                    <h3 className="text-base font-semibold tracking-wider text-gray-900">
                                        UI Settings
                                    </h3>
                                </div>
                                <p className="pl-3.5 text-[13px] text-gray-500">
                                    Configure how the Quran text appears for this session.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost-emerald"
                                size="icon"
                                shouldScale={false}
                                className="w-7 h-7 rounded-md duration-100 border border-transparent hover:border-emerald-100"
                                onClick={onClose}
                                aria-label="Close settings"
                            >
                                <X size={18} strokeWidth={2} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 max-h-[600px] overflow-y-auto px-5 py-5 flex flex-col gap-6 scrollbar-thin">
                    {/* Arabic text section */}
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="h-4 w-1 rounded-full bg-emerald-500" />
                                <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-900">
                                    Arabic text
                                </h4>
                            </div>
                            <Badge variant="emerald">
                                {arabicFontSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-3.5">
                            <Card className="border-emerald-200 bg-white">
                                <CardContent className="px-4 py-3 flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Display Arabic</p>
                                        <p className="text-xs text-gray-500">Show Qur&apos;anic script in the reader.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="emerald"
                                        checked={showArabic}
                                        onCheckedChange={setShowArabic}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Font size preset
                                </p>
                                <div className="grid grid-cols-4 gap-1 rounded-lg bg-white p-1 text-[11px] border border-emerald-200">
                                    {[
                                        { label: "S", value: 20 },
                                        { label: "M", value: 28 },
                                        { label: "L", value: 36 },
                                        { label: "XL", value: 44 },
                                    ].map((preset) => {
                                        const isActive = arabicFontSize === preset.value
                                        return (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => setArabicFontSize(preset.value)}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-emerald-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-slate-100"
                                                )}
                                            >
                                                {preset.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Fine adjustment
                                </p>
                                <div className="pt-1 pb-4">
                                    <RangeSlider
                                        min={16}
                                        max={48}
                                        step={1}
                                        value={arabicFontSize}
                                        onChange={(e) => setArabicFontSize(Number(e.target.value))}
                                        color="emerald"
                                    />
                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                        <span className="text-emerald-600 font-medium">16px</span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="text-emerald-600 font-medium">48px</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Transliteration section */}
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="h-4 w-1 rounded-full bg-blue-500" />
                                <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-900">
                                    Transliteration
                                </h4>
                            </div>
                            <Badge variant="blue">
                                {transliterationSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-3.5">
                            <Card className="border-blue-200 bg-white">
                                <CardContent className="px-4 py-3 flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Display transliteration</p>
                                        <p className="text-xs text-gray-500">Romanized pronunciation below each ayah.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="blue"
                                        checked={showTransliteration}
                                        onCheckedChange={setShowTransliteration}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Font size preset
                                </p>
                                <div className="grid grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1 text-[11px]">
                                    {[
                                        { label: "S", value: 12 },
                                        { label: "M", value: 14 },
                                        { label: "L", value: 16 },
                                        { label: "XL", value: 18 },
                                    ].map((preset) => {
                                        const isActive = transliterationSize === preset.value
                                        return (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => setTransliterationSize(preset.value)}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-blue-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-white"
                                                )}
                                            >
                                                {preset.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Fine adjustment
                                </p>
                                <div className="pt-1 pb-4">
                                    <RangeSlider
                                        min={10}
                                        max={20}
                                        step={1}
                                        value={transliterationSize}
                                        onChange={(e) => setTransliterationSize(Number(e.target.value))}
                                        color="blue"
                                    />
                                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                                        <span className="text-blue-600 font-medium">10px</span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="text-blue-600 font-medium">20px</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Translation section */}
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="h-4 w-1 rounded-full bg-purple-500" />
                                <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-900">
                                    Translation
                                </h4>
                            </div>
                            <Badge variant="purple">
                                {translationSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-3.5">
                            <Card className="border-purple-200 bg-white">
                                <CardContent className="px-4 py-3 flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Display translation</p>
                                        <p className="text-xs text-gray-500">Meaning in your preferred language.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="purple"
                                        checked={showTranslation}
                                        onCheckedChange={setShowTranslation}
                                    />
                                </CardContent>
                            </Card>

                            {/* Language selection */}
                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Language &amp; translation
                                </p>
                                <div className="flex flex-col gap-2">
                                    <DropdownMenu
                                        open={translationLangMenuOpen}
                                        onOpenChange={(nextOpen) => {
                                            setTranslationLangMenuOpen(nextOpen)
                                            if (!nextOpen) setTranslationLangSearch("")
                                        }}
                                    >
                                        <DropdownMenuTrigger
                                            className="outline-none focus-visible:outline-none 
                                                focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0 ring-0 shadow-none"
                                        >
                                            <Button
                                                asChild
                                                variant="outline-purple"
                                                size="md"
                                                className="w-full h-10 justify-between gap-3 rounded-lg px-3 outline-none focus-visible:outline-none 
                                                focus-visible:ring-0 focus:ring-0 focus-visible:ring-offset-0 ring-0 shadow-none border-purple-300 bg-purple-50"
                                            >
                                                <span className="text-sm text-gray-800 truncate font-medium">
                                                    {translationSelectedLabel}
                                                </span>
                                                <ChevronDown className="h-4 w-4 text-purple-700" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-[var(--radix-dropdown-menu-trigger-width)] max-w-[calc(100vw-2rem)] p-2 bg-white/95 border border-purple-200/80 shadow-lg rounded-md"
                                            align="start"
                                        >
                                            <div className="px-1 pb-2">
                                                <input
                                                    ref={translationLangSearchRef}
                                                    value={translationLangSearch}
                                                    onChange={(e) => setTranslationLangSearch(e.target.value)}
                                                    placeholder="Search languages..."
                                                    className="w-full h-9 rounded-md border border-purple-200 bg-white px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-colors"
                                                />
                                            </div>

                                            <div className="max-h-[220px] overflow-y-auto scrollbar-thin px-1 pb-1">
                                                {translationLangFiltered.map((lang) => (
                                                    <DropdownMenuItem
                                                        key={lang.value}
                                                        onSelect={() => {
                                                            setTranslationSource(lang.value)
                                                            setTranslationLangMenuOpen(false)
                                                            setTranslationLangSearch("")
                                                        }}
                                                        className={cn(
                                                            "cursor-pointer rounded-sm mx-0 px-3 py-2 border transition-colors flex items-center justify-between gap-3",
                                                            "focus:outline-none mt-1",
                                                            translationSource === lang.value
                                                                ? "bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-50 hover:border-purple-300 focus:bg-purple-50 focus:border-purple-200 focus:text-purple-900 data-[highlighted]:bg-purple-50 data-[highlighted]:border-purple-200"
                                                                : "border-transparent text-gray-900 hover:border-purple-200 hover:bg-purple-50 focus:bg-purple-50/70 focus:border-purple-200 focus:text-gray-900 data-[highlighted]:bg-purple-50/70 data-[highlighted]:border-purple-200"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "text-sm font-medium truncate",
                                                                translationSource === lang.value
                                                                    ? "text-purple-900"
                                                                    : "text-gray-900"
                                                            )}
                                                        >
                                                            {lang.label}
                                                        </span>

                                                        {translationSource === lang.value && (
                                                            <Check
                                                                className="h-4 w-4 shrink-0 text-purple-600"
                                                                strokeWidth={2}
                                                            />
                                                        )}
                                                    </DropdownMenuItem>
                                                ))}

                                                {translationLangFiltered.length === 0 && (
                                                    <div className="px-3 py-2 text-xs text-gray-500">
                                                        No matching languages
                                                    </div>
                                                )}
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <p className="text-[11px] text-gray-500 italic">
                                        99+ translations will be available; this controls how the text is displayed here.
                                    </p>
                                </div>
                            </div>

                            {/* Translation font size presets */}
                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Font size preset
                                </p>
                                <div className="grid grid-cols-4 gap-1 rounded-lg bg-gray-100 p-1 text-[11px]">
                                    {[
                                        { label: "S", value: 12 },
                                        { label: "M", value: 16 },
                                        { label: "L", value: 18 },
                                        { label: "XL", value: 22 },
                                    ].map((preset) => {
                                        const isActive = translationSize === preset.value
                                        return (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => setTranslationSize(preset.value)}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-purple-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-white"
                                                )}
                                            >
                                                {preset.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Translation fine adjustment */}
                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Fine adjustment
                                </p>
                                <div className="pt-1 pb-4">
                                    <RangeSlider
                                        min={12}
                                        max={24}
                                        step={1}
                                        value={translationSize}
                                        onChange={(e) => setTranslationSize(Number(e.target.value))}
                                        color="purple"
                                    />
                                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                                        <span className="text-purple-600 font-medium">12px</span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="text-purple-600 font-medium">24px</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Audio configuration */}
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="h-4 w-1 rounded-full bg-pink-500" />
                            <h4 className="text-xs font-semibold tracking-[0.12em] uppercase text-gray-900">
                                Audio configuration
                            </h4>
                        </div>

                        <div className="flex flex-col gap-4 pl-3.5">
                            {/* Reciter selection */}
                            <Card className="border-gray-200 bg-white">
                                <CardContent className="px-4 py-3 flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-gray-800">Reciter</p>
                                            <p className="text-[11px] text-gray-500">
                                                Choose whose recitation you prefer for this session.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        {[
                                            { id: "mishary", label: "Mishary Rashid" },
                                            { id: "basit", label: "Abdul Basit" },
                                            { id: "maher", label: "Maher Al-Muaiqly" },
                                            { id: "saad", label: "Saad Al-Ghamdi" },
                                        ].map((r) => {
                                            const isActive = reciter === r.id
                                            return (
                                                <button
                                                    key={r.id}
                                                    type="button"
                                                    onClick={() => setReciter(r.id)}
                                                    className={cn(
                                                        "rounded-lg border px-2.5 py-1.5 text-[11px] text-left transition-colors",
                                                        isActive
                                                            ? "border-pink-400 bg-pink-50 text-pink-800"
                                                            : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                                    )}
                                                >
                                                    {r.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Playback speed */}
                            <Card className="border-gray-200 bg-white">
                                <CardContent className="px-4 py-3 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-800">Playback speed</p>
                                            <p className="text-[11px] text-gray-500">
                                                Slow down or speed up recitation for memorisation.
                                            </p>
                                        </div>
                                        <Badge variant="pink">
                                            {playbackSpeed.toFixed(1)}x
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1">
                                        {[0.75, 1, 1.25, 1.5].map((speed) => {
                                            const isActive = playbackSpeed === speed
                                            return (
                                                <button
                                                    key={speed}
                                                    type="button"
                                                    onClick={() => setPlaybackSpeed(speed)}
                                                    className={cn(
                                                        "rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                                                        isActive
                                                            ? "bg-pink-500 text-white shadow-sm"
                                                            : "text-gray-600 hover:bg-gray-50"
                                                    )}
                                                >
                                                    {speed}x
                                                </button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Auto-scroll toggle */}
                            <Card className="border-gray-200 bg-white">
                                <CardContent className="px-4 py-3 flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Auto-scroll with audio</p>
                                        <p className="text-[11px] text-gray-500">
                                            Keep the current ayah centered while listening.
                                        </p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="pink"
                                        checked={autoScroll}
                                        onCheckedChange={setAutoScroll}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </div>

                {/* Footer hint */}
                <div className="border-t border-emerald-100 bg-white/95 px-5 py-3 text-[11px] text-gray-500">
                    Changes here affect only this device and will be remembered for your next reading session.
                </div>
            </div>
        </aside>
    )
}

export default SettingSidebar