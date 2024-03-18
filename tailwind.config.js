const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors: {
      primary: {
        DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
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
      "base-content": "#a7adba",
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};
