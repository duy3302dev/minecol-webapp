import { create } from "zustand";

type GetAllItemsStoreZustand<T> = {
  data: T[];
  lazyLoad: (start: number, end: number) => Promise<void>;
  getAllItems: () => Promise<void>;
};

export const useGetAllItemsStore = create<GetAllItemsStoreZustand<any>>((set) => ({
  data: [],
  lazyLoad: async (start, end) => {
    const items = await getAllItems();
    set({ data: items.slice(start, end) });
  },
  getAllItems: async () => {
    const items = await getAllItems();
    set({ data: items });
  },
}));