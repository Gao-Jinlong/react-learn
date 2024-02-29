const { TinyColor } = require("@ctrl/tinycolor");

let color = new TinyColor("red");
console.log(color.toHexString()); // #ff0000
console.log(color.toHslString()); // hsl(0, 100%, 50%)
console.log(color.toRgb());
console.log();

color = new TinyColor("#00ff00");

console.log(color.toHex());
console.log(color.toHsl());
console.log(color.toRgb());
console.log();

color = new TinyColor({ r: 0, g: 0, b: 255 });

console.log(color.toHex());
console.log(color.toHsl());
console.log(color.toRgb());
console.log();
