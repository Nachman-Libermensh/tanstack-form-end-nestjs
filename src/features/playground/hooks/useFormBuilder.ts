import { useCallback } from "react";
import { useFormManager } from "./useFormManager";
import { FieldConfig, FormSchema } from "../types";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { useFormSchemaStore } from "../stores/form-schema.store";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("playground");

  const { schema, saveSchema, clear, data, saveData } = useFormManager(
    MAIN_FORM_ID,
    DEFAULT_SCHEMA,
    {}
  );

  // Get selectedFieldId and selectField from the store instead of using local state
  const selectedFieldId = useFormSchemaStore((state) => state.selectedFieldId);
  const selectField = useFormSchemaStore((state) => state.selectField);

  const fields = schema.fields;

  const addField = useCallback(
    (field: Partial<FieldConfig> & { type: string }) => {
      // וודא שלשדה יש מזהה
      const newField: FieldConfig = {
        ...field,
        id: field.id || nanoid(6),
        name: field.name || `field_${field.type}_${nanoid(4)}`,
        label: field.label || t(`formBuilder.fieldTypes.${field.type}`),
      } as FieldConfig;

      saveSchema({
        ...schema,
        fields: [...fields, newField],
      });

      // בחר את השדה החדש אוטומטית
      selectField(newField.id);

      toast.success(t("notifications.fieldAdded"), {
        description: t("notifications.fieldAddedDesc", { type: newField.type }),
      });
    },
    [schema, fields, saveSchema, selectField, t]
  );

  const updateField = useCallback(
    (fieldId: string, updates: Partial<FieldConfig>) => {
      const updatedFields = fields.map((field) => {
        if (field.id !== fieldId) return field;

        // Create updated field preserving the original type
        const updatedField = { ...field, ...updates } as FieldConfig;

        // Special handling for nested validation properties
        if (updates.validations) {
          updatedField.validations = {
            ...(field.validations || {}),
            ...updates.validations,
          };
        }

        return updatedField;
      });

      saveSchema({
        ...schema,
        fields: updatedFields,
      });

      // Log for debugging
      console.log("Field updated:", fieldId, updates);
      console.log("fields", updatedFields);
    },
    [schema, fields, saveSchema]
  );

  const removeField = useCallback(
    (fieldId: string) => {
      const fieldToRemove = fields.find((f) => f.id === fieldId);
      const updatedFields = fields.filter((field) => field.id !== fieldId);

      saveSchema({
        ...schema,
        fields: updatedFields,
      });

      // אם השדה שנמחק הוא השדה הנבחר, בטל את הבחירה
      if (selectedFieldId === fieldId) {
        selectField(updatedFields.length > 0 ? updatedFields[0].id : null);
      }

      toast.success(t("notifications.fieldRemoved"), {
        description: t("notifications.fieldRemovedDesc"),
      });
    },
    [schema, fields, saveSchema, selectedFieldId, selectField, t]
  );

  const duplicateField = useCallback(
    (fieldId: string) => {
      const field = fields.find((f) => f.id === fieldId);
      if (field) {
        const duplicatedField = {
          ...field,
          id: nanoid(6),
          name: `${field.name}_copy_${nanoid(4)}`,
          label: `${field.label} (עותק)`,
        };

        addField(duplicatedField);

        toast.success("שדה שוכפל", {
          description: `נוצר עותק של ${field.label}`,
        });
      }
    },
    [fields, addField]
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

  const reorderFields = useCallback(
    (activeId: string, overId: string) => {
      const oldIndex = fields.findIndex((field) => field.id === activeId);
      const newIndex = fields.findIndex((field) => field.id === overId);

      if (oldIndex === -1 || newIndex === -1) return;

      const newFields = [...fields];
      const [movedField] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, movedField);

      saveSchema({
        ...schema,
        fields: newFields,
      });

      toast.success(t("notifications.fieldReordered"), {
        description: t("notifications.fieldReorderedDesc"),
      });
    },
    [schema, fields, saveSchema, t]
  );

  return {
    schema,
    fields,
    selectedFieldId,
    selectField,
    addField,
    updateField,
    removeField,
    duplicateField,
    resetForm,
    exportFormAsJson,
    formData: data,
    updateFormData: saveData,
    reorderFields,
  };
}
