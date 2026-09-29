"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    BellRing,
    BookText,
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
import SwitchWrapper from "../../generic/SwitchWrapper"
import SwitchItem from "../../generic/SwitchItem"

const hijriOffsets = ["−2", "−1", "0", "+1", "+2"] as const

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
const timeoutOptions = ["5 min", "10 min", "15 min", "30 min", "Never"] as const
const trustedDeviceOptions = ["7 days", "14 days", "30 days", "90 days"] as const


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

            {/*  Prayer & calendar defaults  */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >
                <SwitchWrapper
                    variant="emerald"
                    classNames={{
                        card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/40",
                        buttonsWrapper: "justify-end",
                    }}
                    cardHeader={{
                        title: "Prayer & calendar defaults",
                        description: "Used across prayer times, widgets, and reminders.",
                        icon: Settings,
                    }}
                >
                    <section className="grid gap-5 md:grid-cols-2">
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
                                classNames={{ triggerButton: "h-10" }}
                            />
                        </div>
                    </section>

                    <section className="space-y-3">
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
                    </section>
                </SwitchWrapper>
            </motion.div>


            {/*  App behavior  */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
            >
                <SwitchWrapper
                    variant="blue"
                    classNames={{ buttonsWrapper: "justify-end", }}
                    cardHeader={{
                        title: "App behavior",
                        description: "Experience defaults that apply across the profile and app shell.",
                        icon: SlidersHorizontal,
                    }}
                >
                    <section className="space-y-3">
                        <SwitchItem
                            variant="blue"
                            title="Use 24-hour time"
                            description="Show prayer and reminder times in 24h format."
                            icon={Clock4}
                            checked={use24hTime}
                            onCheckedChange={setUse24hTime}
                        />
                        <SwitchItem
                            variant="blue"
                            title="Biometric unlock"
                            description="Use device biometrics when available."
                            icon={Smartphone}
                            checked={autoOpenLastPage}
                            onCheckedChange={setAutoOpenLastPage}
                        />
                        <SwitchItem
                            variant="blue"
                            title="Show transliteration by default"
                            description="Enabled for Quran and selected dua content."
                            icon={BookText}
                            checked={showTransliteration}
                            onCheckedChange={setShowTransliteration}
                        />
                        <SwitchItem
                            variant="blue"
                            title="Friday reminder"
                            description="Receive a weekly reminder before Jumu'ah."
                            icon={BellRing}
                            checked={fridayReminder}
                            onCheckedChange={setFridayReminder}
                        />
                    </section>
                </SwitchWrapper>
            </motion.div>


            {/* Session and security behavior  */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.4 }}
            >
                <SwitchWrapper
                    variant="purple"
                    classNames={{ buttonsWrapper: "justify-end", }}
                    cardHeader={{
                        title: "Session and security behavior",
                        description: "Control how your account behaves on current and new devices.",
                        icon: Shield,
                    }}
                    buttonSection={{
                        visible: true,
                        primaryButton: {
                            label: saving ? "Saving…" : "Save settings",
                            onClick: handleSave,
                            buttonProps: {
                                disabled: saving,
                                variant: "default-purple",
                                onClick: handleSave
                            },
                        },
                        secondaryButton: {
                            label: " Restore defaults",
                            onClick: () => { },
                            buttonProps: { variant: "secondary" },
                        },
                    }}
                >
                    <section className="space-y-3">
                        <SwitchItem
                            variant="purple"
                            title="Sign-in alerts"
                            description="Notify me when a new device signs in."
                            icon={ShieldCheck}
                            checked={sessionAlerts}
                            onCheckedChange={setSessionAlerts}
                        />
                        <SwitchItem
                            variant="purple"
                            title="Allow multi-device sessions"
                            description="Keep your account active on more than one device."
                            icon={Smartphone}
                            checked={allowMultiSession}
                            onCheckedChange={setAllowMultiSession}
                        />
                    </section>
                </SwitchWrapper>
            </motion.div>
        </div>
    )
}

export default ProfileSettingsPage
