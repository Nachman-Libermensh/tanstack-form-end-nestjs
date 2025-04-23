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
import { useDirection } from "@/i18n/direction";
import { SmartDatetimeInput } from "@/components/ui/extension/smart-datetime-input";

interface FormValues {
  [key: string]: string | boolean | number;
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

  // יצירה של Zod schema - עם תמיכה משופרת בסוגי שדות שונים
  const zodSchema = useMemo(() => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    fields.forEach((field: FieldConfig) => {
      switch (field.type) {
        case "number":
          let numberSchema = z.coerce.number({
            invalid_type_error: "חובה להזין מספר",
          });

          // הוספת ולידציות ספציפיות למספרים
          if (field.validations?.min !== undefined) {
            numberSchema = numberSchema.min(field.validations.min, {
              message: `ערך מינימלי: ${field.validations.min}`,
            });
          }
          if (field.validations?.max !== undefined) {
            numberSchema = numberSchema.max(field.validations.max, {
              message: `ערך מקסימלי: ${field.validations.max}`,
            });
          }

          // שמירת הסכמה המעודכנת
          schemaFields[field.name] = field.required
            ? numberSchema.min(1, { message: "שדה חובה" })
            : numberSchema.optional();
          break;

        case "checkbox":
          schemaFields[field.name] = z.boolean();
          break;

        case "email":
          const emailSchema = z.string().email({ message: "אימייל לא תקין" });
          schemaFields[field.name] = field.required
            ? emailSchema.min(1, { message: "שדה חובה" })
            : emailSchema.optional();
          break;

        case "password":
          let passwordSchema = z.string();

          // אפשרויות ולידציה לסיסמה
          if (field.validations?.minLength) {
            passwordSchema = passwordSchema.min(field.validations.minLength, {
              message: `אורך מינימלי: ${field.validations.minLength} תווים`,
            });
          }
          if (field.validations?.maxLength) {
            passwordSchema = passwordSchema.max(field.validations.maxLength, {
              message: `אורך מקסימלי: ${field.validations.maxLength} תווים`,
            });
          }

          schemaFields[field.name] = field.required
            ? passwordSchema.min(1, { message: "שדה חובה" })
            : passwordSchema.optional();
          break;

        case "select":
          const selectSchema = z.string();
          schemaFields[field.name] = field.required
            ? selectSchema.min(1, { message: "שדה חובה" })
            : selectSchema.optional();
          break;

        default: // text וכל השאר
          let textSchema = z.string();

          // הוספת ולידציות אורך טקסט
          if (field.validations?.minLength) {
            textSchema = textSchema.min(field.validations.minLength, {
              message: `אורך מינימלי: ${field.validations.minLength} תווים`,
            });
          }
          if (field.validations?.maxLength) {
            textSchema = textSchema.max(field.validations.maxLength, {
              message: `אורך מקסימלי: ${field.validations.maxLength} תווים`,
            });
          }

          schemaFields[field.name] = field.required
            ? textSchema.min(1, { message: "שדה חובה" })
            : textSchema.optional();
          break;
      }
    });

    return z.object(schemaFields);
  }, [fields]);

  // יצירת ערכים ברירת מחדל לפי סוגי שדות
  const defaultValues = useMemo(() => {
    return fields.reduce((acc, f) => {
      // קביעת ערך ברירת מחדל מתאים לסוג השדה
      let defaultValue: string | boolean | number = "";

      switch (f.type) {
        case "checkbox":
          defaultValue = Boolean(f.defaultValue) || false;
          break;
        case "number":
          defaultValue = f.defaultValue ? Number(f.defaultValue) : 0;
          break;
        default:
          defaultValue = f.defaultValue || "";
          break;
      }

      return { ...acc, [f.name]: defaultValue };
    }, {});
  }, [fields]);

  // Form handling
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
    defaultValues,
    onSubmit: ({ value }) => {
      handleFormSubmit(value, form.store.state);
    },
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

  // רנדור שדה לפי סוג
  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "checkbox":
        return (
          <form.AppField key={field.id} name={field.name as never}>
            {(fieldContext) => (
              <fieldContext.CheckboxField
                label={field.label}
                required={field.required}
                disabled={field.disabled}
                helperText={field.helperText}
              />
            )}
          </form.AppField>
        );

      case "select":
        return (
          <form.AppField key={field.id} name={field.name as never}>
            {(fieldContext) => (
              <fieldContext.SelectField
                label={field.label}
                placeholder={field.placeholder || "בחר..."}
                required={field.required}
                disabled={field.disabled}
                helperText={field.helperText}
                options={
                  field.options?.map((opt) => ({
                    label: opt.label,
                    value: opt.value,
                  })) || []
                }
              />
            )}
          </form.AppField>
        );

      case "password":
        return (
          <form.AppField key={field.id} name={field.name as never}>
            {(fieldContext) => (
              <fieldContext.PasswordInput
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
                helperText={field.helperText}
              />
            )}
          </form.AppField>
        );
      // מיקום: השלמת המקרה החסר לטיפול בשדה מסוג זמן
      case "time":
        return (
          <form.AppField key={field.id} name={field.name as never}>
            {(fieldContext) => (
              <div className="relative">
                <SmartDatetimeInput
                  value={
                    fieldContext.state.value
                      ? new Date(fieldContext.state.value)
                      : undefined
                  }
                  onValueChange={(date) => {
                    // שמירת התאריך כמחרוזת ISO בטופס
                    fieldContext.handleChange(date.toISOString());
                  }}
                  // disabled={field.disabled}
                  // placeholder={field.placeholder || `הזן זמן עבור ${field.label}`}
                  className="mt-0"
                />

                {/* הצגת תווית השדה בחלק העליון */}
                <label
                  className={`absolute -top-2 right-2 text-xs bg-white dark:bg-gray-950 px-1
                      ${
                        field.required
                          ? "after:content-['*'] after:mr-0.5 after:text-destructive"
                          : ""
                      }`}
                >
                  {field.label}
                </label>

                {/* הודעת עזרה או הודעת שגיאה */}
                {fieldContext.state.meta.touchedErrors?.[0] ? (
                  <p className="text-xs text-destructive mt-1">
                    {fieldContext.state.meta.touchedErrors[0]}
                  </p>
                ) : field.helperText ? (
                  <p className="text-xs text-muted-foreground mt-1">
                    {field.helperText}
                  </p>
                ) : null}
              </div>
            )}
          </form.AppField>
        );

      default: // text, email, number, etc.
        return (
          <form.AppField key={field.id} name={field.name as never}>
            {(fieldContext) => (
              <fieldContext.TextField
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
                helperText={field.helperText}
                type={field.type === "number" ? "number" : field.type}
              />
            )}
          </form.AppField>
        );
    }
  };
  const dir = useDirection();
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
          dir={dir}
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
                fields.map(renderField)
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
