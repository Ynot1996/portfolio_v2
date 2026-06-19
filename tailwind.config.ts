import type { Config } from "tailwindcss";

/**
 * Colours are driven by CSS variables (RGB triplets) defined in globals.css,
 * so every token responds to the light / .dark theme switch while still
 * supporting Tailwind opacity utilities (e.g. bg-accent/10).
 */
const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: withVar("--bg"),
        panel: withVar("--panel"),
        panel2: withVar("--panel-2"),
        ink: withVar("--ink"),
        muted: withVar("--muted"),
        line: withVar("--line"),
        accent: withVar("--accent"),
        accent2: withVar("--accent-2"),
        up: withVar("--up"),
        down: withVar("--down"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "ui-serif", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(8,8,13,0.05), 0 8px 24px -12px rgba(8,8,13,0.12)",
        lift: "0 12px 48px -16px rgba(124,58,237,0.35)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
