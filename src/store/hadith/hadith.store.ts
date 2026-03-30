import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { HadithSettingInitialStateType, HadithSettingStateType } from "./hadith.types"

const defaultState: HadithSettingInitialStateType = {
    arabicFontSize: 22,
    englishFontSize: 18,
    showArabic: true,
    showEnglish: true,
    showChainNotes: true,
    showTopicChips: true,
    showInBookReference: true,
    useArabicFontFamily: true,
    configurations: {
        arabic: {
            min: 17,
            max: 32,
            step: 1,
            defaultSize: 22,
            presets: { S: 18, M: 22, L: 26, XL: 30 },
        },
        english: {
            min: 14,
            max: 22,
            step: 1,
            defaultSize: 18,
            presets: { S: 15, M: 18, L: 20, XL: 22 },
        },
    },
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
