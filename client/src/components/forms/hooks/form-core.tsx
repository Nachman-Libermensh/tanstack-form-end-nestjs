/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFormHookContexts } from "@tanstack/react-form";
import { ReactNode } from "react";

// יצירת הקשרים עבור השדות והטופס
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();
// הגדרת טיפוסים לילדים של רכיבי הטופס
export type FormChildrenFunction<T = any> = (formInstance: T) => ReactNode;
export type FormChildren<T = any> = FormChildrenFunction<T> | ReactNode;

// סוגי שדות בסיסיים שהטופס יכול לתמוך בהם
export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "date"
  | "datetime-local"
  | "checkbox"
  | "radio"
  | "select"
  | "textarea"
  | "file"
  | "otp"
  | "color";

// סוג בסיסי של פרופס עבור רכיבי שדה
export interface BaseFieldProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

// סוג עבור אופציות של שדות בחירה (select, radio)
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
