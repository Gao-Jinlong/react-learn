import type { CSSProperties, PropsWithChildren } from "react";
import type { ContainerProps } from "./materials/Container";
import type { PageProps } from "./materials/Page";
import type { ButtonProps } from "./materials/Button";

export type ComponentId = string;
/** 组件基础内置属性 */
export interface BaseComponentProps extends PropsWithChildren {
  id: ComponentId;
  name: ComponentEnum;
  style?: CSSProperties;
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

export interface ComponentDto<N extends ComponentEnum = ComponentEnum>
  extends Omit<ComponentConfig<N>, "defaultProps"> {
  id: ComponentId;
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
  /** 组件显示名称 */
  label: string;
  /** 组件类型 */
  name: T;
  /** 组件添加时的默认 props */
  defaultProps: Partial<ComponentPropsList[T]>;
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
