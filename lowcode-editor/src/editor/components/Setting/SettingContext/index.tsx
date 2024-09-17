import {
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import {
  useComponentsStore,
  type ComponentStore,
} from "../../../stores/components";

export interface SettingContext extends ComponentStore {}
export const SettingContext = createContext<SettingContext | null>(null);
export interface SettingContextProps extends PropsWithChildren {}

export default function SettingContextProvider({
  children,
}: SettingContextProps) {
  const context = useComponentsStore();

  return (
    <SettingContext.Provider value={context}>
      {children}
    </SettingContext.Provider>
  );
}
