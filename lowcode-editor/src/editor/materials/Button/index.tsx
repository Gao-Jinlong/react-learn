import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";
import type { BaseComponentProps } from "../../interface";
export interface ButtonProps extends BaseComponentProps {
  type: ButtonType;
  text: string;
}
export default function Button(props: ButtonProps) {
  const { type, text, id } = props;
  return (
    <AntdButton data-component-id={id} type={type}>
      {text}
    </AntdButton>
  );
}
