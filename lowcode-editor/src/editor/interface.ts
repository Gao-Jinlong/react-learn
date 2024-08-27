import type { PropsWithChildren } from "react";
import type { ContainerProps } from "./materials/Container";
import type { ButtonProps } from "antd";
import type { PageProps } from "./materials/Page";

export type ComponentId = string;
export type ComponentName = string;
/** 组件基础内置属性 */
export interface BaseComponentProps extends PropsWithChildren {
  id: ComponentId;
  name: ComponentName;
}

export type EditableProps<T extends BaseComponentProps> = Omit<
  T,
  "id" | "name"
>;
export enum ComponentEnum {
  Container = "Container",
  Button = "Button",
  Page = "Page",
}

export type ComponentProps = ContainerProps | ButtonProps | PageProps;
