// Logo component from deenify-components
const Logo = ({ className = "h-10 w-10" }: { className?: string }) => {
    return (
        <svg
            className={className}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outer Circle - Emerald */}
            <circle cx="100" cy="100" r="95" fill="url(#emeraldGradient)" />

            {/* Inner Decorative Circle */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.3" />

            {/* Star Pattern - Traditional Islamic Geometry */}
            <path
                d="M100 30 L110 70 L150 70 L120 95 L130 135 L100 110 L70 135 L80 95 L50 70 L90 70 Z"
                fill="#FFFFFF"
                opacity="0.9"
            />

            {/* Crescent Moon */}
            <path
                d="M100 45 C100 65, 115 75, 115 100 C115 125, 100 135, 100 155 C125 155, 145 130, 145 100 C145 70, 125 45, 100 45 Z"
                fill="#FFFFFF"
                opacity="0.95"
            />

            {/* Center Dot - Star */}
            <circle cx="100" cy="100" r="8" fill="#FFFFFF" />

            {/* Arabic Calligraphy Style Element - Simplified */}
            <path
                d="M70 110 Q85 100, 100 110 Q115 120, 130 110"
                stroke="#FFFFFF"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
            />

            {/* Gradient Definition */}
            <defs>
                <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default Logo;