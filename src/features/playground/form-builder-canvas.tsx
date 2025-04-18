import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFormBuilder } from "./hooks/useFormBuilder";

// interface FormBuilderCanvasProps {}

export default function FormBuilderCanvas() {
  const { fields, selectedFieldId, addField, removeField, selectField } =
    useFormBuilder();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={() => addField({ type: "text", label: "New Field" })}
          className="w-full"
        >
          + Add Text Field
        </Button>
        <ul className="space-y-2">
          {fields.map((field) => (
            <li
              key={field.id}
              className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedFieldId === field.id
                  ? "bg-blue-100"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              onClick={() => selectField(field.id)}
            >
              <span className="text-sm">{field.label}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeField(field.id);
                }}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
