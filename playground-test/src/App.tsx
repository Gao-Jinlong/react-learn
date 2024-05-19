import { useRef } from "react";
import { transform } from "@babel/standalone";
import type { PluginObj } from "@babel/core";
import "./App.css";

function App() {
  const code1 = `
  function add(a, b) {
      return a + b;
  }
  export { add };
  `;

  const url = URL.createObjectURL(
    new Blob([code1], { type: "text/javascript" })
  );

  const transformImportSOurcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url;
      },
    },
  };

  const code = `import { add } from './add.ts'; console.log(add(2, 3));`;

  function onClick() {
    const res = transform(code, {
      presets: ["react", "typescript"],
      filename: "test.tsx",
      plugins: [transformImportSOurcePlugin],
    });

    console.log(res.code);
  }

  return (
    <div>
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
