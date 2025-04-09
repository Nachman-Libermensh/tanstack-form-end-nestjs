// app/form-builder/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

// import type { FormFieldConfig } from "@/types/form-builder";

type FormFieldConfig = {
  id: string;
  type: string;

  label: string;
  name: string;
  required: boolean;
  placeholder: string;
};
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
      <p className="text-muted-foreground">כאן תוצג גרירת השדות בפועל</p>
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

function FormFieldEditor({
  field,
  onChange,
}: {
  field: FormFieldConfig | null;
  onChange: (updated: FormFieldConfig) => void;
}) {
  if (!field)
    return <div className="text-muted-foreground">בחר שדה לעריכה</div>;
  return (
    <div className="space-y-2">
      <input
        className="w-full border rounded p-2"
        value={field.label}
        onChange={(e) => onChange({ ...field, label: e.target.value })}
        placeholder="Label"
      />
      <input
        className="w-full border rounded p-2"
        value={field.name}
        onChange={(e) => onChange({ ...field, name: e.target.value })}
        placeholder="Name"
      />
      <input
        className="w-full border rounded p-2"
        value={field.placeholder}
        onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
        placeholder="Placeholder"
      />
    </div>
  );
}

function FormPreview({ fields }: { fields: FormFieldConfig[] }) {
  return (
    <form className="space-y-3">
      {fields.map((field) => (
        <div key={field.id}>
          <label className="block text-sm font-medium mb-1">
            {field.label}
          </label>
          <input
            className="w-full border rounded p-2"
            placeholder={field.placeholder}
            required={field.required}
          />
        </div>
      ))}
    </form>
  );
}

function GeneratedCodePanel({ fields }: { fields: FormFieldConfig[] }) {
  return (
    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded">
      {JSON.stringify(fields, null, 2)}
    </pre>
  );
}

export default function FormBuilderPage() {
  const [fields, setFields] = useState<FormFieldConfig[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const handleAddField = () => {
    const newField: FormFieldConfig = {
      id: crypto.randomUUID(),
      type: "text",
      label: "שדה טקסט",
      name: `field_${fields.length + 1}`,
      required: false,
      placeholder: "",
    };
    setFields([...fields, newField]);
    setSelectedFieldId(newField.id);
  };

  const selectedField = fields.find((f) => f.id === selectedFieldId) || null;

  const updateField = (updated: FormFieldConfig) => {
    setFields((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">🎛️ בונה טפסים</h1>
        <Button onClick={handleAddField}>
          <Plus className="w-4 h-4 mr-2" />
          הוסף שדה
        </Button>
      </div>
      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">עריכה</TabsTrigger>
          <TabsTrigger value="preview">תצוגה</TabsTrigger>
          <TabsTrigger value="code">קוד</TabsTrigger>
        </TabsList>

        <TabsContent
          value="editor"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Card>
            <CardContent className="p-4">
              <FormBuilderCanvas
                fields={fields}
                selectedFieldId={selectedFieldId}
                onSelectField={setSelectedFieldId}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <FormFieldEditor field={selectedField} onChange={updateField} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="p-4">
              <FormPreview fields={fields} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardContent className="p-4">
              <GeneratedCodePanel fields={fields} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
