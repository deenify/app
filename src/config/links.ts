// config/links.ts

import {
  Home, Clock, BookOpen, FileText, Calendar, Compass,
  Hand, User, BookHeart, GraduationCap, Scroll,
} from 'lucide-react';


//  Main navigation links (header, sidebar, etc.) 
export const MenuLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/prayer', label: 'Prayer Times', icon: Clock },
  { href: '/quran', label: 'Quran', icon: BookOpen },
  { href: '/hadith', label: 'Hadith', icon: FileText },
  { href: '/calendar', label: 'Islamic Calendar', icon: Calendar },
  { href: '/qibla', label: 'Qibla Finder', icon: Compass },
  { href: '/dhikr', label: 'Dhikr Counter', icon: Hand },
  { href: '/supplications', label: 'Supplications', icon: BookHeart },
  { href: '/guides', label: 'Guides & Learning', icon: GraduationCap },
  { href: '/history', label: 'Islamic History', icon: Scroll },
  { href: '/profile', label: 'Profile', icon: User },
];


/**
 * Learn section for Islamic education
 */
export const learnLinks = [
  { label: "Islamic History", href: "/learn/islamic-history" },
  { label: "Tajweed", href: "/learn/tajweed" },
  { label: "Purification", href: "/learn/purification" },
  { label: "Fasting", href: "/learn/fasting" },
  { label: "Hajj", href: "/learn/hajj" },
  { label: "Finance", href: "/learn/finance" },
  { label: "Marriage", href: "/learn/marriage" },
  { label: "Halal & Haram", href: "/learn/halal-haram" },
  { label: "Sins & Repentance", href: "/learn/sins-and-repentance" },
  { label: "Gender Interaction", href: "/learn/gender-interaction" },
];

/**
 * User profile and settings related links
 */
export const profileLinks = [
  { label: "My Profile", href: "/profile" },
  { label: "Settings", href: "/settings" },
  { label: "Sign Up", href: "/signup" },
];

/**
 * Footer links: terms, policies, and info
 */
export const footerLinks = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
];

/**
 * External links: socials, contact, and community
 */
export const externalLinks = {
  github: "https://github.com/yourorg/islam-app",
  twitter: "https://twitter.com/islamapp",
  facebook: "https://facebook.com/islamapp",
  youtube: "https://youtube.com/@islamapp",
  contactEmail: "mailto:support@islamapp.com",
};

/**
 * Optional admin panel links (if needed later)
 */
export const adminLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Content Manager", href: "/admin/content" },
];
