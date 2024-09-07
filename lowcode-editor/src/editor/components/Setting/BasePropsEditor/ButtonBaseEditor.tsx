import { Form, Input } from "antd";
import type {
  ComponentDto,
  ComponentEnum,
  EditableProps,
} from "../../../interface";
import type { ButtonProps } from "../../../materials/Button";
import { useState } from "react";

export interface ButtonBaseEditorProps {
  editComponent: ComponentDto<ComponentEnum.Button>;
  updateComponentProps: (props: Partial<EditableProps<ButtonProps>>) => void;
}
export default function ButtonBaseEditor(props: ButtonBaseEditorProps) {
  const { editComponent, updateComponentProps } = props;
  const [value, setValue] = useState(editComponent.props.text);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    updateComponentProps({
      text: value,
    });
  };

  return (
    <Form.Item label="名称">
      <Input value={value} onChange={handleLabelChange} />
    </Form.Item>
  );
}
