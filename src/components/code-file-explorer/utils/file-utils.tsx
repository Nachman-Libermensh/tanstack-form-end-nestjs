import React from "react";
import {
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  FileJsonIcon,
  FileTypeIcon,
  FileCodeIcon,
  FileTextIcon,
  ImageIcon,
  SettingsIcon,
  PackageIcon,
} from "lucide-react";
import { FileMeta } from "../types";

/**
 * מחזיר אייקון מתאים לסוג הקובץ לפי סיומת עם צבעים מדויקים יותר
 */
export function getFileIcon(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase() || "";

  switch (extension) {
    case "ts":
      return <FileTypeIcon className="h-4 w-4 shrink-0 text-blue-600" />;
    case "tsx":
      return <FileCodeIcon className="h-4 w-4 shrink-0 text-blue-500" />;
    case "js":
      return <FileCodeIcon className="h-4 w-4 shrink-0 text-yellow-500" />;
    case "jsx":
      return <FileCodeIcon className="h-4 w-4 shrink-0 text-yellow-400" />;
    case "json":
      return <FileJsonIcon className="h-4 w-4 shrink-0 text-green-600" />;
    case "md":
    case "mdx":
      return <FileTextIcon className="h-4 w-4 shrink-0 text-gray-600" />;
    case "css":
      return <FileIcon className="h-4 w-4 shrink-0 text-pink-500" />;
    case "scss":
    case "sass":
      return <FileIcon className="h-4 w-4 shrink-0 text-pink-600" />;
    case "html":
      return <FileIcon className="h-4 w-4 shrink-0 text-orange-500" />;
    case "vue":
      return <FileIcon className="h-4 w-4 shrink-0 text-green-500" />;
    case "py":
      return <FileIcon className="h-4 w-4 shrink-0 text-blue-400" />;
    case "java":
      return <FileIcon className="h-4 w-4 shrink-0 text-red-500" />;
    case "php":
      return <FileIcon className="h-4 w-4 shrink-0 text-purple-500" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
    case "webp":
      return <ImageIcon className="h-4 w-4 shrink-0 text-indigo-500" />;
    case "yml":
    case "yaml":
      return <SettingsIcon className="h-4 w-4 shrink-0 text-red-400" />;
    case "toml":
    case "ini":
    case "conf":
      return <SettingsIcon className="h-4 w-4 shrink-0 text-gray-500" />;
    case "lock":
      return <PackageIcon className="h-4 w-4 shrink-0 text-amber-600" />;
    default:
      return <FileIcon className="h-4 w-4 shrink-0 text-muted-foreground" />;
  }
}

/**
 * מחלץ את שפת התכנות מהקובץ עם תמיכה בשפות נוספות
 */
export function getLanguageFromFile(file: FileMeta): string {
  if (file.language) {
    return file.language;
  }

  const extension = file.filename.split(".").pop()?.toLowerCase() || "";

  const languageMap: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    json: "json",
    md: "markdown",
    mdx: "mdx",
    css: "css",
    scss: "scss",
    sass: "sass",
    html: "html",
    vue: "vue",
    py: "python",
    java: "java",
    php: "php",
    yml: "yaml",
    yaml: "yaml",
    toml: "toml",
    xml: "xml",
    sql: "sql",
    sh: "bash",
    bash: "bash",
    zsh: "bash",
  };

  return languageMap[extension] || extension;
}

/**
 * מחזיר פונקציה להדגשת שורות קוד משופרת
 */
export function getLineProps(highlightLines?: number[]) {
  return function (lineNumber: number) {
    const baseStyle: React.CSSProperties = {
      display: "block",
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
      overflowWrap: "break-word",
      paddingLeft: "0.5rem",
      paddingRight: "0.5rem",
      minHeight: "1.5rem",
    };

    if (highlightLines?.includes(lineNumber)) {
      return {
        style: {
          ...baseStyle,
          backgroundColor: "rgba(255, 235, 59, 0.15)",
          borderLeft: "3px solid #ffeb3b",
          marginLeft: "-0.5rem",
          paddingLeft: "calc(0.5rem - 3px)",
        },
      };
    }

    return { style: baseStyle };
  };
}

/**
 * מחזיר אייקון של תיקייה עם אנימציה חלקה
 */
export function getFolderIcon(isExpanded: boolean) {
  return isExpanded ? (
    <FolderOpenIcon className="h-4 w-4 shrink-0 text-amber-500 transition-colors duration-200" />
  ) : (
    <FolderIcon className="h-4 w-4 shrink-0 text-amber-400 transition-colors duration-200" />
  );
}

/**
 * מחזיר תיאור קצר של סוג הקובץ
 */
export function getFileTypeDescription(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase() || "";

  const descriptions: Record<string, string> = {
    ts: "TypeScript",
    tsx: "TypeScript React",
    js: "JavaScript",
    jsx: "JavaScript React",
    json: "JSON Data",
    md: "Markdown",
    css: "Stylesheet",
    html: "HTML Document",
    vue: "Vue Component",
    py: "Python Script",
    java: "Java Class",
    php: "PHP Script",
  };

  return descriptions[extension] || extension.toUpperCase();
}

/**
 * פורמט גודל קובץ לתצוגה ידידותית
 */
export function formatFileSize(bytes?: number): string {
  if (!bytes) return "";

  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}
