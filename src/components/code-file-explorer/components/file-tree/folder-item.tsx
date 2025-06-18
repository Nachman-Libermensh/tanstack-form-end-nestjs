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
import { Badge } from "@/components/ui/badge";

export function FolderItem({
  id,
  name,
  isExpanded,
  onToggle,
  children,
  renderTreeItems,
  level,
}: FolderItemProps) {
  const childCount = children?.length || 0;

  return (
    <SidebarMenuItem key={id}>
      <SidebarMenuButton
        onClick={() => onToggle(id)}
        className={cn(
          "group w-full h-auto min-h-[40px] p-2 rounded-lg transition-all duration-200 hover:bg-accent/50",
          "flex items-center justify-between gap-2",
          isExpanded && "bg-accent/30"
        )}
      >
        {/* Left content - chevron, icon, and name */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <ChevronRightIcon
            className={cn(
              "h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-transform duration-200",
              isExpanded && "transform rotate-90"
            )}
          />
          <div className="flex-shrink-0">{getFolderIcon(isExpanded)}</div>
          <span className="text-sm font-medium truncate flex-1 leading-tight">
            {name}
          </span>
        </div>

        {/* Right content - child count badge */}
        <div className="flex items-center gap-1 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
          {childCount > 0 && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0.5 h-auto leading-tight"
            >
              {childCount}
            </Badge>
          )}
        </div>
      </SidebarMenuButton>

      {isExpanded && children && (
        <SidebarMenuSub
          className={cn(
            "pl-3 mt-1 border-l border-border/50 ml-4 transition-all duration-200 overflow-visible",
            "animate-in slide-in-from-top-1 fade-in-0"
          )}
        >
          {renderTreeItems(children, level + 1)}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
