import {
    Compass, FileText, BookOpen, Calendar, Star, Users, Target, Heart, Shield, Smartphone,
    Globe, Award, TrendingUp, Flame, LucideIcon,
    Clock
} from "lucide-react"

// Hero section
export type HeroCommunityStatType = {
    value: string
    label: string
}
export const HeroCommunityStats: HeroCommunityStatType[] = [
    { value: "10M+", label: "Active Users Worldwide" },
    { value: "50+", label: "Countries Supported" },
    { value: "4.9/5", label: "Average User Rating" },
    { value: "1M+", label: "Daily Prayer Notifications" },
]


// Features section
export type FeaturesSectionFeatureType = {
    icon: LucideIcon
    title: string
    description: string
}
export const FeaturesSectionFeatures: FeaturesSectionFeatureType[] = [
    {
        icon: Clock,
        title: "Accurate Prayer Times",
        description: "Get precise prayer times based on your location with multiple calculation methods.",
    },
    {
        icon: BookOpen,
        title: "Complete Quran",
        description: "Read, search, and bookmark verses with translations in multiple languages.",
    },
    {
        icon: Compass,
        title: "Qibla Direction",
        description: "Find the direction to Mecca from anywhere in the world with our compass.",
    },
    {
        icon: FileText,
        title: "Authentic Hadith",
        description: "Access verified collections of Hadith from Sahih al-Bukhari and Muslim.",
    },
    {
        icon: Calendar,
        title: "Islamic Calendar",
        description: "Stay updated with Hijri dates and important Islamic occasions.",
    },
    {
        icon: Star,
        title: "Dhikr Counter",
        description: "Track your daily remembrance of Allah with customizable goals.",
    },
]


// Your-progress section 

// tracking-activity points 
export type YourProgressTrackingPointStatType = {
    icon: LucideIcon
    label: string
    value: number
    bgColor: string
    iconColor: string
}
export const YourProgressTrackingPointStats: YourProgressTrackingPointStatType[] = [
    { icon: Flame, label: "Day Streak", value: 7, bgColor: "bg-orange-100", iconColor: "text-orange-600" },
    { icon: Award, label: "Total Points", value: 842, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
    { icon: TrendingUp, label: "Global Rank", value: 142, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
    { icon: Target, label: "Achievements", value: 12, bgColor: "bg-emerald-100", iconColor: "text-emerald-600" },
]


// weekly-activity charts 
export type YourProgressWeeklyActivityType = {
    day: string
    prayers: number
    quran: number
    dhikr: number
}
export const YourProgressWeeklyActivity: YourProgressWeeklyActivityType[] = [
    { day: "Mon", prayers: 5, quran: 3, dhikr: 100 },
]

// activity-distribution charts 
export type YourProgressActivityDistributionType = {
    name: string
    value: number
    color: string
}
export const YourProgressActivityDistribution: YourProgressActivityDistributionType[] = [
    { name: "Prayers", value: 35, color: "#10b981" },
    { name: "Quran", value: 28, color: "#3b82f6" },
    { name: "Dhikr", value: 25, color: "#8b5cf6" },
    { name: "Duas", value: 12, color: "#f59e0b" },
]

// today-goals charts 
export type YourProgressTodayGoalType = {
    label: string
    current: number
    total: number
    value: number
}
export const YourProgressTodayGoals: YourProgressTodayGoalType[] = [
    { label: "Prayers Completed", current: 3, total: 5, value: 60 },
]


// learn-grow section 
export type LearnGrowPageType = {
    icon: LucideIcon
    title: string
    desc: string
    bgColor: string
    iconColor: string
    slug: string
}
export const LearnGrowPages: LearnGrowPageType[] = [
    { icon: BookOpen, title: "Total Books", desc: "Total Books", bgColor: "bg-purple-100", iconColor: "text-purple-600", slug: "total-books" },
    { icon: Users, title: "Total Users", desc: "Total Users", bgColor: "bg-blue-100", iconColor: "text-blue-600", slug: "total-users" },
    { icon: TrendingUp, title: "Total Views", desc: "Total Views", bgColor: "bg-emerald-100", iconColor: "text-emerald-600", slug: "total-views" },
]



// Testimonial section  
export type TestimonialType = {
    name: string
    location: string
    avatar: string
    rating: number
    text: string
}
export const TESTIMONIALS: TestimonialType[] = [
    {
        name: "Ahmed Hassan",
        location: "Dubai, UAE",
        avatar: "AH",
        rating: 5,
        text: "This app has transformed my daily routine. The prayer time notifications are accurate, and the Quran reader is beautifully designed. May Allah reward the developers!",
    },
    {
        name: "Fatima Zahra",
        location: "London, UK",
        avatar: "FZ",
        rating: 5,
        text: "As a busy professional, this app helps me stay connected to my faith. The Dhikr counter and Hadith collections are my favorite features.",
    },
    {
        name: "Muhammad Ibrahim",
        location: "Jakarta, Indonesia",
        avatar: "MI",
        rating: 5,
        text: "The most comprehensive Islamic app I have ever used. The interface is clean, and everything works seamlessly. Highly recommended!",
    },
    {
        name: "Aisha Rahman",
        location: "Toronto, Canada",
        avatar: "AR",
        rating: 5,
        text: "The Quran reading feature with bookmarks has helped me stay consistent with my daily recitation. Truly a blessing for Muslims everywhere.",
    },
    {
        name: "Omar Abdullah",
        location: "Riyadh, Saudi Arabia",
        avatar: "OA",
        rating: 5,
        text: "Excellent resource for learning about Islam. The Hadith collections are authentic and the guides are very helpful for new Muslims.",
    },
    {
        name: "Zainab Malik",
        location: "Sydney, Australia",
        avatar: "ZM",
        rating: 5,
        text: "A beautiful and user-friendly app. The Islamic calendar and Qibla finder are incredibly accurate. May Allah bless this project!",
    },
]



// Why-Choose-Us section  

// Why-Choose-Us features  
export type WhyChooseUsFeatureType = string
export const WhyChooseUsFeatures: WhyChooseUsFeatureType[] = [
    "Customizable prayer notifications",
    "Offline access to Quran",
    "Dark mode support",
    "Multiple language support",
    "Sync across devices",
    "Ad-free experience",
]

// Why-Choose-Us stats  
export type WhyChooseUsStatType = {
    icon: LucideIcon
    title: string
    desc: string
}
export const WhyChooseUsStats: WhyChooseUsStatType[] = [
    {
        icon: Shield,
        title: "Verified Content",
        desc: "All Hadith and Islamic content verified by scholars",
    },
    {
        icon: Smartphone,
        title: "Mobile First",
        desc: "Optimized for all devices and screen sizes",
    },
    {
        icon: Globe,
        title: "Global Access",
        desc: "Works anywhere in the world with offline support",
    },
    {
        icon: Users,
        title: "Community",
        desc: "Join a thriving community of believers",
    },
]