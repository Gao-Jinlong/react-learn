import React, { useLayoutEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

async function queryData() {
  const data = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(666);
    }, 2000);
  });

  return data;
}

function App() {
  const [num, setNum] = useState(0);

  useLayoutEffect(() => {
    queryData().then((data) => {
      setNum(data);
    });
  }, []);

  return (
    <div
      className="App"
      onClick={(e) => {
        setNum((prevNum) => prevNum + 1);
      }}
    >
      {num}
    </div>
  );
}

export default App;
