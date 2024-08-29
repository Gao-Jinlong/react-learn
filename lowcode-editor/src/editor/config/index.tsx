import { ComponentEnum, type ComponentConfig } from "../interface";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface ComponentConfigList {
  [ComponentEnum.Container]: ComponentConfig<ComponentEnum.Container>;
  [ComponentEnum.Button]: ComponentConfig<ComponentEnum.Button>;
  [ComponentEnum.Page]: ComponentConfig<ComponentEnum.Page>;
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
