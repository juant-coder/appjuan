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
        brand: {
          green: "#2ECC71",
          dark: "#1B1B2F",
          gold: "#FFC107",
          red: "#EF4444",
        },
      },
      fontFamily: {
        heading: ["var(--font-nunito)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
