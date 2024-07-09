/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#898CA3",
        secondary: "#E1341E",
        "text-contrast": "#0A1819",
      },
    },
    screens: { lg: { raw: "((min-width: 1024px) and (min-height: 900px))" } },
  },
  plugins: [],
};
