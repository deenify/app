"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User } from "lucide-react"
import FilterDropdown from "@/components/shared/FilterDropdown"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
                <Card className="border-layout-separator">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                            <User className="h-4 w-4" strokeWidth={2} />
                        </span>
                        Profile details
                    </CardTitle>
                    <CardDescription>Basics, contact, and Islamic preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
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
                                    onChange={(value) => {
                                        setUser((prev) => ({ ...prev, [field]: String(value) }))
                                    }}
                                    placeholder={`Select ${label.toLowerCase()}`}
                                    triggerIcon={triggerIcon}
                                    theme={theme as "emerald" | "blue" | "purple" | "amber" | "slate"}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-5">
                        <Button
                            type="button"
                            variant="secondary"
                            shouldScale
                            onClick={() => {
                                setUser({ ...accountInitialValues })
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="default-blue"
                            shouldScale disabled={saving}
                            onClick={handleSave}
                        >
                            {saving ? "Saving…" : "Save changes"}
                        </Button>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default ProfileAccountPage
