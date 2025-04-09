"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { nanoid } from "./utils/nanoid";
import FormBuilderCanvas from "./form-builder-canvas";
import { FieldEditor } from "./field-editor";
export type FormFieldConfig = {
  id: string;
  type: string;

  label: string;
  name: string;
  required: boolean;
  placeholder: string;
};
export default function FormBuilderLayout() {
  const [fields, setFields] = useState<FormFieldConfig[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const addField = (type: FormFieldConfig["type"]) => {
    const newField: FormFieldConfig = {
      id: nanoid(),
      type,
      name: `field_${fields.length + 1}`,
      label: "",
      required: false,
      placeholder: "",
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const updateField = (updated: FormFieldConfig) => {
    setFields((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <Card className="col-span-2">
        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2">
            <Button onClick={() => addField("text")}>+ שדה טקסט</Button>
            <Button onClick={() => addField("password")}>+ סיסמה</Button>
            <Button onClick={() => addField("checkbox")}>+ תיבת סימון</Button>
          </div>
          <FormBuilderCanvas
            fields={fields}
            onSelectField={setSelectedFieldId}
            selectedFieldId={selectedFieldId}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          {selectedField ? (
            <FieldEditor field={selectedField} onChange={updateField} />
          ) : (
            <p className="text-muted-foreground">בחר שדה לעריכה</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
