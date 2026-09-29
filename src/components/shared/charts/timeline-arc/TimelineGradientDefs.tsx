"use client";

import React from 'react'

interface TimelineGradientDefsProps {
    lineId: string;
    glowId: string
}

const TimelineGradientDefs = ({ lineId, glowId }: TimelineGradientDefsProps) => {
    return (
        <defs>
            <linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0.05" />
                <stop offset="50%" stopColor="white" stopOpacity="0.25" />
                <stop offset="100%" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id={glowId}>
                <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
        </defs>
    )
}

export default TimelineGradientDefs
