import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8FF",
        panel: "#F4F2FF",
        ink: "#0A0A0F",
        muted: "#6B7280",
        line: "#E9E7FD",
        accent: "#7C3AED", // creative purple
        up: "#F59E0B", // warm highlight
        down: "#E11D48",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,10,15,0.04), 0 8px 24px -12px rgba(10,10,15,0.10)",
        lift: "0 8px 40px -12px rgba(22,82,240,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
