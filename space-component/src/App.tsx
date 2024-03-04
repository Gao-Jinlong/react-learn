import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Space from "./Space/index";
import { ConfigProvider } from "./Space/ConfigProvider";
function App() {
  return (
    <div>
      <ConfigProvider space={{ size: 50 }}>
        <Space direction="horizontal" align="end" wrap={true}>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </Space>
      </ConfigProvider>
    </div>
  );
}

export default App;
