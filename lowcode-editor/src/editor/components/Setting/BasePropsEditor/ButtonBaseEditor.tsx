import { Form, Input, Select } from "antd";
import type {
  ComponentDto,
  ComponentEnum,
  EditableProps,
} from "../../../interface";
import type { ButtonProps } from "../../../materials/Button";
import type { ButtonType } from "antd/es/button";

const typeOptions: { label: string; value: ButtonType }[] = [
  { label: "默认", value: "default" },
  { label: "主要", value: "primary" },
  { label: "虚线", value: "dashed" },
  { label: "链接", value: "link" },
  { label: "文本", value: "text" },
];
export interface ButtonBaseEditorProps {
  editComponent: ComponentDto<ComponentEnum.Button>;
  updateComponentProps: (props: Partial<EditableProps<ButtonProps>>) => void;
}
export default function ButtonBaseEditor(props: ButtonBaseEditorProps) {
  const { editComponent, updateComponentProps } = props;

  const handleChange = <K extends keyof ButtonProps>(
    key: K,
    value: ButtonProps[K],
  ) => {
    updateComponentProps({
      [key]: value,
    });
  };

  return (
    <>
      <Form.Item label="名称">
        <Input
          defaultValue={editComponent.props.text}
          onChange={(e) => handleChange("text", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="类型">
        <Select
          onChange={(value) => handleChange("type", value)}
          defaultValue={editComponent.props.type}
        >
          {typeOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="形状">
        <Select
          onChange={(value) => handleChange("shape", value)}
          defaultValue={editComponent.props.shape}
        >
          <Select.Option value="default">默认</Select.Option>
          <Select.Option value="circle">圆形</Select.Option>
          <Select.Option value="round">圆角</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
