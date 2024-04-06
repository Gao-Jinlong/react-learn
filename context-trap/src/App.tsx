import {
  createContext,
  FC,
  memo,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import "./App.css";

interface ContextType {
  aaa: number;
  bbb: number;
  ccc: number;

  setAaa: (aaa: number) => void;
  setBbb: (bbb: number) => void;
  setCcc: (ccc: number) => void;
}

const context = createContext<ContextType>({
  aaa: 0,
  bbb: 0,
  ccc: 0,
  setAaa: () => {},
  setBbb: () => {},
  setCcc: () => {},
});

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [aaa, setAaa] = useState(0);
  const [bbb, setBbb] = useState(0);
  const [ccc, setCcc] = useState(0);

  return (
    <context.Provider
      value={{
        aaa,
        bbb,
        ccc,
        setAaa,
        setBbb,
        setCcc,
      }}
    >
      {children}
    </context.Provider>
  );
};

const Aaa = () => {
  const { aaa, setAaa } = useContext(context);

  console.log("Aaa render");

  return (
    <div>
      aaa:{aaa}
      <button onClick={() => setAaa(aaa + 1)}>aaa++</button>
    </div>
  );
};

const Bbb = () => {
  const { bbb, setBbb } = useContext(context);

  console.log("Bbb render");

  return (
    <div>
      bbb:{bbb}
      <button onClick={() => setBbb(bbb + 1)}>bbb++</button>
    </div>
  );
};

interface CccProps {
  ccc: number;
  setCcc: (ccc: number) => void;
}
const Ccc = memo((props: CccProps) => {
  const { ccc, setCcc } = props;

  console.log("Ccc render");

  return (
    <div>
      ccc:{ccc}
      <button onClick={() => setCcc(ccc + 1)}>ccc++</button>
    </div>
  );
});
const WrappedCcc = () => {
  const { ccc, setCcc } = useContext(context);
  return <Ccc ccc={ccc} setCcc={setCcc}></Ccc>;
};

/**
 * 修改 Aaa 组件的 aaa 状态，Bbb 组件也会重新渲染
 *
 * 依赖同一个 context，修改 context 的值，会导致所有使用了 context 的组件重新渲染
 *
 * 解决方案
 * 1. 分开两个 context，分别给 Aaa 和 Bbb 组件使用
 * 2. 使用状态管理库，如 zustand 维护业务状态
 * 3. 使用 memo 包裹组件，减少不必要的渲染
 */
function App() {
  return (
    <>
      <Provider>
        <Aaa></Aaa>
        <Bbb></Bbb>
        <WrappedCcc></WrappedCcc>
      </Provider>
    </>
  );
}

export default App;
