// Example convenience store for palettes (local demo UseCase)
// This is optional and meant to show how to instantiate the factory.
// It uses the static data in data-test/palete.data.json for local dev.
import {
  createGetAllSlice,
  DEFAULT_PAGINATION,
  type DefaultPagination,
} from "@/store/getAll.store";
import palettesData from "../../data-test/palete.data.json";
import { create } from "zustand";

type PaletteCondition = { q?: string };

export const usePalettesStore = create(
  createGetAllSlice<
    PaletteCondition,
    DefaultPagination,
    { items: any[]; totalItems?: number }
  >({
    UseCase: async ({ input }) => {
      // Naive local filter: supports q (search by palette name) and pagination
      const all = (palettesData as any) || [];
      let items = all;
      if (input.condition && (input.condition as any).q) {
        const q = String((input.condition as any).q).toLowerCase();
        items = all.filter((p: any) =>
          JSON.stringify(p).toLowerCase().includes(q)
        );
      }
      const pagination = input.pagination || (DEFAULT_PAGINATION as any);
      const page = Number(pagination.page) || 1;
      const pageSize = Number(pagination.pageSize) || 20;
      const start = (page - 1) * pageSize;
      const paged = items.slice(start, start + pageSize);
      return Promise.resolve({ items: paged, totalItems: items.length });
    },
  })
);
