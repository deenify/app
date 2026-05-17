// app/(pages)/quran/page.tsx 

import QuranExploreSection from "../../../components/pages/dashboard/quran/QuranExploreSection"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: { absolute: "Deenify - Quran" },
    description: `Explore the Quran and learn about its meaning and teachings in a simple and easy to understand way.`,
}

const QuranPage = () => {
    return (
        <div>
            <QuranExploreSection />
        </div>
    )
}

export default QuranPage
