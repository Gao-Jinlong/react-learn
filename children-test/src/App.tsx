import React, { FC } from "react";
import "./App.css";

interface AaaProps {
  children: React.ReactNode;
}
const Aaa: FC<AaaProps> = (props) => {
  const { children } = props;

  const childrenArray = React.Children.toArray(children);

  return (
    <div className="container">
      {React.Children.map(children, (item) => {
        return <div className="item">{item}</div>;
      })}

      {childrenArray.map((item) => {
        return <div className="item">{item}</div>;
      })}
    </div>
  );
};

function App() {
  return (
    <Aaa>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Aaa>
  );
}

export default App;
