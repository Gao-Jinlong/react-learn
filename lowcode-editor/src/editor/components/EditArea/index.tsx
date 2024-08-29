import React from "react";
import { useComponentsStore } from "../../stores/components";
import type {
  ComponentDto,
  ComponentEnum,
  ComponentPropsList,
  RenderComponentDto,
} from "../../interface";
import { componentConfig } from "../../config";
export default function EditArea() {
  const { components } = useComponentsStore();

  function renderComponents(components: ComponentDto[]): React.ReactNode {
    return components.map((component) => {
      const config = componentConfig[component.name];
      const Component = config.component as React.FunctionComponent<
        ComponentPropsList[ComponentEnum]
      >;
      if (!Component) {
        return null;
      }
      const props = transformPropsToRender(component);
      return React.createElement(
        Component,
        {
          key: component.id,
          ...props,
        },
        renderComponents(component.children || []),
      );
    });
  }

  return (
    <div className="h-[100%]">
      <pre>{JSON.stringify(components, null, 2)}</pre>
      {renderComponents(components)}
    </div>
  );
}

function transformPropsToRender(dto: ComponentDto): RenderComponentDto {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { props, children, ...rest } = dto;

  return {
    ...props,
    ...rest,
  };
}
