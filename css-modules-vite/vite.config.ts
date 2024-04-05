import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // generateScopedName: "ginlon_[name]__[local]___[hash:base64:5]",
      generateScopedName: function (name, filename, css) {
        console.log(name, filename, css);

        return "ginlon_" + name + "__" + Math.random().toString(34).slice(2, 7);
      },
      getJSON: function (filename, json) {
        console.log(filename, json);
      },
      exportGlobals: true, // 默认不会导出 :global() 全局样式，改为 true 后会导出
      scopeBehaviour: "local", // 默认为 local，可选 global，local 会将全局样式转为局部样式
      globalModulePaths: [/index\.global\.(css|scss|sass)$/], // 默认为 [], 匹配到的文件会被视为全局样式
      localsConvention: "camelCase", // 导出的类名格式
    },
  },
});
