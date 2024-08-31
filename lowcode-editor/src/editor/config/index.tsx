import { ComponentEnum, type ComponentConfig } from "../interface";
import Container from "../materials/Container";
import Button from "../materials/Button";
import Page from "../materials/Page";

export interface EditComponentSettings {
  [ComponentEnum.Container]: ComponentConfig<ComponentEnum.Container>;
  [ComponentEnum.Button]: ComponentConfig<ComponentEnum.Button>;
  [ComponentEnum.Page]: ComponentConfig<ComponentEnum.Page>;
}

/**
 * 组件-编辑状态配置
 * 组件编辑状态下所需的配置，如组件添加时的默认配置
 */
export const editComponentSetting: EditComponentSettings = {
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
