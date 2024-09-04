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
  editComponent?: ComponentDto;
}
interface Action {
  addComponent: (component: ComponentConfig, parentId?: ComponentId) => void;
  removeComponent: (id: ComponentId) => void;
  updateComponentProps: (id: ComponentId, props: ComponentPropsUnion) => void;
  setHoverComponent: (componentId?: ComponentId) => void;
  setEditComponent: (componentId?: ComponentId) => void;
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
      editComponent: undefined,
      setHoverComponent: (componentId?: ComponentId) => {
        set(() => {
          return {
            hoverComponent: getComponentById(componentId, get().components),
          };
        });
      },
      addComponent: (
        createComponentDto: ComponentConfig,
        parentId?: ComponentId,
      ) => {
        set((state) => {
          const newComponents = produce(state.components, (draft) => {
            const { defaultProps, ...rest } = createComponentDto;
            const component: ComponentDto = {
              ...rest,
              props: { ...defaultProps },
              id: generateId(),
            };
            if (parentId) {
              const parentComponent = getComponentById(parentId, draft);

              if (parentComponent) {
                if (parentComponent.children) {
                  parentComponent.children.push(component);
                } else {
                  parentComponent.children = [component];
                }

                component.parentId = parentId;
              }
            } else {
              draft.push(component);
            }
          });

          return {
            components: newComponents,
          };
        });
      },
      removeComponent: (componentId: ComponentId) => {
        set((state) => {
          if (!componentId) return;
          const newComponents = produce(state.components, (draft) => {
            const component = getComponentById(componentId, draft);
            if (component?.parentId) {
              const parentComponent = getComponentById(
                component.parentId,
                draft,
              );
              if (parentComponent) {
                parentComponent.children = parentComponent.children?.filter(
                  (child) => child.id !== componentId,
                );
              }
            }
          });

          // 检查是否需要清空 editComponent
          if (state.editComponent?.id === componentId) {
            return {
              components: newComponents,
              editComponent: undefined,
            };
          } else {
            return {
              components: newComponents,
            };
          }
        });
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
      setEditComponent: (componentId?: ComponentId) => {
        set(() => ({
          editComponent: getComponentById(componentId, get().components),
        }));
      },
    })) as StateCreator<ComponentStore, [], []>,
    {
      partialize: (state) => {
        const { components } = state;
        return { components };
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
      const findComponent = getComponentById(id, component.children);
      if (findComponent) return findComponent;
    }
  }
  return undefined;
}

export function flattenComponents(
  components: ComponentDto[],
): Map<ComponentId, ComponentDto> {
  const map = new Map<ComponentId, ComponentDto>();

  function dfs(components: ComponentDto[]) {
    for (const component of components) {
      map.set(component.id, component);
      if (component.children && component.children.length > 0) {
        dfs(component.children);
      }
    }
  }

  dfs(components);

  return map;
}
