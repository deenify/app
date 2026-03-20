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

    // configurations
    configurations: {
        arabic: {
            min: 16,
            max: 44,
            step: 1,
            defaultSize: 28,
            presets: { S: 20, M: 28, L: 36, XL: 44, },
            preview: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        },
        transliteration: {
            min: 12,
            max: 18,
            step: 1,
            defaultSize: 16,
            presets: { S: 12, M: 14, L: 16, XL: 18, },
            preview: "Bismillāhi r-raḥmāni r-raḥīm",
        },
        translation: {
            min: 14,
            max: 20,
            step: 1,
            defaultSize: 18,
            presets: { S: 14, M: 16, L: 18, XL: 20, },
            preview: "In the name of Allah, the Most Gracious, the Most Merciful.",
        },
        audio: {
            defaultReciter: "mishary",
            defaultPlaybackSpeed: 1,
            defaultAutoScroll: true,
            presets: { S: 1, M: 1.25, L: 1.5, XL: 1.75, },
            reciters: [
                { id: "mishary", label: "Mishary Rashid" },
                { id: "basit", label: "Abdul Basit" },
                { id: "maher", label: "Maher Al-Muaiqly" },
                { id: "saad", label: "Saad Al-Ghamdi" },
            ],
        },
    },
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

