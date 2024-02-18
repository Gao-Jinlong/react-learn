import produce from "immer";
import { Reducer, useReducer, useState } from "react";

interface Data {
  result: number;
}
interface Action {
  type: "add" | "minus";
  num: number;
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      // return {
      //   result: state.result + action.num,
      // };

      // 直接修改 state 会导致组件不更新，因为 state 的引用没有变化，所以需要返回一个新的对象 useState 也是如此
      // state.result += action.num;
      // return state;

      return produce(state, (state) => {
        state.result += action.num;
      });
    case "minus":
      return {
        result: state.result - action.num,
      };
  }

  return state;
}

function App() {
  // 当更新状态逻辑较为复杂时，可以使用 useReducer 抽离出更新逻辑来代替 useState
  // const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, {
  //   result: 0,
  // });
  // overload: useReducer(reducer, initialArg, init) 通过 init 函数初始化 state
  const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(
    reducer,
    "zero",
    (init) => {
      return {
        result: init === "zero" ? 0 : 1,
      };
    }
  );

  const [obj, setObj] = useState({
    a: {
      b: {
        c: {
          d: 1,
        },
      },
    },
  });

  return (
    <div>
      <div onClick={() => dispatch({ type: "add", num: 2 })}>加</div>
      <div onClick={() => dispatch({ type: "minus", num: 2 })}>减</div>
      <div>{res.result}</div>
      <div
        onClick={() => {
          setObj(
            produce(obj, (obj) => {
              obj.a.b.c.d++;
            })
          );
        }}
      >
        state: {obj.a.b.c.d}
      </div>
    </div>
  );
}

export default App;
