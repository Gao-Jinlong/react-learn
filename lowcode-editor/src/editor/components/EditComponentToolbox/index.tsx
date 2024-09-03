import { ComponentEnum, type ComponentDto } from "../../interface";
import { createPortal } from "react-dom";
import {
  theme,
  Divider,
  message,
  Button,
  Dropdown,
  type MenuProps,
} from "antd";
import { useMemo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useComponentsStore } from "../../stores/components";

export interface HoverComponentPanel {
  editComponent?: ComponentDto;
  container: HTMLElement;
}
export default function HoverComponentPanel({
  editComponent,
  container,
}: HoverComponentPanel) {
  const { token } = theme.useToken();

  const { removeComponent } = useComponentsStore();
  const { undo } = useComponentsStore.temporal.getState();

  const isShow = useMemo(() => !!editComponent, [editComponent]);

  const position = useMemo(() => {
    if (!editComponent || !container)
      return { left: 0, top: 0, width: 0, height: 0 };

    const node = document.querySelector(
      `[data-component-id="${editComponent.id}"]`,
    );
    if (!node) return { left: 0, top: 0, width: 0, height: 0 };

    const { left, top, width, height } = node.getBoundingClientRect();
    const { left: containerLeft, top: containerTop } =
      container.getBoundingClientRect();

    return {
      left: left - containerLeft,
      top: top - containerTop,
      width,
      height,
    };
  }, [editComponent, container]);

  const dropdownMenu = useMemo(() => {
    const menuItems: MenuProps["items"] = [];

    let recuresion = editComponent;
    while (recuresion?.parent) {
      menuItems.push({
        key: recuresion.id,
        label: recuresion.name,
      });
      recuresion = recuresion.parent;
    }

    return menuItems;
  }, [editComponent]);

  function handleDelete() {
    if (!editComponent) return;
    removeComponent(editComponent.id);
    // successDelete();
  }

  function successDelete() {
    message.success({
      key: "delete-success",
      content: (
        <div className="flex items-center">
          删除成功
          <Button onClick={handleUndo} type="link" size="small">
            撤销
          </Button>
        </div>
      ),
    });
  }

  function handleUndo() {
    message.destroy("delete-success");
    undo();
  }

  return createPortal(
    isShow ? (
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          left: position.left,
          top: position.top,
          width: position.width,
          height: position.height,
        }}
        className="css-var-r1 pointer-events-none flex justify-start border border-solid border-[--ant-color-primary] transition-all duration-150"
      >
        <div
          className="pointer-events-auto flex h-5 items-center justify-center px-2 text-[12px] text-white"
          style={{
            background: token.colorPrimary,
          }}
        >
          <div>{editComponent?.name}</div>

          {editComponent?.name !== ComponentEnum.Page && (
            <>
              <Divider
                type="vertical"
                style={{
                  borderColor: "#fff",
                }}
              />
              <DeleteOutlined
                className="cursor-pointer hover:text-[var(--ant-red)]"
                onClick={handleDelete}
              />
              {/* <Dropdown menu={dropdownMenu}></Dropdown> */}
            </>
          )}
        </div>
      </div>
    ) : null,
    container,
  );
}
