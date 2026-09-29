import { BookOpen, HeartHandshake, KeyRound, LockKeyhole, LucideIcon, MailCheck, ShieldCheck, Sparkles, Users } from "lucide-react";


// Sign in highlights
export const SIGNIN_HIGHLIGHTS: { icon: LucideIcon; text: string }[] = [
    {
        icon: BookOpen,
        text: "Resume where you left off in Quran and guides.",
    },
    {
        icon: HeartHandshake,
        text: "Stay connected with your faith habits every day.",
    },
    {
        icon: ShieldCheck,
        text: "Private and secure account access for your progress.",
    },
]


// Register highlights
export const REGISTER_HIGHLIGHTS: { icon: LucideIcon; text: string }[] = [
    {
        icon: Sparkles,
        text: "One profile—Quran, Hadith, and habits synced everywhere.",
    },
    {
        icon: Users,
        text: "Build routines that fit your life and stay consistent.",
    },
    {
        icon: ShieldCheck,
        text: "Private sign-up—you control what you save and share.",
    },
]


// Forgot password highlights
export const FORGOT_PASSWORD_HIGHLIGHTS: { icon: LucideIcon; text: string }[] = [
    {
        icon: MailCheck,
        text: "We email a secure reset link that expires shortly.",
    },
    {
        icon: ShieldCheck,
        text: "Your reading progress and settings stay untouched.",
    },
    {
        icon: LockKeyhole,
        text: "Only you can set a new password from that link.",
    },
]


// Reset password highlights
export const RESET_PASSWORD_HIGHLIGHTS: { icon: LucideIcon; text: string }[] = [
    {
        icon: KeyRound,
        text: "Choose a strong password you have not used here before.",
    },
    {
        icon: ShieldCheck,
        text: "You will be signed out of other sessions for safety.",
    },
    {
        icon: LockKeyhole,
        text: "After saving, sign in again with your new password.",
    },
]
