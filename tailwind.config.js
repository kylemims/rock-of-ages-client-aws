/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2c2c2c", // muted black background
        rust: "#c1432e", // deep rusted red
        silver: "#4b6777", // silver head-dress
        gold: "#ce9e62", // rusted gold
      },
    },
  },
  plugins: [],
};
