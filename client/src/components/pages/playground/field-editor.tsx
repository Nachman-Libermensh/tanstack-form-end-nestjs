import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormFieldConfig } from ".";

export function FieldEditor({
  field,
  onChange,
}: {
  field: FormFieldConfig;
  onChange: (updated: FormFieldConfig) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <Label>שם</Label>
        <Input
          value={field.name}
          onChange={(e) => onChange({ ...field, name: e.target.value })}
        />
      </div>
      <div>
        <Label>תווית</Label>
        <Input
          value={field.label}
          onChange={(e) => onChange({ ...field, label: e.target.value })}
        />
      </div>
      <div>
        <Label>פלייסהולדר</Label>
        <Input
          value={field.placeholder || ""}
          onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
        />
      </div>
    </div>
  );
}
