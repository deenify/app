"use client"

import type { FC } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils/clsx"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { RangeSlider } from "@/components/ui/range-slider"
import useHadithReaderSettingsStore from "@/store/hadith"

interface HadithSettingSidebarProps {
    open: boolean
    onClose: () => void
}

const HadithSettingSidebar: FC<HadithSettingSidebarProps> = ({ open, onClose }) => {
    const isXlDown = useBreakpoint("xl", "down")
    const isSidebarOverlay = isXlDown

    const {
        configurations,
        arabicFontSize,
        englishFontSize,
        showArabic,
        showEnglish,
        showChainNotes,
        showTopicChips,
        showInBookReference,
        useArabicFontFamily,
        setArabicFontSize,
        setEnglishFontSize,
        setShowArabic,
        setShowEnglish,
        setShowChainNotes,
        setShowTopicChips,
        setShowInBookReference,
        setUseArabicFontFamily,
    } = useHadithReaderSettingsStore()

    const safeSetShowArabic = (v: boolean) => {
        if (!v && !showEnglish) return
        setShowArabic(v)
    }

    const safeSetShowEnglish = (v: boolean) => {
        if (!v && !showArabic) return
        setShowEnglish(v)
    }

    return (
        <aside
            className={cn(
                "transition-all duration-300 overflow-hidden",
                "absolute right-0 top-0 bottom-0 z-50 xl:static xl:right-auto",
                "h-full w-full",
                open ? "max-w-[min(100vw,360px)]" : "max-w-0"
            )}
        >
            <div
                className={cn(
                    "flex h-full flex-col border-l border-layout-separator",
                    "bg-gradient-to-b from-amber-50 via-white to-stone-50",
                    "min-w-0 w-[min(100vw,360px)]"
                )}
            >
                <div className="bg-white">
                    <div className="px-5 py-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <div className="mb-1.5 flex items-center gap-2">
                                    <div className="h-5 w-1.5 rounded-full bg-gradient-to-b from-amber-500 to-amber-700" />
                                    <h3 className="text-base font-semibold tracking-wide text-gray-900">Reader settings</h3>
                                </div>
                                <p className="pl-2 text-[12px] leading-snug text-gray-500 sm:pl-3.5 sm:text-[13px]">
                                    Tune how hadith text and scholarly notes appear while you read this collection.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="ghost-amber"
                                size="icon"
                                shouldScale={false}
                                className="h-7 w-7 rounded-md border border-amber-100 bg-amber-50 text-amber-900 duration-100 hover:border-amber-200 hover:bg-amber-100 lg:border-transparent lg:bg-transparent"
                                onClick={onClose}
                                aria-label="Close settings"
                            >
                                <X size={18} strokeWidth={2} />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="scrollbar-thin flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="h-4 w-1 rounded-full bg-amber-500" />
                                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-900">
                                    Arabic text
                                </h4>
                            </div>
                            <Badge
                                variant="outline"
                                className="border-amber-200 bg-amber-50 text-xs font-medium text-amber-950"
                            >
                                {arabicFontSize ?? configurations.arabic.defaultSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-2 sm:pl-3.5">
                            <Card className="border-amber-200 bg-white">
                                <CardContent className="flex items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4">
                                    <div className="min-w-0">
                                        <p className="text-sm text-gray-800">Display Arabic</p>
                                        <p className="text-xs text-gray-500">Arabic matn in the reader.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="amber"
                                        checked={showArabic}
                                        onCheckedChange={safeSetShowArabic}
                                        disabled={!showEnglish && showArabic}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="truncate text-[12px] font-medium text-gray-800">Arabic font</p>
                                    <p className="text-[10px] leading-tight text-gray-500">Quranic family</p>
                                </div>
                                <Switch
                                    size="sm"
                                    variant="amber"
                                    checked={useArabicFontFamily}
                                    onCheckedChange={setUseArabicFontFamily}
                                    disabled={!showArabic}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Font size preset
                                </p>
                                <div className="grid grid-cols-4 gap-1 rounded-lg border border-amber-200 bg-white p-1 text-[11px]">
                                    {Object.entries(configurations.arabic.presets).map(([key, value]) => {
                                        const isActive = arabicFontSize === value
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setArabicFontSize(value)}
                                                disabled={!showArabic}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-amber-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-stone-100",
                                                    !showArabic && "pointer-events-none opacity-40"
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
                                <div className="pb-4 pt-1">
                                    <RangeSlider
                                        min={configurations.arabic.min}
                                        max={configurations.arabic.max}
                                        step={configurations.arabic.step}
                                        value={arabicFontSize}
                                        onChange={(e) => setArabicFontSize(Number(e.target.value))}
                                        color="amber"
                                        disabled={!showArabic}
                                    />
                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                        <span className="font-medium text-amber-700">
                                            {configurations.arabic.min}px
                                        </span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="font-medium text-amber-700">
                                            {configurations.arabic.max}px
                                        </span>
                                    </div>
                                    {isSidebarOverlay && showArabic && (
                                        <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 px-2 py-2 sm:px-3">
                                            <div className="flex items-center gap-2 pt-1">
                                                <div
                                                    className="ml-1 h-2 w-2 -translate-y-[.8px] rounded-full bg-amber-500"
                                                    aria-hidden
                                                />
                                                <p className="shrink-0 pb-0.5 text-[10px] font-medium uppercase leading-none tracking-[0.1em] text-amber-900">
                                                    Live preview
                                                </p>
                                            </div>
                                            <p
                                                className={cn(
                                                    "mt-2 break-words text-right text-gray-900",
                                                    useArabicFontFamily ? "font-arabic" : "font-body"
                                                )}
                                                style={{
                                                    fontSize: `${useArabicFontFamily ? arabicFontSize : arabicFontSize + 4}px`,
                                                    lineHeight: useArabicFontFamily ? 2.1 : 1.5,
                                                    direction: "rtl",
                                                }}
                                                dir="rtl"
                                            >
                                                {configurations.arabic.preview}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="h-4 w-1 rounded-full bg-amber-500" />
                                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-900">
                                    Translation
                                </h4>
                            </div>
                            <Badge
                                variant="outline"
                                className="border-amber-200 bg-amber-50 text-xs font-medium text-amber-950"
                            >
                                {englishFontSize ?? configurations.english.defaultSize}px
                            </Badge>
                        </div>

                        <div className="flex flex-col gap-4 pl-2 sm:pl-3.5">
                            <Card className="border-amber-200 bg-white">
                                <CardContent className="flex items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4">
                                    <div className="min-w-0">
                                        <p className="text-sm text-gray-800">Display translation</p>
                                        <p className="text-xs text-gray-500">Meaning in your study language.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="amber"
                                        checked={showEnglish}
                                        onCheckedChange={safeSetShowEnglish}
                                        disabled={!showArabic && showEnglish}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex flex-col gap-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                    Font size preset
                                </p>
                                <div className="grid grid-cols-4 gap-1 rounded-lg border border-amber-200 bg-white p-1 text-[11px]">
                                    {Object.entries(configurations.english.presets).map(([key, value]) => {
                                        const isActive = englishFontSize === value
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setEnglishFontSize(value)}
                                                disabled={!showEnglish}
                                                className={cn(
                                                    "flex items-center justify-center rounded-md px-2 py-1 font-medium transition-colors",
                                                    isActive
                                                        ? "bg-amber-500 text-white shadow-sm"
                                                        : "text-gray-600 hover:bg-stone-100",
                                                    !showEnglish && "pointer-events-none opacity-40"
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
                                <div className="pb-4 pt-1">
                                    <RangeSlider
                                        min={configurations.english.min}
                                        max={configurations.english.max}
                                        step={configurations.english.step}
                                        value={englishFontSize}
                                        onChange={(e) => setEnglishFontSize(Number(e.target.value))}
                                        color="amber"
                                        disabled={!showEnglish}
                                    />
                                    <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                                        <span className="font-medium text-amber-700">
                                            {configurations.english.min}px
                                        </span>
                                        <span className="text-gray-400">Slide to adjust</span>
                                        <span className="font-medium text-amber-700">
                                            {configurations.english.max}px
                                        </span>
                                    </div>
                                    {isSidebarOverlay && showEnglish && (
                                        <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 px-2 py-2 sm:px-3">
                                            <div className="flex items-center gap-2 pt-1">
                                                <div
                                                    className="ml-1 h-2 w-2 -translate-y-[.8px] rounded-full bg-amber-500"
                                                    aria-hidden
                                                />
                                                <p className="shrink-0 pb-0.5 text-[10px] font-medium uppercase leading-none tracking-[0.1em] text-amber-900">
                                                    Live preview
                                                </p>
                                            </div>
                                            <p
                                                className="mt-2 break-words leading-relaxed text-gray-800"
                                                style={{ fontSize: `${englishFontSize}px` }}
                                            >
                                                {configurations.english.preview}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="h-4 w-1 rounded-full bg-amber-500" />
                            <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-900">
                                Scholarly layout
                            </h4>
                        </div>

                        <div className="flex flex-col gap-3 pl-2 sm:pl-3.5">
                            <Card className="border-amber-200 bg-white">
                                <CardContent className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
                                    <div className="min-w-0">
                                        <p className="text-sm text-gray-800">In-book reference</p>
                                        <p className="text-xs text-gray-500">Book, hadith, and chapter indices.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="amber"
                                        checked={showInBookReference}
                                        onCheckedChange={setShowInBookReference}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="border-amber-200 bg-white">
                                <CardContent className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
                                    <div className="min-w-0">
                                        <p className="text-sm text-gray-800">Theme tags</p>
                                        <p className="text-xs text-gray-500">Topics linked to this narration.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="amber"
                                        checked={showTopicChips}
                                        onCheckedChange={setShowTopicChips}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="border-amber-200 bg-white">
                                <CardContent className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
                                    <div className="min-w-0">
                                        <p className="text-sm text-gray-800">Chain &amp; critique notes</p>
                                        <p className="text-xs text-gray-500">When available from the compiler.</p>
                                    </div>
                                    <Switch
                                        size="md"
                                        variant="amber"
                                        checked={showChainNotes}
                                        onCheckedChange={setShowChainNotes}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </div>

                {/* Footer hint */}
                <div className="border-t border-amber-100 bg-white/95 px-5 py-3 text-sm text-gray-500">
                    Changes here affect only this device and will be remembered for your next reading session.
                </div>
            </div>
        </aside>
    )
}

export default HadithSettingSidebar
