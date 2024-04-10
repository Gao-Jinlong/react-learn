import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

export default function Item() {
  const ref = useRef<HTMLDivElement>(null);

  const [{ dragging }, drag] = useDrag({
    type: "list-item",
    item: {},
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    drag(ref);
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(
        "h-100 border-2 border-black bg-blue-300 p-2",
        "flex justify-start items-center",
        "text-xl tracking-wide",
        dragging ? "bg-white border-dashed" : ""
      )}
    >
      <input type="checkbox" className="w-8 h-8 mr-2" />
      <p>待办事项</p>
    </div>
  );
}
