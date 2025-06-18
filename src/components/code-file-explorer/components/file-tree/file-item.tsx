import React from "react";
import { cn } from "@/lib/utils";
import { FileItemProps } from "../../types";
import {
  getFileIcon,
  getFileTypeDescription,
  formatFileSize,
} from "../../utils/file-utils";
import {
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

export function FileItem({
  id,
  name,
  isSelectable,
  isSelected,
  onSelect,
  fileMeta,
}: FileItemProps & { fileMeta?: any }) {
  return (
    <SidebarMenuSubItem key={id} className="relative">
      <SidebarMenuSubButton
        onClick={() => isSelectable && onSelect(id)}
        isActive={isSelected}
        className={cn(
          "group relative w-full h-auto min-h-[44px] p-2 rounded-lg transition-all duration-200 hover:bg-accent/50",
          "flex items-start justify-between gap-2",
          !isSelectable && "opacity-50 cursor-not-allowed",
          isSelected &&
            "bg-primary/10 border border-primary/20 font-medium text-primary shadow-sm"
        )}
      >
        {/* Left content - icon and file info */}
        <div className="flex items-start gap-2 min-w-0 flex-1 py-1">
          <div className="flex-shrink-0 mt-0.5">{getFileIcon(name)}</div>
          <div className="flex flex-col min-w-0 flex-1 gap-0.5">
            <span className="text-sm font-medium truncate leading-tight">
              {name}
            </span>
            <span className="text-xs text-muted-foreground truncate leading-tight">
              {getFileTypeDescription(name)}
            </span>
          </div>
        </div>

        {/* Right content - metadata */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {fileMeta?.size && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0.5 h-auto leading-tight"
            >
              {formatFileSize(fileMeta.size)}
            </Badge>
          )}
        </div>

        {/* Active indicator */}
        {isSelected && (
          <div className="absolute top-1/2 right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
        )}
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
