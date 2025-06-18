import { generateFieldCode } from "./generate-field-code";
import { FieldConfig } from "../../types";
import { generateZodSchema } from "./generate-zod-schema";

export function generateFormCode(fields: FieldConfig[]) {
  // Generate default values based on field types
  const defaultValues = fields
    .map((f) => {
      let defaultValue = '""';

      switch (f.type) {
        case "number":
        case "range":
          defaultValue = f.defaultValue || "0";
          break;
        case "checkbox":
          defaultValue = f.defaultValue || "false";
          break;
        case "date":
        case "time":
        case "datetime":
          defaultValue = "new Date()";
          break;
        default:
          defaultValue = `"${f.defaultValue || ""}"`;
      }

      return `${f.name}: ${defaultValue}`;
    })
    .join(",\n    ");

  // Generate field components
  const fieldsCode = fields.map((f) => generateFieldCode(f)).join("\n\n");

  // Generate Zod schema
  const { imports: zodImports, schemaCode } = generateZodSchema(fields);

  return `"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
${zodImports}

${schemaCode}

const FormComponent = () => {
  const form = useForm({
    defaultValues: {
    ${defaultValues}
    },
    onSubmit: async ({ value }) => {
      // Validate the form data
      const validation = validateForm(value);
      
      if (!validation.success) {
        toast.error("שגיאה בטופס", {
          description: "אנא בדוק את הנתונים שהזנת"
        });
        return;
      }

      console.log("Form submitted successfully:", validation.data);
      toast.success("הטופס נשלח בהצלחה!", {
        description: "הנתונים נשלחו לעיבוד"
      });
      
      // Here you can send the data to your API
      // await submitFormData(validation.data);
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>טופס נוצר אוטומטית</CardTitle>
        <CardDescription>
          טופס זה נוצר באמצעות Form Builder עם TanStack Form
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
${fieldsCode}

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              שלח טופס
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.reset()}
              className="flex-1"
            >
              נקה טופס
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormComponent;`;
}
