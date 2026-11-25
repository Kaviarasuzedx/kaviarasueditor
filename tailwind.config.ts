import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", xl: "3rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        stroke: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ['"Clash Display"', "var(--font-inter)", "Arial", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3rem, 8.3vw, 7.5rem)", { lineHeight: "0.96", letterSpacing: "-0.055em" }],
      },
      borderRadius: { card: "16px", pill: "999px" },
      boxShadow: { glow: "0 0 65px rgba(255, 184, 0, 0.13)" },
      maxWidth: { site: "1440px" },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 700ms cubic-bezier(0.22,1,0.36,1) both" },
    },
  },
  plugins: [],
};

export default config;
