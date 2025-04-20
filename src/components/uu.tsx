"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  duotoneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  Check,
  Copy,
} from "lucide-react";

// טיפוסים
export type TreeViewElement = {
  id: string;
  name: string;
  isSelectable?: boolean;
  children?: TreeViewElement[];
};

type FileMeta = {
  filename: string;
  code: string;
  language?: string;
  highlightLines?: number[];
};

type CodeFileExplorerProps = {
  /** נתוני העץ: תיקיות וקבצים בעלי ID */
  elements: TreeViewElement[];
  /** מפה מ‑ID של קובץ ל‑FileMeta */
  files: Record<string, FileMeta>;
  /** ID של הקובץ שיפתח כברירת מחדל */
  initialFileId?: string;
  /** גובה מכולת הקוד */
  height?: string | number;
};

export const CodeFileExplorer: React.FC<CodeFileExplorerProps> = ({
  elements,
  files,
  initialFileId,
  height = 500,
}) => {
  // מציאת ID ראשוני חוקי
  const firstValidId =
    initialFileId && files[initialFileId]
      ? initialFileId
      : Object.keys(files)[0] || "";

  // מצבים
  const [selectedId, setSelectedId] = useState<string>(firstValidId);
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({});
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  // טיפול בהעתקה
  const handleCopy = () => {
    if (!files[selectedId]) return;

    navigator.clipboard.writeText(files[selectedId].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // טיפול בתיקייה מתקפלת/מתרחבת
  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // בחירת קובץ
  const selectFile = (id: string) => {
    if (files[id]) {
      setSelectedId(id);
    }
  };

  // בניית התיקייה בצורה רקורסיבית
  const renderTreeItem = (item: TreeViewElement, depth = 0) => {
    const isFolder = item.children && item.children.length > 0;
    const isFile = !isFolder;
    const isExpanded = expandedFolders[item.id];
    const isSelected = selectedId === item.id;
    const hasFileContent = files[item.id] !== undefined;
    const isSelectable = isFile && hasFileContent;

    return (
      <div key={item.id} style={{ paddingLeft: `${depth * 16}px` }}>
        {isFolder ? (
          <div className="space-y-1">
            <div
              onClick={() => toggleFolder(item.id)}
              className="flex items-center gap-1.5 p-1 rounded-md hover:bg-accent/50 cursor-pointer select-none"
            >
              {isExpanded ? (
                <FolderOpenIcon className="h-4 w-4 shrink-0 text-orange-400" />
              ) : (
                <FolderIcon className="h-4 w-4 shrink-0 text-orange-400" />
              )}
              <span className="text-sm">{item.name}</span>
            </div>

            {isExpanded && (
              <div className="border-l-2 border-muted ml-2 pl-2">
                {item.children?.map((child) =>
                  renderTreeItem(child, depth + 1)
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => isSelectable && selectFile(item.id)}
            className={cn(
              "flex items-center gap-1.5 p-1 rounded-md select-none",
              isSelectable
                ? "hover:bg-accent/50 cursor-pointer"
                : "opacity-50 cursor-not-allowed",
              isSelected && "bg-accent"
            )}
          >
            <FileIcon className="h-4 w-4 shrink-0 text-blue-500" />
            <span className="text-sm truncate">{item.name}</span>
          </div>
        )}
      </div>
    );
  };

  // טיפול בגובה המיכל
  const containerHeight = typeof height === "number" ? `${height}px` : height;
  const currentFile = files[selectedId] || {
    filename: "",
    code: "",
    language: "text",
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 rounded-xl border bg-card shadow-sm">
      {/* גרסת מובייל - כותרת */}
      <div className="md:hidden flex items-center justify-between p-4 pb-2 border-b">
        <h3 className="font-medium">קבצי פרויקט</h3>
        <div className="text-xs text-muted-foreground">
          {currentFile.filename}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* סייד בר עץ קבצים */}
        <div className="w-full md:w-64 md:min-w-64 p-4 md:border-r">
          <div className="hidden md:block font-medium mb-2">קבצי פרויקט</div>
          <ScrollArea
            className="rounded-md border bg-muted/10"
            style={{ height: containerHeight }}
          >
            <div className="p-2">
              {elements.map((item) => renderTreeItem(item))}
            </div>
          </ScrollArea>
        </div>

        {/* תצוגת קוד */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">{currentFile.filename}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1 text-xs transition-all duration-200",
                copied &&
                  "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              )}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>הועתק!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>העתק</span>
                </>
              )}
            </Button>
          </div>

          <ScrollArea
            className="rounded-md border bg-muted/20"
            style={{ height: containerHeight }}
          >
            <SyntaxHighlighter
              language={currentFile.language || "tsx"}
              style={resolvedTheme === "dark" ? atomDark : duotoneLight}
              wrapLongLines
              wrapLines
              customStyle={{
                padding: "1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                background: "transparent",
                maxWidth: "100%",
                whiteSpace: "pre-wrap",
              }}
              lineProps={(lineNumber) =>
                currentFile.highlightLines?.includes(lineNumber)
                  ? {
                      style: {
                        backgroundColor: "rgba(255,255,0,0.15)",
                        display: "block",
                        borderRadius: "2px",
                      },
                    }
                  : { display: "block" }
              }
            >
              {currentFile.code}
            </SyntaxHighlighter>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
