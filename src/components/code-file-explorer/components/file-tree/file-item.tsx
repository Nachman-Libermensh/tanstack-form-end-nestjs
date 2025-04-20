import React from "react";
import { cn } from "@/lib/utils";
import { FileItemProps } from "../../types";
import { getFileIcon } from "../../utils/file-utils";
import {
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

export function FileItem({
  id,
  name,
  isSelectable,
  isSelected,
  onSelect,
}: FileItemProps) {
  return (
    <SidebarMenuSubItem key={id}>
      <SidebarMenuSubButton
        onClick={() => isSelectable && onSelect(id)}
        isActive={isSelected}
        className={cn(
          "py-1 px-1 rounded-sm",
          !isSelectable && "opacity-50 cursor-not-allowed",
          isSelected && "bg-primary/10 font-medium text-primary"
        )}
      >
        <div className="flex items-center gap-2">
          {getFileIcon(name)}
          <span className="text-sm truncate max-w-[200px]">{name}</span>
        </div>
        {isSelected && (
          <div className="h-full w-1 absolute top-0 left-[-8px] bg-primary rounded-sm" />
        )}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
