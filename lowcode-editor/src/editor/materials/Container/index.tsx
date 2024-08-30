import { type DropTargetMonitor } from "react-dnd";
import {
  ComponentEnum,
  type BaseComponentProps,
  type ComponentConfig,
} from "../../interface";
import { useComponentsStore } from "../../stores/components";
import EditorComponentWrapper from "../../components/EditorComponentWrapper";

export interface ContainerProps extends BaseComponentProps {}

export default function Container(props: ContainerProps) {
  const { id, children } = props;
  const { addComponent } = useComponentsStore();

  function handleDrop(item: ComponentConfig, monitor: DropTargetMonitor) {
    if (monitor.didDrop()) {
      return;
    }
    addComponent(item, id);
  }

  return (
    <EditorComponentWrapper
      handleDrop={handleDrop}
      dropOptions={{ accept: [ComponentEnum.Button, ComponentEnum.Container] }}
      {...props}
      className="min-h-[100px]"
    >
      {children}
    </EditorComponentWrapper>
  );
}
