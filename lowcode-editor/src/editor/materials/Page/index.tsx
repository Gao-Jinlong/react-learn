import { theme } from "antd";
import { useDrop } from "react-dnd";
import { useComponentConfigStore } from "../../stores/component-config";
import { useComponentsStore } from "../../stores/components";
import { generateId } from "../../utils";
import type { BaseComponentProps, ComponentEnum } from "../../interface";

const { useToken } = theme;

export interface PageProps extends BaseComponentProps {}

export default function Page({ id, children }: PageProps) {
  const { token } = useToken();
  const { addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [{ canDrop }, drop] = useDrop({
    accept: ["Container", "Button"],
    drop: handleDrop,
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  function handleDrop(item: { type: ComponentEnum }) {
    const props = componentConfig[item.type].defaultProps;

    addComponent(
      {
        id: generateId(),
        name: item.type,
        props,
      },
      id,
    );
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
