import React from "react";
import logo from "./logo.svg";
import "./App.css";
import useCounter from "./useCounter";

function App() {
  const [count, increment, decrement] = useCounter(0);

  return (
    <div className="App">
      <div>{count}</div>
      <div>
        <button onClick={() => increment(1)}>加一</button>
        <button onClick={() => decrement(2)}>减二</button>
      </div>
    </div>
  );
}

export default App;
