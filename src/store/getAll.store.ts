import type { StateCreator } from "zustand";
import _ from "lodash";

/**
 * Lightweight, project-tailored "get all" zustand slice factory.
 *
 * Purpose: Provide a reusable pattern for paginated/filtered list fetching
 * that fits the Minecol project. It's inspired by the referenced file but
 * intentionally simpler and adapted to the app conventions:
 * - Flattens condition + pagination into query params for URL sync
 * - Uses replaceState so URL sync doesn't create history entries
 * - Emits no global events; instead exposes `triggerFetch` action
 *
 * Usage:
 * const useMyListStore = create(createGetAllSlice({ UseCase: myApi }));
 */

export type DefaultPagination = {
  page: number;
  pageSize: number;
  sortBy?: string;
  orderBy?: "ASC" | "DESC";
};

export const DEFAULT_PAGINATION: DefaultPagination = {
  page: 1,
  pageSize: 20,
  sortBy: "createdAt",
  orderBy: "DESC",
};

type UseCaseInput<Condition, Pagination> = {
  condition?: Condition;
  pagination?: Pagination;
  populates?: any[];
};

type CreateParams<Condition, Pagination, Response> = {
  UseCase: (params: {
    input: UseCaseInput<Condition, Pagination>;
  }) => Promise<Response>;
  transformResponse?: (r: Response) => Response;
};

export type GetAllState<Condition, Pagination, Response> = {
  response?: Response;
  requestPayload: {
    condition?: Partial<Condition>;
    pagination?: Partial<Pagination>;
  };
  isLoading: boolean;

  // actions
  triggerFetch: (opts?: { updateUrl?: boolean }) => Promise<void>;
  setCondition: (
    condition: Partial<Condition>,
    opts?: { reset?: boolean; updateUrl?: boolean }
  ) => Promise<void>;
  setPagination: (
    pagination: Partial<Pagination>,
    opts?: { reset?: boolean; updateUrl?: boolean }
  ) => Promise<void>;
  setInput: (
    payload: {
      condition?: Partial<Condition>;
      pagination?: Partial<Pagination>;
    },
    opts?: { updateUrl?: boolean; trigger?: boolean }
  ) => Promise<void>;
  updateItem?: (item: any) => void;
};

// Helper: shallow-flatten condition + pagination into URLSearchParams
const buildUrlSearchParams = (
  condition: Record<string, any> | undefined,
  pagination: Record<string, any> | undefined
) => {
  const params = new URLSearchParams();

  if (pagination) {
    Object.entries(pagination).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.set(String(k), String(v));
    });
  }

  if (condition) {
    Object.entries(condition).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      if (Array.isArray(v)) {
        if (v.length > 0) params.set(k, v.join(","));
      } else if (typeof v === "object") {
        // For nested objects, JSON stringify
        params.set(k, JSON.stringify(v));
      } else {
        params.set(k, String(v));
      }
    });
  }

  return params;
};

// Replace URL search params (no history entry)
const replaceUrlParams = (params: URLSearchParams) => {
  const url = new URL(window.location.href);
  // Clear existing keys that clash with our params (simple approach)
  params.forEach((_, key) => url.searchParams.delete(key));
  // Merge in new params
  params.forEach((value, key) => url.searchParams.set(key, value));
  window.history.replaceState({}, "", url.toString());
};

export const createGetAllSlice = <
  Condition extends Record<string, any>,
  Pagination extends DefaultPagination,
  Response = any
>(
  params: CreateParams<Condition, Pagination, Response>
): StateCreator<
  GetAllState<Condition, Pagination, Response>,
  [],
  [],
  GetAllState<Condition, Pagination, Response>
> => {
  const { UseCase, transformResponse } = params;

  return (set, get) => ({
    response: undefined,
    requestPayload: {
      condition: undefined,
      pagination: DEFAULT_PAGINATION as unknown as Partial<Pagination>,
    },
    isLoading: false,

    triggerFetch: async (opts = { updateUrl: true }) => {
      const { updateUrl = true } = opts || {};
      const request = get().requestPayload;

      set(() => ({ isLoading: true }));

      const input: UseCaseInput<Condition, Pagination> = {
        condition: request.condition as Condition | undefined,
        pagination:
          (request.pagination as Pagination) ||
          (DEFAULT_PAGINATION as unknown as Pagination),
      };

      try {
        // use a temporary any-typed value to avoid complex generic/awaited type mismatches
        let responseAny: any = await UseCase({ input });
        if (transformResponse) responseAny = transformResponse(responseAny);
        set(() => ({ response: responseAny as any, isLoading: false }));

        // update URL
        if (updateUrl) {
          const params = buildUrlSearchParams(
            request.condition as any,
            request.pagination as any
          );
          replaceUrlParams(params);
        }
      } catch (err) {
        console.error("getAll slice: fetch failed", err);
        set(() => ({ isLoading: false }));
      }
    },

    setCondition: async (
      condition,
      opts = { reset: false, updateUrl: true }
    ) => {
      const { reset = false, updateUrl = true } = opts || {};
      const current = get().requestPayload;
      const newCondition = reset
        ? condition
        : { ...(current.condition || {}), ...condition };

      set(() => ({ requestPayload: { ...current, condition: newCondition } }));
      await get().triggerFetch({ updateUrl });
    },

    setPagination: async (
      pagination,
      opts = { reset: false, updateUrl: true }
    ) => {
      const { reset = false, updateUrl = true } = opts || {};
      const current = get().requestPayload;
      const newPagination = reset
        ? ({
            ...DEFAULT_PAGINATION,
            ...(pagination as Partial<Pagination>),
          } as Partial<Pagination>)
        : ({
            ...(current.pagination || {}),
            ...(pagination as Partial<Pagination>),
          } as Partial<Pagination>);

      set(() => ({
        requestPayload: { ...current, pagination: newPagination },
      }));
      await get().triggerFetch({ updateUrl });
    },

    setInput: async (payload, opts = { updateUrl: true, trigger: true }) => {
      const current = get().requestPayload;
      const newCondition = payload.condition
        ? { ...(current.condition || {}), ...payload.condition }
        : current.condition;
      const newPagination = payload.pagination
        ? { ...(current.pagination || {}), ...payload.pagination }
        : current.pagination;

      set(() => ({
        requestPayload: { condition: newCondition, pagination: newPagination },
      }));

      if (opts.trigger) {
        await get().triggerFetch({ updateUrl: opts.updateUrl });
      }
    },

    updateItem: (item) => {
      set((state) => {
        if (!state.response || !_.has(state.response, "items")) return state;
        const items: any[] = _.get(state.response as any, "items", []);
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx === -1) {
          items.unshift(item);
        } else {
          items[idx] = { ...items[idx], ...item };
        }
        const newResponse = { ...(state.response as any), items };
        return { ...state, response: newResponse } as any;
      });
    },
  });
};
