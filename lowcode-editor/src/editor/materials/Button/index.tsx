import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";
import type { BaseComponentProps } from "../../interface";

export interface ButtonProps extends BaseComponentProps {
  type: ButtonType;
  text: string;
}
export default function Button({ text, type }: ButtonProps) {
  return <AntdButton type={type}>{text}</AntdButton>;
}
