import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      fontFamily: {
        TC: ["'Noto Sans TC'", "sans-serif"],
      },
      colors: {
        greenParty: "#57D2A9",
        blueParty: "#8082FF",
        orangeParty: "#F4A76F",
      },
      strokeWidth: {
        "1/10": "0.1",
        "1/5": "0.2",
        "1/4": "0.25",
        "1/2": "0.5",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "h1-desktop": "2.5rem",
        "h2-desktop": "2rem",
        "h3-desktop": "1.75rem",
        "h4-desktop": "1.5rem",
        "h5-desktop": "1.25rem",
        "h6-desktop": "1rem",
        "h1-mobile": "2.095rem",
        "h2-mobile": "1.756rem",
        "h3-mobile": "1.588rem",
        "h4-mobile": "1.418rem",
        "h5-mobile": "1.25rem",
        "h6-mobile": "1rem",
        body1: [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        body2: [
          "0.875rem",
          {
            lineHeight: "1.3125rem",
          },
        ],
        "body2-bold": [
          "0.875rem",
          {
            lineHeight: "1.3125rem",
            fontWeight: "bold",
          },
        ],
        "body-small": [
          "0.75rem",
          {
            lineHeight: "1.125rem",
          },
        ],
      },
      spacing: {
        "0": "0",
        "4px": "4px",
        "8px": "8px",
        "12px": "12px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
        "28px": "28px",
        "32px": "32px",
        "36px": "36px",
        "40px": "40px",
        "48px": "48px",
        "52px": "52px",
        "60px": "60px",
        "64px": "64px",
        "96px": "96px",
        "100px": "100px",
        "192px": "192px",
        "256px": "256px",
        "280px": "280px",
        "1/10": "10%",
      },
      boxShadow: {
        label: "0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black",
      },
      transitionDuration: {
        2000: "2000ms",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        // spacingUnit: 4,
      },
      themes: {
        light: {
          layout: {},
          colors: {
            default: {
              DEFAULT: "#E9ECEF",
              100: "#F8F9FA",
              200: "#E9ECEF",
              300: "#DEE2E6",
              400: "#CED4DA",
              500: "#ADB5BD",
              600: "#6C757D",
              700: "#495057",
              800: "#343A40",
              900: "#212529",
            },
            background: "#FFF",
            foreground: "#000",
            content1: "#334155",
            focus: "#F8F9FA",
            divider: "#DEE2E6",
            primary: "#D4009B",
            secondary: "#64748B",
          },
        },
        dark: {
          layout: {},
          colors: {},
        },
      },
    }),
  ],
};
export default config;
