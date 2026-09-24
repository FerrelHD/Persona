/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        p5: {
          crimson: "#E60012",
          redDark: "#99000C",
          black: "#0B0B0B",
          dark: "#141414",
          gray: "#1F1F1F",
          lightGray: "#D0D0D0",
          yellow: "#FFF100",
          cream: "#FAF8F5",
          white: "#FFFFFF"
        },
        border: "hsl(var(--border, 0 0% 15%))",
        input: "hsl(var(--input, 0 0% 15%))",
        ring: "hsl(var(--ring, 355 100% 45%))",
        background: "hsl(var(--background, 0 0% 4%))",
        foreground: "hsl(var(--foreground, 0 0% 98%))",
        primary: {
          DEFAULT: "#E60012",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1F1F1F",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#E60012",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#18181B",
          foreground: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#E60012",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        p5Heading: ["'Bangers'", "'Impact'", "'Dela Gothic One'", "sans-serif"],
        p5Sub: ["'Dela Gothic One'", "'Montserrat'", "sans-serif"],
        p5Body: ["'Outfit'", "'Inter'", "sans-serif"],
        p5Mono: ["'Space Mono'", "monospace"],
        p5Kanji: ["'Shippori Mincho'", "'Noto Serif JP'", "serif"],
      },
      boxShadow: {
        'p5-solid': '6px 6px 0px #000000',
        'p5-crimson': '8px 8px 0px #E60012',
        'p5-active': '12px 12px 0px #000000',
        'p5-modal': '14px 14px 0px #E60012, 14px 14px 0px 4px #000000',
      },
      animation: {
        'p5-shake': 'p5Shake 0.4s ease infinite alternate',
        'p5-pulse-glow': 'p5PulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        p5Shake: {
          '0%': { transform: 'rotate(-1.5deg) scale(1.02)' },
          '100%': { transform: 'rotate(1.5deg) scale(1.03)' },
        },
        p5PulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(230,0,18,0.5))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(230,0,18,0.9))' },
        }
      }
    },
  },
  plugins: [],
}
