import FileNameList from "./FileNameList";
import Editor from "./Editor";

export default function CodeEditor() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor />
    </div>
  );
}
