/*
  FormBuilderAndPreview.tsx
  שילוב של FormBuilder (הוספה והסרה של שדות טקסט) עם Preview חי
  ו-Code Generation בסיסי.
  עיצוב משודרג עם כרטיסים (Cards) ו-Tailwind CSS.
*/

"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { useAppForm } from "@/components/shadcn-form";
import { CodeBlock } from "@/components/ui/code-block";

// מחולל קוד פשוט עבור שדות טקסט בלבד
function generateFieldCode(name: string, label: string) {
  return `  <form.Field
    name="${name}"
    children={(field) => (
      <div className="space-y-1">
        <label htmlFor=\"${name}\" className="block text-sm font-medium text-gray-700">${label}</label>
        <input
          id=\"${name}\"
          className=\"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm\"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
        {field.state.meta.touchedErrors && (
          <p className=\"text-xs text-red-600\">{field.state.meta.touchedErrors}</p>
        )}
      </div>
    )}
  />`;
}

function generateFormCode(fields: { name: string; label: string }[]) {
  const defaultValues = fields.map((f) => `${f.name}: ''`).join(", ");
  const fieldsCode = fields
    .map((f) => generateFieldCode(f.name, f.label))
    .join("\n");

  return `import { useForm } from "@tanstack/react-form";

const form = useForm({
  defaultValues: { ${defaultValues} },
  onSubmit: async ({ value }) => console.log(value),
});

return (
  <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }} className=\"space-y-6\" >
${fieldsCode}
    <button type=\"submit\" className=\"px-4 py-2 font-medium rounded bg-indigo-600 text-white hover:bg-indigo-700\">Submit</button>
  </form>
);`;
}

export default function FormBuilderAndPreview() {
  // מנגנון בניית הטופס
  const { fields, addField, removeField } = useFormBuilder();

  // Preview חי עם useAppForm
  const form = useAppForm({
    defaultValues: fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
    onSubmit: ({ value }) => console.log("Submitted:", value),
  });

  // מחולל הקוד להצגה
  const codeString = generateFormCode(
    fields.map((f) => ({ name: f.name, label: f.label }))
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {/* Builder */}
      <Card className="col-span-1">
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
            {fields.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between bg-gray-50 p-2 rounded"
              >
                <span className="text-sm">{f.label}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeField(f.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-4"
          >
            {fields.map((f) => (
              <form.AppField key={f.id} name={f.name as never}>
                {(field) => <field.TextField label={f.label} />}
              </form.AppField>
            ))}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Code */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Code</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={codeString}
            language="tsx"
            filename="generated-form.tsx"
          />
        </CardContent>
      </Card>
    </div>
  );
}
