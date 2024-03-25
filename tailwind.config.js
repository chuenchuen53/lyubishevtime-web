/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "neutral-text": {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          quaternary: "var(--color-text-quaternary)",
        },
        "neutral-border": {
          DEFAULT: "var(--color-border)",
          secondary: "var(--color-border-secondary)",
        },
        "neutral-fill": {
          DEFAULT: "var(--color-fill)",
          secondary: "var(--color-fill-secondary)",
          tertiary: "var(--color-fill-tertiary)",
          quaternary: "var(--color-fill-quaternary)",
        },
        "neutral-bg": {
          container: "var(--color-bg-container)",
          elevated: "var(--color-bg-elevated)",
          layout: "var(--color-bg-layout)",
          spotlight: "var(--color-bg-spotlight)",
          mask: "var(--color-bg-mask)",
        },
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          content: "rgb(var(--color-primary-content) / <alpha-value>)",
          bg: "rgb(var(--color-primary-bg) / <alpha-value>)",
          "bg-hover": "rgb(var(--color-primary-bg-hover) / <alpha-value>)",
          border: "rgb(var(--color-primary-border) / <alpha-value>)",
          "border-hover": "rgb(var(--color-primary-border-hover) / <alpha-value>)",
          hover: "rgb(var(--color-primary-hover) / <alpha-value>)",
          active: "rgb(var(--color-primary-active) / <alpha-value>)",
          "text-hover": "rgb(var(--color-primary-text-hover) / <alpha-value>)",
          text: "rgb(var(--color-primary-text) / <alpha-value>)",
          "text-active": "rgb(var(--color-primary-text-active) / <alpha-value>)",
          50: "#F0F5FF",
          100: "#E5EDFF",
          200: "#CDDBFE",
          300: "#B4C6FC",
          400: "#8DA2FB",
          500: "#6875F5",
          600: "#5850EC",
          700: "#5145CD",
          800: "#42389D",
          900: "#362F78",
        },
        danger: {
          DEFAULT: "rgb(var(--color-danger) / <alpha-value>)",
          content: "rgb(var(--color-danger-content) / <alpha-value>)",
          bg: "rgb(var(--color-danger-bg) / <alpha-value>)",
          "bg-hover": "rgb(var(--color-danger-bg-hover) / <alpha-value>)",
          border: "rgb(var(--color-danger-border) / <alpha-value>)",
          "border-hover": "rgb(var(--color-danger-border-hover) / <alpha-value>)",
          hover: "rgb(var(--color-danger-hover) / <alpha-value>)",
          active: "rgb(var(--color-danger-active) / <alpha-value>)",
          "text-hover": "rgb(var(--color-danger-text-hover) / <alpha-value>)",
          text: "rgb(var(--color-danger-text) / <alpha-value>)",
          "text-active": "rgb(var(--color-danger-text-active) / <alpha-value>)",
          50: "#FDF2F2",
          100: "#FDE8E8",
          200: "#FBD5D5",
          300: "#F8B4B4",
          400: "#F98080",
          500: "#F05252",
          600: "#E02424",
          700: "#C81E1E",
          800: "#9B1C1C",
          900: "#771D1D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
  parkUI: {
    accentColor: "indigo",
    grayColor: "neutral",
    borderRadius: "sm",
  },
  darkMode: ["class"],
};
