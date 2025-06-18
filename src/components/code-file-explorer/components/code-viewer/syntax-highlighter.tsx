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
  showLineNumbers = true,
}: SyntaxHighlighterWrapperProps & { showLineNumbers?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Custom styles for the syntax highlighter
  const customStyle: React.CSSProperties = {
    margin: 0,
    borderRadius: "0.5rem",
    fontSize: "0.875rem",
    background: "transparent",
    padding: "1.5rem",
    boxSizing: "border-box",
    width: "100%",
    direction: "ltr",
    overflow: "visible",
    fontFamily:
      "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'Liberation Mono', monospace",
    lineHeight: 1.6,
  };

  // Line number styling
  const lineNumberStyle: React.CSSProperties = {
    minWidth: "3em",
    paddingRight: "1em",
    paddingLeft: "0.5em",
    color: isDark ? "#6e7681" : "#656d76",
    textAlign: "right",
    borderRight: `1px solid ${
      isDark ? "rgba(110, 118, 129, 0.2)" : "rgba(110, 118, 129, 0.15)"
    }`,
    marginRight: "1em",
    userSelect: "none",
    fontSize: "0.75rem",
    opacity: 0.7,
    boxSizing: "border-box",
  };

  // Code tag properties
  const codeTagProps = {
    style: {
      fontSize: "0.875rem",
      fontFamily:
        "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', 'Liberation Mono', monospace",
      lineHeight: 1.6,
      fontWeight: 400,
      boxSizing: "border-box",
      padding: 0,
      margin: 0,
    },
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <style jsx>{`
        .syntax-highlighter :global(code > span) {
          display: block !important;
          margin: 0 !important;
          padding: 0 0.5rem !important;
          box-sizing: border-box !important;
        }
        .syntax-highlighter :global(code > span > span) {
          margin: 0 !important;
          padding: 0 !important;
          display: inline !important;
        }
      `}</style>
      <SyntaxHighlighter
        className="syntax-highlighter"
        language={language || "tsx"}
        style={isDark ? atomDark : duotoneLight}
        wrapLongLines={true}
        wrapLines={true}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={lineNumberStyle}
        customStyle={customStyle}
        codeTagProps={codeTagProps}
        lineProps={(lineNumber) => {
          const props = getLineProps(highlightLines)(lineNumber);
          return {
            ...props,
            style: {
              ...props.style,
              boxSizing: "border-box",
              margin: 0,
              padding: "0 0.5rem",
              display: "block",
            },
          };
        }}
        PreTag={({ children, ...props }) => (
          <pre {...props} className="!m-0 !p-0 !bg-transparent">
            {children}
          </pre>
        )}
      >
        {code || "// No code available\n// Select a file to view its content"}
      </SyntaxHighlighter>
    </div>
  );
}
