import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./components/Header";
import Material from "./components/Material";
import EditArea from "./components/EditArea";
import Setting from "./components/Setting";

export default function Editor() {
  return (
    <div className="flex h-[100vh] flex-col">
      <div className="flex h-[60px] items-center border-b-[1px] border-[#000]">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <div className="h-full w-full bg-red-500">
            <Material />
          </div>
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
