import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0A2540",
          light: "#1A3A5F",
          dark: "#051728",
        },
        secondary: {
          DEFAULT: "#00D9A3",
          light: "#33E3B7",
          dark: "#00A67E",
        },
        accent: {
          DEFAULT: "#5B8DEE",
          light: "#7FA5F2",
          dark: "#4275E6",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#F8F9FB",
          darker: "#E5E8ED",
        },
        text: {
          primary: "#0A2540",
          secondary: "#5A6C7D",
          tertiary: "#8B98A8",
        },
        status: {
          success: "#00D9A3",
          warning: "#FFB020",
          error: "#FF4D4F",
          info: "#5B8DEE",
        },
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "slide-out": "slideOut 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "pulse-glow": "pulseGlow 0.6s ease-out",
        "expand": "expand 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(91, 141, 238, 0)" },
          "50%": { boxShadow: "0 0 0 8px rgba(91, 141, 238, 0.3)" },
        },
        expand: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
