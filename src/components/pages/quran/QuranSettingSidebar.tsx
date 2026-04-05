"use client"

import React, { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { RangeSlider } from "@/components/ui/range-slider"
import { cn } from "@/lib/utils/clsx"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useQuranReaderSettingsStore from "@/store/quran"

interface QuranSettingSidebarProps {
    open: boolean
    onClose: () => void
}


const QuranSettingSidebar: React.FC<QuranSettingSidebarProps> = ({ open, onClose }) => {
    /** Below xl the sidebar overlays the reader — show live font previews there. */
    const isXlDown = useBreakpoint("xl", "down")
    const isSidebarOverlay = isXlDown

    const {
        configurations,
        arabicFontSize,
        showArabic,
        useArabicFontFamily,
        transliterationSize,
        showTransliteration,
        translationSize,
        showTranslation,
        translationLanguage,
        reciter,
        playbackSpeed,
        autoScroll,
        setArabicFontSize,
        setShowArabic,
        setUseArabicFontFamily,
        setTransliterationSize,
        setShowTransliteration,
        setTranslationSize,
        setShowTranslation,
        setTranslationLanguage,
        setReciter,
        setPlaybackSpeed,
        setAutoScroll,
    } = useQuranReaderSettingsStore()

    const [translationLangSearch, setTranslationLangSearch] = useState("")
    const [translationLangMenuOpen, setTranslationLangMenuOpen] = useState(false)

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
        translationLanguages.find((l) => l.value === translationLanguage)?.label ?? "Select language"

    const translationLangFiltered = translationLanguages.filter((l) =>
        l.label.toLowerCase().includes(translationLangSearch.trim().toLowerCase()),
    )


    return (
        <aside
            className={cn(
                "transition-all duration-300 overflow-hidden",
                "absolute right-0 top-0 bottom-0 z-50 xl:static xl:right-auto",
                // "h-[560px] md:h-[640px] xl:h-[756px]",
                "h-full w-full",
                open ? "max-w-[min(100vw,360px)]" : "max-w-0"
            )}
        >
            <div
                className={cn(
                    "h-full bg-gradient-to-b from-emerald-50 via-white to-slate-50 border-l border-layout-separator flex flex-col",
                    "min-w-0 w-[min(100vw,360px)]"
                )}
            >
                {/* Header */}
                <div className="bg-white">
                    <div className="py-4 px-5">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-emerald-500 to-teal-600" />
                                    <h3 className="text-base font-semibold tracking-wider text-gray-900">
                                        UI Settings
                                    </h3>
                                </div>
                                <p className="pl-2 sm:pl-3.5 text-[12px] sm:text-[13px] text-gray-500">
                                    Configure how the Quran text appears for this session.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost-emerald"
                                size="icon"
                                shouldScale={false}
                                className="w-7 h-7 rounded-md duration-100 border hover:border-emerald-100 text-emerald-600 lg:text-black
                                hover:bg-emerald-50 bg-emerald-50 lg:bg-transparent border-emerald-100 lg:border-transparent"
                                onClick={onClose}
                                aria-label="Close settings"
                            >
                                <X size={18} strokeWidth={2} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto py-5 px-5 flex flex-col gap-6 scrollbar-thin">
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
                                {arabicFontSize ?? configurations.arabic.defaultSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-2 sm:pl-3.5">
                            <Card className="border-emerald-200 bg-white">
                                <CardContent className="px-3 py-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Display Arabic</p>
                                        <p className="text-xs text-gray-500">Show Qur&apos;anic script in the reader.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="emerald"
                                        checked={showArabic}
                                        onCheckedChange={setShowArabic}
                                        disabled={!showTransliteration && !showTranslation}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-[12px] font-medium text-gray-800 truncate">
                                        Arabic font
                                    </p>
                                    <p className="text-[10px] text-gray-500 leading-tight">
                                        Quranic family
                                    </p>
                                </div>
                                <Switch
                                    size="sm"
                                    variant="emerald"
                                    checked={useArabicFontFamily}
                                    onCheckedChange={setUseArabicFontFamily}
                                    disabled={!showArabic}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Font size preset
                                </p>
                                <div className="grid grid-cols-4 gap-1 rounded-lg bg-white p-1 text-[11px] border border-emerald-200">
                                    {Object.entries(configurations.arabic.presets).map(([key, value]) => {
                                        const isActive = arabicFontSize === value
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setArabicFontSize(value)}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-emerald-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-slate-100"
                                                )}
                                            >
                                                {key}
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
                                        min={configurations.arabic.min}
                                        max={configurations.arabic.max}
                                        step={configurations.arabic.step}
                                        value={arabicFontSize}
                                        onChange={(e) => setArabicFontSize(Number(e.target.value))}
                                        color="emerald"
                                    />
                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                        <span className="text-emerald-600 font-medium">{configurations.arabic.min}px</span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="text-emerald-600 font-medium">{configurations.arabic.max}px</span>
                                    </div>
                                    {isSidebarOverlay && showArabic && (
                                        <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-2 sm:px-3">
                                            <div className="flex items-center gap-2 pt-1">
                                                <div
                                                    className="w-2 h-2 rounded-full bg-emerald-500 ml-1 -translate-y-[.8px]"
                                                    aria-hidden
                                                />
                                                <p className="shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] text-emerald-800 pb-0.5 leading-none">
                                                    Live preview
                                                </p>
                                            </div>
                                            <p
                                                className="mt-2 font-arabic text-gray-900 break-words text-right"
                                                style={{
                                                    fontSize: `${useArabicFontFamily ? arabicFontSize : arabicFontSize + 4}px`,
                                                    lineHeight: useArabicFontFamily ? 2.1 : 1.5,
                                                    direction: "rtl",
                                                }}
                                            >
                                                {configurations.arabic.preview}
                                            </p>
                                        </div>
                                    )}
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
                                {transliterationSize ?? configurations.transliteration.defaultSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-2 sm:pl-3.5">
                            <Card className="border-blue-200 bg-white">
                                <CardContent className="px-3 py-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Display transliteration</p>
                                        <p className="text-xs text-gray-500">Romanized pronunciation below each ayah.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="blue"
                                        checked={showTransliteration}
                                        onCheckedChange={setShowTransliteration}
                                        disabled={!showArabic && !showTranslation}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Font size preset
                                </p>
                                <div className="grid grid-cols-4 gap-1 rounded-lg bg-slate-100 p-1 text-[11px]">
                                    {Object.entries(configurations.transliteration.presets).map(([key, value]) => {
                                        const isActive = transliterationSize === value
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setTransliterationSize(value)}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-blue-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-white"
                                                )}
                                            >
                                                {key}
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
                                        min={configurations.transliteration.min}
                                        max={configurations.transliteration.max}
                                        step={configurations.transliteration.step}
                                        value={transliterationSize}
                                        onChange={(e) => setTransliterationSize(Number(e.target.value))}
                                        color="blue"
                                    />
                                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                                        <span className="text-blue-600 font-medium">{configurations.transliteration.min}px</span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="text-blue-600 font-medium">{configurations.transliteration.max}px</span>
                                    </div>
                                    {isSidebarOverlay && showTransliteration && (
                                        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-2 py-2 sm:px-3">
                                            <div className="flex items-center gap-2 pt-1">
                                                <div
                                                    className="w-2 h-2 rounded-full bg-blue-500 ml-1 -translate-y-[.8px]"
                                                    aria-hidden
                                                />
                                                <p className="shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] text-blue-800 pb-0.5 leading-none">
                                                    Live preview
                                                </p>
                                            </div>
                                            <p
                                                className="mt-2 text-black italic break-words"
                                                style={{ fontSize: `${transliterationSize}px`, lineHeight: 1.5 }}
                                            >
                                                {configurations.transliteration.preview}
                                            </p>
                                        </div>
                                    )}
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
                                {translationSize ?? configurations.translation.defaultSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-2 sm:pl-3.5">
                            <Card className="border-purple-200 bg-white">
                                <CardContent className="px-3 py-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Display translation</p>
                                        <p className="text-xs text-gray-500">Meaning in your preferred language.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="purple"
                                        checked={showTranslation}
                                        onCheckedChange={setShowTranslation}
                                        disabled={!showArabic && !showTransliteration}
                                    />
                                </CardContent>
                            </Card>

                            {/* Language selection */}
                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Language &amp; translation
                                </p>
                                <div className="flex flex-col gap-2">
                                    <Popover
                                        open={translationLangMenuOpen}
                                        onOpenChange={(next) => {
                                            setTranslationLangMenuOpen(next)
                                            if (!next) setTranslationLangSearch("")
                                        }}
                                    >
                                        <PopoverTrigger>
                                            <Button
                                                asChild
                                                variant="outline-purple"
                                                size="md"
                                                className="w-full h-10 justify-between gap-3 rounded-lg px-3 border-purple-300 bg-purple-50"
                                            >
                                                <span className="text-sm text-gray-800 truncate font-medium">
                                                    {translationSelectedLabel}
                                                </span>
                                                <ChevronDown className="h-4 w-4 text-purple-700" />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent
                                            align="start"
                                            className="w-[var(--radix-popover-trigger-width)] max-w-[calc(100vw-2rem)] p-2 bg-white/95 
                                            border border-purple-200/80 shadow-lg rounded-md"
                                        >
                                            <div className="px-1 pb-2">
                                                <input
                                                    type="text"
                                                    value={translationLangSearch}
                                                    onChange={(e) => setTranslationLangSearch(e.target.value)}
                                                    placeholder="Search languages..."
                                                    className="w-full h-9 rounded-md border border-purple-200 bg-white px-3 text-base 
                                                    placeholder:text-sm text-gray-800 outline-none placeholder:text-gray-400 
                                                    focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-colors"
                                                />
                                            </div>

                                            <div className="max-h-[220px] overflow-y-auto scrollbar-thin px-1 pb-1">
                                                {translationLangFiltered.map((lang) => (
                                                    <button
                                                        key={lang.value}
                                                        onClick={() => {
                                                            setTranslationLanguage(lang.value)
                                                            setTranslationLangMenuOpen(false)
                                                            setTranslationLangSearch("")
                                                        }}
                                                        className={cn(
                                                            "w-full cursor-pointer rounded-sm px-3 py-2 border transition-colors flex items-center justify-between gap-3 mt-1",
                                                            translationLanguage === lang.value
                                                                ? "bg-purple-50 border-purple-200 text-purple-900"
                                                                : "border-transparent text-gray-900 hover:border-purple-200 hover:bg-purple-50"
                                                        )}
                                                    >
                                                        <span className="text-sm font-medium truncate">
                                                            {lang.label}
                                                        </span>

                                                        {translationLanguage === lang.value && (
                                                            <Check className="h-4 w-4 text-purple-600" />
                                                        )}
                                                    </button>
                                                ))}

                                                {translationLangFiltered.length === 0 && (
                                                    <div className="px-3 py-2 text-xs text-gray-500">
                                                        No matching languages
                                                    </div>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>

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
                                    {Object.entries(configurations.translation.presets).map(([key, value]) => {
                                        const isActive = translationSize === value
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setTranslationSize(value)}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-purple-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-white"
                                                )}
                                            >
                                                {key}
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
                                        min={configurations.translation.min}
                                        max={configurations.translation.max}
                                        step={configurations.translation.step}
                                        value={translationSize}
                                        onChange={(e) => setTranslationSize(Number(e.target.value))}
                                        color="purple"
                                    />
                                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                                        <span className="text-purple-600 font-medium">{configurations.translation.min}px</span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="text-purple-600 font-medium">{configurations.translation.max}px</span>
                                    </div>
                                    {isSidebarOverlay && showTranslation && (
                                        <div className="mt-3 rounded-lg border border-purple-200 bg-purple-50 px-2 py-2 sm:px-3">
                                            <div className="flex items-center gap-2 pt-1">
                                                <div
                                                    className="w-2 h-2 rounded-full bg-purple-500 ml-1 -translate-y-[.8px]"
                                                    aria-hidden
                                                />
                                                <p className="shrink-0 text-[10px] font-medium uppercase tracking-[0.1em] text-purple-800 pb-0.5 leading-none">
                                                    Live preview
                                                </p>
                                            </div>
                                            <p
                                                className="mt-2 text-gray-800 leading-relaxed break-words"
                                                style={{ fontSize: `${translationSize}px` }}
                                            >
                                                {configurations.translation.preview}
                                            </p>
                                        </div>
                                    )}
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

                        <div className="flex flex-col gap-4 pl-2 sm:pl-3.5">
                            {/* Reciter selection */}
                            <Card className="border-gray-200 bg-white">
                                <CardContent className="px-3 py-3 sm:px-4 flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-gray-800">Reciter</p>
                                            <p className="text-[11px] text-gray-500">
                                                Choose whose recitation you prefer for this session.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        {configurations.audio.reciters.map((r) => {
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
                                <CardContent className="px-3 py-3 sm:px-4 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-800">Playback speed</p>
                                            <p className="text-[11px] text-gray-500">
                                                Slow down or speed up recitation for memorisation.
                                            </p>
                                        </div>
                                        <Badge variant="pink">
                                            {playbackSpeed.toFixed(1) ?? configurations.audio.defaultPlaybackSpeed.toFixed(1)}x
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1">
                                        {Object.entries(configurations.audio.presets).map(([key, value]) => {
                                            const isActive = playbackSpeed === value
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => setPlaybackSpeed(value)}
                                                    className={cn(
                                                        "rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                                                        isActive
                                                            ? "bg-pink-500 text-white shadow-sm"
                                                            : "text-gray-600 hover:bg-gray-50"
                                                    )}
                                                >
                                                    {value.toFixed(1)}x
                                                </button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Auto-scroll toggle */}
                            <Card className="border-gray-200 bg-white">
                                <CardContent className="px-3 py-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3">
                                    <div>
                                        <p className="text-sm text-gray-800">Auto-scroll with audio</p>
                                        <p className="text-[11px] text-gray-500">
                                            Keep the current ayah centered while listening.
                                        </p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="pink"
                                        checked={autoScroll ?? configurations.audio.defaultAutoScroll}
                                        onCheckedChange={() => setAutoScroll(!autoScroll)}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </div>

                {/* Footer hint */}
                <div className="border-t border-emerald-100 bg-white/95 px-5 py-3 text-sm text-gray-500">
                    Changes here affect only this device and will be remembered for your next reading session.
                </div>
            </div>
        </aside>
    )
}

export default QuranSettingSidebar