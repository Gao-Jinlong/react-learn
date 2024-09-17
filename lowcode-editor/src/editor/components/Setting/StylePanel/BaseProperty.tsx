import { useContext, useMemo, type CSSProperties } from "react";
import { SettingContext } from "../SettingContext";
import { Form, Input } from "antd";
export default function BaseProperty() {
  const { editComponent, updateComponentProps } = useContext(SettingContext)!;
  const style = useMemo(() => editComponent?.props.style, [editComponent]);

  function handleChange<K extends keyof CSSProperties>(
    type: K,
    value: CSSProperties[K],
  ) {
    if (!editComponent) {
      return;
    }

    updateComponentProps(editComponent.id, {
      style: { ...style, [type]: value },
    });
  }

  return (
    <Form.Item label="宽度" name="width">
      <Input
        defaultValue={style?.width}
        onChange={(e) => handleChange("width", e.target.value)}
      />
    </Form.Item>
  );
}
