"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  duotoneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { ScrollArea } from "./scroll-area";

type Tab = {
  name: string;
  code: string;
  language?: string;
  highlightLines?: number[];
};

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & ({ code: string; tabs?: never } | { code?: never; tabs: Tab[] });

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If no tabs, create a single "default" tab with the provided code
  const tabsData = tabs.length
    ? tabs
    : [{ name: "Default", code: code!, language, highlightLines }];

  return (
    <div className="relative rounded-2xl border bg-muted/40 p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        {/* Filename */}
        <div className="text-xs text-muted-foreground">{filename}</div>

        {/* Copy Button - now in the header area instead of absolute */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleCopy(tabs.length ? tabs[0].code : code!)}
          className={`flex items-center gap-1 text-xs transition-all duration-300 ${
            copied
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {copied ? (
            <>
              <IconCheck
                size={16}
                className="animate-in zoom-in-50 duration-300"
              />
              <span className="animate-in slide-in-from-left-2 duration-300">
                Copied!
              </span>
            </>
          ) : (
            <>
              <IconCopy size={16} />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>

      {/* Using shadcn Tabs component */}
      <Tabs defaultValue={tabsData[0].name} className="w-full">
        {tabsData.length > 1 && (
          <TabsList className="mb-2">
            {tabsData.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        )}
        <ScrollArea className="h-[300px] rounded-md border bg-muted/20">
          {tabsData.map((tab) => (
            <TabsContent key={tab.name} value={tab.name}>
              <SyntaxHighlighter
                language={tab.language || language}
                style={resolvedTheme === "dark" ? atomDark : duotoneLight}
                customStyle={{
                  padding: "1rem",
                  borderRadius: "1rem",
                  fontSize: "0.875rem",
                  background: "transparent",
                  // maxWidth: "100ch",
                  // maxWidth: maxWidth, // הוספנו מגבלת רוחב
                  maxWidth: "120ch",
                  overflowWrap: "break-word", // לשבירת מילים ארוכות
                  whiteSpace: "pre-wrap", // שומר על שבירות שורה ומוסיף שבירה אוטומטית
                }}
                wrapLongLines={true}
                wrapLines
                lineProps={(lineNumber) => {
                  const shouldHighlight = (tab.highlightLines || []).includes(
                    lineNumber
                  );

                  return {
                    style: shouldHighlight
                      ? {
                          backgroundColor: "rgba(255,255,0,0.1)",
                          display: "block",
                        }
                      : { display: "block" },
                  };
                }}
              >
                {tab.code}
              </SyntaxHighlighter>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
};
