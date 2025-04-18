import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { toast } from "sonner";
import { useAppForm } from "@/components/shadcn-form";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { useEffect, useMemo } from "react";
import { z } from "zod"; // Import zod
import { FieldConfig } from "./types";

interface FormValues {
  [key: string]: string;
}

interface FormState {
  isValid: boolean;
  isDirty: boolean;
  canSubmit: boolean;
  submissionAttempts: number;
}

export default function FormPreview() {
  const { fields } = useFormBuilder();

  // Dynamically create a Zod schema based on field validations
  const zodSchema = useMemo(() => {
    // Start with an empty schema object
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field: FieldConfig) => {
      // Start with a string schema
      let fieldSchema = z.string();

      // Add min/max length validations if defined
      if (field.validations?.minLength) {
        fieldSchema = fieldSchema.min(field.validations.minLength, {
          message: `אורך מינימלי: ${field.validations.minLength} תווים`,
        });
      }

      if (field.validations?.maxLength) {
        fieldSchema = fieldSchema.max(field.validations.maxLength, {
          message: `אורך מקסימלי: ${field.validations.maxLength} תווים`,
        });
      }

      // Add more validations as needed
      // For example, email validation
      if (field.type === "email") {
        fieldSchema = fieldSchema.email({ message: "אימייל לא תקין" });
      }

      // Apply required/optional check LAST - after all other validations
      if (!field.required) {
        // Directly add the optional schema to schemaFields instead of reassigning
        schemaFields[field.name] = fieldSchema.optional();
      } else {
        schemaFields[field.name] = fieldSchema.min(1, { message: "שדה חובה" });
      }
    });

    return z.object(schemaFields);
  }, [fields]);

  const handleFormSubmit = (value: FormValues, formState: FormState) => {
    console.log("Submitted:", value);

    toast.success("הטופס נשלח בהצלחה ✅", {
      description: (
        <CodeBlock
          filename="form-summary.json"
          language="json"
          code={JSON.stringify(
            {
              values: value,
              status: {
                isValid: formState.isValid,
                isDirty: formState.isDirty,
                canSubmit: formState.canSubmit,
                submissionAttempts: formState.submissionAttempts,
              },
            },
            null,
            2
          )}
        />
      ),
      duration: 6000,
    });
  };

  const form = useAppForm({
    defaultValues: fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {}),
    onSubmit: ({ value }) => {
      handleFormSubmit(value, form.store.state);
    },
    // Add the Zod validation schema
    validators: {
      onChange: zodSchema,
      onSubmit: zodSchema,
    },
  });
  useEffect(() => {
    form.reset();
  }, [fields, form]);

  return (
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
              {(field) => (
                <field.TextField
                  label={f.label}
                  placeholder={f.placeholder}
                  required={f.required}
                  disabled={f.disabled}
                  helperText={f.helperText}
                  // No need for validation prop here as we're using Zod schema
                />
              )}
            </form.AppField>
          ))}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
