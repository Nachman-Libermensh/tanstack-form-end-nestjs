/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFormBuilder } from "../../hooks/useFormBuilder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Settings, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldConfig } from "../../types";

export default function FieldEditor() {
  const { fields, updateField } = useFormBuilder();
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  // אם יש שדות אבל אין שדה נבחר, בחר את הראשון
  useEffect(() => {
    if (fields.length > 0 && !selectedFieldId) {
      setSelectedFieldId(fields[0].id);
    } else if (fields.length === 0) {
      setSelectedFieldId(null);
    }
  }, [fields, selectedFieldId]);

  // מצא את השדה הנבחר
  const selectedField = fields.find((field) => field.id === selectedFieldId);

  if (!selectedField) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>בחר שדה כדי לערוך את המאפיינים שלו</p>
      </div>
    );
  }

  const handleChange = (key: keyof FieldConfig, value: any) => {
    updateField(selectedField.id, { [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">עריכת שדה: {selectedField.label}</span>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="basic" className="flex items-center gap-1">
            <Settings className="h-3.5 w-3.5" />
            <span>בסיסי</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Wand2 className="h-3.5 w-3.5" />
            <span>מתקדם</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="field-label">תווית</Label>
            <Input
              id="field-label"
              value={selectedField.label}
              onChange={(e) => handleChange("label", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="field-name">שם (עבור API)</Label>
            <Input
              id="field-name"
              value={selectedField.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="field-placeholder">פלייסהולדר</Label>
            <Input
              id="field-placeholder"
              value={selectedField.placeholder || ""}
              onChange={(e) => handleChange("placeholder", e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="field-required"
              checked={selectedField.required || false}
              onCheckedChange={(checked) => handleChange("required", checked)}
            />
            <Label htmlFor="field-required">שדה חובה</Label>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="pt-4">
          <div className="space-y-2">
            <Label htmlFor="field-helperText">טקסט עזרה</Label>
            <Input
              id="field-helperText"
              value={selectedField.helperText || ""}
              onChange={(e) => handleChange("helperText", e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="field-disabled"
              checked={selectedField.disabled || false}
              onCheckedChange={(checked) => handleChange("disabled", checked)}
            />
            <Label htmlFor="field-disabled">לא פעיל</Label>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
