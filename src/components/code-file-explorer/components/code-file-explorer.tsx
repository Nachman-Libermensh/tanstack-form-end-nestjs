"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { CodeFileExplorerProps } from "../types";
import { FileTree } from "./file-tree";
import { CodeViewer } from "./code-viewer";
import { useFolderExpansion } from "../hooks/use-folder-expansion";
import { useFileSelection } from "../hooks/use-file-selection";
import { FolderOpenIcon } from "lucide-react";

export const CodeFileExplorer: React.FC<CodeFileExplorerProps> = ({
  elements,
  files,
  initialFileId,
  height = "600px",
  direction = "ltr",
  showLineNumbers = true,
  allowCopy = true,
  title,
  maxSidebarHeight,
}) => {
  const isMobile = useIsMobile();
  const isRtl = direction === "rtl";

  // מציאת ID ראשוני חוקי
  const firstValidId =
    initialFileId && files[initialFileId]
      ? initialFileId
      : Object.keys(files)[0] || "";

  // הוקים לניהול מצבים
  const { expandedFolders, toggleFolder } = useFolderExpansion(
    elements,
    firstValidId
  );
  const { selectedId, copied, selectFile, handleCopy } =
    useFileSelection(firstValidId);

  // קובץ נוכחי
  const currentFile = files[selectedId] || {
    filename: "",
    code: "// Select a file from the sidebar to view its content",
    language: "typescript",
  };

  // פונקציה להעתקת קוד
  const onCopy = () => {
    if (currentFile && allowCopy) {
      handleCopy(currentFile.code);
    }
  };

  // גובה המכל
  const containerHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div
        className="flex flex-col w-full overflow-hidden rounded-xl border bg-gradient-to-br from-background via-background to-muted/20 shadow-lg"
        dir={isRtl ? "rtl" : "ltr"}
        style={{ height: containerHeight }}
      >
        {/* כותרת עליונה */}
        <div className="flex items-center justify-between p-4 pb-3 border-b bg-muted/20 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <SidebarTrigger className="md:hidden h-8 w-8 flex-shrink-0" />
            <FolderOpenIcon className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex flex-col min-w-0 flex-1">
              <h3 className="font-semibold text-lg truncate">
                {title || (isRtl ? "סייר קבצי קוד" : "Code File Explorer")}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {isRtl ? "בחר קובץ לתצוגה" : "Select a file to view"}
              </p>
            </div>
          </div>
          <div
            className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded flex-shrink-0"
            dir="ltr"
          >
            {Object.keys(files).length} {isRtl ? "קבצים" : "files"}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* סיידבר עץ הקבצים */}
          <Sidebar
            className="!relative !block !w-[320px] !min-w-[320px] !max-w-[320px] shadow-none border-r bg-muted/10 backdrop-blur-sm"
            collapsible="offcanvas"
            variant="inset"
          >
            <SidebarHeader className="border-b border-border/30 p-4 bg-muted/20 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground/90 truncate">
                  {isRtl ? "מבנה הפרויקט" : "Project Structure"}
                </h4>
                <div className="text-xs text-muted-foreground flex-shrink-0">
                  {Object.keys(expandedFolders).filter(Boolean).length}{" "}
                  {isRtl ? "פתוחות" : "expanded"}
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-hidden p-0">
              <div className="h-full p-3">
                <FileTree
                  elements={elements}
                  selectedId={selectedId}
                  expandedFolders={expandedFolders}
                  onFileSelect={selectFile}
                  onFolderToggle={toggleFolder}
                />
              </div>
            </SidebarContent>
          </Sidebar>

          <Separator
            orientation="vertical"
            className="bg-border/50 flex-shrink-0"
          />

          {/* תצוגת קוד */}
          <div className="flex-1 flex flex-col bg-background/50 backdrop-blur-sm min-w-0 overflow-hidden">
            <CodeViewer
              file={currentFile}
              onCopy={onCopy}
              copied={copied}
              direction={direction}
              showLineNumbers={showLineNumbers}
              allowCopy={allowCopy}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
