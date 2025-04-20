"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { CodeFileExplorerProps } from "../types";
import { FileTree } from "./file-tree";
import { CodeViewer } from "./code-viewer";
import { useFolderExpansion } from "../hooks/use-folder-expansion";
import { useFileSelection } from "../hooks/use-file-selection";

export const CodeFileExplorer: React.FC<CodeFileExplorerProps> = ({
  elements,
  files,
  initialFileId,
  // height = 500,
  direction = "ltr",
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
    code: "no code selected",
    language: "text",
  };

  // פונקציה להעתקת קוד
  const onCopy = () => {
    if (currentFile) {
      handleCopy(currentFile.code);
    }
  };

  // גובה המכל
  // const containerHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div
        className="flex flex-col min-w-full  overflow-hidden rounded-xl border bg-gradient-to-br from-card to-card/95 shadow-md relative"
        dir={isRtl ? "rtl" : "ltr"}
        // style={{ height: containerHeight }}
      >
        {/* כותרת (נראית רק במובייל) */}
        <div className="md:hidden flex items-center justify-between p-3 pb-2 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="h-8 w-8" />
            <h3 className="font-medium">{isRtl ? "קבצי קוד" : "Code Files"}</h3>
          </div>
          <div className="text-xs text-muted-foreground font-mono" dir="ltr">
            {currentFile.filename}
          </div>
        </div>

        <div className="flex flex-col flex-1 h-full">
          <div className="flex flex-row h-full">
            {/* סיידבר עץ הקבצים */}
            <Sidebar
              className="!relative 
               !block !w-[280px] min-h-full rounded-l-full shadow-none border-r"
              collapsible="offcanvas"
              variant="inset"
            >
              <SidebarHeader className="border-b border-border/50 p-3">
                <h3 className="text-sm font-semibold">
                  {isRtl ? "קבצי פרויקט" : "Project Files"}
                </h3>
              </SidebarHeader>
              <SidebarContent className="p-2">
                <FileTree
                  elements={elements}
                  selectedId={selectedId}
                  expandedFolders={expandedFolders}
                  onFileSelect={selectFile}
                  onFolderToggle={toggleFolder}
                />
              </SidebarContent>
            </Sidebar>

            {/* תצוגת קוד */}
            <CodeViewer
              file={currentFile}
              onCopy={onCopy}
              copied={copied}
              direction={direction}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
