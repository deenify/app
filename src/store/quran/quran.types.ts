export type QuranSettingInitialStateType = {
    // arabic 
    arabicFontSize: number
    showArabic: boolean
    // transliteration 
    transliterationSize: number
    showTransliteration: boolean
    // translation 
    translationSize: number
    showTranslation: boolean
    translationLanguage: string
    // audio 
    reciter: string
    playbackSpeed: number
    autoScroll: boolean
}

export type QuranSettingStateActionsType = {
    // arabic 
    setArabicFontSize: (value: number) => void
    setShowArabic: (value: boolean) => void
    // transliteration 
    setTransliterationSize: (value: number) => void
    setShowTransliteration: (value: boolean) => void
    // translation 
    setTranslationSize: (value: number) => void
    setShowTranslation: (value: boolean) => void
    setTranslationLanguage: (value: string) => void
    // audio 
    setReciter: (value: string) => void
    setPlaybackSpeed: (value: number) => void
    setAutoScroll: (value: boolean) => void
}

export type QuranSettingStateType = QuranSettingInitialStateType & QuranSettingStateActionsType

