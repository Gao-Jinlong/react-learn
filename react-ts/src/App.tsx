import React, {
  CSSProperties,
  ComponentProps,
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  Reducer,
  useImperativeHandle,
  useReducer,
  useRef,
} from "react";
import "./App.css";

interface AaaProps {
  name: string;
  content: React.ReactNode;
}

const content: JSX.Element = <div>component</div>;

function Aaa(props: AaaProps) {
  return (
    <div>
      aaa, {props.name}
      {props.content}
    </div>
  );
}

interface BbbProps {
  name: string;
  content: React.ReactNode;
}
interface BbbRef {
  aaa: () => void;
}
const Bbb: React.ForwardRefRenderFunction<BbbRef, BbbProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle<BbbRef, { ccc: number } & BbbRef>(
    ref,
    () => {
      return {
        aaa() {
          inputRef.current?.focus();
        },
        ccc: 123,
      };
    },
    [inputRef]
  );

  return (
    <div>
      <div>
        Bbb, {props.name} {props.content}
      </div>
      <div>
        <input ref={inputRef} />
      </div>
    </div>
  );
};
const WrappedBbb = React.forwardRef<BbbRef, BbbProps>(Bbb);

// interface CccProps {
//   name: string;
//   content: ReactNode;
//   children: ReactNode;
// }
type CccProps = PropsWithChildren<{
  name: string;
  content: ReactNode;

  color: CSSProperties["color"];
}>;
function Ccc(props: CccProps) {
  return (
    <div style={{ color: props.color }}>
      ccc {props.name} {props.content}
      <div>{props.children}</div>
    </div>
  );
}

// interface DddProps extends HTMLAttributes<HTMLDivElement> {}
// ComponentProps 效果同上
interface DddProps {
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void;
}
function Ddd(props: DddProps) {
  return <div onClick={props.clickHandler}>ddd</div>;
}

interface TestTypeInterface {
  (props: { name: string; content: React.ReactNode }): JSX.Element;
  aaa: string;
  bbb: number;
}

const testType: TestTypeInterface = (props: {
  name: string;
  content: React.ReactNode;
}): JSX.Element => {
  return (
    <div>
      <h1>{props.name}</h1>
      <div>{props.content}</div>
    </div>
  );
};
testType.aaa = "aaa";
testType.bbb = 123;

testType({
  name: "test",
  content: <div>test</div>,
});

interface Data {
  num: number;
}
type Action = {
  type: "add" | "minus";
  num: number;
};
function reducer(state: Data, action: Action): Data {
  switch (action.type) {
    case "add":
      return {
        num: state.num + action.num,
      };
    case "minus":
      return {
        num: state.num - action.num,
      };
  }
  return state;
}

function App() {
  const domRef = useRef<HTMLDivElement>(null); // 传 null 会将类型推断为 dom, 只能读取

  const valueRef = useRef<{ num: number }>(); // 不传 null 会推断为数据类型, 可以读写

  valueRef.current = { num: 123 };

  const bbbRef = useRef<BbbRef>(null);

  const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, {
    num: 1,
  });
  const [state, setState] = useReducer<Reducer<Data, Action>, string>( // 传入的第二个参数会作为初始化的第一个参数
    reducer,
    "zero",
    (init) => {
      return {
        num: init === "zero" ? 0 : 1,
      };
    }
  );

  return (
    <div>
      <div ref={domRef}></div>
      <Aaa name="ginlon" content={content}></Aaa>
      <WrappedBbb
        name="bbb"
        content={<button>xxx</button>}
        ref={bbbRef}
      ></WrappedBbb>

      <Ccc name="ccc" content={null} color="green">
        <div>children</div>
      </Ccc>

      <Ddd
        // onClick={() => {
        //   console.log("ddd");
        // }}
        clickHandler={(e) => {
          console.log(e);
        }}
      ></Ddd>
    </div>
  );
}

export default App;
