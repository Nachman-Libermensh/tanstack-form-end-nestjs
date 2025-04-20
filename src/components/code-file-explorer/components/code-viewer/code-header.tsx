import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { CodeHeaderProps } from "../../types";
import { getFileIcon } from "../../utils/file-utils";

export function CodeHeader({
  filename,
  language,
  onCopy,
  copied,
  direction,
}: CodeHeaderProps) {
  const isRtl = direction === "rtl";

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b bg-muted/10">
      <div className="flex items-center gap-2">
        {getFileIcon(filename)}
        <div
          className="text-sm font-medium text-foreground/90 font-mono"
          dir="ltr"
        >
          {filename || (isRtl ? "בחר קובץ" : "Select a file")}
        </div>
        {language && (
          <div className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded bg-muted text-muted-foreground">
            {language}
          </div>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onCopy}
        className={cn(
          "flex items-center gap-1.5 text-xs h-7 px-2 transition-all duration-200",
          isRtl && "flex-row-reverse", // רק הכפתור מתאים את עצמו לכיווניות הממשק
          copied &&
            "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
        )}
      >
        {copied ? (
          <>
            <CheckIcon size={14} />
            <span>{isRtl ? "הועתק!" : "Copied"}</span>
          </>
        ) : (
          <>
            <CopyIcon size={14} />
            <span>{isRtl ? "העתק" : "Copy"}</span>
          </>
        )}
      </Button>
    </div>
  );
}
