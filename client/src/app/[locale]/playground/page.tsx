// app/form-builder/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
// import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import type { FormFieldConfig } from "@/types/form-builder";

type FormFieldConfig = {
  id: string;
  type: string;

  label: string;
  name: string;
  required: boolean;
  placeholder: string;
};
// app/form-builder/page.tsx

// תשתיות לקומפוננטות הבאות — יש לממש אותן בנפרד
// app/form-builder/page.tsx

// תשתיות לקומפוננטות הבאות — יש לממש אותן בנפרד
function FormBuilderCanvas({
  fields,
  onSelectField,
  selectedFieldId,
}: {
  fields: FormFieldConfig[];
  onSelectField: (id: string) => void;
  selectedFieldId: string | null;
}) {
  return (
    <div className="border rounded p-4 min-h-[300px]">
      {fields.length === 0 && (
        <p className="text-muted-foreground">כאן תוצג גרירת השדות בפועל</p>
      )}
      {fields.map((field) => (
        <div
          key={field.id}
          className={`p-2 my-1 rounded cursor-pointer border ${
            selectedFieldId === field.id ? "bg-muted" : ""
          }`}
          onClick={() => onSelectField(field.id)}
        >
          {field.label || field.name}
        </div>
      ))}
    </div>
  );
}

function FieldEditor({
  field,
  onChange,
}: {
  field: FormFieldConfig;
  onChange: (updated: FormFieldConfig) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label>שם</Label>
        <Input
          value={field.name}
          onChange={(e) => onChange({ ...field, name: e.target.value })}
        />
      </div>
      <div>
        <Label>תווית</Label>
        <Input
          value={field.label}
          onChange={(e) => onChange({ ...field, label: e.target.value })}
        />
      </div>
      <div>
        <Label>פלייסהולדר</Label>
        <Input
          value={field.placeholder || ""}
          onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
        />
      </div>
    </div>
  );
}

export default function FormBuilderPage() {
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
function nanoid(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
