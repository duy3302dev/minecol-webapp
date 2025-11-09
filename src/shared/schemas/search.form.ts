import z from "zod";
import type { FormConfig } from "../types";

export const searchFormConfig: FormConfig = [
  {
    name: "searchQuery",
    type: "text",
    placeholder: "Find your palette",
  },
];

export const searchFormSchema: z.ZodSchema = z.object({
  searchQuery: z.string(),
});
