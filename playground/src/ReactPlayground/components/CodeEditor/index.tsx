import FileNameList from "./FileNameList";
import Editor from "./Editor";

export default function CodeEditor() {
  const file = {
    name: "index.tsx",
    value: `import lodash from "lodash"; \n\nconst a = <div>ginlon</div>`,
    language: "typescript",
  };

  function onEditorChange(...args: unknown[]) {
    console.log(...args);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
}
