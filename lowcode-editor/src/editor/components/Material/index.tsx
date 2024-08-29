import { useMemo } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import MaterialItem from "../MaterialItem";
import type { ComponentConfig } from "../../interface";

export default function Material() {
  const { componentConfig } = useComponentConfigStore();

  const components: ComponentConfig[] = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      {components.map((item) => {
        return <MaterialItem key={item.name} {...item} />;
      })}
    </div>
  );
}
