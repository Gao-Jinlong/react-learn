import { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import "./App2.css";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, text: "ginlon" },
    { id: 2, text: "ginlon" },
  ]);

  const transitions = useTransition(items, {
    initial: { transform: "translate3d(0%,0,0", opacity: 1 },
    from: { transform: "translate3d(100%,0,0)", opacity: 0 },
    enter: { transform: "translate3d(0%,0,0)", opacity: 1 },
    leave: { transform: "translate3d(-100%,0,0)", opacity: 0 },
  });

  return (
    <div>
      <div className="item-box">
        {transitions((style, i) => {
          return (
            <animated.div className="item" style={style}>
              <span
                className="del-btn"
                onClick={() => {
                  setItems(items.filter((item) => item.id !== i.id));
                }}
              >
                x
              </span>
              {i.text}
            </animated.div>
          );
        })}
      </div>

      <div
        className="btn"
        onClick={() => {
          setItems([...items, { id: Date.now(), text: "ginlon" }]);
        }}
      >
        Add
      </div>
    </div>
  );
}
