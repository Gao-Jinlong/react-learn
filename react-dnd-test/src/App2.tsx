import { useCallback, useEffect, useRef, useState } from "react";
import "./App2.css";
import { useDrag, useDrop } from "react-dnd";

interface CardItem {
  id: number;
  content: string;
}
interface CardProps {
  data: CardItem;
  index: number;
  swapIndex: (index1: number, index2: number) => void;
}
interface DragData {
  id: number;
  index: number;
}

function Card(props: CardProps) {
  const { data, swapIndex, index } = props;

  const ref = useRef(null);

  const [{ dragging }, drag] = useDrag({
    type: "card",
    item: {
      id: data.id,
      index: index,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  const [, drop] = useDrop({
    accept: "card",
    hover(item: DragData) {
      swapIndex(item.index, index);
      item.index = index;
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div ref={ref} className={"card" + (dragging ? " dragging" : "")}>
      {data.content}
    </div>
  );
}

function App() {
  const [cardList, setCardList] = useState<CardItem[]>([
    { id: 0, content: "Card 0" },
    { id: 1, content: "Card 1" },
    { id: 2, content: "Card 2" },
    { id: 3, content: "Card 3" },
  ]);

  const swapIndex = useCallback((index1: number, index2: number) => {
    const tmp = cardList[index1];
    cardList[index1] = cardList[index2];
    cardList[index2] = tmp;

    setCardList([...cardList]);
  }, []);

  return (
    <div className="card-list">
      {cardList.map((item: CardItem, index) => (
        <Card
          data={item}
          key={"card_" + item.id}
          index={index}
          swapIndex={swapIndex}
        />
      ))}
    </div>
  );
}

export default App;
