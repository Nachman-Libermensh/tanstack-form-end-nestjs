"use client";

import { createContext, useContext, useState } from "react";

type UILibrary = "shadcn" | "rizzui";

interface UILibraryContextType {
  library: UILibrary;
  setLibrary: (library: UILibrary) => void;
}

const UILibraryContext = createContext<UILibraryContextType | undefined>(
  undefined
);

export function UILibraryProvider({ children }: { children: React.ReactNode }) {
  const [library, setLibrary] = useState<UILibrary>("shadcn");

  return (
    <UILibraryContext.Provider value={{ library, setLibrary }}>
      {children}
    </UILibraryContext.Provider>
  );
}

export function useUILibrary() {
  const context = useContext(UILibraryContext);
  if (context === undefined) {
    throw new Error("useUILibrary must be used within a UILibraryProvider");
  }
  return context;
}
