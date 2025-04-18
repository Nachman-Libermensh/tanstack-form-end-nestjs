import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "./types";


interface FieldEditorProps {
  selectedField: FormField | undefined;
  updateField: (id: string, updates: Partial<FormField>) => void;
}

export default function FieldEditor({
  selectedField,
  updateField,
}: FieldEditorProps) {
  if (!selectedField) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Field Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select a field to edit
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Field Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Label</Label>
            <Input
              value={selectedField.label}
              onChange={(e) =>
                updateField(selectedField.id, { label: e.target.value })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              value={selectedField.name}
              onChange={(e) =>
                updateField(selectedField.id, { name: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={!!selectedField.required}
              onCheckedChange={(checked) =>
                updateField(selectedField.id, {
                  required: checked === true,
                })
              }
            />
            <Label>Required</Label>
          </div>
          <div className="space-y-1">
            <Label>Placeholder</Label>
            <Input
              value={selectedField.placeholder || ""}
              onChange={(e) =>
                updateField(selectedField.id, {
                  placeholder: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Min Length</Label>
            <Input
              type="number"
              value={selectedField.validations?.minLength ?? ""}
              onChange={(e) =>
                updateField(selectedField.id, {
                  validations: {
                    ...selectedField.validations,
                    minLength: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  },
                })
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Max Length</Label>
            <Input
              type="number"
              value={selectedField.validations?.maxLength ?? ""}
              onChange={(e) =>
                updateField(selectedField.id, {
                  validations: {
                    ...selectedField.validations,
                    maxLength: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  },
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
