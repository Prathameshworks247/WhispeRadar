/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src//*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(217, 33%, 17%)",
        input: "hsl(217, 33%, 17%)",
        ring: "hsl(220, 38%, 38%)",
        background: "hsl(222, 84%, 5%)",
        foreground: "hsl(210, 40%, 98%)",
        primary: {
          DEFAULT: "hsl(0, 73%, 41%)", // factcheck-red
          foreground: "hsl(210, 40%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(217, 33%, 17%)", // factcheck-dark-light
          foreground: "hsl(210, 40%, 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 63%, 31%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(217, 33%, 17%)",
          foreground: "hsl(215, 20%, 65%)",
        },
        accent: {
          DEFAULT: "hsl(217, 33%, 17%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        popover: {
          DEFAULT: "hsl(217, 33%, 17%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        card: {
          DEFAULT: "hsl(222, 84%, 5%)",
          foreground: "hsl(210, 40%, 98%)",
        },
        // Custom colors for fact-checking website
        factcheck: {
          red: "#DC2626",
          "red-dark": "#991B1B",
          green: "#16A34A",
          "green-dark": "#15803D",
          gold: "#D97706",
          "gold-dark": "#B45309",
          dark: "#111827",
          "dark-light": "#1F2937",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
      },
    },
  },
  plugins: [],
};