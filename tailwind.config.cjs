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
      spacing: {
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      green: {
        lightest: colors.lime[100],
        light: colors.lime[200],
        DEFAULT: colors.lime[500],
        dark: colors.lime[700],
        darkest: colors.lime[900],
      },
      red: {
        lightest: colors.red[100],
        light: colors.red[200],
        DEFAULT: colors.red[500],
        dark: colors.red[700],
        darkest: colors.red[900],
      },
      orange: {
        lightest: colors.orange[100],
        light: colors.orange[200],
        DEFAULT: colors.orange[500],
        dark: colors.orange[700],
        darkest: colors.orange[900],
      },
      primary: {
        lightest: colors.indigo[100],
        light: colors.indigo[200],
        DEFAULT: colors.indigo[600],
        dark: colors.indigo[700],
        darkest: colors.indigo[900],
      },
      gray: {
        lightest: colors.zinc[100],
        light: colors.zinc[200],
        DEFAULT: colors.zinc[400],
        dark: colors.zinc[700],
        darkest: colors.zinc[900],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
};
