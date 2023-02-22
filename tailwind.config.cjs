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
        xs: "0.4rem",
        sm: "0.7rem",
      },
      fontFamily: {
        sans: [
          "Inter var, sans-serif",
          { fontFeatureSettings: '"cv02", "cv03", "cv04", "cv05", "cv11"' },
        ],
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
