import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { toast } from "sonner";
import { useAppForm } from "@/components/shadcn-form";
import { useFormBuilder } from "./hooks/useFormBuilder";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { FieldConfig } from "./types";
import { Smartphone, Monitor, Tablet } from "lucide-react";

interface FormValues {
  [key: string]: string;
}

interface FormState {
  isValid: boolean;
  isDirty: boolean;
  canSubmit: boolean;
  submissionAttempts: number;
}

type DeviceView = "mobile" | "tablet" | "desktop";

export default function FormPreview() {
  const { fields } = useFormBuilder();
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");

  // Zod schema creation - unchanged
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

  // Form handling - unchanged
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

  // Device frame widths
  const deviceWidth = {
    mobile: "max-w-[320px]",
    tablet: "max-w-[768px]",
    desktop: "w-full",
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">תצוגה מקדימה</h2>
        <div className="flex gap-2">
          <Button
            variant={deviceView === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeviceView("mobile")}
          >
            <Smartphone size={16} />
          </Button>
          <Button
            variant={deviceView === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeviceView("tablet")}
          >
            <Tablet size={16} />
          </Button>
          <Button
            variant={deviceView === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setDeviceView("desktop")}
          >
            <Monitor size={16} />
          </Button>
        </div>
      </div>

      <div className={`mx-auto transition-all ${deviceWidth[deviceView]}`}>
        <Card
          className={`${deviceView === "mobile" ? "shadow-lg" : ""} border-2`}
        >
          <CardHeader>
            <CardTitle>טופס חי</CardTitle>
            <CardDescription>תצוגה מקדימה של הטופס שבנית</CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {fields.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  אין שדות בטופס. הוסף שדות כדי לראות את הטופס בפעולה.
                </div>
              ) : (
                fields.map((f) => (
                  <form.AppField key={f.id} name={f.name as never}>
                    {(field) => (
                      <field.TextField
                        label={f.label}
                        placeholder={f.placeholder}
                        required={f.required}
                        disabled={f.disabled}
                        helperText={f.helperText}
                      />
                    )}
                  </form.AppField>
                ))
              )}
            </form>
          </CardContent>

          <CardFooter className="flex justify-between border-t p-4">
            {fields.length > 0 && (
              <Button
                type="submit"
                className="w-full"
                onClick={() => form.handleSubmit()}
              >
                שלח טופס
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
