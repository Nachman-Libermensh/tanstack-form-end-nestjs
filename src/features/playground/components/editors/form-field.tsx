"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldConfig } from "../../types";
import { useFormBuilder } from "../../hooks/useFormBuilder";
// import { TextField } from "../form-fields/TextField";
// import { SelectField } from "../form-fields/SelectField";
// import { CheckboxField } from "../form-fields/CheckboxField";
// import { TextareaField } from "../form-fields/TextareaField";

interface FormFieldProps {
  field: FieldConfig;
  onRemove: (id: string) => void;
}

export function FormField({ field, onRemove }: FormFieldProps) {
  const { selectedFieldId, selectField } = useFormBuilder();

  const isSelected = selectedFieldId === field.id;

  const handleSelectField = () => {
    selectField(field.id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(field.id);
  };

  const renderPreview = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "date":
        return <TextField field={field} readOnly />;
      case "select":
        return <SelectField field={field} readOnly />;
      case "checkbox":
        return <CheckboxField field={field} readOnly />;
      case "textarea":
        return <TextareaField field={field} readOnly />;
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all border hover:border-primary",
        isSelected && "ring-2 ring-primary ring-offset-2"
      )}
      onClick={handleSelectField}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="p-1 text-muted-foreground">
            <GripVertical className="h-5 w-5" />
          </div>
          <div className="flex-1">{renderPreview()}</div>
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleSelectField}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
