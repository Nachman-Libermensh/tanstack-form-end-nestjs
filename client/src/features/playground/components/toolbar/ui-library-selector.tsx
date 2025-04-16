/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useUILibrary } from "../../hooks/useUILibrary";

export function UILibrarySelector() {
  const { currentLibrary, setUILibrary, availableLibraries } = useUILibrary();

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">ספריית UI:</label>
      <Select
        value={currentLibrary}
        onValueChange={(value: string) => setUILibrary(value as any)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectLabel>בחר ספריית UI</SelectLabel>
        </SelectTrigger>
        <SelectContent>
          {availableLibraries.map((lib) => (
            <SelectItem key={lib.value} value={lib.value}>
              {lib.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
