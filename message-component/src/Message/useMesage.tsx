import { useContext } from "react";
import { MessageRef } from ".";
import { ConfigContext } from "./ConfigProvider";

export function useMessage(): MessageRef {
  const { messageRef } = useContext(ConfigContext);

  if (!messageRef) {
    throw new Error("MessageProvider is not found");
  }

  return messageRef.current!;
}
