/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldType, PasswordOptions, ValidationRules } from "./form";

// הגדרת שדה בסיסית - משותפת לכל סוגי השדות
export interface BaseFieldConfig {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: any;
  disabled?: boolean;
  required?: boolean;
  hidden?: boolean;
  readonly?: boolean;
  validations?: ValidationRules;
}

// הגדרות ספציפיות לשדה טקסט
export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "email" | "password" | "url" | "tel";
  passwordOptions?: PasswordOptions;
}

// הגדרות ספציפיות לשדה מספרי
export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number" | "range";
  min?: number;
  max?: number;
  step?: number;
}

// הגדרות ספציפיות לשדה בחירה
export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select" | "radio";
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
}

// הגדרות ספציפיות לשדה צ'קבוקס
export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  checkboxLabel?: string;
}

// הגדרות ספציפיות לשדה טקסטאריה
export interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  cols?: number;
}

// הגדרות ספציפיות לשדות תאריך וזמן
export interface DateTimeFieldConfig extends BaseFieldConfig {
  type: "date" | "time" | "datetime";
  minDate?: string;
  maxDate?: string;
  dateFormat?: string;
}

// הגדרות ספציפיות לשדה קובץ
export interface FileFieldConfig extends BaseFieldConfig {
  type: "file";
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  multiple?: boolean;
}

// הגדרות ספציפיות לשדה צבע
export interface ColorFieldConfig extends BaseFieldConfig {
  type: "color";
  colorFormat?: "hex" | "rgb" | "hsl";
}

// איחוד כל סוגי השדות
export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | TextareaFieldConfig
  | DateTimeFieldConfig
  | FileFieldConfig
  | ColorFieldConfig;

// Type alias for existing components that use FormField
export type FormField = FieldConfig;
export type FormFieldConfig = FieldConfig;
