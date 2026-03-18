import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type {
    QuranSettingInitialStateType,
    QuranSettingStateType,
} from "./quran.types"


// initial-state 
const defaultState: QuranSettingInitialStateType = {
    // arabic 
    arabicFontSize: 28,
    showArabic: true,
    // transliteration 
    transliterationSize: 16,
    showTransliteration: true,
    // translation 
    translationSize: 18,
    showTranslation: true,
    translationLanguage: "english",
    // audio 
    reciter: "mishary",
    playbackSpeed: 1,
    autoScroll: true,
}

// store-configuration
const useQuranReaderSettingsStore = create<QuranSettingStateType>()(
    persist(
        (set) => ({
            ...defaultState,
            // arabic 
            setArabicFontSize: (value) => set({ arabicFontSize: value }),
            setShowArabic: (value) => set({ showArabic: value }),
            // transliteration 
            setTransliterationSize: (value) => set({ transliterationSize: value }),
            setShowTransliteration: (value) => set({ showTransliteration: value }),
            // translation 
            setTranslationSize: (value) => set({ translationSize: value }),
            setShowTranslation: (value) => set({ showTranslation: value }),
            setTranslationLanguage: (value) => set({ translationLanguage: value }),
            // audio 
            setReciter: (value) => set({ reciter: value }),
            setPlaybackSpeed: (value) => set({ playbackSpeed: value }),
            setAutoScroll: (value) => set({ autoScroll: value }),
        }),
        {
            name: "quran-setting-state",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                // arabic 
                arabicFontSize: state.arabicFontSize,
                showArabic: state.showArabic,
                // transliteration 
                transliterationSize: state.transliterationSize,
                showTransliteration: state.showTransliteration,
                // translation 
                translationSize: state.translationSize,
                showTranslation: state.showTranslation,
                translationLanguage: state.translationLanguage,
                // audio 
                reciter: state.reciter,
                playbackSpeed: state.playbackSpeed,
                autoScroll: state.autoScroll,
            }),
        },
    ),
)


export default useQuranReaderSettingsStore

