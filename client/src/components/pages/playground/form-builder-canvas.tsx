import { FormFieldConfig } from ".";

export default function FormBuilderCanvas({
  fields,
  onSelectField,
  selectedFieldId,
}: {
  fields: FormFieldConfig[];
  onSelectField: (id: string) => void;
  selectedFieldId: string | null;
}) {
  return (
    <div className="border rounded p-4 min-h-[300px]">
      {fields.length === 0 && (
        <p className="text-muted-foreground">כאן תוצג גרירת השדות בפועל</p>
      )}
      {fields.map((field) => (
        <div
          key={field.id}
          className={`p-2 my-1 rounded cursor-pointer border ${
            selectedFieldId === field.id ? "bg-muted" : ""
          }`}
          onClick={() => onSelectField(field.id)}
        >
          {field.label || field.name}
        </div>
      ))}
    </div>
  );
}
