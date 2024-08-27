import React from "react";
import { useComponentsStore, type Component } from "../../stores/components";
import { useComponentConfigStore } from "../../stores/component-config";

export default function EditArea() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig[component.name];

      if (!config?.component) {
        return null;
      }
      return React.createElement(
        config.component,
        {
          key: component.id,
          id: component.id,
          ...config.defaultProps,
          ...component.props,
        },
        renderComponents(component.children || []),
      );
    });
  }

  return (
    <div className="h-[100%]">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      {renderComponents(components)}
    </div>
  );
}
