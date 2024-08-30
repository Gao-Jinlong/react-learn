import { useComponentsStore } from "../../stores/components";
import {
  BaseComponentProps,
  ComponentEnum,
  type ComponentConfig,
} from "../../interface";
import EditorComponentWrapper from "../../components/EditorComponentWrapper";

export interface PageProps extends BaseComponentProps {}

export default function Page(props: PageProps) {
  const { id, children } = props;
  const { addComponent } = useComponentsStore();

  function handleDrop(item: ComponentConfig) {
    addComponent(item, id);
  }

  return (
    <EditorComponentWrapper
      handleDrop={handleDrop}
      dropOptions={{ accept: [ComponentEnum.Button, ComponentEnum.Container] }}
      {...props}
    >
      {children}
    </EditorComponentWrapper>
  );
}
