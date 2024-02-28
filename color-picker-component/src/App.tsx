import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ColorPickerPanel from "./ColorPicker/ColorPickerPanel";

function App() {
  return (
    <div className="App">
      <ColorPickerPanel
        value={"rgb(123,55,128)"}
        onChange={() => {}}
      ></ColorPickerPanel>
    </div>
  );
}

export default App;
