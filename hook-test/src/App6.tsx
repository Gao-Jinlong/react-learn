import { memo, useCallback, useEffect, useMemo, useState } from "react";

function Aaa() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setNum(Math.random());
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  });

  // // 当 function 作为 props 传递时，会导致子组件重新渲染，因为每次 render 都会创建新的 function
  // function bbbCallback() {
  //   // xxx
  // }

  // 使用 useCallback 保持 function 的引用不变，只有当依赖改变时，才会重新创建 function
  const bbbCallback = useCallback(function () {
    // xxx
  }, []);

  const [count, setCount] = useState(0);
  const memoCount = useMemo(() => {
    return count * 10;
  }, [count]);

  return (
    <div>
      <div>{num}</div>
      <MemoBbb count={memoCount} callback={bbbCallback}></MemoBbb>
    </div>
  );
}

interface BbbProps {
  count: number;
  callback: Function;
}
function Bbb(props: BbbProps) {
  console.log("bbb render");
  return <div>{props.count}</div>;
}
// 仅当 props 改变时，才会重新渲染
const MemoBbb = memo(Bbb);
export default Aaa;
