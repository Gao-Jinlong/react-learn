import { useState } from "react";
import { MessageProps, Position } from "..";

type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

const initialState = {
  top: [],
  bottom: [],
};

function useStore(defaultPosition: Position) {
  const [messageList, setMessageList] = useState<MessageList>({
    ...initialState,
  });

  return {
    messageList,
    add: (messageProps: MessageProps) => {},
    update: (id: number, messageProps: MessageProps) => {},
    remove: (id: number) => {},
    clearAll: () => {},
  };
}

export default useStore;
