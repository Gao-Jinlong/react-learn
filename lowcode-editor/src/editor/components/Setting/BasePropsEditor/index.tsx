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
  const { editComponent, updateComponentProps } = useContext(SettingContext)!;

  const handlePropsChange = useCallback(
    (props: Partial<EditableProps<ComponentPropsUnion>>) => {
      updateComponentProps?.(editComponent!.id, props);
    },
    [editComponent, updateComponentProps],
  );

  return (
    editComponent && (
      <div>
        <Form>
          {isButtonProps(editComponent) && (
            <ButtonBaseEditor
              editComponent={editComponent}
              updateComponentProps={handlePropsChange}
            />
          )}
        </Form>
      </div>
    )
  );
}

function isButtonProps(
  props: ComponentDto,
): props is ComponentDto<ComponentEnum.Button> {
  return props.name === ComponentEnum.Button;
}
