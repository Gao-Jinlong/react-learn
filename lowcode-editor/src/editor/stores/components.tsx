import { create } from "zustand";
import { generateId } from "../utils";
import type { ComponentPropsList } from "./component-config";
import {
  ComponentEnum,
  type ComponentId,
  type ComponentProps,
  type EditableProps,
} from "../interface";

export interface Component<N extends ComponentEnum = ComponentEnum> {
  id: ComponentId;
  name: N;
  props: EditableProps<ComponentPropsList[N]>;
  children?: Component[];
  parentId?: ComponentId;
  desc?: string;
}
interface State {
  components: Component[];
}
interface Action {
  addComponent: (component: Component, parentId?: ComponentId) => void;
  removeComponent: (id: ComponentId) => void;
  updateComponentProps: (id: ComponentId, props: ComponentProps) => void;
}

export const useComponentsStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: generateId(),
      name: ComponentEnum.Page,
      props: {},
      desc: "页面",
    },
  ],
  addComponent: (component, parentId) => {
    set((state) => {
      const oldComponent = getComponentById(component.id, state.components);
      if (oldComponent) {
        state.removeComponent(component.id);
      }
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);
        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
        }

        component.parentId = parentId;
        return { components: [...state.components] };
      }
      return { components: [...state.components, component] };
    });
  },
  removeComponent: (componentId) => {
    if (!componentId) return;
    const component = getComponentById(componentId, get().components);
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components,
      );

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(
          (item) => item.id !== +componentId,
        );

        set({ components: [...get().components] });
      }
    }
  },
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    }),
}));

function getComponentById(
  id: ComponentId | null,
  components: Component[],
): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}
