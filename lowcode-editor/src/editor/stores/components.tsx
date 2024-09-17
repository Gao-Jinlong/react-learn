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
  updateComponentProps: (
    id: ComponentId,
    props: Partial<ComponentPropsUnion>,
  ) => void;
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
          label: "页面",
          props: {},
          desc: "根容器",
          children: [],
        },
      ],
      // TODO: 应该始终维持数据的唯一性，因此 hoverComponent 和 editComponent 应该为 ComponentId ，而不是 ComponentDto
      // 负责修改了 components 后，需要同步更新 hoverComponent 和 editComponent
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

          return produce(state, (draft) => {
            const component = getComponentById(componentId, draft.components);
            if (component?.parentId) {
              const parentComponent = getComponentById(
                component.parentId,
                draft.components,
              );
              if (parentComponent) {
                parentComponent.children = parentComponent.children?.filter(
                  (child) => child.id !== componentId,
                );
              }
            }

            // 检查是否需要清空 editComponent
            if (component) {
              const editComponent = draft.editComponent;
              if (editComponent && isChildren(component, editComponent.id)) {
                draft.editComponent = undefined;
              }
            }
          });
        });
      },
      updateComponentProps: (
        componentId: ComponentId,
        props: EditableProps<Partial<ComponentPropsUnion>>,
      ) =>
        set((state) => {
          const newComponents = produce(state.components, (draft) => {
            const component = getComponentById(componentId, draft);
            if (component) {
              component.props = { ...component.props, ...props };
            }
          });

          return {
            components: newComponents,
            editComponent: getComponentById(componentId, newComponents),
          };
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

function isChildren(component: ComponentDto, id: ComponentId): boolean {
  if (!component.children) return false;
  return component.children.some(
    (child) => child.id === id || isChildren(child, id),
  );
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
