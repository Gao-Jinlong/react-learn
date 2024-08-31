import type { PropsWithChildren } from "react";
import type { ContainerProps } from "./materials/Container";
import type { PageProps } from "./materials/Page";
import type { ButtonProps } from "./materials/Button";

export type ComponentId = string;
/** 组件基础内置属性 */
export interface BaseComponentProps extends PropsWithChildren {
  id: ComponentId;
  name: ComponentEnum;
}

export type EditableProps<T extends Partial<BaseComponentProps>> = Omit<
  T,
  "id" | "name" | "children"
>;
export enum ComponentEnum {
  Container = "Container",
  Button = "Button",
  Page = "Page",
}

export type ComponentPropsUnion = ContainerProps | ButtonProps | PageProps;

export interface ComponentDto<N extends ComponentEnum = ComponentEnum> {
  id: ComponentId;
  name: N;
  props: EditableProps<ComponentPropsList[N]>;
  children?: ComponentDto[];
  parentId?: ComponentId;
  desc?: string;
}
/**
 * 组件-编辑状态配置
 * 组件编辑状态下所需的配置，如组件添加时的默认配置
 */
export interface ComponentConfig<T extends ComponentEnum = ComponentEnum> {
  name: T;
  /** 组件添加时的默认 props */
  defaultProps: Partial<ComponentPropsList[T]>;
  /** 组件-编辑状态的渲染组件 */
  component: React.FunctionComponent<ComponentPropsList[T]>;
}
export interface CreateComponentDto extends Omit<ComponentDto, "id"> {}
export interface RenderComponentDto<T extends ComponentEnum = ComponentEnum>
  extends Omit<ComponentDto<T>, "children" | "props"> {}

/** 组件-渲染 props 列表 */
export interface ComponentPropsList {
  [ComponentEnum.Container]: ContainerProps;
  [ComponentEnum.Button]: ButtonProps;
  [ComponentEnum.Page]: PageProps;
}
