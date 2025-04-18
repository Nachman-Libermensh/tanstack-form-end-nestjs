/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormSchema } from "../types";

type SchemaState = {
  schemas: Record<string, FormSchema>;
  selectedFieldId: string | null; // Add this property
  setSchema: (formId: string, schema: FormSchema) => void;
  removeSchema: (formId: string) => void;
  selectField: (fieldId: string | null) => void; // Add this method
};

export const useFormSchemaStore = create<SchemaState>()(
  persist(
    (set) => ({
      schemas: {},
      selectedFieldId: null, // Initialize with null
      setSchema: (formId, schema) =>
        set((state) => ({ schemas: { ...state.schemas, [formId]: schema } })),
      removeSchema: (formId) =>
        set((state) => {
          const { [formId]: _, ...rest } = state.schemas;
          return { schemas: rest };
        }),
      selectField: (
        fieldId // Add this method implementation
      ) => set({ selectedFieldId: fieldId }),
    }),
    { name: "form-schema-storage" }
  )
);
