import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon, InfoIcon } from "lucide-react";
import { CodeHeaderProps } from "../../types";
import {
  getFileIcon,
  getFileTypeDescription,
  formatFileSize,
} from "../../utils/file-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CodeHeader({
  filename,
  language,
  onCopy,
  copied,
  direction,
  fileMeta,
  allowCopy = true,
}: CodeHeaderProps & { fileMeta?: any; allowCopy?: boolean }) {
  const isRtl = direction === "rtl";

  return (
    <div className="flex justify-between items-center px-4 py-3 border-b bg-muted/30 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex-shrink-0">{getFileIcon(filename)}</div>
        <div className="flex flex-col min-w-0 flex-1">
          <div
            className="text-sm font-medium text-foreground font-mono truncate"
            dir="ltr"
          >
            {filename || (isRtl ? "בחר קובץ" : "Select a file")}
          </div>
          {filename && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="truncate">
                {getFileTypeDescription(filename)}
              </span>
              {fileMeta?.size && (
                <>
                  <span className="flex-shrink-0">•</span>
                  <span className="flex-shrink-0">
                    {formatFileSize(fileMeta.size)}
                  </span>
                </>
              )}
              {fileMeta?.lastModified && (
                <>
                  <span className="flex-shrink-0">•</span>
                  <span className="flex-shrink-0">
                    {fileMeta.lastModified.toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {language && (
          <Badge
            variant="secondary"
            className="text-xs px-2 py-1 font-mono flex-shrink-0"
          >
            {language.toUpperCase()}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {fileMeta?.description && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <InfoIcon className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">{fileMeta.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {allowCopy && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            className={cn(
              "flex items-center gap-2 text-xs h-8 px-3 transition-all duration-200 hover:shadow-sm",
              isRtl && "flex-row-reverse",
              copied &&
                "bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
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
        )}
      </div>
    </div>
  );
}
