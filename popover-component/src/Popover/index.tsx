import {
  arrow,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  FloatingArrow,
  autoUpdate,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.scss";
import { createPortal } from "react-dom";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = `${Side}-${Alignment}`;

interface PopoverProps extends PropsWithChildren {
  content: ReactNode;
  trigger?: "hover" | "click";
  placement?: Side | AlignedPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
}

export default function Popover(props: PopoverProps) {
  const {
    open,
    onOpenChange,
    content,
    children,
    trigger = "hover",
    placement = "bottom",
    className = "",
    style,
  } = props;

  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = "wrapper";

    document.body.appendChild(el);
    return el;
  }, []);

  const arrowRef = useRef(null);

  const [isOpen, setIsOpen] = useState(open);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      setIsOpen(open);
      onOpenChange?.(open);
    },
    placement,
    middleware: [
      offset(10),
      flip(),
      shift(),
      // 箭头需要放在位置计算的最后才不会被影响
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const ARROW_WIDTH = 15;
  const ARROW_HEIGHT = 7;
  const arrowX = middlewareData.arrow?.x ?? 0;
  const arrowY = middlewareData.arrow?.y ?? 0;
  const transformX = arrowX + ARROW_WIDTH / 2;
  const transformY = arrowY + ARROW_HEIGHT;

  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      transform: "scale(0)",
    },
    common: ({ side }) => ({
      transformOrigin: {
        top: `${transformX}px calc(100% +${ARROW_HEIGHT}px)`,
        bottom: `${transformY}px ${-ARROW_HEIGHT}px`,
        left: `calc(100% + ${ARROW_HEIGHT}px) ${transformY}px`,
        right: `${-ARROW_HEIGHT}px ${transformX}px`,
      }[side],
    }),
  });

  const interaction =
    trigger === "hover" ? useHover(context) : useClick(context);

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    interaction,
    dismiss,
  ]);

  const floating = isMounted && (
    <div
      className="popover-floating"
      ref={refs.setFloating}
      style={{ ...styles, ...floatingStyles }}
      {...getFloatingProps()}
    >
      {content}
      <FloatingArrow
        ref={arrowRef}
        context={context}
        fill="#fff"
        stroke="#000"
        strokeWidth={1}
        width={ARROW_WIDTH}
        height={ARROW_HEIGHT}
      ></FloatingArrow>
    </div>
  );

  return (
    <>
      <span
        ref={refs.setReference}
        {...getReferenceProps()}
        className={className}
        style={style}
      >
        {children}
      </span>
      {createPortal(floating, el)}
    </>
  );
}
