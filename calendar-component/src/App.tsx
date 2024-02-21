import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./Calendar";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs("2024-02-21")}></Calendar>
    </div>
  );
}

export default App;
