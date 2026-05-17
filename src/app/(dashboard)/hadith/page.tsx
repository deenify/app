import HadithExploreSection from "@/components/pages/dashboard/hadith/HadithExploreSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Hadith" },
    description: `Explore the Hadith and learn about its meaning and teachings 
    in a simple and easy to understand way.`,
}

const HadithPage = () => {
    return (
        <div>
            <HadithExploreSection />
        </div>
    )
}

export default HadithPage
