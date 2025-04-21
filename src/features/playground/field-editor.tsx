import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Filter, Palette } from "lucide-react";
import { useDirection } from "@/i18n/direction";

export default function FieldEditor() {
  const { updateField, selectedFieldId, fields } = useFormBuilder();
  const selectedField = fields.find((f) => f.id === selectedFieldId);
  const dir = useDirection();
  if (!selectedField) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>הגדרות שדה</CardTitle>
          <CardDescription>בחר שדה כדי לערוך את המאפיינים שלו</CardDescription>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            בחר שדה מהרשימה למעלה כדי לערוך אותו
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card dir={dir} className="border-2 border-primary/10">
      <CardHeader>
        <CardTitle>הגדרות שדה {selectedField.label}</CardTitle>
        <CardDescription>שנה את מאפייני השדה הנבחר</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs dir={dir} defaultValue="basic">
          <TabsList className="grid grid-cols-3 mb-4 border-amber-100">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Settings size={14} /> בסיסי
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center gap-2">
              <Filter size={14} /> אימות
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette size={14} /> עיצוב
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-label">כותרת השדה</Label>
              <Input
                id="field-label"
                value={selectedField.label}
                onChange={(e) =>
                  updateField(selectedField.id, { label: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-name">שם השדה (למפתחים)</Label>
              <Input
                id="field-name"
                value={selectedField.name}
                onChange={(e) =>
                  updateField(selectedField.id, { name: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                שם זה משמש לזיהוי השדה בקוד
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="field-required"
                checked={!!selectedField.required}
                onCheckedChange={(checked) => {
                  updateField(selectedField.id, {
                    required: checked === true,
                  });
                }}
              />
              <Label htmlFor="field-required">שדה חובה</Label>
            </div>
          </TabsContent>

          <TabsContent value="validation" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-min-length">אורך מינימלי</Label>
              <Input
                id="field-min-length"
                type="number"
                value={selectedField.validations?.minLength ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  updateField(selectedField.id, {
                    validations: {
                      ...selectedField.validations,
                      minLength: value === "" ? undefined : Number(value),
                    },
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-max-length">אורך מקסימלי</Label>
              <Input
                id="field-max-length"
                type="number"
                value={selectedField.validations?.maxLength ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  updateField(selectedField.id, {
                    validations: {
                      ...selectedField.validations,
                      maxLength: value === "" ? undefined : Number(value),
                    },
                  });
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="field-placeholder">טקסט מקום שמור</Label>
              <Input
                id="field-placeholder"
                value={selectedField.placeholder || ""}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    placeholder: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="field-helper">טקסט עזרה</Label>
              <Input
                id="field-helper"
                value={selectedField.helperText || ""}
                onChange={(e) =>
                  updateField(selectedField.id, {
                    helperText: e.target.value,
                  })
                }
              />
              <p className="text-xs text-muted-foreground">
                טקסט זה יוצג מתחת לשדה כהנחיה למשתמש
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="field-disabled"
                checked={!!selectedField.disabled}
                onCheckedChange={(checked) => {
                  updateField(selectedField.id, {
                    disabled: checked === true,
                  });
                }}
              />
              <Label htmlFor="field-disabled">שדה מושבת</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
