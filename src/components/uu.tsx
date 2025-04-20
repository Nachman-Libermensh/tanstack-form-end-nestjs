"use client";

import React, { useState, useEffect } from "react";
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
  CheckIcon,
  CopyIcon,
  ChevronRightIcon,
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
  const [isMobileView, setIsMobileView] = useState(false);

  // עקוב אחר שינויי גודל מסך
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // מצא את הנתיב לקובץ הנבחר והרחב את התיקיות שלו אוטומטית
  useEffect(() => {
    // מידע על תיקיות שצריכות להיפתח כדי להציג את הקובץ הנבחר
    const findPathToFile = (
      elements: TreeViewElement[],
      targetId: string,
      path: string[] = []
    ): string[] | null => {
      for (const element of elements) {
        if (element.id === targetId) {
          return [...path];
        }

        if (element.children?.length) {
          const foundPath = findPathToFile(element.children, targetId, [
            ...path,
            element.id,
          ]);
          if (foundPath) return foundPath;
        }
      }

      return null;
    };

    const path = findPathToFile(elements, firstValidId);
    if (path) {
      const initialExpanded = path.reduce(
        (acc, id) => ({ ...acc, [id]: true }),
        {}
      );
      setExpandedFolders(initialExpanded);
    }
  }, [elements, firstValidId]);

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
      // במסכים קטנים, צמצם את עץ התיקיות לאחר בחירת קובץ
      if (isMobileView) {
        document
          .getElementById("code-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }
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

    const fileExtension = isFile ? item.name.split(".").pop() : "";
    let fileIconColor = "text-blue-500";

    // צבעים שונים לפי סיומת קובץ
    if (fileExtension === "ts" || fileExtension === "tsx") {
      fileIconColor = "text-blue-500";
    } else if (fileExtension === "js" || fileExtension === "jsx") {
      fileIconColor = "text-yellow-500";
    } else if (fileExtension === "css" || fileExtension === "scss") {
      fileIconColor = "text-pink-500";
    } else if (fileExtension === "json") {
      fileIconColor = "text-green-500";
    }

    return (
      <div key={item.id} className="py-0.5">
        {isFolder ? (
          <div className="space-y-1">
            <div
              onClick={() => toggleFolder(item.id)}
              className={cn(
                "flex items-center gap-1.5 py-1 px-2 rounded-md transition-colors duration-100",
                "hover:bg-accent/40 cursor-pointer select-none"
              )}
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
              <ChevronRightIcon
                className={cn(
                  "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
              {isExpanded ? (
                <FolderOpenIcon className="h-4 w-4 shrink-0 text-amber-400" />
              ) : (
                <FolderIcon className="h-4 w-4 shrink-0 text-amber-400" />
              )}
              <span className="text-sm font-medium">{item.name}</span>
            </div>

            {isExpanded && (
              <div className="ml-2">
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
              "flex items-center gap-2 py-1 px-2 rounded-md select-none transition-colors duration-100",
              isSelectable
                ? "hover:bg-accent/40 cursor-pointer"
                : "opacity-50 cursor-not-allowed",
              isSelected && "bg-accent text-accent-foreground font-medium"
            )}
            style={{ paddingLeft: `${depth * 12 + 24}px` }}
          >
            <FileIcon className={cn("h-4 w-4 shrink-0", fileIconColor)} />
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
    <div className="flex flex-col overflow-hidden rounded-xl border bg-gradient-to-br from-card to-card/95 shadow-md">
      {/* גרסת מובייל - כותרת */}
      <div className="md:hidden flex items-center justify-between p-3 pb-2 border-b bg-muted/30">
        <h3 className="font-medium">קבצי פרויקט</h3>
        <div className="text-xs text-muted-foreground font-mono">
          {currentFile.filename}
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* סייד בר עץ קבצים */}
        <div className="w-full md:w-72 md:max-w-xs shrink-0 p-3 md:border-r border-muted/50 bg-muted/10">
          <div className="hidden md:flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">קבצי פרויקט</h3>
          </div>
          <ScrollArea
            className="rounded-md border border-muted/50 bg-card/50"
            style={{ height: containerHeight }}
          >
            <div className="py-1">
              {elements.map((item) => renderTreeItem(item))}
            </div>
          </ScrollArea>
        </div>

        {/* תצוגת קוד */}
        <div id="code-section" className="flex-1 p-3 overflow-hidden">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-mono text-foreground/80">
              {currentFile.filename}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 text-xs h-7 px-2 transition-all duration-200",
                copied &&
                  "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
              )}
            >
              {copied ? (
                <>
                  <CheckIcon size={13} />
                  <span>הועתק!</span>
                </>
              ) : (
                <>
                  <CopyIcon size={13} />
                  <span>העתק</span>
                </>
              )}
            </Button>
          </div>

          <ScrollArea
            className="rounded-md border border-muted/50 bg-muted/20"
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
                        margin: "0 -1rem",
                        padding: "0 1rem",
                      },
                    }
                  : { display: "block" }
              }
            >
              {currentFile.code}
            </SyntaxHighlighter>
          </ScrollArea>

          {/* כפתור למעבר לעץ קבצים במובייל */}
          {isMobileView && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 w-full text-xs text-muted-foreground"
              onClick={() =>
                document
                  .querySelector(".scroll-area")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              חזרה לעץ קבצים
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
