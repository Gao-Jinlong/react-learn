import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import "./index.scss";

interface MaskProps {
  element: HTMLElement;
  container?: HTMLElement;
  renderMaskContent?: (wrapper: React.ReactNode) => React.ReactNode;
}
export const Mask: React.FC<MaskProps> = (props) => {
  const { element, renderMaskContent, container } = props;

  const [style, setStyle] = useState<CSSProperties>({});

  function updateStyleByAnimationFrame() {
    let animationId = 0;
    function updateStyle() {
      if (element) {
        const style = getMaskStyle(
          element,
          container || document.documentElement
        );
        setStyle(style);
      }
    }

    return () => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        updateStyle();
        animationId = 0;
      });
    };
  }

  const updateStyleWrapper = useCallback(updateStyleByAnimationFrame(), [
    container,
    element,
  ]);

  useEffect(updateStyleWrapper, [container, element]);

  window.addEventListener("resize", updateStyleWrapper);

  const getContent = () => {
    if (!renderMaskContent) {
      return null;
    }

    return renderMaskContent(
      <div
        className={"mask-content"}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    );
  };

  return (
    <div style={style} className="mask">
      {getContent()}
    </div>
  );
};

function getMaskStyle(
  element: HTMLElement,
  container: HTMLElement
): CSSProperties {
  const { left, top, bottom, right } = element.getBoundingClientRect();

  const elementTopWithScroll = container.scrollTop + top;
  const elementLeftWithScroll = container.scrollLeft + left;

  return {
    width: container.scrollWidth,
    height: container.scrollHeight,
    borderTopWidth: Math.max(elementTopWithScroll, 0),
    borderLeftWidth: Math.max(elementLeftWithScroll, 0),
    borderBottomWidth: Math.max(
      container.scrollHeight - bottom,
      elementTopWithScroll,
      0
    ),
    borderRightWidth: Math.max(
      container.scrollWidth - right,
      elementLeftWithScroll,
      0
    ),
  };
}
