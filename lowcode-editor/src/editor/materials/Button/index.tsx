import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";

export interface ButtonProps {
  type: ButtonType;
  text: string;
}
export default function Button({ text, type }: ButtonProps) {
  return <AntdButton type={type}>{text}</AntdButton>;
}
