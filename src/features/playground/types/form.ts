/* eslint-disable @typescript-eslint/no-explicit-any */

// טיפוס כללי לנתוני טופס
export type FormData = Record<string, any>;

// מזהים של שדות טופס - נשתמש בהם במתאמים
export const FIELD_TYPES = [
  "text",
  "password",
  "number",
  "email",
  "select",
  "checkbox",
  "radio",
  "textarea",
  "date",
  "time",
  "datetime",
  "file",
  "url",
  "tel",
  "range",
  "color",
] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

// אפשרויות תצוגה לשדה סיסמה
export type PasswordOptions = {
  showToggle: boolean;
  showStrengthIndicator: boolean;
  strengthIndicatorType: "basic" | "advanced";
};

// הגדרת כללי וולידציה משופרת
export type ValidationRules = {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: string; // פונקציה מותאמת אישית
  message?: string; // הודעת שגיאה
  minDate?: string;
  maxDate?: string;
  fileTypes?: string[];
  maxFileSize?: number;
};
