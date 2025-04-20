"use client";

import { TreeViewElement } from "@/components/ui/extension/tree-view-api";
import { CodeFileExplorer } from "@/components/uu";
import React from "react";

export default function DemoPage() {
  // הגדרת העץ
  const elements: TreeViewElement[] = [
    {
      id: "1",
      isSelectable: true,
      name: "src",
      children: [
        { id: "2", isSelectable: true, name: "app.tsx" },
        {
          id: "3",
          isSelectable: true,
          name: "components",
          children: [
            {
              id: "20",
              isSelectable: true,
              name: "pages",
              children: [
                { id: "21", isSelectable: true, name: "interface.ts" },
              ],
            },
          ],
        },
        {
          id: "6",
          isSelectable: true,
          name: "ui",
          children: [{ id: "7", isSelectable: true, name: "carousel.tsx" }],
        },
      ],
    },
  ];

  // מפת תוכן הקבצים
  const files = {
    "2": {
      filename: "app.tsx",
      language: "tsx",
      code: `import React from "react";

export default function App() {
  return <div className="p-4">Hello World</div>;
}`,
      highlightLines: [3],
    },
    "21": {
      filename: "interface.ts",
      language: "ts",
      code: `export interface User {
  id: string;
  name: string;
}`,
      highlightLines: [2],
    },
    "7": {
      filename: "carousel.tsx",
      language: "tsx",
      code: `import React from "react";

export const Carousel = () => (
  <div>Carousel Component</div>
);`,
      highlightLines: [2],
    },
  };

  return (
    <div className="p-8">
      <CodeFileExplorer
        elements={elements}
        files={files}
        initialFileId="2"
        height={500}
      />
    </div>
  );
}
