import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import "./index.scss";

interface MaskProps {
  element: HTMLElement;
  container?: HTMLElement;
  renderMaskContent?: (wrapper: React.ReactNode) => React.ReactNode;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}
export const Mask: React.FC<MaskProps> = (props) => {
  const {
    element,
    renderMaskContent,
    container,
    onAnimationStart,
    onAnimationEnd,
  } = props;

  const [style, setStyle] = useState<CSSProperties>({});

  useEffect(() => {
    onAnimationStart?.();
    const timer = setTimeout(() => {
      onAnimationEnd?.();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [element]);

  useEffect(() => {
    if (!element) {
      return;
    }

    element.scrollIntoView({
      block: "center",
      inline: "center",
    });

    const style = getMaskStyle(element, container || document.documentElement);

    setStyle(style);
  }, [element, container]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const style = getMaskStyle(
        element,
        container || document.documentElement
      );

      setStyle(style);
    });

    observer.observe(container || document.documentElement);
  }, [element, container]);

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
  const rect = element.getBoundingClientRect();
  const { top, left, bottom, right } = rect;

  const elementTopWithScroll = container.scrollTop + top;
  const elementLeftWithScroll = container.scrollLeft + left;
  const elementBottomWithScroll = container.scrollTop + bottom;
  const elementRightWithScroll = container.scrollLeft + right;

  return {
    width: container.scrollWidth,
    height: container.scrollHeight,
    borderTopWidth: Math.max(elementTopWithScroll, 0),
    borderLeftWidth: Math.max(elementLeftWithScroll, 0),
    borderBottomWidth: Math.max(
      container.scrollHeight - elementBottomWithScroll,
      0
    ),
    borderRightWidth: Math.max(
      container.scrollWidth - elementRightWithScroll,
      0
    ),
  };
}
