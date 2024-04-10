/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      space: {
        40: "40px",
        100: "100px",
        200: "200px",
        600: "600px",
        1000: "1000px",
      },
      height: {
        100: "100px",
      },
      flex: {
        2: 2,
      },
      lineHeight: {
        100: "100px",
        200: "200px",
      },
    },
  },
  plugins: [],
};
