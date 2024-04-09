import { useState } from "react";
import "./App2.css";

interface CardItem {
  id: number;
  content: string;
}
interface CardProps {
  data: CardItem;
}

function Card(props: CardProps) {
  const { data } = props;
  return <div className="card">{data.content}</div>;
}

function App() {
  const [cardList, setCardList] = useState<CardItem[]>([
    { id: 0, content: "Card 0" },
    { id: 1, content: "Card 1" },
    { id: 2, content: "Card 2" },
    { id: 3, content: "Card 3" },
  ]);

  return (
    <div className="card-list">
      {cardList.map((item: CardItem) => (
        <Card data={item} key={"card_" + item.id} />
      ))}
    </div>
  );
}

export default App;
