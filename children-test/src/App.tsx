import React, { FC, useEffect } from "react";
import "./App.css";

interface AaaProps {
  children: React.ReactNode;
}
const Aaa: FC<AaaProps> = (props) => {
  const { children } = props;

  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    const count = React.Children.count(children);

    console.log("count", count);

    React.Children.forEach(children, (item, index) => {
      console.log("item" + index, item);
    });

    // const first = React.Children.only(children); // React.Children.only expected to receive a single React element child.

    // console.log("first", first);
  }, []);

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

interface RowListProps {
  children?: React.ReactNode;
}

const RowList: FC<RowListProps> = (props) => {
  const { children } = props;

  return (
    <div className="row-list">
      {React.Children.map(children, (item) => {
        return <div className="row">{item}</div>;
      })}
    </div>
  );
};

function App() {
  return (
    <RowList>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </RowList>
  );
}

export default App;
