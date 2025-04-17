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
import { toast } from "sonner";
import { useAppForm } from "@/components/shadcn-form";
import { CodeBlock } from "@/components/ui/code-block";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// מחולל קוד פשוט עבור שדות טקסט בלבד בסגנון tanstack-form בסיסי
function generateFieldCode(name: string, label: string) {
  return `  <form.Field
    name="${name}"
    children={(field) => (
      <div className=\"space-y-1\">  
        <Label htmlFor=\"${name}\">${label}</Label>
        <Input
          id=\"${name}\"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
        {field.state.meta.isTouched &&
          field.state.meta.errors.map((message, index) => (
            <p key={index} className=\"text-sm font-medium text-destructive\">{message}</p>
          ))}
      </div>
    )}
  />`;
}

function generateFormCode(fields: { name: string; label: string }[]) {
  const defaultValues = fields.map((f) => `${f.name}: ""`).join(", ");
  const fieldsCode = fields
    .map((f) => generateFieldCode(f.name, f.label))
    .join("\n");

  return `/* eslint-disable react/no-children-prop */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";

const Page = () => {
  const form = useForm({
    defaultValues: { ${defaultValues} },
    onSubmit: async ({ value }) => console.log(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
${fieldsCode}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Page;`;
}

export default function FormBuilderAndPreview() {
  const {
    fields,
    addField,
    removeField,
    selectedFieldId,
    selectField,
    updateField,
  } = useFormBuilder();

  const form = useAppForm({
    defaultValues: fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
    onSubmit: ({ value }) => {
      console.log("Submitted:", value);

      // בדיקה אם יש שגיאות בטופס
      const fieldMeta = form.store.state.fieldMeta as Record<
        string,
        { errors: string[] }
      >;
      const fieldsWithErrors = Object.entries(fieldMeta)
        .filter(([, meta]) => meta.errors.length > 0)
        .map(([field, meta]) => ({ field, errors: meta.errors }));

      const hasErrors = fieldsWithErrors.length > 0;

      // אייקונים לשימוש בטוסט
      const icons = {
        success: (
          <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        ),
        error: (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        ),
      };

      toast.success("הטופס נשלח בהצלחה ✅", {
        description: (
          <div className="text-sm mt-2 space-y-4 w-full max-w-full">
            {/* ערכי הטופס */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {icons.success}
                  <p className="font-medium text-sm">ערכים שנשלחו</p>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                  {Object.keys(value).length} שדות
                </span>
              </div>

              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <TableHead className="py-2 text-xs font-medium text-slate-500 dark:text-slate-400 w-1/3">
                      שדה
                    </TableHead>
                    <TableHead className="py-2 text-xs font-medium text-slate-500 dark:text-slate-400 w-2/3">
                      ערך
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(value).map(([key, val], idx) => (
                    <TableRow
                      key={key}
                      className={
                        idx % 2 === 0
                          ? "bg-white dark:bg-slate-900"
                          : "bg-slate-50/50 dark:bg-slate-800/50"
                      }
                    >
                      <TableCell className="py-2 font-medium text-slate-700 dark:text-slate-300">
                        {key}
                      </TableCell>
                      <TableCell className="py-2 font-mono text-sm">
                        {val ? (
                          <code className="bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {String(val)}
                          </code>
                        ) : (
                          <span className="italic text-slate-400 dark:text-slate-500 text-xs">
                            (ריק)
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* שגיאות הטופס */}
            {hasErrors && (
              <div className="w-full">
                <div className="flex items-center mb-2">
                  <div className="flex items-center gap-2">
                    {icons.error}
                    <p className="font-medium text-sm text-red-600 dark:text-red-400">
                      בעיות בשדות
                    </p>
                  </div>
                </div>

                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-900/30">
                      <TableHead className="py-2 text-xs font-medium text-red-600 dark:text-red-400 w-1/3">
                        שדה
                      </TableHead>
                      <TableHead className="py-2 text-xs font-medium text-red-600 dark:text-red-400 w-2/3">
                        שגיאה
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fieldsWithErrors.map(({ field, errors }, idx) => (
                      <TableRow
                        key={field}
                        className={
                          idx % 2 === 0
                            ? "bg-red-50/50 dark:bg-red-900/10"
                            : "bg-white dark:bg-slate-900/50"
                        }
                      >
                        <TableCell className="py-2 font-medium">
                          {field}
                        </TableCell>
                        <TableCell className="py-2 text-red-600 dark:text-red-400">
                          {errors.join(", ")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        ),
        duration: 6000,
      });
    },
  });

  const codeString = generateFormCode(
    fields.map((f) => ({ name: f.name, label: f.label }))
  );

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {/* Builder */}
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
            {fields.map((f) => (
              <li
                key={f.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                  selectedFieldId === f.id
                    ? "bg-blue-100"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => selectField(f.id)}
              >
                <span className="text-sm">{f.label}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeField(f.id);
                  }}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Field Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Field Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedField && (
            <p className="text-sm text-muted-foreground">
              Select a field to edit
            </p>
          )}
          {selectedField && (
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
          )}
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
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
      <Card>
        <CardHeader>
          <CardTitle>Code</CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock filename="" code={codeString} language="tsx" />
        </CardContent>
      </Card>
    </div>
  );
}
