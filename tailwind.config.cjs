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
      colors: {
        primary: colors.blue[600],
        positive: colors.lime[500],
        negative: colors.red[500],
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
    },
  },
  plugins: [],
  prefix: "tw-",
};
