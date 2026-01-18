import { Bell, Palette, Sun, Moon, Volume2, VolumeX, Shield, User, Mail, Smartphone, ChevronRight } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SettingToggleProps {
    icon: React.ElementType
    label: string
    description: string
    checked: boolean
    onChange: () => void
}

interface SettingItemProps {
    icon: React.ElementType
    label: string
    description: string
    onClick: () => void
}

const SettingsList = () => {
    const router = useRouter()

    return (
        <div className="p-3 sm:p-4">
            {/* Appearance */}
            <div className="pb-6">
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Palette className="h-4 w-4 text-emerald-600" />
                    Appearance
                </h3>
                <div className="space-y-2">
                    <SettingToggle
                        icon={Sun}
                        label="Light Mode"
                        description="Use light theme"
                        checked={true}
                        onChange={() => { }}
                    />
                    <SettingToggle
                        icon={Moon}
                        label="Dark Mode"
                        description="Use dark theme"
                        checked={false}
                        onChange={() => { }}
                    />
                </div>
            </div>

            <div className="border-t border-layout-separator mb-6" />

            {/* Notifications */}
            <div className="pb-6">
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Bell className="h-4 w-4 text-emerald-600" />
                    Notifications
                </h3>
                <div className="space-y-2">
                    <SettingToggle
                        icon={Bell}
                        label="Prayer Time Alerts"
                        description="Get notified for prayer times"
                        checked={true}
                        onChange={() => { }}
                    />
                    <SettingToggle
                        icon={Mail}
                        label="Email Notifications"
                        description="Receive updates via email"
                        checked={false}
                        onChange={() => { }}
                    />
                    <SettingToggle
                        icon={Smartphone}
                        label="Push Notifications"
                        description="Enable push notifications"
                        checked={true}
                        onChange={() => { }}
                    />
                </div>
            </div>

            <div className="border-t border-layout-separator mb-6" />

            {/* Sound & Media */}
            <div className="pb-6">
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Volume2 className="h-4 w-4 text-emerald-600" />
                    Sound & Media
                </h3>
                <div className="space-y-2">
                    <SettingToggle
                        icon={Volume2}
                        label="Adhan Sound"
                        description="Play adhan for prayer times"
                        checked={true}
                        onChange={() => { }}
                    />
                    <SettingToggle
                        icon={VolumeX}
                        label="Mute All Sounds"
                        description="Disable all audio"
                        checked={false}
                        onChange={() => { }}
                    />
                </div>
            </div>

            <div className="border-t border-layout-separator mb-6" />

            {/* Privacy & Security */}
            <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    Privacy & Security
                </h3>
                <div className="space-y-2">
                    <SettingItem
                        icon={User}
                        label="Privacy Settings"
                        description="Manage your privacy"
                        onClick={() => router.push("/settings/privacy")}
                    />
                    <SettingItem
                        icon={Shield}
                        label="Security"
                        description="Account security options"
                        onClick={() => router.push("/settings/security")}
                    />
                </div>
            </div>
        </div>
    )
}


// Setting Components
interface SettingToggleProps {
    icon: React.ElementType
    label: string
    description: string
    checked: boolean
    onChange: () => void
}

const SettingToggle: React.FC<SettingToggleProps> = ({ icon: Icon, label, description, checked, onChange }) => {
    return (
        <div className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-100 group transition-colors">
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={cn(
                    "mt-1 h-8 w-8 rounded-md sm:h-10 sm:w-10 sm:rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                    checked ? "bg-emerald-100 group-hover:bg-emerald-100/50" : "bg-gray-100 group-hover:bg-gray-200"
                )}>
                    <Icon className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5 transition-colors",
                        checked ? "text-emerald-600" : "text-gray-500 group-hover:text-gray-500"
                    )} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[13px] sm:text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{description}</p>
                </div>
            </div>
            <button
                onClick={onChange}
                className={cn(
                    "relative inline-flex h-6 w-10 sm:h-6 sm:w-11 items-center rounded-full transition-colors flex-shrink-0 mt-0.5",
                    checked ? "bg-emerald-600" : "bg-gray-300"
                )}
            >
                <span
                    className={cn(
                        "inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform",
                        checked ? "translate-x-4 sm:translate-x-6" : "translate-x-0.5 sm:translate-x-1"
                    )}
                />
            </button>
        </div>
    )
}


interface SettingItemProps {
    icon: React.ElementType
    label: string
    description: string
    onClick: () => void
}

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, description, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors text-left group"
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gray-100 group-hover:bg-gray-200 
                transition-colors flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] sm:text-sm font-medium text-gray-900 truncate">{label}</p>
                    <p className="text-xs text-gray-500 truncate">{description}</p>
                </div>
            </div>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
        </button>
    )
}

export default SettingsList


