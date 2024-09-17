import { useContext } from "react";
import { SettingContext } from "../SettingContext";
import BaseProperty from "./BaseProperty";
import { Form } from "antd";

export default function StylePanel() {
  const { editComponent } = useContext(SettingContext)!;

  return (
    <div>
      <Form>
        <BaseProperty />
      </Form>
    </div>
  );
}
