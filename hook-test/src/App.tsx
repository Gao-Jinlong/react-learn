import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [num, setNum] = useState(1);

  return (
    <div>
      <div onClick={() => setNum(num + 1)}>{num}</div>
      <div onClick={() => setNum((pre) => pre + 1)}>{num}</div>
    </div>
  );
}

export default App;
