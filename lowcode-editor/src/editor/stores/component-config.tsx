import { create } from "zustand";
import Container, { type ContainerProps } from "../materials/Container";
import Button, { type ButtonProps } from "../materials/Button";
import Page, { type PageProps } from "../materials/Page";
import { ComponentEnum } from "../interface";

export interface ComponentPropsList {
  [ComponentEnum.Container]: ContainerProps;
  [ComponentEnum.Button]: ButtonProps;
  [ComponentEnum.Page]: PageProps;
}
export interface ComponentConfig<P = {}> {
  name: ComponentEnum;
  defaultProps: Partial<P>;
  component: React.ComponentType<P>;
}

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
  componentConfig: {
    [ComponentEnum.Container]: {
      name: ComponentEnum.Container,
      defaultProps: {},
      component: Container,
    },
    [ComponentEnum.Button]: {
      name: ComponentEnum.Button,
      defaultProps: {
        type: "primary",
        text: "确定",
      },
      component: Button,
    },
    [ComponentEnum.Page]: {
      name: ComponentEnum.Page,
      defaultProps: {},
      component: Page,
    },
  },
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
