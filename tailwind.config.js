const { parkwindPlugin } = require("@park-ui/tailwind-plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [parkwindPlugin],
  parkUI: {
    accentColor: "indigo",
    grayColor: "neutral",
    borderRadius: "sm",
  },
  darkMode: ["class"],
};
