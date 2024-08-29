import { theme } from "antd";
import { useDrop } from "react-dnd";
import { useComponentsStore } from "../../stores/components";
import {
  BaseComponentProps,
  ComponentEnum,
  type ComponentConfig,
} from "../../interface";

const { useToken } = theme;

export interface PageProps extends BaseComponentProps {}

export default function Page({ id, children }: PageProps) {
  const { token } = useToken();
  const { addComponent } = useComponentsStore();

  const [{ canDrop }, drop] = useDrop({
    accept: [ComponentEnum.Container, ComponentEnum.Button],
    drop: handleDrop,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  function handleDrop(item: ComponentConfig) {
    addComponent(item, id);
  }

  return (
    <div
      ref={drop}
      style={{
        border: canDrop ? `1px solid ${token.colorPrimaryActive}` : "none",
      }}
      className="box-border h-[100%] p-[20px]"
    >
      {children}
    </div>
  );
}
