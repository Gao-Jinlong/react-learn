"use strict";
const { render, useState, useEffect } = window.MiniReact;
function App() {
    const [count, setCount] = useState(0);
    function handClick() {
        setCount((count) => count + 1);
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setCount((count) => count + 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    return (MiniReact.createElement("div", null,
        MiniReact.createElement("p", null, count),
        MiniReact.createElement("button", { onClick: handClick }, "count++")));
}
render(MiniReact.createElement(App, null), document.getElementById("root"));
