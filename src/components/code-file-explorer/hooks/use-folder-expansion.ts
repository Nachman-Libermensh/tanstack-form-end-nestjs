import { useState, useEffect } from "react";
import { TreeViewElement } from "../types";

export function useFolderExpansion(
  elements: TreeViewElement[],
  initialFileId?: string
) {
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({});

  // פתיחה אוטומטית של תיקיות בנתיב לקובץ הנבחר
  useEffect(() => {
    if (!initialFileId) return;

    const findPathToFile = (
      elements: TreeViewElement[],
      targetId: string,
      path: string[] = []
    ): string[] | null => {
      for (const element of elements) {
        if (element.id === targetId) {
          return [...path];
        }

        if (element.children?.length) {
          const foundPath = findPathToFile(element.children, targetId, [
            ...path,
            element.id,
          ]);
          if (foundPath) return foundPath;
        }
      }

      return null;
    };

    const path = findPathToFile(elements, initialFileId);
    if (path) {
      const initialExpanded = path.reduce(
        (acc, id) => ({ ...acc, [id]: true }),
        {}
      );
      setExpandedFolders(initialExpanded);
    }
  }, [elements, initialFileId]);

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return {
    expandedFolders,
    toggleFolder,
  };
}
