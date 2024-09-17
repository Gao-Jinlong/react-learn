import { useContext, useEffect, useMemo, useState } from "react";
import { Form, Input, Select } from "antd";

import type { ButtonProps } from "../../../materials/Button";
import type { ButtonType } from "antd/es/button";
import { SettingContext } from "../SettingContext";
import type { EditableProps } from "../../../interface";

const typeOptions: { label: string; value: ButtonType }[] = [
  { label: "默认", value: "default" },
  { label: "主要", value: "primary" },
  { label: "虚线", value: "dashed" },
  { label: "链接", value: "link" },
  { label: "文本", value: "text" },
];

export default function ButtonBaseEditor() {
  const { editComponent, updateComponentProps } = useContext(SettingContext)!;
  const [editProps, setEditProps] = useState<EditableProps<ButtonProps>>();

  useEffect(() => {
    setEditProps(editComponent?.props as EditableProps<ButtonProps>);
  }, [editComponent?.props]);

  const handleChange = <K extends keyof ButtonProps>(
    key: K,
    value: ButtonProps[K],
  ) => {
    if (!editComponent) {
      return;
    }
    updateComponentProps(editComponent.id, {
      [key]: value,
    });
  };

  return (
    <>
      <Form.Item label="名称">
        <Input
          value={editProps?.text ?? ""}
          onChange={(e) => handleChange("text", e.target.value)}
        />
      </Form.Item>
      <Form.Item label="类型">
        <Select
          onChange={(value) => handleChange("type", value)}
          value={editProps?.type ?? "default"}
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
          value={editProps?.shape ?? "default"}
        >
          <Select.Option value="default">默认</Select.Option>
          <Select.Option value="circle">圆形</Select.Option>
          <Select.Option value="round">圆角</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
