import { FC, useRef } from "react";
import { Color } from "./color";
import React from "react";
import Handler from "./Handler";
import Transform from "./Transform";
import useColorDrag from "./useColorDrag";
import { calculateColor, calculateOffset } from "./utils";

const Palette: FC<{
  color: Color;
  onChange: (color: Color) => void;
}> = ({ color, onChange }) => {
  const transformRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [offset, dragStartHandler] = useColorDrag({
    color,
    calculate: () => {
      return calculateOffset(containerRef, transformRef, color);
    },
    containerRef,
    targetRef: transformRef,
    onDragChange: (offsetValue) => {
      const newColor = calculateColor({
        offset: offsetValue,
        containerRef,
        targetRef: transformRef,
        color,
      });

      onChange?.(newColor);
    },
  });

  return (
    <div
      ref={containerRef}
      className="color-picker-panel-palette"
      onMouseDown={dragStartHandler}
    >
      <Transform ref={transformRef} offset={{ x: offset.x, y: offset.y }}>
        <Handler color={color.toRgbString()}></Handler>
      </Transform>
      <Handler color={color.toRgbString()}></Handler>
      <div
        className="color-picker-panel-palette-main"
        style={{
          backgroundColor: `hsl(${color.toHsl().h}, 100%, 50%)`,
          backgroundImage: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0%))`,
        }}
      ></div>
    </div>
  );
};

export default Palette;
