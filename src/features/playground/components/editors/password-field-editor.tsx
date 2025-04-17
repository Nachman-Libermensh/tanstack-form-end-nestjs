/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormFieldConfig } from "../../types";
import { useFormBuilder } from "../../context/form-builder-context";
import BaseFieldEditor from "./base-field-editor";
import { Separator } from "@/components/ui/separator";

export default function PasswordFieldEditor({
  field,
}: {
  field: FormFieldConfig;
}) {
  const { updateField } = useFormBuilder();

  // נלקח את הערכות האימות הקיימות או יוצרים אובייקט ריק אם אין
  const validations = field.validations || {};

  // מגדירים אפשרויות ייחודיות לשדה סיסמה
  const passwordOptions = field.passwordOptions || {
    showToggle: true,
    showStrengthIndicator: false,
    strengthIndicatorType: "basic",
  };

  const updateValidation = (key: string, value: any) => {
    updateField({
      ...field,
      validations: {
        ...validations,
        [key]: value,
      },
    });
  };

  const updatePasswordOption = (key: string, value: any) => {
    updateField({
      ...field,
      passwordOptions: {
        ...passwordOptions,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <BaseFieldEditor field={field} />

      <Separator />

      <div>
        <Label htmlFor={`${field.id}-placeholder`}>פלייסהולדר</Label>
        <Input
          id={`${field.id}-placeholder`}
          value={field.placeholder || ""}
          onChange={(e) =>
            updateField({ ...field, placeholder: e.target.value })
          }
        />
      </div>

      <Separator />

      {/* אפשרויות מיוחדות לשדה סיסמה */}
      <div>
        <h4 className="mb-3 text-sm font-medium">אפשרויות שדה סיסמה</h4>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor={`${field.id}-show-toggle`} className="flex-grow">
              הצג כפתור תצוגת סיסמה
            </Label>
            <Switch
              id={`${field.id}-show-toggle`}
              checked={passwordOptions.showToggle}
              onCheckedChange={(checked) =>
                updatePasswordOption("showToggle", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor={`${field.id}-strength`} className="flex-grow">
              הצג מחוון חוזק סיסמה
            </Label>
            <Switch
              id={`${field.id}-strength`}
              checked={passwordOptions.showStrengthIndicator}
              onCheckedChange={(checked) =>
                updatePasswordOption("showStrengthIndicator", checked)
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="mb-3 text-sm font-medium">אימות</h4>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor={`${field.id}-min-length`}>אורך מינימלי</Label>
            <Input
              id={`${field.id}-min-length`}
              type="number"
              value={validations.minLength || ""}
              onChange={(e) =>
                updateValidation(
                  "minLength",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>
          <div>
            <Label htmlFor={`${field.id}-max-length`}>אורך מקסימלי</Label>
            <Input
              id={`${field.id}-max-length`}
              type="number"
              value={validations.maxLength || ""}
              onChange={(e) =>
                updateValidation(
                  "maxLength",
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
          </div>
        </div>

        <div className="mt-2">
          <Label htmlFor={`${field.id}-pattern`}>תבנית (Regex)</Label>
          <Input
            id={`${field.id}-pattern`}
            value={validations.pattern || ""}
            onChange={(e) => updateValidation("pattern", e.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {
              "לדוגמה: ^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{8,}$ (לפחות אות גדולה, אות קטנה ומספר)"
            }
          </p>
        </div>

        <div className="mt-2">
          <Label htmlFor={`${field.id}-error-message`}>הודעת שגיאה</Label>
          <Input
            id={`${field.id}-error-message`}
            value={validations.message || ""}
            onChange={(e) => updateValidation("message", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
