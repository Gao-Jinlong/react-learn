import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ListItem, useTodoListStore } from "./Store";

interface ItemProps {
  data: ListItem;
}
export default function Item(props: ItemProps) {
  const { content, status, id } = props.data;

  const [editing, setEditing] = useState(false);

  const [editingContent, setEditingContent] = useState(content);

  const updateItem = useTodoListStore((state) => state.updateItem);
  const swapItem = useTodoListStore((state) => state.swapItem);

  const ref = useRef<HTMLDivElement>(null);

  const [{ dragging }, drag] = useDrag({
    type: "list-item",
    item: {
      id: id,
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });
  const [, drop] = useDrop({
    accept: "list-item",
    hover(item: { id: ListItem["id"] }) {
      swapItem(item.id, id);
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div
      ref={ref}
      className={classNames(
        "h-100 border-2 border-black bg-blue-300 p-2",
        "flex justify-start items-center",
        "text-xl tracking-wide",
        dragging ? "bg-white border-dashed" : ""
      )}
      onDoubleClick={() => {
        setEditing(true);
      }}
    >
      <input
        type="checkbox"
        checked={status === "done"}
        className="w-8 h-8 mr-2"
        onChange={(e) => {
          updateItem({
            ...props.data,
            status: e.target.checked ? "done" : "todo",
          });
        }}
      />
      <p>
        {editing ? (
          <input
            value={editingContent}
            onChange={(e) => {
              setEditingContent(e.target.value);
            }}
            onBlur={() => {
              setEditing(false);
              updateItem({
                ...props.data,
                content: editingContent,
              });
            }}
          />
        ) : (
          content
        )}
      </p>
    </div>
  );
}
