"use client";

import { PrayerEntry } from '@/components/pages/dashboard/prayer/content';
import React from 'react'
import TimelineGradientDefs from './TimelineGradientDefs';
import TimelineMarkers from './TimelineMarkers';


type TimelinePoint = { x: number; y: number }
interface TimelineArcProps {
    prayers: PrayerEntry[]
    currentId: string
}


const TimelineArc = ({ prayers, currentId }: TimelineArcProps) => {

    /** Straight line — mobile (< md). */
    const LINE_MARKERS: TimelinePoint[] = [
        { x: 30, y: 50 },
        { x: 115, y: 50 },
        { x: 200, y: 50 },
        { x: 285, y: 50 },
        { x: 370, y: 50 },
    ]

    /** Curved arc — tablet & desktop (md+). M 30 68 Q 200 4 370 68 */
    const ARC_MARKERS: TimelinePoint[] = [
        { x: 30, y: 68 },
        { x: 115, y: 44 },
        { x: 200, y: 36 },
        { x: 285, y: 44 },
        { x: 370, y: 68 },
    ]


    return (
        <div className="relative w-full min-w-0 lg:mt-8 py-0 sm:pb-5 md:py-0">
            {/* Mobile: straight timeline */}
            <svg
                viewBox="0 0 400 88"
                preserveAspectRatio="xMidYMid meet"
                className="aspect-[400/88] h-auto w-full min-h-[88px] md:hidden"
                aria-hidden
            >
                <TimelineGradientDefs lineId="arc-gradient-line" glowId="inner-glow-line" />
                <path
                    d="M 24 50 L 376 50"
                    fill="none"
                    stroke="url(#arc-gradient-line)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <TimelineMarkers
                    prayers={prayers}
                    currentId={currentId}
                    positions={LINE_MARKERS}
                    glowGradientId="inner-glow-line"
                    labelOffset={{ active: 26, idle: 28 }}
                />
            </svg>

            {/* Tablet & desktop: curved arc */}
            <svg
                viewBox="0 0 400 112"
                preserveAspectRatio="xMidYMid meet"
                className="hidden aspect-[400/112] h-auto w-full min-h-[100px] md:block md:min-h-[100px]"
                aria-hidden
            >
                <TimelineGradientDefs lineId="arc-gradient-curved" glowId="inner-glow-curved" />
                <path
                    d="M 30 68 Q 200 4 370 68"
                    fill="none"
                    stroke="url(#arc-gradient-curved)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <TimelineMarkers
                    prayers={prayers}
                    currentId={currentId}
                    positions={ARC_MARKERS}
                    glowGradientId="inner-glow-curved"
                    labelOffset={{ active: 34, idle: 28 }}
                />
            </svg>
        </div>
    )
}

export default TimelineArc