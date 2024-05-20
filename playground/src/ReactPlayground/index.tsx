import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function ReactPlayground() {
  return (
    <div style={{ height: "100vh" }}>
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <div>111</div>
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <div>222</div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
