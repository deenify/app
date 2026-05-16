import {
    Bell, Palette, Sun, Moon, Volume2,
    VolumeX, Shield, User, Mail, Smartphone,
    ChevronRight, LucideIcon
} from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/clsx'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface SettingsListItemProps {
    icon: LucideIcon
    label: string
    description: string
    handleWithSwitch?: boolean
    checked?: boolean
    onSwitchChange?: (checked: boolean) => void
    switchSize?: "sm" | "md" | "lg"
    switchVariant?: "default" | "faded"
    switchDisabled?: boolean
    href?: string
    onClick?: () => void
    disabled?: boolean
}

const SettingsList = () => {
    const router = useRouter()

    // State management for all toggles
    const [lightMode, setLightMode] = React.useState(true)
    const [darkMode, setDarkMode] = React.useState(false)
    const [prayerAlerts, setPrayerAlerts] = React.useState(true)
    const [emailNotifications, setEmailNotifications] = React.useState(false)
    const [pushNotifications, setPushNotifications] = React.useState(true)
    const [adhanSound, setAdhanSound] = React.useState(true)
    const [muteAllSounds, setMuteAllSounds] = React.useState(false)

    const isSmDown = useBreakpoint("sm", "down")

    return (
        <div className="p-3 sm:p-4">
            {/* Quick Settings */}
            <div className="mb-5">
                <h3 className="text-base font-heading font-medium text-gray-900 tracking-tighter">Quick Settings</h3>
                <p className="text-xs text-gray-500">Customize your app experience</p>
            </div>

            {/* Appearance */}
            <div  >
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Palette className="h-4 w-4 text-emerald-600" />
                    Appearance
                </h3>
                <div className="space-y-2">
                    <SettingsListItem
                        icon={Sun}
                        label="Light Mode"
                        description="Use light theme"
                        handleWithSwitch
                        checked={lightMode}
                        onSwitchChange={setLightMode}
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                    <SettingsListItem
                        icon={Moon}
                        label="Dark Mode"
                        description="Use dark theme"
                        handleWithSwitch
                        checked={darkMode}
                        onSwitchChange={setDarkMode}
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                </div>
            </div>

            <div className="border-t border-layout-separator mt-4 mb-5" />

            {/* Notifications */}
            <div  >
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Bell className="h-4 w-4 text-emerald-600" />
                    Notifications
                </h3>
                <div className="space-y-2">
                    <SettingsListItem
                        icon={Bell}
                        label="Prayer Time Alerts"
                        description="Get notified for prayer times"
                        handleWithSwitch
                        checked={prayerAlerts}
                        onSwitchChange={setPrayerAlerts}
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                    <SettingsListItem
                        icon={Mail}
                        label="Email Notifications"
                        description="Receive updates via email"
                        handleWithSwitch
                        checked={emailNotifications}
                        onSwitchChange={setEmailNotifications}
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                    <SettingsListItem
                        icon={Smartphone}
                        label="Push Notifications"
                        description="Enable push notifications"
                        handleWithSwitch
                        checked={pushNotifications}
                        onSwitchChange={setPushNotifications}
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                </div>
            </div>

            <div className="border-t border-layout-separator mt-4 mb-5" />

            {/* Sound & Media */}
            <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Volume2 className="h-4 w-4 text-emerald-600" />
                    Sound & Media
                </h3>
                <div className="space-y-2">
                    <SettingsListItem
                        icon={Volume2}
                        label="Adhan Sound"
                        description="Play adhan for prayer times"
                        handleWithSwitch
                        checked={adhanSound}
                        onSwitchChange={setAdhanSound}
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                    <SettingsListItem
                        icon={VolumeX}
                        label="Mute All Sounds"
                        description="Disable all audio"
                        handleWithSwitch
                        checked={muteAllSounds}
                        onSwitchChange={setMuteAllSounds}
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                </div>
            </div>

            <div className="border-t border-layout-separator mt-4 mb-5" />

            {/* Privacy & Security */}
            <div>
                <h3 className="text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2 tracking-tighter">
                    <Shield className="h-4 w-4 text-emerald-600" />
                    Privacy & Security
                </h3>
                <div className="space-y-2">
                    <SettingsListItem
                        icon={User}
                        label="Privacy Settings"
                        description="Manage your privacy"
                        href="/settings/privacy"
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                    <SettingsListItem
                        icon={Shield}
                        label="Security"
                        description="Account security options"
                        href="/settings/security"
                        switchSize={isSmDown ? "sm" : "md"}
                    />
                </div>
            </div>
        </div>
    )
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({
    icon: Icon,
    label,
    description,
    handleWithSwitch = false,
    checked,
    onSwitchChange,
    switchSize = "md",
    switchVariant = "default",
    switchDisabled = false,
    href,
    onClick,
    disabled = false,
}) => {
    const router = useRouter()

    const handleClick = () => {
        if (disabled) return
        if (href) {
            router.push(href)
        } else if (onClick) {
            onClick()
        }
    }

    if (handleWithSwitch) {
        return (
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 group transition-colors">
                {/* Left: Icon */}
                <div className={cn(
                    "h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                    checked ? "bg-emerald-100 group-hover:bg-emerald-100/80" : "bg-gray-100 group-hover:bg-gray-200"
                )}>
                    <Icon className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5 transition-colors",
                        checked ? "text-emerald-600" : "text-gray-500"
                    )} />
                </div>

                {/* Center: Title and Description */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                        <p className="text-[13px] sm:text-sm font-medium text-gray-900 truncate">{label}</p>
                        <Switch
                            checked={checked}
                            onCheckedChange={onSwitchChange}
                            disabled={switchDisabled}
                            size={switchSize}
                            variant={switchVariant}
                            className="flex-shrink-0"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        {description}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <Button
            onClick={handleClick}
            disabled={disabled}
            variant="ghost"
            className="w-full justify-between p-3 h-auto rounded-lg text-left group"
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gray-100 group-hover:bg-gray-200 
                transition-colors flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] sm:text-sm font-medium text-gray-900 truncate">{label}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{description}</p>
                </div>
            </div>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
        </Button>
    )
}

export default SettingsList
