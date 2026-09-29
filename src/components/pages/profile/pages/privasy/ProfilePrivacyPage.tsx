"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, BookOpen, Eye, MessageCircle, Users } from "lucide-react"
import SwitchWrapper from "../../generic/SwitchWrapper"
import SwitchItem from "../../generic/SwitchItem"

const ProfilePrivacyPage = () => {
    const [state, setState] = useState({
        profileVisibility: true,
        showPrayerStats: true,
        showReadingProgress: false,
        allowMessages: true,
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
                    variant="purple"
                    classNames={{ buttonsWrapper: "justify-end pt-5" }}
                    cardHeader={{
                        title: "Visibility",
                        description: "Who sees your profile signals and progress.",
                        icon: Eye,
                    }}
                    buttonSection={{
                        visible: true,
                        primaryButton: {
                            label: saving ? "Saving…" : "Save privacy",
                            onClick: handleSave,
                            buttonProps: { disabled: saving, variant: "default-purple" },
                        },
                        secondaryButton: {
                            label: "Reset",
                            onClick: () => setState({ profileVisibility: true, showPrayerStats: true, showReadingProgress: false, allowMessages: true }),
                            buttonProps: { variant: "secondary" },
                        },
                    }}
                >
                    <section className="space-y-3">
                        <SwitchItem
                            variant="purple"
                            title="Profile visibility"
                            description="Allow other members to view your public profile card."
                            icon={Users}
                            checked={state.profileVisibility}
                            onCheckedChange={(v) => setState((s) => ({ ...s, profileVisibility: v }))}
                        />
                        <SwitchItem
                            variant="purple"
                            title="Prayer statistics"
                            description="Show aggregate prayer consistency on your profile."
                            icon={BarChart3}
                            checked={state.showPrayerStats}
                            onCheckedChange={(v) => setState((s) => ({ ...s, showPrayerStats: v }))}
                        />
                        <SwitchItem
                            variant="purple"
                            title="Reading progress"
                            description="Share Quran reading milestones with trusted circles."
                            icon={BookOpen}
                            checked={state.showReadingProgress}
                            onCheckedChange={(v) => setState((s) => ({ ...s, showReadingProgress: v }))}
                        />
                        <SwitchItem
                            variant="purple"
                            title="Direct messages"
                            description="Let people reach you inside the product."
                            icon={MessageCircle}
                            checked={state.allowMessages}
                            onCheckedChange={(v) => setState((s) => ({ ...s, allowMessages: v }))}
                        />
                    </section>
                </SwitchWrapper>
            </motion.div>
        </div>
    )
}

export default ProfilePrivacyPage
