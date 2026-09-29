"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Key, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SwitchWrapper from "../../generic/SwitchWrapper"
import SwitchItem from "../../generic/SwitchItem"

const ProfileSecurityPage = () => {
    const [twoFactor, setTwoFactor] = useState(false)
    const [biometric, setBiometric] = useState(true)
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
                    variant="red"
                    classNames={{ buttonsWrapper: "justify-end", }}
                    cardHeader={{
                        title: "Sign-in & devices",
                        description: "Strong defaults, optional hardening.",
                        icon: Shield,
                    }}
                    buttonSection={{
                        visible: true,
                        primaryButton: {
                            label: "Save security",
                            onClick: handleSave,
                            buttonProps: { disabled: saving, variant: "default-red" },
                        },
                        secondaryButton: {
                            label: "Cancel",
                            onClick: () => { },
                            buttonProps: { variant: "secondary" },
                        },
                    }}
                >
                    <section className="space-y-3">
                        <SwitchItem
                            variant="red"
                            title="Two-factor authentication"
                            description="Require a second factor on new devices."
                            icon={Lock}
                            checked={twoFactor}
                            onCheckedChange={setTwoFactor}
                        />
                        <SwitchItem
                            variant="red"
                            title="Biometric unlock"
                            description="Use device biometrics when available."
                            icon={Key}
                            checked={biometric}
                            onCheckedChange={setBiometric}
                        />
                    </section>

                    <section>
                        <form
                            method="POST"
                            onSubmit={() => { }}
                            className="space-y-3 rounded-md border border-gray-200 bg-white p-4"
                        >
                            <p className="text-sm font-medium text-gray-900">Change password</p>
                            <Input className="rounded-md" type="password" placeholder="Current password" autoComplete="current-password" />
                            <Input className="rounded-md" type="password" placeholder="New password" autoComplete="new-password" />
                            <Input className="rounded-md" type="password" placeholder="Confirm new password" autoComplete="new-password" />
                            <Button type="button" variant="destructive" shouldScale className="w-full sm:w-auto">
                                Update password
                            </Button>
                        </form>
                    </section>
                </SwitchWrapper>
            </motion.div>
        </div>
    )
}

export default ProfileSecurityPage
