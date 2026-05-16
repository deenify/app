import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-noto)", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "serif"],
        system: ["system-ui", "sans-serif"],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "991px",
        xl: "1170px",
        "2xl": "1280px",
      },
      colors: {
        primary: {
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        xs: "4px",
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "12px",
        full: "100%",
      },
    },
  },

  plugins: [
    // === Typography Utilities ===
    plugin(function ({ addUtilities, addBase }) {
      const textUtilities = {
        /* === Headings (start from h2/h3) === */
        ".heading-2": {
          fontSize: "24px",
          fontWeight: "600",
          fontFamily: "var(--font-poppins)",
          lineHeight: "130%",
        },
        ".heading-3": {
          fontSize: "20px",
          fontWeight: "600",
          fontFamily: "var(--font-poppins)",
          lineHeight: "125%",
        },

        /* === Body Text === */
        ".body-text-1": {
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "var(--font-noto)",
          lineHeight: "150%",
        },
        ".body-text-2": {
          fontSize: "14px",
          fontWeight: "400",
          fontFamily: "var(--font-noto)",
          lineHeight: "145%",
        },

        /* === Arabic Text === */
        ".arabic-text-1": {
          fontSize: "20px",
          fontWeight: "500",
          fontFamily: "var(--font-noto-arabic)",
          lineHeight: "180%",
          direction: "rtl",
        },
        ".arabic-text-2": {
          fontSize: "16px",
          fontWeight: "400",
          fontFamily: "var(--font-noto-arabic)",
          lineHeight: "170%",
          direction: "rtl",
        },
      };

      addUtilities(textUtilities);
    }),
    require("tailwindcss-animate"),
  ],
};

export default config;
