import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { HadithSettingInitialStateType, HadithSettingStateType } from "./hadith.types"

const defaultState: HadithSettingInitialStateType = {
    arabicFontSize: 20,
    englishFontSize: 18,
    showArabic: true,
    showEnglish: true,
    showChainNotes: true,
    showTopicChips: true,
    showInBookReference: true,
    useArabicFontFamily: true,
    configurations: {
        arabic: {
            min: 18,
            max: 34,
            step: 1,
            defaultSize: 24,
            presets: { S: 20, M: 24, L: 28, XL: 32, },
            preview: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        },
        english: {
            min: 14,
            max: 24,
            step: 1,
            defaultSize: 18,
            presets: { S: 16, M: 18, L: 20, XL: 22, },
            preview: "In the name of Allah, the Most Gracious, the Most Merciful.",
        }
    },
    selectedTopicId: null,
}

const useHadithReaderSettingsStore = create<HadithSettingStateType>()(
    persist(
        (set) => ({
            ...defaultState,
            setArabicFontSize: (value) => set({ arabicFontSize: value }),
            setEnglishFontSize: (value) => set({ englishFontSize: value }),
            setShowArabic: (value) => set({ showArabic: value }),
            setShowEnglish: (value) => set({ showEnglish: value }),
            setShowChainNotes: (value) => set({ showChainNotes: value }),
            setShowTopicChips: (value) => set({ showTopicChips: value }),
            setShowInBookReference: (value) => set({ showInBookReference: value }),
            setUseArabicFontFamily: (value) => set({ useArabicFontFamily: value }),
            setSelectedTopicId: (id) => set({ selectedTopicId: id }),
        }),
        {
            name: "hadith-reader-settings",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                arabicFontSize: state.arabicFontSize,
                englishFontSize: state.englishFontSize,
                showArabic: state.showArabic,
                showEnglish: state.showEnglish,
                showChainNotes: state.showChainNotes,
                showTopicChips: state.showTopicChips,
                showInBookReference: state.showInBookReference,
                useArabicFontFamily: state.useArabicFontFamily,
            }),
        },
    ),
)

export default useHadithReaderSettingsStore
