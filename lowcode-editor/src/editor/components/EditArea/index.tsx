import React from "react";
import { useComponentsStore, type Component } from "../../stores/components";

export default function EditArea() {
  const { components } = useComponentsStore();

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component) => {
      const node = component.node;

      if (!node) {
        return null;
      }
      return React.createElement(
        node,
        {
          key: component.id,
          id: component.id,
          name: component.name,
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
