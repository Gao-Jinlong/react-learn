import React, { Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";

const LazyAaa = React.lazy(() => import("./Aaa"));
function App() {
  return (
    <div className="App">
      <Suspense fallback={"loading..."}>
        <LazyAaa></LazyAaa>
      </Suspense>
    </div>
  );
}

export default App;
