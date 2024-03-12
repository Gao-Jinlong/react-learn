import { CSSProperties, FC, ReactNode, useEffect } from "react";
import useStore from "./useStore";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./index.scss";
export type Position = "top" | "bottom";

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode;
  duration?: number;
  id?: number;
  position?: Position;
}

export const MessageProvider: FC<{}> = (props) => {
  const { messageList, add, update, remove, clearAll } = useStore("top");

  useEffect(() => {
    setInterval(() => {
      add({
        content: Math.random().toString().slice(2, 8),
      });
    }, 2000);
  });

  const positions = Object.keys(messageList) as Position[];

  return (
    <div className="message-wrapper">
      {positions.map((direction) => {
        return (
          <TransitionGroup
            className={`message-wrapper-${direction}`}
            key={direction}
          >
            {messageList.top.map((item) => {
              return (
                <CSSTransition
                  key={item.id}
                  timeout={1000}
                  classNames="message"
                >
                  <div
                    className="message-item"
                    style={{
                      width: 100,
                      lineHeight: "30px",
                      border: "1px solid #000",
                      margin: "20px",
                    }}
                  >
                    {item.content}
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        );
      })}
    </div>
  );
};
