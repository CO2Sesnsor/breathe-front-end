/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1000px": "1000px",
      },
    },
    fontFamily: {
      jakarta: ["Plus Jakarta Sans", "sans-serif"],
    },
  },
  plugins: [],
};
