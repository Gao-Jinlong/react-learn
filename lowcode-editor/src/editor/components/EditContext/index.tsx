import { createContext, useMemo, type PropsWithChildren } from "react";
import type { ComponentDto, ComponentId } from "../../interface";
import { flattenComponents, useComponentsStore } from "../../stores/components";
import type { MenuProps } from "antd";

export interface EditContextProps extends PropsWithChildren {}
export interface EditContext {
  flattenedComponents: Map<ComponentId, ComponentDto>;
  dropdownMenu: MenuProps["items"];
}
export const EditContext = createContext<EditContext | null>(null);

export default function EditContextProvider({ children }: EditContextProps) {
  const { components, editComponent } = useComponentsStore();
  const flattenedComponents = useMemo(() => {
    return flattenComponents(components);
  }, [components]);
  const dropdownMenu = useMemo(() => {
    const menuItems: MenuProps["items"] = [];

    if (editComponent?.parentId) {
      let recursion = flattenedComponents.get(editComponent.parentId);
      while (recursion) {
        menuItems.push({
          key: recursion.id,
          label: <div>{recursion.name}</div>,
        });
        recursion = recursion.parentId
          ? flattenedComponents.get(recursion.parentId)
          : undefined;
      }
    }

    return menuItems;
  }, [editComponent, flattenedComponents]);

  return (
    <EditContext.Provider value={{ flattenedComponents, dropdownMenu }}>
      {children}
    </EditContext.Provider>
  );
}
