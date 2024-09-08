import { Button as AntdButton } from "antd";
import type { BaseComponentProps } from "../../interface";
import type { ButtonProps as AntdButtonProps } from "antd";
export interface ButtonProps
  extends BaseComponentProps,
    Omit<AntdButtonProps, "id" | "name"> {
  text: string;
}
export default function Button(props: ButtonProps) {
  const { text, id } = props;
  return (
    <AntdButton data-component-id={id} {...props}>
      {text}
    </AntdButton>
  );
}
