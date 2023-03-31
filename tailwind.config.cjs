const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xs": "320px",
        xs: "450px",
      },
      fontSize: {
        xs: "0.5rem",
        sm: "0.6rem",
        base: "0.8rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      fontFamily: {
        sans: [
          "Inter var, sans-serif",
          { fontFeatureSettings: '"cv02", "cv03", "cv04", "cv05", "cv11"' },
        ],
      },
      container: {
        center: true,
      },
      boxShadow: {
        outline: "0 0 30px 0 rgba(0, 0, 0, 0.3)",
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      green: {
        light: colors.lime[100],
        DEFAULT: colors.lime[500],
        dark: colors.lime[700],
      },
      red: {
        light: colors.red[100],
        DEFAULT: colors.red[500],
        dark: colors.red[700],
      },
      orange: {
        light: colors.orange[100],
        DEFAULT: colors.orange[500],
        dark: colors.orange[700],
      },
      primary: {
        light: colors.indigo[400],
        DEFAULT: colors.indigo[600],
        dark: colors.indigo[700],
      },
      gray: {
        light: colors.zinc[100],
        DEFAULT: colors.zinc[400],
        dark: colors.zinc[700],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
