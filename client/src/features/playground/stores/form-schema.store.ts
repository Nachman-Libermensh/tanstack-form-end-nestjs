/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormSchema } from "../types";

type SchemaState = {
  schemas: Record<string, FormSchema>;
  setSchema: (formId: string, schema: FormSchema) => void;
  removeSchema: (formId: string) => void;
};

export const useFormSchemaStore = create<SchemaState>()(
  persist(
    (set) => ({
      schemas: {},
      setSchema: (formId, schema) =>
        set((state) => ({ schemas: { ...state.schemas, [formId]: schema } })),
      removeSchema: (formId) =>
        set((state) => {
          const { [formId]: _, ...rest } = state.schemas;
          return { schemas: rest };
        }),
    }),
    { name: "form-schema-storage" }
  )
);
