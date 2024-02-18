import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

const ChildComponent: React.ForwardRefRenderFunction<HTMLInputElement> = (
  props,
  ref
) => {
  return (
    <div>
      <input ref={ref} />
    </div>
  );
};
// 通过 React.forwardRef 包装函数组件，从而将子组件的 dom 节点暴露给父组件
const WrappedComponent = React.forwardRef(ChildComponent);

interface RefProps {
  aaa: () => void;
}

const ChildComponent2: React.ForwardRefRenderFunction<RefProps> = (
  props,
  ref
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值
  useImperativeHandle(
    ref,
    () => {
      return {
        aaa() {
          inputRef.current?.focus();
        },
      };
    },
    [inputRef]
  );

  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
};
const WrappedComponent2 = React.forwardRef(ChildComponent2);

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("ref", inputRef.current);
    inputRef.current?.focus();
  }, []);

  const numRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  const ImperativeRef = useRef<RefProps>(null);
  useEffect(() => {
    console.log("ImperativeRef", ImperativeRef.current);
    ImperativeRef.current?.aaa();
  }, []);

  return (
    <div>
      <input ref={inputRef} />
      <div
        onClick={() => {
          numRef.current++;
          forceRender(Math.random());
        }}
      >
        {numRef.current}
      </div>

      <div className="App">
        <WrappedComponent ref={inputRef} />
      </div>
      <div>
        <WrappedComponent2 ref={ImperativeRef}></WrappedComponent2>
      </div>
    </div>
  );
}

export default App;
