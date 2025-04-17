import { useCallback } from "react";
import { useUILibraryStore } from "../stores/ui-library.store";
import { SupportedUILibrary, UI_LIBRARIES } from "../types";

export function useUILibrary() {
  const { currentLibrary, setUILibrary } = useUILibraryStore();

  // רשימת הספריות הנתמכות עם תווית לתצוגה
  const availableLibraries = UI_LIBRARIES.map((lib) => ({
    value: lib,
    label: getLibraryDisplayName(lib),
  }));

  // פונקציה לבדיקה האם ספרייה ספציפית נבחרה כעת
  const isLibraryActive = useCallback(
    (library: SupportedUILibrary) => currentLibrary === library,
    [currentLibrary]
  );

  return {
    currentLibrary,
    setUILibrary,
    availableLibraries,
    isLibraryActive,
  };
}

// פונקציית עזר להמרת מזהי ספריות לשמות תצוגה ידידותיים
function getLibraryDisplayName(library: SupportedUILibrary): string {
  const displayNames: Record<SupportedUILibrary, string> = {
    shadcn: "ShadCN UI",
    rizzUI: "Rizz UI",
    // נוכל להוסיף כאן ספריות נוספות בעתיד
  };

  return displayNames[library] || library;
}
