import { create, type StateCreator } from "zustand";
import {
  ComponentEnum,
  type ComponentDto,
  type ComponentId,
  type ComponentPropsUnion,
  type EditableProps,
  type ComponentConfig,
} from "../interface";
import { generateId } from "../utils";
import { temporal } from "zundo";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";

interface State {
  components: ComponentDto[];
  hoverComponent?: ComponentDto;
}
interface Action {
  addComponent: (component: ComponentConfig, parentId?: ComponentId) => void;
  removeComponent: (id: ComponentId) => void;
  updateComponentProps: (id: ComponentId, props: ComponentPropsUnion) => void;
  setHoverComponent: (componentId?: ComponentId) => void;
}
export interface ComponentStore extends State, Action {}

export const useComponentsStore = create<ComponentStore>()(
  temporal(
    immer((set, get) => ({
      components: [
        {
          id: generateId(),
          name: ComponentEnum.Page,
          props: {},
          desc: "页面",
          children: [],
        },
      ],
      hoverComponent: undefined,

      setHoverComponent: (componentId?: ComponentId) => {
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
            const parentComponent = getComponentById(
              parentId,
              state.components,
            );
            if (parentComponent) {
              if (parentComponent.children) {
                parentComponent.children.push(component);
              } else {
                parentComponent.children = [component];
              }
            }

            component.parentId = parentId;
          } else {
            state.components.push(component);
          }
        });
      },
      removeComponent: (componentId: ComponentId) => {
        if (!componentId) return;
        const component = getComponentById(componentId, get().components);
        if (component?.parentId) {
          const newComponents = produce(get().components, (draft) => {
            const parent = getComponentById(component.parentId, draft);
            if (parent && parent.children) {
              parent.children = parent.children.filter(
                (child) => child.id !== componentId,
              );
            }
          });
          set({ components: newComponents });
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

            return state;
          }

          return state;
        }),
    })) as StateCreator<ComponentStore, [], []>,
    {
      partialize: (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hoverComponent, ...reset } = state;
        return reset;
      },
      equality: (a, b) => {
        return a.components === b.components;
      },
    },
  ),
);

function getComponentById(
  id: ComponentId | undefined,
  components: ComponentDto[],
): ComponentDto | undefined {
  if (!id) return undefined;

  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== undefined) return result;
    }
  }
  return undefined;
}
