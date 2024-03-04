import classNames from "classnames";
import React from "react";
import "./index.scss";
import { ConfigContext } from "./ConfigProvider";
export type SizeType = "small" | "middle" | "large" | number | undefined;
export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  style?: React.CSSProperties;
  size?: SizeType | [SizeType, SizeType];
  direction?: "horizontal" | "vertical";
  align?: "start" | "end" | "center" | "baseline";
  split?: React.ReactNode;
  wrap?: boolean;
}

const Space: React.FC<SpaceProps> = (props) => {
  const { space } = React.useContext(ConfigContext);
  const {
    className,
    style,
    children,
    size = space?.size || "small",
    direction = "horizontal",
    align,
    split,
    wrap = false,
    ...otherProps
  } = props;

  const childNodes = React.Children.toArray(props.children);

  const mergedAlign =
    direction === "horizontal" && align === undefined ? "center" : align;
  const cn = classNames(
    "space",
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign,
    },
    className
  );

  const otherStyle: React.CSSProperties = {};

  const [horizontalSize, verticalSize] = React.useMemo(
    () =>
      (Array.isArray(size) ? size : ([size, size] as [SizeType, SizeType])).map(
        (item) => getNumberSize(item)
      ),
    [size]
  );

  otherStyle.columnGap = horizontalSize;
  otherStyle.rowGap = verticalSize;

  if (wrap) {
    otherStyle.flexWrap = "wrap";
  }

  const nodes = childNodes.map((child: any, i) => {
    const key = (child && child.key) || `space-item-${i}`;

    return (
      <>
        <div className="space-item" key={key}>
          {child}
        </div>
        {i < childNodes.length && split && (
          <div className="space-split" key={`space-split-${i}`}>
            {split}
          </div>
        )}
      </>
    );
  });

  return (
    <div
      className={cn}
      style={{
        ...otherStyle,
        ...style,
      }}
      {...otherProps}
    >
      {nodes}
    </div>
  );
};

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};
function getNumberSize(size: SizeType) {
  return typeof size === "string" ? spaceSize[size] : size;
}
export default Space;
