import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2ECC71",
          dark: "#1B1B2F",
          gold: "#FFC107",
          red: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        heading: ["var(--font-nunito)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(46, 204, 113, 0.45)" },
          "70%": { boxShadow: "0 0 0 18px rgba(46, 204, 113, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(46, 204, 113, 0)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "60%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "400" },
          "60%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "0" },
        },
        rise: {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "30%": { opacity: "0.8" },
          "100%": { transform: "translateY(-40px)", opacity: "0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6.5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        "confetti-fall": "confetti-fall 3s linear forwards",
        "bounce-in": "bounce-in 0.5s ease-out both",
        "draw-line": "draw-line 5s ease-in-out infinite",
        rise: "rise 3.5s ease-in infinite",
      },
    },
  },
  plugins: [],
};
export default config;
