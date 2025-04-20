import React from "react";
import {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  FileJsonIcon,
  FileTypeIcon,
  FileCodeIcon,
  FileTextIcon,
} from "lucide-react";
import { FileMeta } from "../types";

/**
 * מחזיר אייקון מתאים לסוג הקובץ לפי סיומת
 */
export function getFileIcon(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase() || "";

  switch (extension) {
    case "ts":
      return <FileTypeIcon className="h-4 w-4 shrink-0 text-blue-500" />;
    case "tsx":
      return <FileCodeIcon className="h-4 w-4 shrink-0 text-blue-600" />;
    case "js":
      return <FileCodeIcon className="h-4 w-4 shrink-0 text-yellow-500" />;
    case "jsx":
      return <FileCodeIcon className="h-4 w-4 shrink-0 text-yellow-600" />;
    case "json":
      return <FileJsonIcon className="h-4 w-4 shrink-0 text-green-500" />;
    case "md":
      return <FileTextIcon className="h-4 w-4 shrink-0 text-gray-500" />;
    case "css":
    case "scss":
      return <FileIcon className="h-4 w-4 shrink-0 text-pink-500" />;
    default:
      return <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />;
  }
}

/**
 * מחלץ את שפת התכנות מהקובץ
 */
export function getLanguageFromFile(file: FileMeta): string {
  if (file.language) {
    return file.language;
  }

  const extensionMatch = file.filename.match(/\.([^.]+)$/);
  return extensionMatch ? extensionMatch[1] : "";
}

/**
 * מחזיר פונקציה להדגשת שורות קוד
 */
export function getLineProps(highlightLines?: number[]) {
  const styles: React.CSSProperties = {
    display: "block",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
  };
  return function (lineNumber: number) {
    if (highlightLines?.includes(lineNumber)) {
      return {
        style: {
          ...styles,
          display: "block",
          backgroundColor: "rgba(255, 255, 0, 0.15)",
          // משתמש ב-box shadow במקום margin כדי לא להזיז את מספור השורות
          boxShadow: "inset 3px 0 0 0 #ffcc00",
        },
      };
    }
    return { styles };
  };
}

/**
 * מחזיר אייקון של תיקייה (פתוחה או סגורה)
 */
export function getFolderIcon(isExpanded: boolean) {
  return isExpanded ? (
    <FolderOpenIcon className="h-4 w-4 shrink-0 text-amber-400" />
  ) : (
    <FolderIcon className="h-4 w-4 shrink-0 text-amber-400" />
  );
}
