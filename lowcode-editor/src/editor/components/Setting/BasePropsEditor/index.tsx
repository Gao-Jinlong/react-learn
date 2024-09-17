import { Form } from "antd";
import {
  ComponentEnum,
  type ComponentDto,
  type ComponentPropsUnion,
  type EditableProps,
} from "../../../interface";
import ButtonBaseEditor from "./ButtonBaseEditor";
import { useCallback, useContext } from "react";
import { SettingContext } from "../SettingContext";

export default function BasePropsEditor() {
  const { editComponent } = useContext(SettingContext)!;

  return (
    editComponent && (
      <div>
        <Form>{isButtonProps(editComponent) && <ButtonBaseEditor />}</Form>
      </div>
    )
  );
}

function isButtonProps(
  props: ComponentDto,
): props is ComponentDto<ComponentEnum.Button> {
  return props.name === ComponentEnum.Button;
}
