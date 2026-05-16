"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Mail, Smartphone } from "lucide-react"
import SwitchWrapper from "../../generic/SwitchWrapper"
import SwitchItem from "../../generic/SwitchItem"

const ProfileNotificationsPage = () => {
    const [state, setState] = useState({
        prayerReminders: true,
        dhikrReminders: true,
        quranGoals: true,
        email: false,
        push: true,
    })
    const [saving, setSaving] = useState(false)

    const handleSave = () => {
        setSaving(true)
        window.setTimeout(() => setSaving(false), 650)
    }

    return (
        <div className="space-y-5 max-[320px]:space-y-4">
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >
                <SwitchWrapper
                    variant="amber"
                    classNames={{ buttonsWrapper: "justify-end pt-5" }}
                    cardHeader={{
                        title: "Channels & reminders",
                        description: "App nudges first, then email and push.",
                        icon: Bell,
                    }}
                    buttonSection={{
                        visible: true,
                        primaryButton: {
                            label: saving ? "Saving…" : "Save notifications",
                            onClick: handleSave,
                            buttonProps: {
                                disabled: saving,
                                variant: "default-amber"
                            },
                        },
                        secondaryButton: {
                            label: "Mute all",
                            buttonProps: { variant: "secondary" },
                            onClick: () => setState({
                                prayerReminders: false,
                                dhikrReminders: false,
                                quranGoals: false,
                                email: false,
                                push: false
                            }),
                        },
                    }}
                >
                    <section className="space-y-3">
                        <SwitchItem
                            variant="amber"
                            title="Prayer time reminders"
                            description="Soft prompts before each salāh window."
                            checked={state.prayerReminders}
                            onCheckedChange={(v) => setState((s) => ({ ...s, prayerReminders: v }))}
                        />
                        <SwitchItem
                            variant="amber"
                            title="Dhikr reminders"
                            description="Morning and evening adhkār checkpoints."
                            checked={state.dhikrReminders}
                            onCheckedChange={(v) => setState((s) => ({ ...s, dhikrReminders: v }))}
                        />
                        <SwitchItem
                            variant="amber"
                            title="Qur’an reading goals"
                            description="Daily progress toward your chosen pace."
                            checked={state.quranGoals}
                            onCheckedChange={(v) => setState((s) => ({ ...s, quranGoals: v }))}
                        />
                    </section>

                    <section className="space-y-3 border-t border-gray-100 pt-5 max-[320px]:pt-4">
                        <p className="text-sm font-medium text-gray-900">Delivery</p>
                        <SwitchItem
                            variant="gray"
                            title="Email updates"
                            description="Weekly summaries and product news."
                            icon={Mail}
                            checked={state.email}
                            onCheckedChange={(v) => setState((s) => ({ ...s, email: v }))}
                        />
                        <SwitchItem
                            variant="gray"
                            title="Push notifications"
                            description="On-device alerts when enabled in the OS."
                            icon={Smartphone}
                            checked={state.push}
                            onCheckedChange={(v) => setState((s) => ({ ...s, push: v }))}
                        />
                    </section>
                </SwitchWrapper>
            </motion.div>
        </div>
    )
}

export default ProfileNotificationsPage
