import { Dropdown, Tooltip, type MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useComponentsStore } from "../../stores/components";
import { useContext } from "react";
import { EditContext } from "../EditContext";

export default function EditComponentToolboxMenu() {
  const { setEditComponent } = useComponentsStore();
  const { dropdownMenu } = useContext(EditContext)!;

  const handleChangeEditComponent: MenuProps["onClick"] = (selectInfo) => {
    const { key } = selectInfo;
    setEditComponent(key);
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "",
            label: "层级选择",
            children: dropdownMenu,
          },
        ],
        onClick: handleChangeEditComponent,
      }}
      trigger={["click"]}
    >
      <Tooltip title={"更多"} arrow={false}>
        <MoreOutlined className="cursor-pointer" />
      </Tooltip>
    </Dropdown>
  );
}
