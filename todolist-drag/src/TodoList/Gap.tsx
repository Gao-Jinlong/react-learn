import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";

export default function Gap() {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: "new-item",
      drop(item) {},
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
    };
  });

  useEffect(() => {
    drop(ref);
  }, []);

  const cs = classNames("h-2", isOver ? "bg-red-300" : "");

  return <div ref={ref} className={cs}></div>;
}
