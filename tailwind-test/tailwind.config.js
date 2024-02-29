/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "ginlon-",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      padding: {
        1: "30px",
      },
      fontSize: {
        base: ["30px", "2rem"],
      },
    },
    screens: {
      md: "300px",
    },
  },
  plugins: [
    // 注入插件实现跨项目的样式复用
    require("./ginlon.plugin,"),
  ],
};
