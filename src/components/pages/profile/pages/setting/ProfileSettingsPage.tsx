"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    BellRing,
    BookText,
    Clock3,
    Clock4,
    MoonStar,
    Settings,
    Shield,
    ShieldCheck,
    SlidersHorizontal,
    Smartphone,
    SunMedium,
} from "lucide-react"
import FilterDropdown from "@/components/shared/FilterDropdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const hijriOffsets = ["−2", "−1", "0", "+1", "+2"] as const
const timeoutOptions = ["5 min", "10 min", "15 min", "30 min", "Never"] as const
const trustedDeviceOptions = ["7 days", "14 days", "30 days", "90 days"] as const
const prayerMethodOptions = [
    { value: "ISNA", label: "ISNA (North America)", icon: MoonStar },
    { value: "MWL", label: "Muslim World League", icon: MoonStar },
    { value: "Egypt", label: "Egyptian General Authority", icon: MoonStar },
    { value: "UmmAlQura", label: "Umm al-Qura, Makkah", icon: MoonStar },
    { value: "Karachi", label: "University of Karachi", icon: MoonStar },
] as const
const asrMethodOptions = [
    { value: "standard", label: "Standard (Shafi'i, Maliki, Hanbali)", icon: SunMedium },
    { value: "hanafi", label: "Hanafi", icon: SunMedium },
] as const
const timeoutDropdownOptions = timeoutOptions.map((value) => ({ value, label: value, icon: Clock4 }))
const trustedDeviceDropdownOptions = trustedDeviceOptions.map((value) => ({ value, label: value, icon: ShieldCheck }))

const ProfileSettingsPage = () => {
    const [prayerMethod, setPrayerMethod] = useState("ISNA")
    const [asrMethod, setAsrMethod] = useState("standard")
    const [hijri, setHijri] = useState<(typeof hijriOffsets)[number]>("0")
    const [inactivityTimeout, setInactivityTimeout] = useState<(typeof timeoutOptions)[number]>("15 min")
    const [trustedDeviceWindow, setTrustedDeviceWindow] = useState<(typeof trustedDeviceOptions)[number]>("30 days")
    const [use24hTime, setUse24hTime] = useState(false)
    const [autoOpenLastPage, setAutoOpenLastPage] = useState(true)
    const [showTransliteration, setShowTransliteration] = useState(true)
    const [fridayReminder, setFridayReminder] = useState(true)
    const [sessionAlerts, setSessionAlerts] = useState(true)
    const [allowMultiSession, setAllowMultiSession] = useState(true)
    const [saving, setSaving] = useState(false)

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
                <Card className="border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                            <Settings className="h-4 w-4" strokeWidth={2} />
                        </span>
                        Prayer & calendar defaults
                    </CardTitle>
                    <CardDescription>Used across prayer times, widgets, and reminders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-7">
                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="prayer-method" className="text-sm font-medium text-gray-700">
                                Default prayer calculation
                            </label>
                            <FilterDropdown
                                options={[...prayerMethodOptions]}
                                value={prayerMethod}
                                onChange={(value) => setPrayerMethod(String(value))}
                                placeholder="Select prayer method"
                                triggerIcon={MoonStar}
                                theme="emerald"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="asr-method" className="text-sm font-medium text-gray-700">
                                Asr calculation
                            </label>
                            <FilterDropdown
                                options={[...asrMethodOptions]}
                                value={asrMethod}
                                onChange={(value) => setAsrMethod(String(value))}
                                placeholder="Select Asr method"
                                triggerIcon={SunMedium}
                                theme="amber"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="trusted-devices" className="text-sm font-medium text-gray-700">
                                Trusted device lifetime
                            </label>
                            <FilterDropdown
                                options={trustedDeviceDropdownOptions}
                                value={trustedDeviceWindow}
                                onChange={(value) => setTrustedDeviceWindow(String(value) as (typeof trustedDeviceOptions)[number])}
                                placeholder="Trusted device lifetime"
                                triggerIcon={ShieldCheck}
                                theme="purple"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="inactivity-timeout" className="text-sm font-medium text-gray-700">
                                Session inactivity timeout
                            </label>
                            <FilterDropdown
                                options={timeoutDropdownOptions}
                                value={inactivityTimeout}
                                onChange={(value) => setInactivityTimeout(String(value) as (typeof timeoutOptions)[number])}
                                placeholder="Session timeout"
                                triggerIcon={Clock4}
                                theme="slate"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 rounded-lg border border-emerald-100 bg-white/80 p-3">
                        <p className="text-sm font-medium text-gray-700">Hijri date adjustment</p>
                        <div className="flex flex-wrap gap-2">
                            {hijriOffsets.map((value) => (
                                <Button
                                    key={value}
                                    type="button"
                                    size="sm"
                                    variant={hijri === value ? "outline-emerald" : "outline"}
                                    onClick={() => setHijri(value)}
                                    shouldScale
                                >
                                    {value === "0" ? "0 days" : `${value} days`}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
            >
                <Card className="border-layout-separator">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
                        </span>
                        App behavior
                    </CardTitle>
                    <CardDescription>Experience defaults that apply across the profile and app shell.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 p-4">
                        <div className="flex items-center justify-between gap-3 rounded-md border border-blue-200 bg-white/90 px-3 py-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                                    <Clock4 className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Use 24-hour time</p>
                                    <p className="text-xs text-gray-600">Show prayer and reminder times in 24h format.</p>
                                </div>
                            </div>
                            <Switch checked={use24hTime} onCheckedChange={setUse24hTime} variant="blue" />
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-md border border-blue-200 bg-white/90 px-3 py-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                                    <Smartphone className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Open last visited page</p>
                                    <p className="text-xs text-gray-600">Resume from where you left off next time.</p>
                                </div>
                            </div>
                            <Switch checked={autoOpenLastPage} onCheckedChange={setAutoOpenLastPage} variant="blue" />
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-md border border-blue-200 bg-white/90 px-3 py-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                                    <BookText className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Show transliteration by default</p>
                                    <p className="text-xs text-gray-600">Enabled for Quran and selected dua content.</p>
                                </div>
                            </div>
                            <Switch checked={showTransliteration} onCheckedChange={setShowTransliteration} variant="blue" />
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-md border border-blue-200 bg-white/90 px-3 py-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                                    <BellRing className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Friday reminder</p>
                                    <p className="text-xs text-gray-600">Receive a weekly reminder before Jumu'ah.</p>
                                </div>
                            </div>
                            <Switch checked={fridayReminder} onCheckedChange={setFridayReminder} variant="blue" />
                        </div>
                    </div>
                </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
            >
                <Card className="border-layout-separator">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700 ring-1 ring-purple-100">
                            <Shield className="h-4 w-4" strokeWidth={2} />
                        </span>
                        Session and security behavior
                    </CardTitle>
                    <CardDescription>Control how your account behaves on current and new devices.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50/80 via-white to-fuchsia-50/60 p-4">
                        <div className="flex items-center justify-between gap-3 rounded-md border border-purple-200 bg-white/90 px-3 py-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-purple-50 text-purple-700 ring-1 ring-purple-100">
                                    <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Sign-in alerts</p>
                                    <p className="text-xs text-gray-600">Notify me when a new device signs in.</p>
                                </div>
                            </div>
                            <Switch checked={sessionAlerts} onCheckedChange={setSessionAlerts} variant="purple" />
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-md border border-purple-200 bg-white/90 px-3 py-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-purple-50 text-purple-700 ring-1 ring-purple-100">
                                    <Smartphone className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Allow multi-device sessions</p>
                                    <p className="text-xs text-gray-600">Keep your account active on more than one device.</p>
                                </div>
                            </div>
                            <Switch checked={allowMultiSession} onCheckedChange={setAllowMultiSession} variant="purple" />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-5">
                        <Button type="button" variant="secondary" shouldScale>
                            Restore defaults
                        </Button>
                        <Button type="button" variant="default-purple" shouldScale disabled={saving} onClick={handleSave}>
                            {saving ? "Saving…" : "Save settings"}
                        </Button>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default ProfileSettingsPage
