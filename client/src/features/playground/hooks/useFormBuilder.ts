import { useCallback } from "react";
import { useFormManager } from "./useFormManager";
import { FieldConfig, FormSchema } from "../types";

// ID קבוע לטופס הראשי
const MAIN_FORM_ID = "main-form";

// סכמה התחלתית של טופס ריק
const DEFAULT_SCHEMA: FormSchema = {
  id: MAIN_FORM_ID,
  title: "טופס חדש",
  description: "",
  fields: [],
  settings: {
    layout: "vertical",
    submitLabel: "שלח",
    showReset: true,
    resetLabel: "נקה",
  },
};

export function useFormBuilder() {
  const { schema, saveSchema, clear } = useFormManager(
    MAIN_FORM_ID,
    DEFAULT_SCHEMA,
    {}
  );

  const fields = schema.fields;

  const addField = useCallback(
    (field: FieldConfig) => {
      saveSchema({
        ...schema,
        fields: [...fields, field],
      });
    },
    [schema, fields, saveSchema]
  );

  const updateField = useCallback(
    (fieldId: string, updates: Partial<FieldConfig>) => {
      const updatedFields = fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      );
      saveSchema({
        ...schema,
        fields: updatedFields,
      });
    },
    [schema, fields, saveSchema]
  );

  const removeField = useCallback(
    (fieldId: string) => {
      const updatedFields = fields.filter((field) => field.id !== fieldId);
      saveSchema({
        ...schema,
        fields: updatedFields,
      });
    },
    [schema, fields, saveSchema]
  );

  const resetForm = useCallback(() => {
    clear();
  }, [clear]);

  const exportFormAsJson = useCallback(() => {
    const formData = JSON.stringify(schema, null, 2);
    const blob = new Blob([formData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "form-config.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [schema]);

  return {
    schema,
    fields,
    addField,
    updateField,
    removeField,
    resetForm,
    exportFormAsJson,
  };
}
