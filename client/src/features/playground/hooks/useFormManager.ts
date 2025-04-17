/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormSchemaStore } from "../stores/form-schema.store";
import { useFormDataStore } from "../stores/form-data.store";
import type { FormSchema, FormData } from "../types";

export function useFormManager(
  formId: string,
  defaultSchema: FormSchema,
  defaultData: FormData = {}
) {
  // גישה לסכמה ולדאטה, עם ברירת מחדל
  const schema = useFormSchemaStore((s) => s.schemas[formId] ?? defaultSchema);
  const setSchema = useFormSchemaStore((s) => s.setSchema);
  const removeSchema = useFormSchemaStore((s) => s.removeSchema);

  const data = useFormDataStore((s) => s.data[formId] ?? defaultData);
  const setData = useFormDataStore((s) => s.setData);
  const removeData = useFormDataStore((s) => s.removeData);

  // אתחול ערכים רק אם לא קיימים בסטור
  useEffect(() => {
    // בדיקה אם הסכמה אינה קיימת כבר בסטור
    if (!useFormSchemaStore.getState().schemas[formId]) {
      setSchema(formId, defaultSchema);
    }
    // בדיקה אם הנתונים אינם קיימים כבר בסטור
    if (!useFormDataStore.getState().data[formId]) {
      setData(formId, defaultData);
    }
  }, [formId, defaultSchema, defaultData]);

  const saveSchema = (newSchema: FormSchema) => setSchema(formId, newSchema);
  const saveData = (newData: FormData) => setData(formId, newData);
  const clear = () => {
    removeSchema(formId);
    removeData(formId);
  };

  return {
    schema,
    saveSchema,
    data,
    saveData,
    clear,
  };
}
