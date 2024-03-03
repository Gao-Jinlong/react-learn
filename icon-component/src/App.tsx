import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { IconAdd, IconEmail } from "./Icon/icons/";
import { createFromIconfont } from "./Icon/createFrontIconFont";

const IconFont = createFromIconfont(
  "//at.alicdn.com/t/c/font_4451847_tikhmlzr9vf.js"
);
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <IconAdd color="blue" size="40px" spin></IconAdd>
      <IconEmail style={{ color: "red", fontSize: "60px" }}></IconEmail>
      <div style={{ padding: "50px" }}>
        <IconFont type="icon-xihuan"></IconFont>
        <IconFont type="icon-shouye-zhihui"></IconFont>
      </div>
    </div>
  );
}

export default App;
