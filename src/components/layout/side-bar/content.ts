
import {
    Home, Clock,
    BookOpen, FileText,
    Calendar, Compass, Hand, User,
    BookHeart, GraduationCap,
    Scroll, Users, Star, Target,
    Heart, Flame, HelpCircle, Gift
} from 'lucide-react';

export const sidebarSections = [
    {
        title: 'Main',
        items: [
            { href: '/', label: 'Dashboard', icon: Home },
            { href: '/prayer', label: 'Prayer Times', icon: Clock },
            { href: '/quran', label: 'Quran', icon: BookOpen },
            { href: '/hadith', label: 'Hadith', icon: FileText },
            { href: '/calendar', label: 'Calendar', icon: Calendar },
            { href: '/qibla', label: 'Qibla Finder', icon: Compass },
            { href: '/dhikr', label: 'Dhikr Counter', icon: Hand },
        ],
    },
    {
        title: 'Learn',
        items: [
            { href: '/supplications', label: 'Supplications', icon: BookHeart },
            { href: '/guides', label: 'Islamic Guides', icon: GraduationCap },
            { href: '/history', label: 'Islamic History', icon: Scroll },
            { href: '/prophets', label: 'Prophetic Chain', icon: Users },
            { href: '/miracles', label: 'Islamic Miracles', icon: Star },
            { href: '/stories', label: 'Prophetic Stories', icon: Heart },
            { href: '/pillars', label: 'Five Pillars', icon: Target },
            { href: '/revert', label: 'Becoming Muslim', icon: Flame },
        ],
    },
    {
        title: 'Support',
        items: [
            { href: '/support', label: 'Support Center', icon: HelpCircle },
            { href: '/donate', label: 'Donate', icon: Gift },
        ],
    },
    {
        title: 'Account',
        items: [
            { href: '/profile', label: 'Profile', icon: User },
        ],
    },
];