import { useComponentsStore } from "../../stores/components";
import BasePropsEditor from "./BasePropsEditor";

export default function Setting() {
  const { editComponent } = useComponentsStore();

  return (
    editComponent && (
      <div className="flex h-full flex-col gap-2 overflow-auto">
        <BasePropsEditor />
      </div>
    )
  );
}
