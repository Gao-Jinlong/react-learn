import { Form, Input } from "antd";
import { useComponentsStore } from "../../../stores/components";
import {
  ComponentEnum,
  type ComponentDto,
  type ComponentPropsUnion,
  type EditableProps,
} from "../../../interface";
import ButtonBaseEditor from "./ButtonBaseEditor";
import { useCallback } from "react";

function isButtonProps(
  props: ComponentDto,
): props is ComponentDto<ComponentEnum.Button> {
  return props.name === ComponentEnum.Button;
}
export default function BasePropsEditor() {
  const { editComponent, updateComponentProps } = useComponentsStore();

  const handlePropsChange = useCallback(
    (props: Partial<EditableProps<ComponentPropsUnion>>) => {
      updateComponentProps(editComponent!.id, props);
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
