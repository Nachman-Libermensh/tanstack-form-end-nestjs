/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormFieldConfig } from "../../types";
import { useFormBuilder } from "../../context/form-builder-context";
import BaseFieldEditor from "./base-field-editor";
import { Separator } from "@/components/ui/separator";

export default function TextFieldEditor({ field }: { field: FormFieldConfig }) {
  const { updateField } = useFormBuilder();

  // נלקח את הערכות האימות הקיימות או יוצרים אובייקט ריק אם אין
  const validations = field.validations || {};

  const updateValidation = (key: string, value: any) => {
    updateField({
      ...field,
      validations: {
        ...validations,
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

      <div>
        <h4 className="mb-3 text-sm font-medium">אימות</h4>

        {(field.type === "text" || field.type === "password") && (
          <>
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
          </>
        )}

        {field.type === "number" && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`${field.id}-min`}>ערך מינימלי</Label>
              <Input
                id={`${field.id}-min`}
                type="number"
                value={validations.min || ""}
                onChange={(e) =>
                  updateValidation(
                    "min",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              />
            </div>
            <div>
              <Label htmlFor={`${field.id}-max`}>ערך מקסימלי</Label>
              <Input
                id={`${field.id}-max`}
                type="number"
                value={validations.max || ""}
                onChange={(e) =>
                  updateValidation(
                    "max",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
              />
            </div>
          </div>
        )}

        <div className="mt-2">
          <Label htmlFor={`${field.id}-pattern`}>תבנית (Regex)</Label>
          <Input
            id={`${field.id}-pattern`}
            value={validations.pattern || ""}
            onChange={(e) => updateValidation("pattern", e.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            תבנית Regex לאימות השדה
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
