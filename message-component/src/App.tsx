import { useRef } from "react";
import "./App.css";
import { MessageProvider, MessageRef } from "./Message";
import { useMessage } from "./Message/useMesage";
import { ConfigProvider } from "./Message/ConfigProvider";

function Aaa() {
  const message = useMessage();

  return (
    <button
      onClick={() => {
        message.add({
          content: "请求成功",
        });
      }}
    >
      成功
    </button>
  );
}

function App() {
  const messageRef = useRef<MessageRef>(null);

  return (
    <>
      <div>
        <MessageProvider ref={messageRef}></MessageProvider>
        <button
          onClick={() => {
            messageRef.current?.add({
              content: "请求成功",
            });
          }}
        >
          成功
        </button>
      </div>

      <ConfigProvider>
        <Aaa></Aaa>
      </ConfigProvider>
    </>
  );
}

export default App;
