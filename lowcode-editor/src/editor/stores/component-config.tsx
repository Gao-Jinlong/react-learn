import { create } from "zustand";
import { ComponentEnum } from "../interface";
import {
  componentConfig,
  type ComponentConfig,
  type ComponentPropsList,
} from "../config";

export interface State {
  componentConfig: {
    [key in ComponentEnum]: ComponentConfig<ComponentPropsList[key]>;
  };
}
export interface Action {
  registerComponent: <N extends ComponentEnum>(
    name: N,
    componentConfig: ComponentConfig<ComponentPropsList[N]>,
  ) => void;
}
export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: componentConfig,
  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
