// ספריות UI נתמכות
export const UI_LIBRARIES = [
  "shadcn",
  "rizzUI" /* "mui", "chakra", "antd"*/,
] as const;
export type SupportedUILibrary = (typeof UI_LIBRARIES)[number];

// חנות לניהול ספריית UI נבחרת
export interface UILibraryState {
  currentLibrary: SupportedUILibrary;
  setUILibrary: (library: SupportedUILibrary) => void;
}
