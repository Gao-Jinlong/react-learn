import type { ComponentDto } from "../../interface";
import { createPortal } from "react-dom";
import { theme, Divider, message, Button } from "antd";
import { useMemo } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useComponentsStore } from "../../stores/components";

export interface HoverComponentPanel {
  hoverComponent?: ComponentDto;
  container: HTMLElement;
}
export default function HoverComponentPanel({
  hoverComponent,
  container,
}: HoverComponentPanel) {
  const { token } = theme.useToken();

  const { removeComponent, editComponent, setEditComponent } =
    useComponentsStore();
  const { undo } = useComponentsStore.temporal.getState();

  const isShow = useMemo(() => !!hoverComponent, [hoverComponent]);

  const position = useMemo(() => {
    if (!hoverComponent || !container)
      return { left: 0, top: 0, width: 0, height: 0 };

    const node = document.querySelector(
      `[data-component-id="${hoverComponent.id}"]`,
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
  }, [hoverComponent, container]);

  function handleDelete() {
    if (!hoverComponent) return;
    removeComponent(hoverComponent.id);
    successDelete();
  }

  function successDelete() {
    let isUndo = false;
    message.success({
      key: "delete-success",
      content: (
        <div className="css-var-r1 flex items-center">
          删除成功
          <Button
            onClick={() => {
              if (isUndo) return;
              handleUndo();
              isUndo = true;
            }}
            disabled={isUndo}
            type="link"
            size="small"
          >
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
        className="css-var-r1 pointer-events-none flex justify-center border border-dashed border-[--ant-color-primary] transition-all duration-150"
      >
        <div
          className="pointer-events-auto flex h-5 items-center justify-center rounded-b-md px-2 text-[12px] text-white"
          style={{
            background: token.colorPrimary,
          }}
        >
          <div>{hoverComponent?.name}</div>
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
        </div>
      </div>
    ) : null,
    container,
  );
}
