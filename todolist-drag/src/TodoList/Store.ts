import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export interface ListItem {
  id: string;
  status: "todo" | "done";
  content: string;
}

type State = {
  list: Array<ListItem>;
};

type Action = {
  addItem: (item: ListItem, id?: string) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: ListItem) => void;
  swapItem: (from: string, to: string) => void;
};

const stateCreator: StateCreator<State & Action> = (set) => ({
  list: [],
  addItem: (item, id) => {
    set((state) => {
      if (!id) {
        return {
          list: [...state.list, item],
        };
      }

      const newList = [...state.list];
      const index = newList.findIndex((item) => item.id === id);
      newList.splice(index, 0, item);
      return {
        list: newList,
      };
    });
  },
  deleteItem: (id: string) => {
    set((state) => {
      return {
        list: state.list.filter((item) => {
          return item.id !== id;
        }),
      };
    });
  },
  updateItem: (updateItem: ListItem) => {
    set((state) => {
      return {
        list: state.list.map((item) => {
          if (item.id === updateItem.id) {
            return updateItem;
          }
          return item;
        }),
      };
    });
  },
  swapItem: (from, to) => {
    set((state) => {
      const newList = [...state.list];

      const fromIndex = newList.findIndex((item) => item.id === from);
      const toIndex = newList.findIndex((item) => item.id === to);

      const fromItem = newList[fromIndex];
      const toItem = newList[toIndex];

      newList[fromIndex] = toItem;
      newList[toIndex] = fromItem;

      return {
        list: newList,
      };
    });
  },
});

export const useTodoListStore = create<State & Action>()(
  persist(stateCreator, {
    name: "todoList",
  })
);
