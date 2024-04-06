import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  arrow,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  FloatingArrow,
  flip,
  shift,
  autoUpdate,
  useTransitionStyles,
} from "@floating-ui/react";
import Popover from "./Popover";

function App() {
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [
      offset(10),
      arrow({
        element: arrowRef,
      }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  // const hover = useHover(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    // hover,
    click,
    dismiss,
  ]);

  const popoverContent = (
    <div>
      ginlon
      <button onClick={() => alert(111)}>111</button>
    </div>
  );

  return (
    <>
      <div
        style={{
          width: 100,
          height: 100,
          border: "1px dashed red",
        }}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        hello
      </div>
      {isOpen && (
        <div
          className="popover-floating"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          ginlonnnnnnnnnnnn
          <FloatingArrow
            ref={arrowRef}
            context={context}
            fill="#fff"
            stroke="#000"
            strokeWidth={1}
          ></FloatingArrow>
        </div>
      )}

      <Popover
        content={popoverContent}
        placement="top"
        trigger="click"
        style={{ margin: "200px" }}
      >
        <div
          style={{
            width: 100,
            height: 50,
            border: "1px dashed red",
          }}
        >
          hover me
        </div>
      </Popover>
    </>
  );
}

export default App;
