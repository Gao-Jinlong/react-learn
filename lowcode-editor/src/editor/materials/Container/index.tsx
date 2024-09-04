import {
  ComponentEnum,
  type BaseComponentProps,
  type ComponentConfig,
} from "../../interface";
import { useComponentsStore } from "../../stores/components";
import EditorComponentWrapper from "../../components/EditorComponentWrapper";
import classNames from "classnames";

export interface ContainerProps extends BaseComponentProps {}

export default function Container(props: ContainerProps) {
  const { id, children } = props;
  const { addComponent } = useComponentsStore();

  function handleDrop(item: ComponentConfig) {
    addComponent(item, id);
  }

  return (
    <EditorComponentWrapper
      handleDrop={handleDrop}
      className={classNames(
        "component-container relative m-1 min-h-[100px] border border-dashed border-[var(--ant-color-border)]",
        "bg-[var(--ant-color-bg-layout)] p-1 text-[var(--ant-color-text-quaternary)]",
        "after:pointer-events-none after:absolute after:inset-0 after:flex after:items-center after:justify-center after:content-['容器']",
        "has-[*]:border-none has-[*]:bg-transparent has-[*]:after:content-['']",
      )}
      dropOptions={{ accept: [ComponentEnum.Button, ComponentEnum.Container] }}
      {...props}
    >
      {children}
    </EditorComponentWrapper>
  );
}
