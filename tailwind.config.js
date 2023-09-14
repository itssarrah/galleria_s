/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        'sunflower':['Sunflower','monospace'],
        'sofia': "Sofia",

      },
      width: {
        120: "40vw",
      },
      color: {
        'main__pink': '#FF9494',
      },
      backgroundColor: {
        primary: "#ff9494", // Replace '#123456' with your desired color
      },
    },
  },
  plugins: [],
};
