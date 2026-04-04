"use client"

import React from 'react'
import Link from 'next/link'
import { Moon, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const quickLinks = [
        { label: 'Prayer Times', page: '/prayer' },
        { label: 'Quran', page: '/quran' },
        { label: 'Hadith', page: '/hadith' },
        { label: 'Calendar', page: '/calendar' },
        { label: 'Qibla Finder', page: '/qibla' },
        { label: 'Dhikr Counter', page: '/dhikr' },
    ]

    const resources = [
        { label: 'Supplications', page: '/supplications' },
        { label: 'Guides & Learning', page: '/guides' },
        { label: 'Islamic History', page: '/history' },
        { label: 'Prophetic Chain', page: '/prophets' },
        { label: 'Islamic Miracles', page: '/miracles' },
        { label: 'Five Pillars', page: '/pillars' },
    ]

    const community = [
        { label: 'About Us', page: '/about' },
        { label: 'Contact Us', page: '/contact' },
        { label: 'Community Forum', page: '/forum' },
        { label: 'Blog & Articles', page: '/blog' },
        { label: 'FAQs', page: '/faqs' },
        { label: 'Support Center', page: '/support' },
    ]

    const legal = [
        { label: 'Privacy Policy', page: '/privacy' },
        { label: 'Terms of Service', page: '/terms' },
        { label: 'Cookie Policy', page: '/cookies' },
        { label: 'Disclaimer', page: '/disclaimer' },
        { label: 'Accessibility', page: '/accessibility' },
        { label: 'Licenses', page: '/licenses' },
    ]

    return (
        <footer className="bg-gradient-to-br from-gray-50 to-emerald-50 border-t border-layout-separator">
            <div className="container-footer">
                <div className="py-8 sm:py-10 lg:py-12">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        {/* About Section */}
                        <div className="space-y-3 sm:space-y-4 min-w-0 max-w-[350px]">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <a
                                        href="/"
                                        aria-label="Go to home page"
                                        className="w-11 h-11 bg-emerald-600 rounded-xl flex items-center justify-center"
                                    >
                                        <Moon className="h-6 w-6 text-white" />
                                    </a>
                                </div>
                                <div className="min-w-0">
                                    <a
                                        href="/"
                                        aria-label="Go to home page"
                                    >
                                        <h3 className="text-gray-900 font-medium text-sm sm:text-base">Deenify</h3>
                                        <p className="text-xs text-gray-500">Islamic Companion</p>
                                    </a>
                                </div>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                Your comprehensive Islamic lifestyle companion. Strengthen your faith with prayer times, Quran reading, authentic Hadith, and more.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="min-w-0">
                            <h3 className="text-gray-900 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
                            <ul className="space-y-1.5 sm:space-y-2">
                                {quickLinks.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.page}
                                            className="w-max inline-block text-gray-600 hover:text-emerald-600 transition-colors text-xs sm:text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div className="min-w-0">
                            <h3 className="text-gray-900 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
                            <ul className="space-y-1.5 sm:space-y-2">
                                {resources.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.page}
                                            className="w-max inline-block text-gray-600 hover:text-emerald-600 transition-colors text-xs sm:text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="space-y-3 sm:space-y-4 min-w-0">
                            <h3 className="text-gray-900 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                <li className="flex items-start space-x-2 text-gray-600 text-xs sm:text-sm min-w-0">
                                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                                    <span className="break-words min-w-0">info@islamiccompanion.com</span>
                                </li>
                                <li className="flex items-start space-x-2 text-gray-600 text-xs sm:text-sm min-w-0">
                                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li className="flex items-start space-x-2 text-gray-600 text-xs sm:text-sm min-w-0">
                                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                                    <span className="break-words min-w-0">123 Islamic Center Dr<br />City, State 12345</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Community & Legal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        <div className="min-w-0">
                            <h4 className="text-gray-900 text-xs sm:text-sm font-medium mb-2 sm:mb-3">Community</h4>
                            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                {community.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.page}
                                        className="w-max inline-block text-gray-600 hover:text-emerald-600 transition-colors text-xs"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-gray-900 text-xs sm:text-sm font-medium mb-2 sm:mb-3">Legal</h4>
                            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                                {legal.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.page}
                                        className="w-max inline-block text-gray-600 hover:text-emerald-600 transition-colors text-xs"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="text-center border-t border-layout-separator pt-6 sm:pt-8 mt-6 sm:mt-8">
                        <p className="text-xs sm:text-sm text-gray-600">
                            © {currentYear} Islamic Companion. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer