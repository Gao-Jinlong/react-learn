import { useMemo } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import MaterialItem from "./MaterialItem";
import { ComponentEnum, type ComponentConfig } from "../../interface";

export default function Material() {
  const { componentConfig } = useComponentConfigStore();

  const components: ComponentConfig[] = useMemo(() => {
    return Object.values(componentConfig).filter(
      (item) => item.name !== ComponentEnum.Page,
    );
  }, [componentConfig]);

  return (
    <div>
      {components.map((item) => {
        return <MaterialItem key={item.name} {...item} />;
      })}
    </div>
  );
}
