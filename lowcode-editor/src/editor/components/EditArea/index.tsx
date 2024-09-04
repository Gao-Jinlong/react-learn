import React from "react";
import { useComponentsStore } from "../../stores/components";
import {
  type ComponentDto,
  type ComponentEnum,
  type ComponentPropsList,
  type RenderComponentDto,
} from "../../interface";
import { componentByEnum, editComponentSetting } from "../../config";
import HoverComponentPanel from "../HoverComponentPanel";
import EditComponentToolbox from "../EditComponentToolbox";

export default function EditArea() {
  const {
    components,
    hoverComponent,
    setHoverComponent,
    editComponent,
    setEditComponent,
  } = useComponentsStore();

  function renderComponents(components: ComponentDto[]): React.ReactNode {
    return components.map((component) => {
      const config = editComponentSetting[component.name];
      const Component = componentByEnum[config.name] as React.FunctionComponent<
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

  function handleMouseOver(e: React.MouseEvent<HTMLDivElement>) {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i++) {
      const element = path[i] as HTMLDivElement;

      const componentId = element.dataset?.componentId;

      if (componentId) {
        setHoverComponent(componentId);
        return;
      }
    }

    setHoverComponent(undefined);
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i++) {
      const element = path[i] as HTMLDivElement;

      const componentId = element.dataset?.componentId;

      if (componentId) {
        if (editComponent?.id === componentId) {
          setEditComponent(undefined);
        } else {
          setEditComponent(componentId);
        }
        return;
      }
    }

    setEditComponent(undefined);
  }

  return (
    <>
      <div
        className="h-[100%]"
        onMouseOver={handleMouseOver}
        onClick={handleClick}
      >
        {renderComponents(components)}
      </div>
      <HoverComponentPanel
        container={document.body}
        hoverComponent={hoverComponent}
      />
      <EditComponentToolbox
        container={document.body}
        editComponent={editComponent}
      />
    </>
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
