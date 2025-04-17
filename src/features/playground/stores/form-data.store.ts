/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormData } from "../types";

type DataState = {
  data: Record<string, FormData>;
  setData: (formId: string, values: FormData) => void;
  removeData: (formId: string) => void;
};

export const useFormDataStore = create<DataState>()(
  persist(
    (set) => ({
      data: {},
      setData: (formId, values) =>
        set((state) => ({ data: { ...state.data, [formId]: values } })),
      removeData: (formId) =>
        set((state) => {
          const { [formId]: _, ...rest } = state.data;
          return { data: rest };
        }),
    }),
    { name: "form-data-storage" }
  )
);
