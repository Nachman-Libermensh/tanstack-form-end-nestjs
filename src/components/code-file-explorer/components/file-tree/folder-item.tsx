import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import { FolderItemProps } from "../../types";
import { getFolderIcon } from "../../utils/file-utils";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

export function FolderItem({
  id,
  name,
  isExpanded,
  onToggle,
  children,
  renderTreeItems,
  level,
}: FolderItemProps) {
  return (
    <SidebarMenuItem key={id}>
      <SidebarMenuButton
        onClick={() => onToggle(id)}
        className="justify-between group py-1 px-1 rounded-sm"
      >
        <div className="flex items-center gap-2">
          {getFolderIcon(isExpanded)}
          <span className="text-sm font-medium">{name}</span>
        </div>
        <ChevronRightIcon
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ml-auto",
            isExpanded && "transform rotate-90"
          )}
        />
      </SidebarMenuButton>

      {isExpanded && children && (
        <SidebarMenuSub className="pl-1">
          {renderTreeItems(children, level + 1)}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
