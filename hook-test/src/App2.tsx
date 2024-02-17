import { useEffect, useLayoutEffect, useState } from "react";

async function queryData() {
  const data = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(666);
    }, 2000);
  });

  return data;
}

function App() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    queryData().then((data) => {
      setNum(data);
    });
  }, [Date.now()]); // 不传入空数组，每次渲染都会执行，传入空数组，只会执行一次。传入变量，只有变量变化时才会执行

  useEffect(() => {
    console.log("effect");
    const timer = setInterval(() => {
      console.log("setInterval", num);
    }, 1000);

    // 返回一个函数，用于清除副作用，保证同时只有一个副作用在执行
    return () => {
      console.log("clean up");
      clearInterval(timer);
    };
  }, [num]);

  // useLayoutEffect 作用与 useEffect 类似，区别是 useLayoutEffect 的副作用是同步执行的，而 useEffect 是异步执行的
  // 因此 useLayoutEffect 会阻塞浏览器渲染，但不会出现闪烁
  useLayoutEffect(() => {
    queryData().then((data) => {
      setNum(data);
    });
  }, [Date.now()]);

  return <div onClick={() => setNum((pre) => pre + 1)}>{num}</div>;
}

export default App;
