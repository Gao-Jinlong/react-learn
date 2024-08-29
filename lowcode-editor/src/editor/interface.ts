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
export interface ComponentConfig<T extends ComponentEnum = ComponentEnum> {
  name: T;
  defaultProps: Partial<ComponentPropsList[T]>;
  component: React.FunctionComponent<ComponentPropsList[T]>;
}
export interface CreateComponentDto extends Omit<ComponentDto, "id"> {}
export interface RenderComponentDto<T extends ComponentEnum = ComponentEnum>
  extends Omit<ComponentDto<T>, "children" | "props"> {}

export interface ComponentPropsList {
  [ComponentEnum.Container]: ContainerProps;
  [ComponentEnum.Button]: ButtonProps;
  [ComponentEnum.Page]: PageProps;
}
