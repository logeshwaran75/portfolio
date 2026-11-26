import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080B14",
        surface: "#0E1322",
        raised: "#141B2F",
        line: "#222B47",
        text: "#E6EAF5",
        muted: "#98A2C0",
        cyan: { DEFAULT: "#5BD4FF", dim: "#2C8FB5" },
        violet: { DEFAULT: "#8B7CFF" },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Figtree Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
