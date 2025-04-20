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
}: CodeViewerProps) {
  const language = getLanguageFromFile(file);

  return (
    <div className="flex-1 flex flex-col">
      <CodeHeader
        filename={file.filename}
        language={language}
        onCopy={onCopy}
        copied={copied}
        direction={direction}
      />

      {/* אזור הקוד */}
      <div className="flex-1 p-4">
        <ScrollArea
          className="rounded-md border border-border/50 bg-muted/10 shadow-sm"
          type="always"
        >
          <div dir="ltr">
            <SyntaxHighlighterWrapper
              code={file.code}
              language={file.language || language}
              highlightLines={file.highlightLines}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
