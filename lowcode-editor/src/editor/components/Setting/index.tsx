import { useComponentsStore } from "../../stores/components";

export default function Setting() {
  const { editComponent } = useComponentsStore();

  return (
    <div className="flex h-full flex-col gap-2 overflow-auto">
      <pre>{JSON.stringify(editComponent, null, 2)}</pre>
    </div>
  );
}
