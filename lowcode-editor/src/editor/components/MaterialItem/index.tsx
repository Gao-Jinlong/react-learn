import { useDrag } from "react-dnd";

export interface MaterialItemProps {
  name: string;
}

export default function MaterialItem(props: MaterialItemProps) {
  const { name } = props;

  const [, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
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
