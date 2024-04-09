import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useDrag, useDragLayer, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

interface ItemType {
  color: string;
}
interface BoxProps {
  color: string;
}
function Box(props: BoxProps) {
  const ref = useRef(null);

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: "box",
    item: {
      color: props.color,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    drag(ref);
    dragPreview(getEmptyImage());
  });

  return (
    <div
      className={"box" + (dragging ? " dragging" : "")}
      ref={ref}
      style={{
        backgroundColor: props.color || "blue",
      }}
    ></div>
  );
}

function Container() {
  const [boxes, setBoxes] = useState<ItemType[]>([]);

  const ref = useRef(null);

  const [, drop] = useDrop(() => {
    return {
      accept: "box",
      drop(item: ItemType) {
        setBoxes((prev) => [...prev, item]);
      },
    };
  });

  useEffect(() => {
    drop(ref);
  });

  return (
    <div ref={ref} className="container">
      {boxes.map((item, index) => {
        return (
          <Box color={item.color} key={index}>
            {" "}
          </Box>
        );
      })}
    </div>
  );
}

const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="drag-layer"
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
      }}
    >
      {item.color} drag drag drag
    </div>
  );
};

function App() {
  return (
    <>
      <Container></Container>
      <Box color="blue"></Box>
      <Box color="green"></Box>
      <Box color="yellow"></Box>
      <DragLayer></DragLayer>
    </>
  );
}

export default App;
