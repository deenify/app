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

      // Font Family - Exact match to Figma Make
      fontFamily: {
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-noto)", "ui-sans-serif", "system-ui", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "serif"],
      },

      // Screens
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1170px",
        "2xl": "1280px",
      },
      
      // Colors
      colors: {
        "layout-separator": "#e5e7eb",

        emerald: {
          "50": "var(--color-emerald-50)",
          "100": "var(--color-emerald-100)",
          "200": "var(--color-emerald-200)",
          "300": "var(--color-emerald-300)",
          "400": "var(--color-emerald-400)",
          "500": "var(--color-emerald-500)",
          "600": "var(--color-emerald-600)",
          "700": "var(--color-emerald-700)",
          "800": "var(--color-emerald-800)",
          "900": "var(--color-emerald-900)",
          DEFAULT: "var(--color-emerald-500)",
        },
        red: {
          "50": "var(--color-red-50)",
          "100": "var(--color-red-100)",
          "200": "var(--color-red-200)",
          "300": "var(--color-red-300)",
          "400": "var(--color-red-400)",
          "500": "var(--color-red-500)",
          "600": "var(--color-red-600)",
          "700": "var(--color-red-700)",
          "800": "var(--color-red-800)",
          "900": "var(--color-red-900)",
          DEFAULT: "var(--color-red-500)",
        },
        amber: {
          "50": "var(--color-amber-50)",
          "100": "var(--color-amber-100)",
          "200": "var(--color-amber-200)",
          "300": "var(--color-amber-300)",
          "400": "var(--color-amber-400)",
          "500": "var(--color-amber-500)",
          "600": "var(--color-amber-600)",
          "700": "var(--color-amber-700)",
          "800": "var(--color-amber-800)",
          "900": "var(--color-amber-900)",
          DEFAULT: "var(--color-amber-500)",
        },
        purple: {
          "50": "var(--color-purple-50)",
          "100": "var(--color-purple-100)",
          "200": "var(--color-purple-200)",
          "300": "var(--color-purple-300)",
          "400": "var(--color-purple-400)",
          "500": "var(--color-purple-500)",
          "600": "var(--color-purple-600)",
          "700": "var(--color-purple-700)",
          "800": "var(--color-purple-800)",
          "900": "var(--color-purple-900)",
          DEFAULT: "var(--color-purple-500)",
        },
        blue: {
          "50": "var(--color-blue-50)",
          "100": "var(--color-blue-100)",
          "200": "var(--color-blue-200)",
          "300": "var(--color-blue-300)",
          "400": "var(--color-blue-400)",
          "500": "var(--color-blue-500)",
          "600": "var(--color-blue-600)",
          "700": "var(--color-blue-700)",
          "800": "var(--color-blue-800)",
          "900": "var(--color-blue-900)",
          DEFAULT: "var(--color-blue-500)",
        },


        // Radix UI / shadcn colors - Required for Radix UI components
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        "input-background": "hsl(var(--input-background))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      // Background Images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      // Border Radius - Exact match to Figma Make
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },

    },
  },

  plugins: [require("tailwindcss-animate")],
};

export default config;
