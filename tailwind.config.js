/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: { lg: { raw: "((min-width: 1024px) and (min-height: 900px))" } },
  },
  plugins: [],
};
