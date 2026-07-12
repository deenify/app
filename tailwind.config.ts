import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			accent: [
    				'var(--font-accent)',
    				'Georgia',
    				'ui-serif',
    				'serif'
    			],
    			heading: [
    				'var(--font-heading)',
    				'ui-sans-serif',
    				'system-ui',
    				'sans-serif'
    			],
    			body: [
    				'var(--font-noto)',
    				'ui-sans-serif',
    				'system-ui',
    				'sans-serif'
    			],
    			arabic: [
    				'var(--font-noto-arabic)',
    				'serif'
    			],
    			moonwalk: [
    				'var(--font-moonwalk)',
    				'ui-sans-serif',
    				'system-ui',
    				'sans-serif'
    			]
    		},
    		screens: {
    			xs: '480px',
    			sm: '640px',
    			md: '768px',
    			lg: '1024px',
    			xl: '1170px',
    			'2xl': '1280px'
    		},
    		colors: {
    			'layout-separator': '#e5e7eb',
    			'marketing-light': '#f8faf9',
    			'marketing-card': '#f4f5f4',
    			emerald: {
    				'50': 'oklch(var(--color-emerald-50) / <alpha-value>)',
    				'100': 'oklch(var(--color-emerald-100) / <alpha-value>)',
    				'200': 'oklch(var(--color-emerald-200) / <alpha-value>)',
    				'300': 'oklch(var(--color-emerald-300) / <alpha-value>)',
    				'400': 'oklch(var(--color-emerald-400) / <alpha-value>)',
    				'500': 'oklch(var(--color-emerald-500) / <alpha-value>)',
    				'600': 'oklch(var(--color-emerald-600) / <alpha-value>)',
    				'700': 'oklch(var(--color-emerald-700) / <alpha-value>)',
    				'800': 'oklch(var(--color-emerald-800) / <alpha-value>)',
    				'900': 'oklch(var(--color-emerald-900) / <alpha-value>)',
    				DEFAULT: 'oklch(var(--color-emerald-500) / <alpha-value>)'
    			},
    			red: {
    				'50': 'oklch(var(--color-red-50) / <alpha-value>)',
    				'100': 'oklch(var(--color-red-100) / <alpha-value>)',
    				'200': 'oklch(var(--color-red-200) / <alpha-value>)',
    				'300': 'oklch(var(--color-red-300) / <alpha-value>)',
    				'400': 'oklch(var(--color-red-400) / <alpha-value>)',
    				'500': 'oklch(var(--color-red-500) / <alpha-value>)',
    				'600': 'oklch(var(--color-red-600) / <alpha-value>)',
    				'700': 'oklch(var(--color-red-700) / <alpha-value>)',
    				'800': 'oklch(var(--color-red-800) / <alpha-value>)',
    				'900': 'oklch(var(--color-red-900) / <alpha-value>)',
    				DEFAULT: 'oklch(var(--color-red-500) / <alpha-value>)'
    			},
    			amber: {
    				'50': 'oklch(var(--color-amber-50) / <alpha-value>)',
    				'100': 'oklch(var(--color-amber-100) / <alpha-value>)',
    				'200': 'oklch(var(--color-amber-200) / <alpha-value>)',
    				'300': 'oklch(var(--color-amber-300) / <alpha-value>)',
    				'400': 'oklch(var(--color-amber-400) / <alpha-value>)',
    				'500': 'oklch(var(--color-amber-500) / <alpha-value>)',
    				'600': 'oklch(var(--color-amber-600) / <alpha-value>)',
    				'700': 'oklch(var(--color-amber-700) / <alpha-value>)',
    				'800': 'oklch(var(--color-amber-800) / <alpha-value>)',
    				'900': 'oklch(var(--color-amber-900) / <alpha-value>)',
    				DEFAULT: 'oklch(var(--color-amber-500) / <alpha-value>)'
    			},
    			purple: {
    				'50': 'oklch(var(--color-purple-50) / <alpha-value>)',
    				'100': 'oklch(var(--color-purple-100) / <alpha-value>)',
    				'200': 'oklch(var(--color-purple-200) / <alpha-value>)',
    				'300': 'oklch(var(--color-purple-300) / <alpha-value>)',
    				'400': 'oklch(var(--color-purple-400) / <alpha-value>)',
    				'500': 'oklch(var(--color-purple-500) / <alpha-value>)',
    				'600': 'oklch(var(--color-purple-600) / <alpha-value>)',
    				'700': 'oklch(var(--color-purple-700) / <alpha-value>)',
    				'800': 'oklch(var(--color-purple-800) / <alpha-value>)',
    				'900': 'oklch(var(--color-purple-900) / <alpha-value>)',
    				DEFAULT: 'oklch(var(--color-purple-500) / <alpha-value>)'
    			},
    			blue: {
    				'50': 'oklch(var(--color-blue-50) / <alpha-value>)',
    				'100': 'oklch(var(--color-blue-100) / <alpha-value>)',
    				'200': 'oklch(var(--color-blue-200) / <alpha-value>)',
    				'300': 'oklch(var(--color-blue-300) / <alpha-value>)',
    				'400': 'oklch(var(--color-blue-400) / <alpha-value>)',
    				'500': 'oklch(var(--color-blue-500) / <alpha-value>)',
    				'600': 'oklch(var(--color-blue-600) / <alpha-value>)',
    				'700': 'oklch(var(--color-blue-700) / <alpha-value>)',
    				'800': 'oklch(var(--color-blue-800) / <alpha-value>)',
    				'900': 'oklch(var(--color-blue-900) / <alpha-value>)',
    				DEFAULT: 'oklch(var(--color-blue-500) / <alpha-value>)'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			'input-background': 'hsl(var(--input-background))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
    		},
    		borderRadius: {
    			sm: '4px',
    			md: '8px',
    			lg: '12px',
    			xl: '16px',
    			full: '9999px'
    		},
    		keyframes: {
    			'marquee-left': {
    				'0%': {
    					transform: 'translateX(0%)'
    				},
    				'100%': {
    					transform: 'translateX(-50%)'
    				}
    			},
    			'marquee-right': {
    				'0%': {
    					transform: 'translateX(-50%)'
    				},
    				'100%': {
    					transform: 'translateX(0%)'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'marquee-left': 'marquee-left linear infinite',
    			'marquee-right': 'marquee-right linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },

    plugins: [require("tailwindcss-animate")],
};

export default config;
