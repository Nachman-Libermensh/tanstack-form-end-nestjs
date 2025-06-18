import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeViewerProps } from "../../types";
import { CodeHeader } from "./code-header";
import { SyntaxHighlighterWrapper } from "./syntax-highlighter";
import { getLanguageFromFile } from "../../utils/file-utils";

export function CodeViewer({
  file,
  onCopy,
  copied,
  direction,
  showLineNumbers = true,
  allowCopy = true,
}: CodeViewerProps & { showLineNumbers?: boolean; allowCopy?: boolean }) {
  const language = getLanguageFromFile(file);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <CodeHeader
        filename={file.filename}
        language={language}
        onCopy={onCopy}
        copied={copied}
        direction={direction}
        fileMeta={file}
        allowCopy={allowCopy}
      />

      {/* אזור הקוד עם גלילה */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="p-4 h-full">
            <div className="rounded-lg border border-border/50 bg-muted/5 shadow-sm overflow-hidden">
              <div dir="ltr" className="w-full">
                <SyntaxHighlighterWrapper
                  code={file.code}
                  language={file.language || language}
                  highlightLines={file.highlightLines}
                  showLineNumbers={showLineNumbers}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
