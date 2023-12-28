/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sunflower: ["Sunflower", "monospace"],
        sofia: "Sofia",
        jost: "Jost",
      },
      width: {
        120: "40vw",
      },
      textColor: {
        // changed from 'color'
        main__pink: "#FF9494",
      },
      backgroundColor: {
        primary: "#ff9494", // Replace '#123456' with your desired color
      },
      backgroundImage: {
        "business": "url('/src/assets/backgrounds/business-account-bg.png')"
      }
    },
  },
  plugins: [],
};
