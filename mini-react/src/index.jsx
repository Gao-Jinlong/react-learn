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

  return (
    <div>
      <p>{count}</p>
      <button onClick={handClick}>count++</button>
    </div>
  );
}

render(<App />, document.getElementById("root"));
