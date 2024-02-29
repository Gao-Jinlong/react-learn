const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addUtilities }) {
  addUtilities({
    ".ginlon": {
      background: "blue",
      color: "yellow",
    },
    ".ginlon-font": {
      fontSize: "30px",
      lineHeight: "1.5",
      letterSpacing: "-0.02em",
    },
  });
});
