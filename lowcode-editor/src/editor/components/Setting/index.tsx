import { useComponentsStore } from "../../stores/components";

export default function Setting() {
  const { components } = useComponentsStore();
  const { pastStates, futureStates } = useComponentsStore.temporal.getState();

  return (
    <div className="flex h-full flex-col gap-2 overflow-auto">
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
      <pre>{JSON.stringify(pastStates, null, 2)}</pre>
      <pre>{JSON.stringify(futureStates, null, 2)}</pre>
    </div>
  );
}
