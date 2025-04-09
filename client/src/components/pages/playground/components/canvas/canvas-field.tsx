/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { EyeIcon, GripVertical, X } from "lucide-react";
import { FormFieldConfig } from "../../types";
import { useFormBuilder } from "../../context/form-builder-context";
import { cn } from "@/lib/utils";

export default function CanvasField({
  field,
  isSelected,
  onClick,
  index,
}: {
  field: FormFieldConfig;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const { deleteField } = useFormBuilder();

  // נותן ייצוג מקדים של השדה בהתאם לסוג שלו
  const renderPreview = () => {
    switch (field.type) {
      case "text":
      case "email":

      case "number":
        return (
          <input
            type={field.type}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={field.placeholder}
            disabled
          />
        );
      case "password":
        return (
          <div className="relative">
            <input
              type="password"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={field.placeholder}
              disabled
            />
            {field.passwordOptions?.showToggle && (
              <div className="absolute inset-y-0 right-0 flex items-center px-3">
                <EyeIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
            {field.passwordOptions?.showStrengthIndicator && (
              <div className="mt-1 h-1 w-full bg-muted rounded overflow-hidden">
                <div className="h-full bg-primary w-1/3"></div>
              </div>
            )}
          </div>
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" disabled className="h-4 w-4" />
            <span>{field.label}</span>
          </div>
        );
      case "select":
        return (
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            disabled
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={field.placeholder}
            disabled
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "relative p-4 border rounded-md cursor-pointer group hover:border-primary/50",
        isSelected ? "border-primary ring-1 ring-primary" : "border-border"
      )}
      onClick={onClick}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100">
        <GripVertical size={16} className="cursor-grab" />
      </div>

      <div className="pr-8">
        <div className="mb-2 flex items-center">
          <span className="text-sm font-medium">
            {field.label || `שדה ללא תווית (${field.name})`}
            {field.required && <span className="text-destructive mr-1">*</span>}
          </span>
        </div>
        {renderPreview()}
      </div>

      <button
        className="absolute right-2 top-2 p-1 opacity-50 hover:opacity-100 hover:text-destructive"
        onClick={(e) => {
          e.stopPropagation();
          deleteField(field.id);
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
