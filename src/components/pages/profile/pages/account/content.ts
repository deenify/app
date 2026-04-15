import { Compass, Landmark, MapPin, MoonStar } from "lucide-react"
import { profileHeaderContent } from "../../content"


// Input Fields 
export const accountInputFields = [
    { id: "name", label: "Full name", field: "name", type: "text" },
    { id: "email", label: "Email", field: "email", type: "email" },
    { id: "phone", label: "Phone", field: "phone", type: "text" },
] as const


// Initial Values 
export const accountInitialValues = {
    name: profileHeaderContent.name,
    email: profileHeaderContent.email,
    phone: "+1 234 567 8900",
    location: profileHeaderContent.location,
    madhab: profileHeaderContent.madhab,
    prayerMethod: profileHeaderContent.prayerMethod,
} as const


// Select Fields 
export const accountSelectFields = [
    {
        id: "location",
        label: "Location",
        field: "location" as const,
        theme: "blue",
        triggerIcon: Compass,
        options: [
            { value: "New York, USA", label: "New York, USA", icon: MapPin },
            { value: "London, UK", label: "London, UK", icon: MapPin },
            { value: "Istanbul, Turkey", label: "Istanbul, Turkey", icon: MapPin },
            { value: "Dubai, UAE", label: "Dubai, UAE", icon: MapPin },
        ],
    },
    {
        id: "madhab",
        label: "Madhab",
        field: "madhab" as const,
        theme: "purple",
        triggerIcon: Landmark,
        options: [
            { value: "Hanafi", label: "Hanafi", icon: Landmark },
            { value: "Shafi'i", label: "Shafi'i", icon: Landmark },
            { value: "Maliki", label: "Maliki", icon: Landmark },
            { value: "Hanbali", label: "Hanbali", icon: Landmark },
        ],
    },
    {
        id: "prayer",
        label: "Prayer calculation",
        field: "prayerMethod" as const,
        theme: "emerald",
        triggerIcon: MoonStar,
        options: [
            { value: "ISNA", label: "ISNA", icon: MoonStar },
            { value: "MWL", label: "Muslim World League", icon: MoonStar },
            { value: "Egypt", label: "Egyptian General Authority", icon: MoonStar },
            { value: "UmmAlQura", label: "Umm al-Qura, Makkah", icon: MoonStar },
            { value: "Karachi", label: "University of Karachi", icon: MoonStar },
        ],
    },
] as const

