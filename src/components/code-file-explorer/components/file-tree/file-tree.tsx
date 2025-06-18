/* eslint-disable react/no-children-prop */
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMenu } from "@/components/ui/sidebar";
import { FileItem } from "./file-item";
import { FolderItem } from "./folder-item";
import { FileTreeProps, TreeViewElement } from "../../types";

export function FileTree({
  elements,
  selectedId,
  expandedFolders,
  onFileSelect,
  onFolderToggle,
}: FileTreeProps) {
  // רנדור אלמנט העץ עם קומפוננטות הסיידבר
  const renderTreeItems = (
    items: TreeViewElement[],
    level: number = 0
  ): React.ReactNode => {
    return items.map((item) => {
      const isFolder = Boolean(item.children?.length);
      const isExpanded = expandedFolders[item.id] || false;
      const isSelectable = !isFolder && item.isSelectable !== false;
      const isSelected = item.id === selectedId;

      if (isFolder) {
        return (
          <FolderItem
            key={item.id}
            id={item.id}
            name={item.name}
            isExpanded={isExpanded}
            onToggle={onFolderToggle}
            children={item.children || []}
            renderTreeItems={renderTreeItems}
            level={level}
          />
        );
      }

      return (
        <FileItem
          key={item.id}
          id={item.id}
          name={item.name}
          isSelectable={isSelectable}
          isSelected={isSelected}
          onSelect={onFileSelect}
        />
      );
    });
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <ScrollArea className="h-full w-full" type="always">
        <div className="py-2 px-1 w-full" dir="ltr">
          <SidebarMenu className="space-y-1 w-full">
            {renderTreeItems(elements)}
          </SidebarMenu>
        </div>
      </ScrollArea>
    </div>
  );
}
