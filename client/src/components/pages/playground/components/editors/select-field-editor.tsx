import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormFieldConfig } from "../../types";
import { useFormBuilder } from "../../context/form-builder-context";
import BaseFieldEditor from "./base-field-editor";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

export default function SelectFieldEditor({
  field,
}: {
  field: FormFieldConfig;
}) {
  const { updateField } = useFormBuilder();

  // יוצרים מערך ברירת מחדל אם אין אפשרויות
  const options = field.options || [];

  const addOption = () => {
    const newOption = { label: "", value: "" };
    updateField({
      ...field,
      options: [...options, newOption],
    });
  };

  const updateOption = (index: number, key: "label" | "value", value: string) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [key]: value,
    };
    updateField({
      ...field,
      options: newOptions,
    });
  };

  const removeOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    updateField({
      ...field,
      options: newOptions,
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
        <div className="flex justify-between mb-3">
          <h4 className="text-sm font-medium">אפשרויות</h4>
          <Button size="sm" variant="outline" onClick={addOption}>
            <Plus size={16} className="mr-1" />
            הוסף
          </Button>
        </div>

        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                value={option.label}
                onChange={(e) => updateOption(index, "label", e.target.value)}
                placeholder="תווית"
              />
              <Input
                value={option.value}
                onChange={(e) => updateOption(index, "value", e.target.value)}
                placeholder="ערך"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeOption(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          
          {options.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              לא הוגדרו אפשרויות. לחץ על &quot;הוסף&quot; כדי להוסיף אפשרויות.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}