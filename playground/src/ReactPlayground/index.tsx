import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import Header from "./components/Header";

export default function ReactPlayground() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
