import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  duotoneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import { SyntaxHighlighterWrapperProps } from "../../types";
import { getLineProps } from "../../utils/file-utils";

export function SyntaxHighlighterWrapper({
  code,
  language,
  highlightLines,
}: SyntaxHighlighterWrapperProps) {
  const { resolvedTheme } = useTheme();

  return (
    <SyntaxHighlighter
      language={language || "tsx"}
      style={resolvedTheme === "dark" ? atomDark : duotoneLight}
      wrapLongLines={true}
      wrapLines={true}
      showLineNumbers={true}
      lineNumberStyle={{
        minWidth: "2.5em",
        paddingRight: "1em",
        paddingLeft: "0.5em",
        color: "#6e7681",
        textAlign: "right",
        borderRight: "1px solid rgba(110, 118, 129, 0.2)",
        marginRight: "1em",
        userSelect: "none",
      }}
      customStyle={{
        margin: 0,
        borderRadius: "0.25rem",
        fontSize: "0.875rem",
        background: "transparent",
        padding: "1.5rem 1rem",
        boxSizing: "border-box",
        width: "100%",
        minHeight: "100%",
        direction: "ltr", // קוד תמיד LTR
      }}
      codeTagProps={{
        style: {
          fontSize: "0.875rem",
          fontFamily: "monospace",
          lineHeight: 1.5,
        },
      }}
      lineProps={getLineProps(highlightLines)}
    >
      {code || "// No code available"}
    </SyntaxHighlighter>
  );
}
