/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UILibraryState, SupportedUILibrary } from "../types";

export const useUILibraryStore = create<UILibraryState>()(
  persist(
    (set) => ({
      currentLibrary: "shadcn", // ספריית ברירת המחדל
      setUILibrary: (library) => set({ currentLibrary: library }),
    }),
    { name: "ui-library-storage" }
  )
);
