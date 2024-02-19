import React, {
  Reducer,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  // 由于这里的依赖项为空数组，所以只会执行一次并且会保留第一次的 function，而第一次的 function 会保留第一次的 count 形成闭包
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(count);
  //     setCount(count + 1);
  //   }, 1000);
  // }, []);

  // 解法 1 通过函数的方式获取最新的 count
  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(count); // 仍然打印 0
  //     setCount((count) => count + 1); // 通过函数的方式获取最新的 count
  //   }, 1000);
  // }, []);

  // 或者使用 useReducer
  // interface Action {
  //   type: "add" | "minus";
  //   num: number;
  // }
  // function reducer(state: number, action: Action) {
  //   switch (action.type) {
  //     case "add":
  //       return state + action.num;
  //     default:
  //       throw new Error();
  //   }
  // }
  // const [state, dispatch] = useReducer<Reducer<number, Action>>(reducer, 0);

  // useEffect(() => {
  //   console.log(state);

  //   setInterval(() => {
  //     dispatch({ type: "add", num: 1 });
  //   }, 1000);
  // }, []);

  // 解法 2
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log(count);
  //     setCount(count + 1);
  //   }, 1000);

  //   // 此种方法并不合适，因为每次都会重新创建一个定时器，会导致定时器不准确
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [count]);

  // 解法 3
  // const [count, setCount] = useState(0);

  // const updateCount = () => {
  //   console.log(count);
  //   setCount(count + 1);
  // };

  // const ref = useRef(updateCount);

  // useLayoutEffect(() => {
  //   ref.current = updateCount;
  // });

  // // 通过 useRef 来保存函数的引用，然后通过 useLayoutEffect 来更新 ref.current 的值，这样就可以保证每次都是最新的函数
  // // ref.current 值更新不会改变引用，因此不会触发组件重新渲染，适合用来存储渲染过程中的临时数据
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     ref.current();
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };

  useInterval(updateCount, 1000);

  return (
    <div>
      <div>{count}</div>
      {/* <div>{state}</div> */}
    </div>
  );
}
// 封装通用 自定义 hook
function useInterval(fn: Function, time: number) {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  let cleanUpFnRef = useRef<Function>();

  const clean = useCallback(() => {
    cleanUpFnRef.current?.();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      ref.current();
    }, time);

    cleanUpFnRef.current = () => {
      clearInterval(timer);
    };

    return clean;
  }, []);

  return clean;
}
export default App;
