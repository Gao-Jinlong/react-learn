import { useDrag } from "react-dnd";
import type {
  ComponentEnum,
  ComponentPropsList,
  EditableProps,
} from "../../interface";

export interface MaterialItemProps
  extends EditableProps<ComponentPropsList[ComponentEnum]> {
  name: ComponentEnum;
}

export default function MaterialItem(props: MaterialItemProps) {
  const { name } = props;

  const [, drag] = useDrag({
    type: name,
    item: props,
  });

  return (
    <div
      ref={drag}
      className="m-2.5 inline-block cursor-move border border-dashed border-[#000] bg-white px-2.5 py-2.5 hover:bg-[#ccc]"
    >
      {name}
    </div>
  );
}
