import { ComponentEnum } from "../interface";
import Container, { type ContainerProps } from "../materials/Container";
import Button, { type ButtonProps } from "../materials/Button";
import Page, { type PageProps } from "../materials/Page";
import { generateId } from "../utils";

export interface ComponentConfig<P = {}> {
  name: ComponentEnum;
  defaultProps: Partial<P>;
  component: React.ComponentType<P>;
}

export interface ComponentPropsList {
  [ComponentEnum.Container]: ContainerProps;
  [ComponentEnum.Button]: ButtonProps;
  [ComponentEnum.Page]: PageProps;
}

export interface ComponentConfigList {
  [ComponentEnum.Container]: ComponentConfig<ContainerProps>;
  [ComponentEnum.Button]: ComponentConfig<ButtonProps>;
  [ComponentEnum.Page]: ComponentConfig<PageProps>;
}
export const componentConfig: ComponentConfigList = {
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
};

export const generateDefaultComponents = () => [
  {
    id: generateId(),
    name: ComponentEnum.Page,
    props: {},
    desc: "页面",
    node: Page,
  },
];
