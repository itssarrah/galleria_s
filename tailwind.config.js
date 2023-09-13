/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        120: "40vw",
      },
      backgroundColor: {
        primary: "#ff9494", // Replace '#123456' with your desired color
      },
    },
  },
  plugins: [],
};
