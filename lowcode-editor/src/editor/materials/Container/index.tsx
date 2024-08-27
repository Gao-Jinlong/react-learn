import { useDrop } from "react-dnd";
import type { BaseComponentProps } from "../../interface";

export interface ContainerProps extends BaseComponentProps {}

export default function Container({ children }: ContainerProps) {
  const [{ canDrop }, drop] = useDrop({
    accept: ["Button", "Container"],
    drop: () => {
      console.log("drop");
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={drop}
      className="min-h-[100px] border border-[#000] p-[20px]"
      style={{
        border: canDrop ? "2px solid red" : "1px solid #000",
      }}
    >
      {children}
    </div>
  );
}
