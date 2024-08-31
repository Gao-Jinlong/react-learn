import { useDrop, type DropTargetMonitor } from "react-dnd";
import { type BaseComponentProps, type ComponentConfig } from "../../interface";
import { handleDropWrapper } from "../../utils/dndUtils";
import classNames from "classnames";

export interface EditorComponentWrapperProps extends BaseComponentProps {
  className?: string;
  dropOptions?: Exclude<Parameters<typeof useDrop>[0], () => void>;
  handleDrop?: (item: ComponentConfig, monitor: DropTargetMonitor) => void;
}
export default function EditorComponentWrapper({
  children,
  handleDrop,
  className,
  dropOptions,
  id,
}: EditorComponentWrapperProps) {
  const [{ canDrop, isOverCurrent }, drop] = useDrop(
    {
      accept: dropOptions?.accept || [],
      drop: handleDrop && handleDropWrapper(handleDrop),
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    },
    [],
  );

  return (
    <div
      ref={drop}
      data-component-id={id}
      className={classNames(
        {
          "can-drop": canDrop,
          "over-current": canDrop && isOverCurrent,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
