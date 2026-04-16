"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import FilterDropdown from "@/components/shared/FilterDropdown"
import { Input } from "@/components/ui/input"
import SwitchWrapper from "../../generic/SwitchWrapper"
import {
    accountInitialValues,
    accountInputFields,
    accountSelectFields,
} from "./content"

type AccountFormValues = {
    name: string
    email: string
    phone: string
    location: string
    madhab: string
    prayerMethod: string
}

const ProfileAccountPage = () => {
    const [user, setUser] = useState<AccountFormValues>({ ...accountInitialValues })
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
                <SwitchWrapper
                    variant="blue"
                    classNames={{ buttonsWrapper: "justify-end pt-5" }}
                    cardHeader={{
                        title: "Profile details",
                        description: "Basics, contact, and Islamic preferences.",
                        icon: User,
                    }}
                    buttonSection={{
                        visible: true,
                        primaryButton: {
                            label: saving ? "Saving…" : "Save changes",
                            onClick: handleSave,
                            buttonProps: { disabled: saving, variant: "default-blue" },
                        },
                        secondaryButton: {
                            label: "Cancel",
                            onClick: () => setUser({ ...accountInitialValues }),
                            buttonProps: { variant: "secondary" },
                        },
                    }}
                >
                    <section className="grid gap-5 sm:grid-cols-2">
                        {accountInputFields.map(({ id, label, field, type }) => (
                            <div key={id} className="space-y-2">
                                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                                    {label}
                                </label>
                                <Input
                                    id={id}
                                    type={type}
                                    value={user[field]}
                                    onChange={(e) => setUser((prev) => ({ ...prev, [field]: e.target.value }))}
                                />
                            </div>
                        ))}

                        {accountSelectFields.map(({ id, label, field, theme, triggerIcon, options }) => (
                            <div key={id} className="space-y-2">
                                <label htmlFor={id} className="text-sm font-medium text-gray-700">
                                    {label}
                                </label>
                                <FilterDropdown
                                    options={[...options]}
                                    value={user[field]}
                                    onChange={(value) => setUser((prev) => ({ ...prev, [field]: String(value) }))}
                                    placeholder={`Select ${label.toLowerCase()}`}
                                    triggerIcon={triggerIcon}
                                    theme={theme as "emerald" | "blue" | "purple" | "amber" | "slate"}
                                    classNames={{ triggerButton: "h-10" }}
                                />
                            </div>
                        ))}
                    </section>
                </SwitchWrapper>
            </motion.div>
        </div>
    )
}

export default ProfileAccountPage
