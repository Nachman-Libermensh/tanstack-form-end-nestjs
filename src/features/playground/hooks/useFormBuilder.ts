import { useCallback, useState } from "react";
import { useFormManager } from "./useFormManager";
import { FieldConfig, FormSchema } from "../types";
import { nanoid } from "nanoid";
import { toast } from "sonner";

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
  const { schema, saveSchema, clear, data, saveData } = useFormManager(
    MAIN_FORM_ID,
    DEFAULT_SCHEMA,
    {}
  );

  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const fields = schema.fields;

  const selectField = useCallback((fieldId: string | null) => {
    setSelectedFieldId(fieldId);
  }, []);

  const addField = useCallback(
    (field: Partial<FieldConfig> & { type: string }) => {
      // וודא שלשדה יש מזהה
      const newField: FieldConfig = {
        id: field.id || nanoid(6),
        type: field.type,
        name: field.name || `field_${field.type}_${nanoid(4)}`,
        label: field.label || `שדה חדש`,
        ...field,
      } as FieldConfig;

      saveSchema({
        ...schema,
        fields: [...fields, newField],
      });

      // בחר את השדה החדש אוטומטית
      selectField(newField.id);

      toast.success("שדה נוסף", {
        description: `נוסף שדה מסוג ${newField.type}`,
      });
    },
    [schema, fields, saveSchema, selectField]
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

      // אם השדה שנמחק הוא השדה הנבחר, בטל את הבחירה
      if (selectedFieldId === fieldId) {
        selectField(updatedFields.length > 0 ? updatedFields[0].id : null);
      }

      toast.success("שדה נמחק", {
        description: "השדה הוסר מהטופס",
      });
    },
    [schema, fields, saveSchema, selectedFieldId, selectField]
  );

  const resetForm = useCallback(() => {
    clear();
    selectField(null);
    toast.success("הטופס אופס", {
      description: "כל הנתונים נמחקו",
    });
  }, [clear, selectField]);

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

    toast.success("הטופס יוצא", {
      description: "הקובץ הורד למחשב שלך",
    });
  }, [schema]);

  return {
    schema,
    fields,
    selectedFieldId,
    selectField,
    addField,
    updateField,
    removeField,
    resetForm,
    exportFormAsJson,
    formData: data,
    updateFormData: saveData,
  };
}
