import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ConfigProvider } from "antd";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={{ cssVar: true, hashed: false }}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ConfigProvider>
  </StrictMode>,
);
