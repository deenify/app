import { Check } from 'lucide-react'
import React from 'react'
import { LANGUAGES } from './content'
import { cn } from '@/lib/utils/clsx'

interface LanguageListProps {
    selectedLanguage: string
    setSelectedLanguage: (language: string) => void
}

const LanguageList = ({ selectedLanguage, setSelectedLanguage }: LanguageListProps) => {
    return (
        <div className="p-3 sm:p-4">
            <div className="mb-4">
                <h3 className="text-base font-heading font-medium text-gray-900 tracking-tighter">Select Language</h3>
                <p className="text-[10px] sm:text-xs text-gray-500">Choose your preferred language</p>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
                {LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang.code
                    return (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setSelectedLanguage(lang.code)
                                console.log("Language changed to:", lang.code)
                            }}
                            className={cn(
                                "w-full flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors text-left",
                                isSelected
                                    ? "bg-emerald-50 text-emerald-900"
                                    : "text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            <span className="text-xl sm:text-2xl flex-shrink-0">{lang.flag}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium truncate">{lang.name}</p>
                                <p className="text-[10px] sm:text-xs text-gray-500">{lang.code.toUpperCase()}</p>
                            </div>
                            {isSelected && (
                                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default LanguageList