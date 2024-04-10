import { FC } from "react";
import { List } from "./List";
import { NewItem } from "./NewItem";
import { GarbageBin } from "./GarbadgeBin";
import classNames from "classnames";

interface TodoListProps {}

export const TodoList: FC<TodoListProps> = (props) => {
  return (
    <div
      className={`w-1000 h-600 m-auto mt-100 p-3 
      border-2 border-black
     flex justify-between items-start`}
    >
      <div className="flex-2 h-full mr-3  overflow-auto">
        <List></List>
      </div>

      <div
        className={classNames("flex-1 h-full", "flex flex-col justify-start")}
      >
        <NewItem></NewItem>
        <GarbageBin className={"mt-2"}></GarbageBin>
      </div>
    </div>
  );
};
