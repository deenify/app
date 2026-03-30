export type HadithConfigurationsType = {
    arabic: {
        min: number
        max: number
        step: number
        defaultSize: number
        presets: Record<"S" | "M" | "L" | "XL", number>
    }
    english: {
        min: number
        max: number
        step: number
        defaultSize: number
        presets: Record<"S" | "M" | "L" | "XL", number>
    }
}

export type HadithSettingInitialStateType = {
    arabicFontSize: number
    englishFontSize: number
    showArabic: boolean
    showEnglish: boolean
    showChainNotes: boolean
    showTopicChips: boolean
    showInBookReference: boolean
    useArabicFontFamily: boolean
    configurations: HadithConfigurationsType
}

export type HadithSettingStateType = HadithSettingInitialStateType & {
    setArabicFontSize: (value: number) => void
    setEnglishFontSize: (value: number) => void
    setShowArabic: (value: boolean) => void
    setShowEnglish: (value: boolean) => void
    setShowChainNotes: (value: boolean) => void
    setShowTopicChips: (value: boolean) => void
    setShowInBookReference: (value: boolean) => void
    setUseArabicFontFamily: (value: boolean) => void
}
