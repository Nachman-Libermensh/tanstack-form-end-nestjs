"use client";
import { useFormBuilder } from "../../context/form-builder-context";
import TextFieldEditor from "./text-field-editor";
import CheckboxFieldEditor from "./checkbox-field-editor";
import SelectFieldEditor from "./select-field-editor";
import BaseFieldEditor from "./base-field-editor";
import PasswordFieldEditor from "./password-field-editor";

export default function FieldEditor() {
  const { selectedField } = useFormBuilder();

  if (!selectedField) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">בחר שדה לעריכה</p>
      </div>
    );
  }

  // בוחר את העורך המתאים בהתאם לסוג השדה
  const renderEditor = () => {
    switch (selectedField.type) {
      case "text":
      case "email":
      case "number":
        return <TextFieldEditor field={selectedField} />;
      case "password":
        return <PasswordFieldEditor field={selectedField} />;
      case "checkbox":
        return <CheckboxFieldEditor field={selectedField} />;
      case "select":
        return <SelectFieldEditor field={selectedField} />;
      default:
        return <BaseFieldEditor field={selectedField} />;
    }
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">עריכת שדה</h3>
        <span className="bg-secondary/30 text-secondary-foreground px-2 py-1 rounded text-xs">
          {selectedField.type}
        </span>
      </div>
      {renderEditor()}
    </div>
  );
}
