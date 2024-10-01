import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "selector",
  // darkMode: ["class", ":global(.dark)"],
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}"],
  // content: ["./src/app/components/tributePage/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      card: "160px",
      "card-lg": "240px",
      mobile: "320px",
      "mobile-lg": "480px",
      tablet: "640px",
      "tablet-lg": "880px",
      desktop: "1024px",
      "desktop-lg": "1256px",
      widescreen: "1400px",
    },
    fontFamily: {
      sans: ["var(--font-family-sans)", "Georgia", "ui-sans-serif", "system-ui"],
      serif: ["var(--font-family-serif)", "Georgia", "ui-serif"],
      mono: ["var(--font-family-mono)", "SFMono-Regular"],
      display: ["var(--font-family-display)", "Georgia", "ui-sans-serif", "system-ui"],
      body: ["var(--font-family-body)", "Georgia", "ui-sans-serif", "system-ui"],
    },
    letterSpacing: {
      serif: "0.5px",
      sans: "0.2px",
      normal: "0.2px",
      wider: "0.05em",
    },
    fontSize: {
      "2xs": ["var(--font-size-2xs)", "var(--line-height-2xs)"],
      xs: ["var(--font-size-xs)", "var(--line-height-xs)"],
      sm: ["var(--font-size-sm)", "var(--line-height-sm)"],
      md: ["var(--font-size-base)", "var(--line-height-base)"],
      base: ["var(--font-size-base)", "var(--line-height-base)"],
      lg: ["var(--font-size-lg)", "var(--line-height-lg)"],
      xl: ["var(--font-size-xl)", "var(--line-height-xl)"],
      "2xl": ["var(--font-size-2xl)", "var(--line-height-2xl)"],
      "3xl": ["var(--font-size-3xl)", "var(--line-height-3xl)"],
      "4xl": ["var(--font-size-4xl)", "var(--line-height-4xl)"],
      "5xl": ["var(--font-size-5xl)", "var(--line-height-5xl)"],
      "6xl": ["var(--font-size-6xl)", "var(--line-height-6xl)"],
      "7xl": ["var(--font-size-7xl)", "var(--line-height-7xl)"],
      "8xl": ["var(--font-size-8xl)", "var(--line-height-8xl)"],
    },

    fontWeight: {
      thin: "var(--font-weight-thin)",
      extralight: "var(--font-weight-extralight)",
      light: "var(--font-weight-light)",
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
      bold: "var(--font-weight-bold)",
      extrabold: "var(--font-weight-extrabold)",
      black: "var(--font-weight-black)",
    },

    extend: {
      width: {
        card: "160px",
        "card-lg": "240px",
        mobile: "320px",
        "mobile-lg": "480px",
        tablet: "640px",
        "tablet-lg": "880px",
        desktop: "1024px",
        "desktop-lg": "1256px",
        widescreen: "1400px",
      },
      // gridTemplateColumns: {
      //   // Simple 16 column grid
      //   12: "repeat(12, minmax(0, 1fr))",
      //   // Complex site-specific column configuration
      //   footer: "200px minmax(900px, 1fr) 100px",
      // },
    },
  },

  plugins: [],
}

export default config
