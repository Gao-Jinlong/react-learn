import type { DropTargetMonitor } from "react-dnd";
import type { ComponentConfig } from "../interface";

export function handleDropWrapper(
  callBack: (item: ComponentConfig, monitor: DropTargetMonitor) => void,
) {
  return (item: ComponentConfig, monitor: DropTargetMonitor) => {
    if (monitor.didDrop()) {
      return;
    }

    return callBack(item, monitor);
  };
}
