import { create } from "zustand";
import { componentConfig, type ComponentConfigList } from "../config";

export interface State {
  componentConfig: ComponentConfigList;
}
export interface Action {}
export const useComponentConfigStore = create<State & Action>(() => ({
  componentConfig: componentConfig,
}));
