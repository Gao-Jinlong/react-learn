import { useComponentsStore } from "../../stores/components";
import {
  BaseComponentProps,
  ComponentEnum,
  type ComponentConfig,
} from "../../interface";
import EditorComponentWrapper from "../../components/EditArea/EditorComponentWrapper";

export interface PageProps extends BaseComponentProps {}

export default function Page(props: PageProps) {
  const { id, children } = props;
  const { addComponent } = useComponentsStore();

  function handleDrop(item: ComponentConfig) {
    addComponent(item, id);
  }

  return (
    <EditorComponentWrapper
      data-component-id={id}
      handleDrop={handleDrop}
      dropOptions={{ accept: [ComponentEnum.Button, ComponentEnum.Container] }}
      className="h-full p-5"
      {...props}
    >
      {children}
    </EditorComponentWrapper>
  );
}
