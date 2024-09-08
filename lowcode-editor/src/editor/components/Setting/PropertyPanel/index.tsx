import { Collapse } from "antd";
import BasePropsEditor from "../BasePropsEditor";
import { useState } from "react";

export default function PropertyPanel() {
  const [activeKey] = useState(["baseProps"]);

  return (
    <div className="flex h-full flex-col gap-2 overflow-auto">
      <Collapse defaultActiveKey={activeKey}>
        <Collapse.Panel header="基础属性" key="baseProps">
          <BasePropsEditor />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
