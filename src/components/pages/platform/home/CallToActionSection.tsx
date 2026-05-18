"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const CallToActionSection = () => {
    const router = useRouter()

    return (
        <section className="bg-white py-20">
            <div className="container">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Moon className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-heading text-gray-900 mb-4">
                        Begin Your Spiritual Journey Today
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Start strengthening your connection with Allah through daily prayers, Quran reading, and Islamic knowledge.
                        Everything you need is at your fingertips.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={() => router.push("/prayer")}
                        >
                            Get Started Now
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                            onClick={() => router.push("/settings")}
                        >
                            Customize Settings
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CallToActionSection