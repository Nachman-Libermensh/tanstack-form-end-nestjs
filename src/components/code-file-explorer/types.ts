export type TreeViewElement = {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
};

export type FileMeta = {
  filename: string;
  code: string;
  language?: string;
  highlightLines?: number[];
};

export type CodeFileExplorerProps = {
  /** נתוני העץ: תיקיות וקבצים בעלי ID */
  elements: TreeViewElement[];
  /** מפה מ‑ID של קובץ ל‑FileMeta */
  files: Record<string, FileMeta>;
  /** ID של הקובץ שיפתח כברירת מחדל */
  initialFileId?: string;
  /** גובה מכולת הקוד */
  height?: string | number;
  /** כיוון התצוגה - מימין לשמאל או משמאל לימין */
  direction?: "rtl" | "ltr";
};

export type FileItemProps = {
  id: string;
  name: string;
  isSelectable: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export type FolderItemProps = {
  id: string;
  name: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  children: TreeViewElement[];
  renderTreeItems: (items: TreeViewElement[], level: number) => React.ReactNode;
  level: number;
};

export type FileTreeProps = {
  elements: TreeViewElement[];
  selectedId: string;
  expandedFolders: Record<string, boolean>;
  onFileSelect: (id: string) => void;
  onFolderToggle: (id: string) => void;
};

export type CodeViewerProps = {
  file: FileMeta;
  onCopy: () => void;
  copied: boolean;
  direction: "rtl" | "ltr";
};

export type CodeHeaderProps = {
  filename: string;
  language: string;
  onCopy: () => void;
  copied: boolean;
  direction: "rtl" | "ltr";
};

export type SyntaxHighlighterWrapperProps = {
  code: string;
  language?: string;
  highlightLines?: number[];
};
