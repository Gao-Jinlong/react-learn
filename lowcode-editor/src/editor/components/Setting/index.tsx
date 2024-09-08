import { useState } from "react";
import { useComponentsStore } from "../../stores/components";
import BasePropsEditor from "./BasePropsEditor";
import { Collapse } from "antd";
export default function Setting() {
  const [activeKey] = useState(["baseProps"]);
  const { editComponent } = useComponentsStore();

  return (
    editComponent && (
      <div className="flex h-full flex-col gap-2 overflow-auto">
        <Collapse defaultActiveKey={activeKey}>
          <Collapse.Panel header="基础属性" key="baseProps">
            <BasePropsEditor />
          </Collapse.Panel>
        </Collapse>
      </div>
    )
  );
}
