import { create } from "zustand";
import {
  ComponentEnum,
  type ComponentDto,
  type ComponentId,
  type ComponentPropsUnion,
  type EditableProps,
  type ComponentConfig,
} from "../interface";
import { generateId } from "../utils";

interface State {
  components: ComponentDto[];
  hoverComponent: ComponentDto | null;
}
interface Action {
  addComponent: (component: ComponentConfig, parentId?: ComponentId) => void;
  removeComponent: (id: ComponentId) => void;
  updateComponentProps: (id: ComponentId, props: ComponentPropsUnion) => void;
  setHoverComponent: (componentId: ComponentId | null) => void;
}

export const useComponentsStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: generateId(),
      name: ComponentEnum.Page,
      props: {},
      desc: "页面",
      children: [],
    },
  ],
  hoverComponent: null,

  setHoverComponent: (componentId: ComponentId | null) => {
    set(() => ({
      hoverComponent: getComponentById(componentId, get().components),
    }));
  },
  addComponent: (
    createComponentDto: ComponentConfig,
    parentId?: ComponentId,
  ) => {
    set((state) => {
      const { defaultProps, ...rest } = createComponentDto;
      const component: ComponentDto = {
        ...rest,
        props: { ...defaultProps },
        id: generateId(),
      };
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
  removeComponent: (componentId: ComponentId) => {
    if (!componentId) return;
    const component = getComponentById(componentId, get().components);
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components,
      );

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(
          (item) => item.id !== componentId,
        );

        set({ components: [...get().components] });
      }
    }
  },
  updateComponentProps: (
    componentId: ComponentId,
    props: EditableProps<Partial<ComponentPropsUnion>>,
  ) =>
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
  components: ComponentDto[],
): ComponentDto | null {
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
