import type { ComponentDto } from "../../interface";
import { createPortal } from "react-dom";
import { theme } from "antd";
import { useMemo } from "react";

export interface HoverComponentPanel {
  hoverComponent: ComponentDto;
  container: HTMLElement;
}
export default function HoverComponentPanel({
  hoverComponent,
  container,
}: HoverComponentPanel) {
  const { token } = theme.useToken();

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
        className="css-var-r1 pointer-events-none flex justify-center border border-solid border-[--ant-color-primary] transition-all duration-150"
      >
        <div
          className="h-5 rounded-b-md px-2 text-[12px] text-white"
          style={{
            background: token.colorPrimary,
          }}
        >
          {hoverComponent.name}
        </div>
      </div>
    ) : null,
    container,
  );
}
