"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, Monitor, Moon, Palette, Sun } from "lucide-react"
import FilterDropdown from "@/components/shared/FilterDropdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/clsx"

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "ur", name: "اردو", flag: "🇵🇰" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
] as const

const fontSizes = ["Small", "Medium", "Large", "Extra large"] as const
const themeModes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
] as const

const accents = [
    { id: "emerald", className: "bg-emerald-600 ring-emerald-200" },
    { id: "blue", className: "bg-blue-600 ring-blue-200" },
    { id: "purple", className: "bg-purple-600 ring-purple-200" },
    { id: "amber", className: "bg-amber-500 ring-amber-200" },
    { id: "red", className: "bg-red-600 ring-red-200" },
    { id: "teal", className: "bg-teal-600 ring-teal-200" },
] as const
const languageOptions = languages.map((language) => ({
    value: language.code,
    label: `${language.flag} ${language.name}`,
    metaLabel: language.code.toUpperCase(),
}))

const ProfilePersonalizationPage = () => {
    const [lang, setLang] = useState<(typeof languages)[number]["code"]>("en")
    const [theme, setTheme] = useState<(typeof themeModes)[number]["id"]>("system")
    const [font, setFont] = useState<(typeof fontSizes)[number]>("Medium")
    const [accent, setAccent] = useState<(typeof accents)[number]["id"]>("emerald")
    const [saving, setSaving] = useState(false)
    const selectedLanguage = languages.find((item) => item.code === lang)

    const handleSave = () => {
        setSaving(true)
        window.setTimeout(() => setSaving(false), 650)
    }

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >
                <Card className="border-layout-separator">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                            <Palette className="h-4 w-4" strokeWidth={2} />
                        </span>
                        Experience
                    </CardTitle>
                    <CardDescription>Visible preferences only; no backend calls yet.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-900">Language</p>
                        <div className="w-full sm:max-w-[280px]">
                            <FilterDropdown
                                options={languageOptions}
                                value={lang}
                                onChange={(value) => setLang(String(value) as (typeof languages)[number]["code"])}
                                placeholder="Select language"
                                triggerIcon={Globe}
                                theme="emerald"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-900">Theme mode</p>
                        <div className="flex flex-wrap gap-2">
                            {themeModes.map((mode) => {
                                const Icon = mode.icon
                                return (
                                    <Button
                                        key={mode.id}
                                        type="button"
                                        size="sm"
                                        variant={theme === mode.id ? "outline-emerald" : "outline"}
                                        className={cn(theme === mode.id && "bg-emerald-50/60")}
                                        onClick={() => setTheme(mode.id)}
                                        shouldScale
                                    >
                                        <Icon className="h-4 w-4" strokeWidth={2} />
                                        {mode.label}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-900">Reading size</p>
                        <div className="flex flex-wrap gap-2">
                            {fontSizes.map((size) => (
                                <Button
                                    key={size}
                                    type="button"
                                    size="sm"
                                    variant={font === size ? "outline-emerald" : "outline"}
                                    onClick={() => setFont(size)}
                                    shouldScale
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-900">Accent</p>
                        <div className="flex flex-wrap gap-3">
                            {accents.map((swatch) => (
                                <button
                                    key={swatch.id}
                                    type="button"
                                    onClick={() => setAccent(swatch.id)}
                                    className={cn(
                                        "h-11 w-11 rounded-lg ring-2 ring-offset-2 ring-offset-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400",
                                        swatch.className,
                                        accent === swatch.id ? "ring-emerald-600" : "ring-transparent"
                                    )}
                                    aria-label={`Accent ${swatch.id}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-5">
                        <Button type="button" variant="secondary" shouldScale>
                            Revert
                        </Button>
                        <Button type="button" shouldScale disabled={saving} onClick={handleSave}>
                            {saving ? "Saving…" : "Save personalization"}
                        </Button>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default ProfilePersonalizationPage
