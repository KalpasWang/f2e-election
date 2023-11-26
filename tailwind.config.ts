import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
    spacing: {
      0: "0px",
      4: "4px",
      8: "8px",
      12: "12px",
      16: "16px",
      20: "20px",
      24: "24px",
      28: "28px",
      32: "32px",
      36: "36px",
      40: "40px",
      48: "48px",
      52: "52px",
      60: "60px",
      64: "64px",
      96: "96px",
      100: "100px",
      192: "192px",
      256: "256px",
      280: "280px",
    },
    extend: {
      fontFamily: {
        TC: ["'Noto Sans TC'", "sans-serif"],
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
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        spacingUnit: 4,
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
