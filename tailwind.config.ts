import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"], // heading
        body: ["var(--font-noto)", "sans-serif"],       // description 
        arabic: ["var(--font-noto-arabic)", "serif"], // Arabic
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
          10: "oklch(var(--color-emerald-50))",
          20: "oklch(var(--color-emerald-100))",
          30: "oklch(var(--color-emerald-200))",
          40: "oklch(var(--color-emerald-300))",
          50: "oklch(var(--color-emerald-400))",
          60: "oklch(var(--color-emerald-500))",
          70: "oklch(var(--color-emerald-600))",
          80: "oklch(var(--color-emerald-700))",
          90: "oklch(var(--color-emerald-800))",
          100: "oklch(var(--color-emerald-900))",
          DEFAULT: "oklch(var(--color-emerald-600))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        full: "100%",
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      const fontUtilities = {
        ".font-12-400": {
          fontSize: "12px",
          fontWeight: "500",
          fontFamily: "var(--font-syne)",
          lineHeight: "110%",
        },
        ".font-12-500": {
          fontSize: "12px",
          fontWeight: "500",
          fontFamily: "var(--font-raleway)",
          lineHeight: "110%",
        },
      };

      addUtilities(fontUtilities);
    }),
  ],
};

export default config;
